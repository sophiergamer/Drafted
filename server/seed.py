from models import db, YourLocalReps, User, Drafts
from config import app
import bcrypt
from flask import request

def encrypt_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt=salt)
    return hashed_password.decode("utf-8")

def random_image():
    random_photo_url = request.get("https://picsum.photos/200")
    return random_photo_url

def create_reps():
    pass

def create_user():
    random_user_data = request.get_json('https://randomuser.me/api/?results=10')
    random_user = {"name":random_user_data.name,
                       "email":random_user_data.email,
                       "building_number":random_user_data.location.street.number,
                       "street_name":random_user_data.location.street.name,
                       "city_name":random_user_data.location.city,
                       "state_code":random_user_data.location.state,
                       "zip_code":random_user_data.location.postcode} 
    return random_user



def create_drafts():
    pass

with app.app_context():
    reps = create_reps()
    users = create_users()
    drafts = create_drafts()



    db.session.add_all(drafts)
    db.session.add_all(reps)
    db.session.add_all(users)


    db.session.commit()