"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        raise APIException(message='Email already in use', status_code=409)

    if 'password' not in data or not data['password']:
        return jsonify({'message': 'Password is required'}), 400

    hashed_password = bcrypt.hashpw(
        data['password'].encode('utf-8'), bcrypt.gensalt())

    new_user = User(
        email=data['email'],
        password=hashed_password.decode('utf-8'),
        is_active=data.get('is_active', False)
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created succefully'}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        token = create_access_token(identity=user.id)
        return jsonify({'message': 'Successful login', 'token': token, 'user': user.serialize()}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
