from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os
from flask_cors import CORS


# Connect to MongoDB-cluster
load_dotenv(find_dotenv())
password_MDB = os.environ.get("MONGODB_PWD")
connection_string = f"Enter-the-link-from-your-MongoDB-cluster"
client = MongoClient(connection_string)
db = client.password_manager #database
users_collection = db.users
passwords_collection = db.passwords #document
