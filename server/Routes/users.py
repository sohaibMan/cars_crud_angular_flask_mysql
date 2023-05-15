# Create a route api/v1/usersRoute/login authenticate your usersRoute and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token

from Models.User import User
from connection.mysql_connection import db

# create a blueprint for usersRoute route
usersRoute = Blueprint('usersRoute', __name__, url_prefix="/api/v1/users")


@usersRoute.route("/login", methods=["POST"])
def login():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)

        # validate user input
        if not username or not password or len(username) < 3 or len(password) < 3:
            return jsonify({"data": "Bad username or password"}), 401

        cursor = db.cursor()
        req = "SELECT * FROM cars_db.users WHERE username = %s"
        val = (username,)
        cursor.execute(req, val)
        result = cursor.fetchone()
        if result is None:
            return jsonify({"status": "error", "data": "Bad username or password"}), 401
        # email , password
        user = User(result[1], result[2])
        if not user.compare_password(password):
            return jsonify({"status": "error", "data": "Bad username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify({"status": "success", "data": {"jwt": access_token}}), 201
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "data": "An error has occurred"}), 401


@usersRoute.route("/signup", methods=["POST"])
def signup():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        user = User(username, password)
        user.save()
        access_token = create_access_token(identity=username)
        return jsonify({"status": "success", "data": {"jwt": access_token}}), 201
    except Exception as e:
        return jsonify({"status": "error", "data": "Username already exists"}), 401
