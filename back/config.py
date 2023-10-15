import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

SECRET_KEY = str(os.environ.get("SECRET_KEY"))
