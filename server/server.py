import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from Routes.cars import carsRoute
from Routes.users import usersRoute

# setup flask app
app = Flask(__name__)
# setup cors for the app


# Set up the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

cors = CORS(app, resources={
    r"/api/v1/*": {"origins": "http://localhost:4200"}})
# registry  blueprints
app.register_blueprint(carsRoute)
app.register_blueprint(usersRoute)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
