from models import db, Reps, User, Drafts, Member, Team, League
from config import app
import bcrypt
from flask import request
import json

def encrypt_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt=salt)
    return hashed_password.decode("utf-8")

def random_image():
    random_photo_url = request.get("https://picsum.photos/200")
    return random_photo_url

def create_reps():
    file = "./candidateData.json"
    rep_list= []
    with open(file) as json_data:
        reps = json.load(json_data)
    for rep in reps:
        cand_rep = Reps(
            name=rep["name"],
            office_held=rep["office_held"],
            state=rep["state"],
            party=rep["party"],
            district_number=rep["district_number"],
            photo_url= "http://placekitten.com/200/300",
            seat_status=rep["seat_status"]
        )
        rep_list.append(cand_rep)
    return rep_list

def create_users():
    file = "./fakeUsers.json"
    random_user_list = []
    with open(file) as json_data:
        users = json.load(json_data)
    for user in users:
        random_user = User(name=user["name"]["first"],
                       email=user["email"],
                       username= user["login"]["username"],
                       password_hash=user["login"]["password"],
                       city_name=user["location"]["city"],
                       state_code=user["location"]["state"])
        random_user_list.append(random_user)
    return random_user_list

drafts_list = [Drafts(user_id=1, rep_id=1), Drafts(user_id=2, rep_id=2), Drafts(user_id=3, rep_id=3), 
               Drafts(user_id=1, rep_id=4), Drafts(user_id=2, rep_id=5), Drafts(user_id=3, rep_id=6), 
               Drafts(user_id=1, rep_id=7), Drafts(user_id=2, rep_id=8), Drafts(user_id=3, rep_id=9), 
               Drafts(user_id=1, rep_id=10), Drafts(user_id=2, rep_id=4), Drafts(user_id=3, rep_id=10)]

members_list=[Member(user_id=1, league_id=1), Member(user_id=1, league_id=2), Member(user_id=2, league_id=2), 
              Member(user_id=2, league_id=3), Member(user_id=3, league_id=1)]

league_list = [League(name="Sunset Park"), League(name="Flatiron"), League(name="Home Field Advantage")]

recruitment_list = [Team(league_id=1, rep_id=1), Team(league_id=1, rep_id=4), Team(league_id=1, rep_id=8), 
                    Team(league_id=1, rep_id=10), Team(league_id=2, rep_id=2), Team(league_id=2, rep_id=4), 
                    Team(league_id=2, rep_id=7),Team(league_id=3, rep_id=3), Team(league_id=3, rep_id=6), 
                    Team(league_id=3, rep_id=9),Team(league_id=3, rep_id=10), Team(league_id=2, rep_id=5)]

with app.app_context():
    reps = create_reps()
    users = create_users()
    drafts = drafts_list
    memberships = members_list
    leagues = league_list
    recruitments = recruitment_list

    db.session.add_all(drafts)
    db.session.add_all(reps)
    db.session.add_all(users)
    db.session.add_all(leagues)
    db.session.add_all(memberships)
    db.session.add_all(recruitments)

    db.session.commit()