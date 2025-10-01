#!/usr/bin/env python3
"""
Fix encoding issues on Windows
"""
import sys
import os

def fix_encoding():
    """Fix Python encoding for Windows"""
    print("Fixing encoding for Windows...")
    
    # Set environment variables
    os.environ['PYTHONIOENCODING'] = 'utf-8'
    os.environ['PYTHONLEGACYWINDOWSSTDIO'] = '1'
    
    # Try to set stdout encoding
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')
    
    print("Encoding fixed!")
    print("You can now run scripts with emoji support")

if __name__ == "__main__":
    fix_encoding()
