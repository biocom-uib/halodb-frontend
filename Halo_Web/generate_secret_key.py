"""
Script to generate a new Django SECRET_KEY.
Run this script and copy the output to your .env file.
"""
from django.core.management.utils import get_random_secret_key

if __name__ == "__main__":
    secret_key = get_random_secret_key()
    print("\n" + "="*60)
    print("NEW SECRET KEY GENERATED")
    print("="*60)
    print(f"\nSECRET_KEY='{secret_key}'")
    print("\n⚠️  IMPORTANT: Copy this to your .env file and keep it secret!")
    print("="*60 + "\n")
