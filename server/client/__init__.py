from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

from models import db

app = Flask(__name__,
            static_url_path='',
            static_folder='../../frontend/build',
            template_folder='../../frontend/build')

app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = "b'j~S\xcf\x11\x85\x04\x00D\xf0\x91\xc13\xb1\xc0\x04'"

CORS(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)