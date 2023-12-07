from flask import make_response, jsonify, request, session
from models import db, YourReps, User, Drafts
from config import app, db
from middleware import authorization_required
import bcrypt
from sqlalchemy import _and

from dotenv import load_dotenv
import os

load_dotenv()

auth_token = os.getenv("API_TOKEN")
# NOTE: When implementing authentication, take note that your Google API token (`API_TOKEN`) 
#       is NOT the same as the secret key you need to set up your authentication capabilities.
#       Thus, you'll need TWO environment variables in your `.env` to load into memory using 
#       `load_dotenv()` and `os.getenv()`. 


# base route to make sure that things are working
@app.get("/")
def home():
    return "Hello World! I hope you are ready to learn about your local electoral politics."

# auth routes begin:

# get current user info
@app.get("/myaccount")
@authorization_required
def get_my_account(current_user):
    logged_in_user = User.query.get(current_user["id"])

    return make_response(jsonify(logged_in_user.to_dict()),200)

# post for a user to log in
@app.post("/login")
def user_login():
    if request.method == "POST":
        # Retrieve POST request as JSONified payload.
        payload = request.get_json()

        # Filter database by username to find matching user to potentially login.
        matching_user = User.query.filter(User.username.like(f"%{payload['username']}%")).first()

        # Check submitted password against hashed password in database for authentication.
        AUTHENTICATION_IS_SUCCESSFUL = bcrypt.checkpw(
            password=payload["password"].encode("utf-8"),
            hashed_password=matching_user.password_hash.encode("utf-8")
        )

        if matching_user is not None and AUTHENTICATION_IS_SUCCESSFUL:
            # Save authenticated user ID to server-persistent session storage.
            # NOTE: Sessions are to servers what cookies are to clients.
            # NOTE: Server sessions are NOT THE SAME as database sessions! (`session != db.session`)
            session["user_id"] = matching_user.id

            return make_response(matching_user.to_dict(only=("id", "username")), 200)
        else:
            return make_response({"error": "Invalid username or password. Try again."}, 401)
    else:
        return make_response({"error": f"Invalid request type. (Expected POST; received {request.method}.)"}, 400)


# function to check user id against database
def check_user_id(id:int):
    this_user = User.query.filter(id == User.id).first()
    return this_user
# function to check rep id against database
def check_rep_id(id:int):
    this_rep = YourReps.query.filter(id == YourReps.id).first()
    return this_rep

# get route to see list of reps
@app.get("/representatives")
def get_all_reps():
    reps = YourReps.query.all()
    rep_list = [rep.to_dict() for rep in reps]

    return make_response(jsonify(rep_list), 200)

# get route to get a rep by id
@app.get("/representatives/<int:id>")
def get_rep_by_id(id):
    this_rep = check_rep_id(id)

    return make_response(jsonify(this_rep.to_dict()), 200)

# get route for reps that ARE AVAILABLE to draft
@app.get("/representatives/available")
def get_free_reps():
    free_reps = YourReps.query.filter(YourReps.drafted == False).all()
    free_reps_list = [rep.to_dict() for rep in free_reps]

    return make_response(jsonify(free_reps_list), 200)

# post route to search through the json file with the search criteria and return only matching candidates
@app.post("/candidateSearch")
def match_candidate_search():
    searched_item = request.get_json()
    state_code, district_number = searched_item["state_code"], searched_item["district_number"]
    filtered_list = YourReps.query.filter(_and(state_code==YourReps.state_code, district_number==YourReps.district_number)).all()
    list_of_candidates = [candidate.to_dict() for candidate in filtered_list]

    return make_response(jsonify(list_of_candidates), 200)


# get route to get list of users
@app.get("/users")
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]

    return make_response(jsonify(user_list), 200)

# get route to get user by id
@app.get("/users/<int:id>")
def get_user_by_id(id:int):
    this_user = check_user_id(id)

    return make_response(jsonify(this_user.to_dict()), 200)

# post route to add user
@app.post("/users")
def add_user():
    def encrypt_password(password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt=salt)
        return hashed_password.decode("utf-8")


    new_user_data = request.get_json()
    new_user = User(name=new_user_data["name"],
                    username=new_user_data["username"],
                    email=new_user_data["email"],
                    password_hash=encrypt_password(new_user_data["password"]),
                    building_number=new_user_data["building_number"],
                    street_name=new_user_data["street_name"],
                    city_name=new_user_data["city_name"],
                    state_code=new_user_data["state_code"],
                    zip_code=new_user_data["zip_code"] )
    
    db.session.add_all(new_user)
    db.session.commit()

    return make_response(jsonify(new_user.to_dict()), 201)

