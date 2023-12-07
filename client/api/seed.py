from client.api.models import db, YourReps, User, Drafts
from client.api.config import app
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

def create_users():
    random_user_data = request.get_json('https://randomuser.me/api/?results=10')
    random_user_list = []
    for user in random_user_data:
        random_user = User(name=user.name.first,
                       email=user.email,
                       username= user.login.username,
                       password_hash=user.login.password,
                       building_number=user.location.street.number,
                       street_name=user.location.street.name,
                       city_name=user.location.city,
                       state_code=user.location.state,
                       zip_code=user.location.postcode)
        random_user_list.append(random_user)
    return random_user_list



drafts_list = [Drafts(user_id=1, rep_id=1), Drafts(user_id=2, rep_id=2), Drafts(user_id=3, rep_id=3), Drafts(user_id=4, rep_id=4), Drafts(user_id=5, rep_id=5), Drafts(user_id=6, rep_id=6), Drafts(user_id=7, rep_id=7), Drafts(user_id=8, rep_id=8), Drafts(user_id=9, rep_id=9), Drafts(user_id=10, rep_id=10)]


with app.app_context():
    reps = create_reps()
    users = create_users()
    drafts = drafts_list



    db.session.add_all(drafts)
    db.session.add_all(reps)
    db.session.add_all(users)


    db.session.commit()