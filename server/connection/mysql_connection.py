import os

import mysql.connector
from dotenv import load_dotenv

# load env variables
load_dotenv()
# setting env variables
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_NAME = os.getenv("DB_NAME")
# connect to mysql
db = mysql.connector.connect(
    host=DB_HOST or "127.0.0.1",
    user=DB_USER or "root",
    password=DB_PASSWORD or "",
    database=DB_NAME or "cars_db"
)