# post route to add representative
@app.post("/representatives")
def add_representative():
    new_rep_data = request.get_json()
    new_rep = YourReps(name=new_rep_data["name"],
                       office_held=new_rep_data["office_held"],
                       party=new_rep_data["party"],
                       social_media=new_rep_data["social_media"],
                       photo_url=new_rep_data["photo_url"]
                    
                       )
    
    db.session.add_all(new_rep)
    db.session.commit()

    return make_response(jsonify(new_rep), 201)

# get route to show a user's drafted representatives
@app.get("/users/<int:id>/myreps")
def show_drafted_reps(id):
    this_user = check_user_id(id)
    if not this_user:
        return make_response({"error":"this user does not exist"}, 404)
    reps = [rep.to_dict(rules=("-drafted",)) for rep in this_user.reps]

    return make_response(jsonify(reps), 200)

@app.get("/myaccount/draftedcandidates")
@authorization_required
def get_user_candidates(current_user):
    logged_in_user = User.query.get(current_user["id"])
    candidates = [candidate.to_dict() for candidate in logged_in_user.drafts]
    return make_response(jsonify(candidates), 200)

# post route to associate a rep to a user
@app.post("/users/<int:id>/myreps")
def draft_rep(id:int):
    this_user = check_user_id(id)
    if not this_user:
        return make_response({"error":"this id does not exist"}, 404)
    
    drafted_rep_data = request.get_json()
    rep_id = drafted_rep_data["rep_id"]
    desired_rep = YourReps.query.filter(rep_id == YourReps.id).first()
    if not desired_rep:
        return make_response({"error":"this representative does not exist"}, 404)
    drafted_rep = Drafts(rep_id=drafted_rep_data['rep_id'])

    db.session.add(drafted_rep)
    db.session.commit()

    return make_response(jsonify(drafted_rep.to_dict(rules="-drafted",)), 201)

# helper function to switch between True/False values for "drafted" in YourReps db
def switch_drafted_value():
    if YourReps.drafted == True:
        YourReps.drafted = False
    elif YourReps.drafted == False:
        YourReps.drafted = True
## write toggling function for any boolean  value in database

# patch request that will change the value of "drafted" in the database 
@app.patch("/representatives/<int:id>")
def change_drafted_status(id:int):
    drafted_rep = check_rep_id(id)
    if not drafted_rep:
        return make_response({"error":"this representative does not exist"}, 404)
    
    setattr(drafted_rep, 'drafted', switch_drafted_value(),)
    db.session.add(drafted_rep)

# delete request to remove the association between a user and a rep, when trading back to list
@app.delete("/users/<int:user_id>/myreps")
def remove_rep_from_user(user_id:int):
    this_user = check_user_id(user_id)
    if not this_user:
        return make_response({"error":"this user does not exist"}, 404)
    
    rep_to_delete_data = request.get_json()
    rep_id = rep_to_delete_data["rep_id"]
    
    association_to_delete = Drafts.query.filter(user_id == Drafts.user_id and rep_id == Drafts.rep_id)
    if not association_to_delete:
        return make_response({"error":"this link does not exist"}, 404)

    db.session.delete(association_to_delete)
    db.session.commit()

    return make_response(jsonify(association_to_delete.to_dict(), 200))


   
    


    









if __name__ == "__main__":
    app.run(host="127.0.0.1",port=5555 ,debug=True)




# address = '566 45th Street, Brooklyn, NY, 11220'


# @app.get('/get_rep_info')
# def get_rep_info():

#     address = '566 45th Street, Brooklyn, NY, 11220'
#     url = f'https://www.googleapis.com/civicinfo/v2/representatives?key={auth_token}&address={address}'

#     # address = request.args.get('address') 
#     rep_info = request.get_json(url)

#     my_rep_info = YourReps(name = rep_info["name"],
#                                 party = rep_info["party"],
#                                 social_media = rep_info["social_media"],
#                                 photo = rep_info["photoUrl"])
                   
#     db.session.add(my_rep_info)
#     db.session.commit()

#     return make_response(jsonify(my_rep_info.to_dict()),200)

# @app.route("/")