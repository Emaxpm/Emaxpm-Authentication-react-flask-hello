from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    full_name = db.Column(db.String(100), unique=False, nullable=False)
    user_name = db.Column(db.String(50), unique=False, nullable=False)
    country = db.Column(db.String(50), unique=False, nullable=False)
    phone = db.Column(db.String(20), unique=False, nullable=False)
    address = db.Column(db.String(150), unique=False, nullable=False)
    # date = db.Column(db.Date, unique=False, nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "user_name": self.user_name,
            "country": self.country,
            "phone": self.phone,
            "address": self.address,
            #"date": self.date.strftime('%Y-%m-%d %H:%M:%S'),
            # do not serialize the password, its a security breach
        }