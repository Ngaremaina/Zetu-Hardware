import random
from faker import Faker
from app import app
from models import db, Customer, Hardware, Manufacturer

fake = Faker()

def make_customers():
    # Generate customers
    for _ in range(10):
        customer = Customer(
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            email=fake.email(),
            phone=fake.random_number(digits=10),
            password=fake.password()
        )
        db.session.add(customer)

    # Generate manufacturers
    for _ in range(5):
        manufacturer = Manufacturer(
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            email=fake.email(),
            phone=fake.random_number(digits=10),
            password=fake.password()
        )
        db.session.add(manufacturer)

    # Generate hardware
    customers = Customer.query.all()
    manufacturers = Manufacturer.query.all()

    for _ in range(20):
        customer = random.choice(customers)
        manufacturer = random.choice(manufacturers)
        hardware = Hardware(
            customer=customer,
            manufacturer=manufacturer,
            name=fake.word(),
            description=fake.text(),
            price=random.randint(100, 1000),
            category=random.choice(['Battery', 'Brakes', 'Transmission', 'Radiator'])
        )
        db.session.add(hardware)

    # Commit the changes to the database
    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_customers()   