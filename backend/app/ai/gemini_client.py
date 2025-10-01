import google.generativeai as genai
from typing import List, Dict, Any, Optional, AsyncGenerator
import json
import logging
from ..core.config import settings

logger = logging.getLogger(__name__)


class GeminiClient:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.chat_model = genai.GenerativeModel(settings.GEMINI_MODEL_CHAT)
        self.complex_model = genai.GenerativeModel(settings.GEMINI_MODEL_COMPLEX)
        
        # Safety settings
        self.safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]

    def generate_chat_response(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        subject: Optional[str] = None
    ) -> str:
        """Generate a chat response with context and subject filtering"""
        try:
            # Build system prompt with guardrails
            system_prompt = self._build_system_prompt(context, subject)
            full_prompt = f"{system_prompt}\n\nUser: {prompt}"
            
            response = self.chat_model.generate_content(
                full_prompt,
                safety_settings=self.safety_settings
            )
            
            # Check if response was blocked
            if response.prompt_feedback and response.prompt_feedback.block_reason:
                return "I cannot provide a response to this request as it may violate our content policies."
            
            return response.text
            
        except Exception as e:
            logger.error(f"Error generating chat response: {e}")
            return "I'm sorry, I encountered an error while processing your request."

    def generate_streaming_response(
        self, 
        prompt: str, 
        context: Optional[str] = None,
        subject: Optional[str] = None
    ) -> AsyncGenerator[str, None]:
        """Generate streaming response for real-time chat"""
        try:
            system_prompt = self._build_system_prompt(context, subject)
            full_prompt = f"{system_prompt}\n\nUser: {prompt}"
            
            response = self.chat_model.generate_content(
                full_prompt,
                safety_settings=self.safety_settings,
                stream=True
            )
            
            for chunk in response:
                if chunk.text:
                    yield chunk.text
                    
        except Exception as e:
            logger.error(f"Error generating streaming response: {e}")
            yield "I'm sorry, I encountered an error while processing your request."

    def generate_quiz_questions(
        self, 
        material_content: str, 
        num_questions: int = 5,
        difficulty: str = "medium"
    ) -> List[Dict[str, Any]]:
        """Generate quiz questions from material content"""
        try:
            prompt = f"""
            Generate {num_questions} quiz questions based on the following material.
            Difficulty level: {difficulty}
            
            Material:
            {material_content}
            
            Return the questions in JSON format with the following structure:
            [
                {{
                    "question": "Question text",
                    "type": "multiple_choice",
                    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                    "correct_answer": "Option 1",
                    "explanation": "Explanation of the correct answer",
                    "difficulty": 1-5
                }}
            ]
            
            Question types: multiple_choice, true_false, short_answer
            """
            
            response = self.complex_model.generate_content(
                prompt,
                safety_settings=self.safety_settings
            )
            
            # Parse JSON response
            questions = json.loads(response.text)
            return questions
            
        except Exception as e:
            logger.error(f"Error generating quiz questions: {e}")
            return []

    def generate_debate_topic(self, subject: str) -> Dict[str, Any]:
        """Generate a debate topic for a subject"""
        try:
            prompt = f"""
            Generate a debate topic for the subject: {subject}
            
            Return in JSON format:
            {{
                "topic": "Debate topic statement",
                "description": "Brief description of the topic",
                "for_arguments": ["Argument 1", "Argument 2", "Argument 3"],
                "against_arguments": ["Counter-argument 1", "Counter-argument 2", "Counter-argument 3"],
                "difficulty": "beginner|intermediate|advanced"
            }}
            """
            
            response = self.complex_model.generate_content(
                prompt,
                safety_settings=self.safety_settings
            )
            
            return json.loads(response.text)
            
        except Exception as e:
            logger.error(f"Error generating debate topic: {e}")
            return {}

    def socratic_questioning(self, user_response: str, context: str) -> str:
        """Generate Socratic questioning based on user response"""
        try:
            prompt = f"""
            You are a Socratic teacher. The student provided this response:
            "{user_response}"
            
            Context: {context}
            
            Generate a thoughtful follow-up question that will help the student think deeper about the topic.
            The question should be open-ended and encourage critical thinking.
            """
            
            response = self.chat_model.generate_content(
                prompt,
                safety_settings=self.safety_settings
            )
            
            return response.text
            
        except Exception as e:
            logger.error(f"Error generating Socratic question: {e}")
            return "That's an interesting perspective. Can you tell me more about your reasoning?"

    def _build_system_prompt(self, context: Optional[str] = None, subject: Optional[str] = None) -> str:
        """Build system prompt with guardrails and context"""
        base_prompt = """
        You are an AI teaching assistant for an e-learning platform. Your role is to:
        1. Help students learn and understand concepts
        2. Provide educational support and guidance
        3. Encourage critical thinking and learning
        4. Stay within the educational context
        
        Guidelines:
        - Only discuss topics related to education and learning
        - Do not help with cheating, plagiarism, or academic dishonesty
        - Do not provide answers to tests or assignments directly
        - Encourage students to think and learn independently
        - Be helpful, patient, and encouraging
        """
        
        if subject:
            base_prompt += f"\n- Focus on the subject: {subject}"
        
        if context:
            base_prompt += f"\n- Use this context to inform your responses: {context}"
        
        return base_prompt

    def validate_response_quality(self, response: str, context: str) -> Dict[str, Any]:
        """Validate the quality and accuracy of AI response"""
        try:
            prompt = f"""
            Evaluate this AI response for educational quality and accuracy:
            
            Response: {response}
            Context: {context}
            
            Return JSON with:
            {{
                "is_accurate": true/false,
                "is_helpful": true/false,
                "confidence_score": 0.0-1.0,
                "issues": ["list of any issues found"],
                "suggestions": ["suggestions for improvement"]
            }}
            """
            
            validation_response = self.chat_model.generate_content(
                prompt,
                safety_settings=self.safety_settings
            )
            
            return json.loads(validation_response.text)
            
        except Exception as e:
            logger.error(f"Error validating response: {e}")
            return {
                "is_accurate": True,
                "is_helpful": True,
                "confidence_score": 0.5,
                "issues": [],
                "suggestions": []
            }


# Global instance
gemini_client = GeminiClient()
