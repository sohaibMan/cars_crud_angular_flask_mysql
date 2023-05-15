from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required

from Models.Car import Car
from connection.mysql_connection import db

# create a blueprint for carsRoute route
carsRoute = Blueprint('carsRoute', __name__, url_prefix="/api/v1/cars")


# get all car by id
@jwt_required()
@carsRoute.route('<int:car_id>', methods=['GET'])
def get_car_by_id(car_id):
    myCursor = db.cursor()
    req = "SELECT * FROM cars_db.cars WHERE car_id = %s"
    val = (car_id,)
    myCursor.execute(req, val)
    result = myCursor.fetchone()
    car = Car(result[0], result[1], result[2], result[3], result[4])
    return car.__dict__()


# get all carsRoute
@carsRoute.route('/', methods=['GET'])
@jwt_required()
def get_cars():
    args = request.args
    page = args.get('page')
    count = args.get('count')
    if page is None or count is None:
        page = 0
        count = 10
    if int(page) < 0 or int(count) < 0:
        return jsonify({"message": "page and count must be positive"})
    if int(count) > 20:
        return jsonify({"message": "count must be less than 10"})

    cars = []
    req = "SELECT * FROM cars_db.cars WHERE car_id > %s LIMIT %s"
    # another way to do it
    # req = "SELECT * FROM cars_db.carsRoute LIMIT %s OFFSET %s"
    cursor = db.cursor()
    cursor.execute(req, (page, count))
    results = cursor.fetchall()

    for result in results:
        car = Car(result[0], result[1], result[2], result[3], result[4])
        cars.append(car.__dict__())

    return cars


#  delete car by id

@carsRoute.route('/<int:car_id>', methods=['DELETE'])
@jwt_required()
def delete_car_by_id(car_id):
    myCursor = db.cursor()
    req = "DELETE FROM cars_db.cars WHERE car_id = %s"
    val = (car_id,)
    myCursor.execute(req, val)
    db.commit()
    return {"message": "car deleted successfully"}


# update car by id
@carsRoute.route('/<car_id>', methods=['PUT'])
@jwt_required()
def update_car_by_id(car_id):
    # validate user input
    if not request.json:
        return jsonify({"message": "request body must be json"}), 400
    if 'year' not in request.json or 'make' not in request.json or 'model' not in request.json or 'body_styles' not in request.json:
        return jsonify({"message": "year, make, model, body_styles are required"}), 400
    # prepare statement
    myCursor = db.cursor()
    req = "UPDATE cars_db.cars SET year = %s, make = %s, model = %s, body_styles = %s WHERE car_id = %s"
    val = (
        request.json['year'], request.json['make'], request.json['model'], request.json['body_styles'], car_id)
    myCursor.execute(req, val)
    db.commit()
    return jsonify({"message": "car updated successfully"})


# create car
@carsRoute.route('/', methods=['POST'])
@jwt_required()
def create_car():
    # validate user input
    if not request.json:
        return jsonify({"message": "request body must be json"}), 400
    if 'year' not in request.json or 'make' not in request.json or 'model' not in request.json or 'body_styles' not in request.json:
        return jsonify({"message": "year, make, model, body_styles are required"}), 400
    # prepare statement
    car = Car(request.json['year'], request.json['make'], request.json['model'], request.json['body_styles'])
    car.save()

    return jsonify({"message": "car created successfully"})
