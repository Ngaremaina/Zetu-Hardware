# server/app.py

from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate

from models import db, Customer, Hardware, Manufacturer

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def index():
    return "Index for Customer/Hardware/Manufacturer API"

@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    customer_list = []
    for customer in customers:
        customer_data = {
            'id': customer.id,
            'firstname': customer.firstname,
            'lastname': customer.lastname,
            'email': customer.email,
            'phone': customer.phone
        }
        customer_list.append(customer_data)
    return jsonify(customers=customer_list)


@app.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    customer = Customer.query.get_or_404(customer_id)
    customer_data = {
        'id': customer.id,
        'firstname': customer.firstname,
        'lastname': customer.lastname,
        'email': customer.email,
        'phone': customer.phone
    }
    return jsonify(customer=customer_data)


# Hardware routes

@app.route('/hardware', methods=['GET'])
def get_hardware():
    hardware = Hardware.query.all()
    hardware_list = []
    for item in hardware:
        hardware_data = {
            'id': item.id,
            'customer_id': item.customer_id,
            'manufacturer_id': item.manufacturer_id,
            'name': item.name,
            'description': item.description,
            'price': item.price,
            'category': item.category,
            'image':item.image
        }
        hardware_list.append(hardware_data)
    return jsonify(hardware=hardware_list)

@app.route('/hardware/<int:hardware_id>', methods=['GET'])
def get_hardware_item(hardware_id):
    item = Hardware.query.get_or_404(hardware_id)
    hardware_data = {
        'id': item.id,
        'customer_id': item.customer_id,
        'manufacturer_id': item.manufacturer_id,
        'name': item.name,
        'description': item.description,
        'price': item.price,
        'category': item.category,
        'image':item.image
    }
    return jsonify(hardware=hardware_data)

# Manufacturer routes

@app.route('/manufacturers', methods=['GET'])
def get_manufacturers():
    manufacturers = Manufacturer.query.all()
    manufacturer_list = []
    for manufacturer in manufacturers:
        manufacturer_data = {
            'id': manufacturer.id,
            'firstname': manufacturer.firstname,
            'lastname': manufacturer.lastname,
            'email': manufacturer.email,
            'phone': manufacturer.phone
        }
        manufacturer_list.append(manufacturer_data)
    return jsonify(manufacturers=manufacturer_list)

@app.route('/manufacturers/<int:manufacturer_id>', methods=['GET'])
def get_manufacturer(manufacturer_id):
    manufacturer = Manufacturer.query.get_or_404(manufacturer_id)
    manufacturer_data = {
        'id': manufacturer.id,
        'firstname': manufacturer.firstname,
        'lastname': manufacturer.lastname,
        'email': manufacturer.email,
        'phone': manufacturer.phone
    }
    return jsonify(manufacturer=manufacturer_data)

#POST ROUTES
@app.route("/addhardwares", methods = ["POST"])
def post_hardware():
    data = request.get_json()
    new_hardware = Hardware(
        customer_id = data["customer_id"],
        manufacturer_id = data["manufacturer_id"],
        name = data["name"],
        description = data["description"],
        price = data["price"],
        category=data["category"],
        image = data["image"]
    )
    db.session.add(new_hardware)
    db.session.commit()
    return make_response(jsonify({"message":"Hardware added successfully"}))

@app.route("/addcustomers", methods = ["POST"])
def post_customer():
    data = request.get_json()
    new_customer = Customer(
        firstname = data["firstname"],
        lastname = data["lastname"],
        email = data["email"],
        phone = data["phone"],
        password = data["password"]
    )
    db.session.add(new_customer)
    db.session.commit()
    return make_response(jsonify({"message":"Customer added successfully"}))

@app.route("/addmanufacturer", methods = ["POST"])
def post_manufacturer():
    data = request.get_json()
    new_manufacturer = Manufacturer(
        firstname = data["firstname"],
        lastname = data["lastname"],
        email = data["email"],
        phone = data["phone"],
        password = data["password"]
    )
    db.session.add(new_manufacturer)
    db.session.commit()
    return make_response(jsonify({"message":"Manufacturer added successfully"}))



# PATCH ROUTES

@app.route('/customers/<int:customer_id>', methods=['PATCH'])
def update_customer(customer_id):
    customer = Customer.query.get(customer_id)

    if not customer:
        return jsonify(message='Customer not found'), 404
   
    updated_data = request.json
   
    if 'firstname' in updated_data:
        customer.firstname = updated_data['firstname']
    if 'lastname' in updated_data:
        customer.lastname = updated_data['lastname']
    if 'email' in updated_data:
        customer.email = updated_data['email']
    if 'phone' in updated_data:
        customer.phone = updated_data['phone']
    
    db.session.commit()   

    return jsonify(message='Customer updated successfully')



@app.route('/hardware/<int:item_id>', methods=['PATCH'])
def update_hardware(item_id):
    hardware = Hardware.query.get(item_id)

    if not hardware:
        return jsonify(message='Hardware item not found'), 404
   
    updated_data = request.json
   
    if 'name' in updated_data:
        hardware.name = updated_data['name']
    if 'description' in updated_data:
        hardware.description = updated_data['description']
    if 'price' in updated_data:
        hardware.price = updated_data['price']
    if 'category' in updated_data:
        hardware.category = updated_data['category']
    if 'image' in updated_data:
        hardware.image = updated_data['image']

    db.session.commit()

    return jsonify(message='Hardware item updated successfully')

@app.route('/manufacturers/<int:manufacturer_id>', methods=['PATCH'])
def update_manufacturer(manufacturer_id):
    manufacturer = Manufacturer.query.get(manufacturer_id)

    if not manufacturer:
        return jsonify(message='Manufacturer not found'), 404

    updated_data = request.json
    
    if 'firstname' in updated_data:
        manufacturer.firstname = updated_data['firstname']
    if 'lastname' in updated_data:
        manufacturer.lastname = updated_data['lastname']
    if 'email' in updated_data:
        manufacturer.email = updated_data['email']
    if 'phone' in updated_data:
        manufacturer.phone = updated_data['phone']

    db.session.commit() 

    return jsonify(message='Manufacturer updated successfully')

# DELETE ROUTES

@app.route('/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    customer = Customer.query.filter_by(id = customer_id).first()

    if not customer:
        return jsonify(message='Customer not found'), 404

    # Delete the customer's associated hardware records
    Hardware.query.filter_by(customer_id=customer_id).delete()
    
    db.session.delete(customer)
    db.session.commit()

    return jsonify(message='Customer and associated hardware deleted successfully')


@app.route('/hardware/<int:hardware_id>', methods=['DELETE'])
def delete_hardware(hardware_id):
    hardware = Hardware.query.filter_by(id = hardware_id).first()

    if not hardware:
        return jsonify({"message":'Hardware not found'}), 404

    db.session.delete(hardware)
    db.session.commit()

    return jsonify({"message":'Hardware deleted successfully'})

@app.route('/manufacturers/<int:manufacturer_id>', methods=['DELETE'])
def delete_manufacturer(manufacturer_id):
    manufacturer = Manufacturer.query.filter_by(id = manufacturer_id).first()

    hardware_delete_result = Hardware.query.filter_by(manufacturer_id=manufacturer_id).delete()
    if hardware_delete_result > 0:
        db.session.delete(manufacturer)
        db.session.commit()
        return jsonify({'message': 'Manufacturer deleted successfully'})
    else:
        return jsonify({'error': 'No associated hardware found'}), 404
if __name__ == '__main__':
    app.run(port=5555)