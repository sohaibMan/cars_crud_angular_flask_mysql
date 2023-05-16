from flask import request

from connection.mysql_connection import db


class Car:
    def __init__(self, car_id, year, make, model, body_styles):
        self.car_id = car_id
        self.year = year
        self.make = make
        self.model = model
        self.body_styles = body_styles

    def __dict__(self):
        return {
            "car_id": self.car_id,
            "year": self.year,
            "make": self.make,
            "model": self.model,
            "body_styles": self.body_styles
        }
    def save(self):
        myCursor = db.cursor()
        req = "INSERT INTO cars_db.cars (year, make, model, body_styles) VALUES (%s, %s, %s, %s)"
        val = (request.json['year'], request.json['make'], request.json['model'], request.json['body_styles'])
        myCursor.execute(req, val)
        db.commit()

    # save(self):

