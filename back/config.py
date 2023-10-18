import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

SECRET_KEY = str(os.environ.get("SECRET_KEY"))
DEBUG = bool(os.environ.get("DEBUG"))

DB_NAME = str(os.environ.get("DB_NAME"))
DB_USER = str(os.environ.get("DB_USER"))
DB_PASSWORD = str(os.environ.get("DB_PASSWORD"))
DB_HOST = str(os.environ.get("DB_HOST"))
DB_PORT = str(os.environ.get("DB_PORT"))

CORS_ORIGIN_WHITELIST = str(os.environ.get("CORS_ORIGIN_WHITELIST"))
