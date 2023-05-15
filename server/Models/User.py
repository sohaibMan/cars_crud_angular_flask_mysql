import bcrypt

from connection.mysql_connection import db


class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def save(self):
        cursor = db.cursor()
        req = "INSERT INTO cars_db.users (username, password) VALUES (%s, %s)"
        # create hashed password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(self.password.encode('utf8'), salt)
        val = (self.username, hashed_password)
        cursor.execute(req, val)
        db.commit()

    def compare_password(self, password):
        return bcrypt.checkpw(password.encode('utf8'), self.password.encode('utf8'))
