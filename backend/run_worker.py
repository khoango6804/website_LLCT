#!/usr/bin/env python3
"""
Worker runner script for E-Learning Platform
"""
import os
import sys
import logging
from pathlib import Path

# Add the app directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

from app.workers.indexing_worker import start_worker

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    
    print("Starting E-Learning Platform Worker...")
    print("Press Ctrl+C to stop")
    
    try:
        start_worker()
    except KeyboardInterrupt:
        print("\nWorker stopped by user")
    except Exception as e:
        print(f"Worker error: {e}")
        sys.exit(1)
