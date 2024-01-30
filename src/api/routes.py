"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import  request, jsonify, Blueprint, make_response, current_app
from api.models import db, User
from flask_cors import CORS
import json
from datetime import timedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
# from datetime import datetime
from flask_bcrypt import Bcrypt



api = Blueprint('api', __name__)
bcrypt = Bcrypt()
jwt = JWTManager

CORS(api)


#app = Flask(__name__)

# Ruta de prueba para verificar la conexión

# @api.route('/test')
# def test():
#     return jsonify({"msg": "funciona"}), 200

@api.route('/sign', methods=['POST'])
def create_one_user():
    try:

        body = request.get_json()
        print(body)
        required_fields = ["fullName", "email", "password", "userName", "country", "phone", "address"]
        for field in required_fields:
            if field not in body or not body[field]:
                return jsonify({"error": f"El campo '{field}' es requerido y no puede estar vacío"}), 400
            
        raw_password = body.get('password')
        password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')

        # date = datetime.strptime(body["date"], "%Y-%m-%d")
    # except (ValueError, KeyError):
    #     return jsonify({"error": "Invalid or missing date format. Please use YYYY-MM-DD."}), 400

    
    # print(body)

    
        new_user = User(
            full_name=body.get("fullName"),
            email=body.get("email"),
            password=password_hash,
            user_name=body.get("userName"),
            country=body.get("country"),
            phone=body.get("phone"),
            address=body.get("address"),
            #date=date,
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "user created successfully"}), 200

    except Exception as e:
        current_app.logger.error(f"Error al crear usuario: {str(e)}")

        return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500

    # try:
        

    #     ok_to_share = {
    #         "full_name": body["fullName"],  # Corregido aquí
    #         "email": body["email"],
    #         "user_name": body["userName"],
    #         "country": body["country"],
    #         "phone": body["phone"],
    #         "address": body["address"],
    #         #"date": date.strftime('%Y-%m-%d'),
    #     }

        
    # except Exception as e:
    #     db.session.rollback()
    #     api.logger.error(f"Error creating user: {str(e)}")
    #     return jsonify({"error": "Failed to create user. Please try again later."}), 500
    
@api.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or 'email' not in data or 'password' not in data:
            return jsonify ({"error": "se requieren tanto el correo como la contraseña."}),
            400

        email = data.get('email')
        password = data.get('password')

        # if not email or password:
        #     return jsonify({"error": "falto algun dato"}), 400
        
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "usuario no encontrado"}), 400
        
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "contraseña incorrecta"}), 401
        
        access_token = create_access_token(identity=user.id)

        return jsonify({"access_token": access_token, "user": user.serialize()}), 200
    
    except Exception as e:
        print(f"error en la ruta /login: {str(e)}" )
        return jsonify({"error": f"ocurrio un error al procesar la solicitud: {str(e)}"}), 500
    
@api.route('private', methods=['GET'])
@jwt_required()
def private():
    user_id=get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return False ,404
    return jsonify(user.serialize()), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": f"user with id {user_id} not found"}), 404
    serialized_user = user.serialize()
    return serialized_user, 200

