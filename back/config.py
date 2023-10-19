import os

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = os.environ.get("DEBUG") == "True"

DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT") if DEBUG else ''

CORS_WHITELIST = os.environ.get("CORS_WHITELIST").split(",") if os.environ.get("CORS_WHITELIST") else []

