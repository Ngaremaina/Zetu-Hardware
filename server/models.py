from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    phone = db.Column(db.String(10))
    password = db.Column(db.String(255))
    hardware = db.relationship('Hardware',backref='customer', lazy=True)


class Hardware(db.Model, SerializerMixin):
    __tablename__ = 'hardwares'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255))
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    manufacturer_id = db.Column(db.Integer, db.ForeignKey('manufacturer.id'), nullable=False)
    # sales_id = db.Column(db.Integer, db.ForeignKey('sales.id'), nullable=False)
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    price = db.Column(db.Integer)
    category = db.Column(db.String(255))


class Manufacturer(db.Model, SerializerMixin):
    __tablename__ = 'manufacturer'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    phone = db.Column(db.String(10))
    password = db.Column(db.String(255))
    hardware = db.relationship('Hardware', backref='manufacturer', lazy=True)


