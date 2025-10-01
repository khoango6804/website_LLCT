import numpy as np
from typing import List, Dict, Any, Optional
from sentence_transformers import SentenceTransformer
import json
import logging
from sqlalchemy.orm import Session
from ..models.content import MaterialEmbedding
from ..core.config import settings

logger = logging.getLogger(__name__)


class RAGService:
    def __init__(self):
        self.embedding_model = SentenceTransformer(settings.EMBEDDING_MODEL)
        self.similarity_threshold = settings.SIMILARITY_THRESHOLD

    def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for text"""
        try:
            embedding = self.embedding_model.encode(text)
            return embedding.tolist()
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            return []

    def search_similar_content(
        self, 
        query: str, 
        db: Session,
        subject_id: Optional[int] = None,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """Search for similar content using vector similarity"""
        try:
            # Generate query embedding
            query_embedding = self.generate_embedding(query)
            if not query_embedding:
                return []

            # Convert to string for database storage
            query_embedding_str = json.dumps(query_embedding)

            # Build query
            db_query = db.query(MaterialEmbedding).filter(
                MaterialEmbedding.material.has(subject_id=subject_id) if subject_id else True
            )

            # Calculate similarity for each embedding
            results = []
            for embedding_record in db_query.limit(limit * 2):  # Get more to filter by similarity
                try:
                    stored_embedding = json.loads(embedding_record.embedding)
                    similarity = self._calculate_cosine_similarity(query_embedding, stored_embedding)
                    
                    if similarity >= self.similarity_threshold:
                        results.append({
                            "id": embedding_record.id,
                            "material_id": embedding_record.material_id,
                            "chunk_text": embedding_record.chunk_text,
                            "similarity": similarity,
                            "metadata": embedding_record.metadata
                        })
                except Exception as e:
                    logger.warning(f"Error processing embedding {embedding_record.id}: {e}")
                    continue

            # Sort by similarity and return top results
            results.sort(key=lambda x: x["similarity"], reverse=True)
            return results[:limit]

        except Exception as e:
            logger.error(f"Error searching similar content: {e}")
            return []

    def get_relevant_context(
        self, 
        query: str, 
        db: Session,
        subject_id: Optional[int] = None,
        max_context_length: int = 2000
    ) -> str:
        """Get relevant context for RAG"""
        try:
            similar_content = self.search_similar_content(query, db, subject_id, limit=10)
            
            context_parts = []
            current_length = 0
            
            for content in similar_content:
                chunk_text = content["chunk_text"]
                if current_length + len(chunk_text) <= max_context_length:
                    context_parts.append(f"[Similarity: {content['similarity']:.2f}] {chunk_text}")
                    current_length += len(chunk_text)
                else:
                    break
            
            return "\n\n".join(context_parts)
            
        except Exception as e:
            logger.error(f"Error getting relevant context: {e}")
            return ""

    def _calculate_cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """Calculate cosine similarity between two vectors"""
        try:
            vec1_np = np.array(vec1)
            vec2_np = np.array(vec2)
            
            dot_product = np.dot(vec1_np, vec2_np)
            norm1 = np.linalg.norm(vec1_np)
            norm2 = np.linalg.norm(vec2_np)
            
            if norm1 == 0 or norm2 == 0:
                return 0.0
            
            return dot_product / (norm1 * norm2)
            
        except Exception as e:
            logger.error(f"Error calculating cosine similarity: {e}")
            return 0.0

    def process_material_for_embedding(
        self, 
        material_content: str, 
        material_id: int,
        chunk_size: int = 500,
        overlap: int = 50
    ) -> List[Dict[str, Any]]:
        """Process material content into chunks for embedding"""
        try:
            # Simple text chunking (can be improved with more sophisticated methods)
            chunks = []
            start = 0
            
            while start < len(material_content):
                end = start + chunk_size
                chunk = material_content[start:end]
                
                # Try to break at sentence boundary
                if end < len(material_content):
                    last_period = chunk.rfind('.')
                    if last_period > chunk_size * 0.7:  # If period is in last 30%
                        chunk = chunk[:last_period + 1]
                        end = start + last_period + 1
                
                chunks.append({
                    "chunk_id": f"{material_id}_{len(chunks)}",
                    "chunk_text": chunk.strip(),
                    "start_pos": start,
                    "end_pos": end
                })
                
                start = end - overlap
                
            return chunks
            
        except Exception as e:
            logger.error(f"Error processing material for embedding: {e}")
            return []

    def create_embeddings_for_material(
        self, 
        material_content: str, 
        material_id: int,
        db: Session
    ) -> bool:
        """Create and store embeddings for material content"""
        try:
            # Process material into chunks
            chunks = self.process_material_for_embedding(material_content, material_id)
            
            # Generate embeddings for each chunk
            for chunk in chunks:
                embedding = self.generate_embedding(chunk["chunk_text"])
                if embedding:
                    embedding_record = MaterialEmbedding(
                        material_id=material_id,
                        chunk_id=chunk["chunk_id"],
                        chunk_text=chunk["chunk_text"],
                        embedding=json.dumps(embedding),
                        metadata={
                            "start_pos": chunk["start_pos"],
                            "end_pos": chunk["end_pos"]
                        }
                    )
                    db.add(embedding_record)
            
            db.commit()
            return True
            
        except Exception as e:
            logger.error(f"Error creating embeddings for material: {e}")
            db.rollback()
            return False


# Global instance
rag_service = RAGService()
