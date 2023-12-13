from flask import make_response, jsonify, request, session
from models import db, Reps, User, Drafts, League, Member, Team
from config import app, db
from middleware import authorization_required
import bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os

CORS(app)

load_dotenv()

auth_token = os.getenv("API_TOKEN")
# NOTE: When implementing authentication, take note that your Google API token (`API_TOKEN`) 
#       is NOT the same as the secret key you need to set up your authentication capabilities.
#       Thus, you'll need TWO environment variables in your `.env` to load into memory using 
#       `load_dotenv()` and `os.getenv()`. 


#######################################################################
## ROUTES NOT PERTAINING TO AUTH/ HAVE NOT BEEN MOVED TO REQUIRE AUTH##
#######################################################################

@app.get("/api")
def home():
    return "Hello World! I hope you are ready to learn about your local electoral politics."

# function to check user id against database
def check_user_id(id:int):
    this_user = User.query.filter(id == User.id).first()
    return this_user
# function to check rep id against database
def check_rep_id(id:int):
    this_rep = Reps.query.filter(id == Reps.id).first()
    return this_rep
# function to check league id against database
def check_league_id(league_id:int):
    this_league= League.query.filter(league_id == League.id).first()
    return this_league

# function to check if the candidate has already been recruited in that league
def check_eligible(league_id:int, rep_id:int):
    existing_recruit = Team.query.filter(league_id == Team.league_id, rep_id == Team.rep_id).all()
    if existing_recruit:
        return make_response({"error":"this candidate has already been drafted in this league"})
    if not existing_recruit:
        return True
    
# function to get reps from list of rep ids
def find_rep(candidate_ids):
    my_candidates=[]
    for id in candidate_ids:
        my_candidates.append(Reps.query.filter(id== Reps.id).first())
    return my_candidates
    

# get route to see list of reps
@app.get("/api/representatives")
def get_all_reps():
    reps = Reps.query.all()
    rep_list = [rep.to_dict(rules=("-recruited", "-drafted")) for rep in reps]

    return make_response(jsonify(rep_list), 200)

# get route to get only 20 reps for testing purposes
@app.get("/api/shortrepslist")
def get_20_reps():
    reps = Reps.query.filter(Reps.id <=23).all()
    short_rep_list = [rep.to_dict(rules=("-recruited", "-drafted")) for rep in reps]

    return make_response(jsonify(short_rep_list), 200
                         )
# get route to get a rep by id
@app.get("/api/representatives/<int:id>")
def get_rep_by_id(id):
    this_rep = check_rep_id(id)

    return make_response(jsonify(this_rep.to_dict(rules=("-drafted", "-recruited"))), 200)


# get route for reps that ARE AVAILABLE to draft
@app.get("/api/representatives/available")
def get_free_reps():
    free_reps = Reps.query.filter(Reps.drafted == False).all()
    free_reps_list = [rep.to_dict(rules=('-drafted','-recruited')) for rep in free_reps]

    return make_response(jsonify(free_reps_list), 200)

# post route to search through the json file with the search criteria and return only matching candidates
@app.get("/api/candidateSearch")
def match_candidate_search():
    searched_item = request.get_json()
    state_code, name = searched_item["state_code"], searched_item["name"]
    filtered_list = Reps.query.filter(state_code==Reps.state_code, Reps.name.like(name))
    list_of_candidates = [candidate.to_dict(rules=("-drafted", '-recruited')) for candidate in filtered_list]

    return make_response(jsonify(list_of_candidates), 200)

# get route to get list of users
@app.get("/api/users")
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]

    return make_response(jsonify(user_list), 200)

# get route to get user by id
@app.get("/api/users/<int:id>")
def get_user_by_id(id:int):
    this_user = check_user_id(id)

    return make_response(jsonify(this_user.to_dict()), 200)

# post route to add user
@app.post("/api/users")
def add_user():
    def encrypt_password(password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt=salt)
        return hashed_password.decode("utf-8")

    new_user_data = request.get_json()

    print("this is working")

    new_user = User(name=new_user_data["name"],
                    username=new_user_data["username"],
                    email=new_user_data["email"],
                    password_hash=encrypt_password(new_user_data["password"]),
                    city_name=new_user_data["city_name"],
                    state_code=new_user_data["state_code"])
    print("both steps are working")
    
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify(new_user.to_dict()), 201)

# post route to add representative
@app.post("/api/representatives")
def add_representative():
    new_rep_data = request.get_json()
    new_rep = Reps(name=new_rep_data["name"],
                       office_held=new_rep_data["office_held"],
                       party=new_rep_data["party"],
                       photo_url=new_rep_data["photo_url"]
                       )
    
    db.session.add_all(new_rep)
    db.session.commit()

    return make_response(jsonify(new_rep), 201)

# get route to show the list of all leagues
@app.get("/api/leagues")
def get_all_leagues():
    leagues = League.query.all()
    league_list = [league.to_dict(rules=("-joined", "-recruited")) for league in leagues]

    return make_response(jsonify(league_list), 200)

@app.post("/api/leagues")
def add_a_league():
    new_league_data = request.get_json()
    new_league = League(name = new_league_data["name"])

    db.session.add(new_league)
    db.session.commit()

    return make_response(jsonify(new_league.to_dict(rules=("-joined", "-recruited"))),200)

# get route to show a user's drafted representatives
@app.get("/api/users/<int:id>/myreps")
def show_drafted_reps(id):
    this_user = check_user_id(id)
    if not this_user:
        return make_response({"error":"this user does not exist"}, 404)
    reps = [rep.to_dict(rules=("-drafted", '-joined')) for rep in this_user.reps]

    return make_response(jsonify(reps), 200)

# post route to associate a candidate to a user
@app.post("/api/users/<int:id>/myreps")
def draft_rep(id:int):
    this_user = check_user_id(id)
    if not this_user:
        return make_response({"error":"this id does not exist"}, 404)
    
    drafted_rep_data = request.get_json()
    rep_id = drafted_rep_data["rep_id"]
    desired_rep = Reps.query.filter(rep_id == Reps.id).first()
    if not desired_rep:
        return make_response({"error":"this representative does not exist"}, 404)
    drafted_rep = Drafts(rep_id=drafted_rep_data['rep_id'])

    db.session.add(drafted_rep)
    db.session.commit()

    return make_response(jsonify(drafted_rep.to_dict(rules=("-drafted",))), 201)

# helper function to switch between True/False values for "drafted" in Reps db
def switch_drafted_value():
    if Reps.drafted == True:
        Reps.drafted = False
    elif Reps.drafted == False:
        Reps.drafted = True
## write toggling function for any boolean  value in database

# patch request that will change the value of "drafted" in the database 
@app.patch("/api/representatives/<int:id>")
def change_drafted_status(id:int):
    drafted_rep = check_rep_id(id)
    if not drafted_rep:
        return make_response({"error":"this representative does not exist"}, 404)
    
    setattr(drafted_rep, 'drafted', switch_drafted_value(),)
    db.session.add(drafted_rep)

# delete request to remove the association between a user and a rep, when trading back to list
@app.delete("/api/users/<int:user_id>/myreps")
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

@app.post("/api/recruit")
def league_recruits_candidate(league_id:int):
    league = check_league_id(league_id)
    if not league:
        return make_response({"error":"please assign a league"})
    recruit_data = request.get_json()
    rep_id = recruit_data["id"]

    check_eligible()

    new_recruit = Team(league_id = league_id,
                       rep_id = rep_id)
    
    db.session.add(new_recruit)
    db.session.commit()

    return make_response(jsonify(new_recruit.to_dict()), 201)

    


#######################################################################
                    ## ROUTES PERTAINING TO AUTH##
#######################################################################

# get current user info
@app.get("/api/myaccount")
@authorization_required
def get_my_account(current_user):
    logged_in_user = User.query.get(current_user["id"])

    return make_response(jsonify(logged_in_user.to_dict()),200)

# post for a user to log in
@app.post("/api/login")
def user_login():
    if request.method == "POST":
        payload = request.get_json()
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

            return make_response(matching_user.to_dict(only=("id", "username", "name")), 200)
        else:
            return make_response({"error": "Invalid username or password. Try again."}, 401)
    else:
        return make_response({"error": f"Invalid request type. (Expected POST; received {request.method}.)"}, 400)
    
#patch route for a user to edit their account once created
@app.patch("/api/myaccount")
@authorization_required
def edit_account_info(current_user):
    edited_user = User.query.get(current_user["id"])
    changes = request.get_json()
    for key in changes:
        setattr(edited_user, key, changes[key])

    db.session.add(edited_user)
    db.session.commit()

    return make_response(jsonify(edited_user.to_dict()), 200)

# delete route to log the user out
@app.delete("/api/logout")
def user_logout():
    if request.method == "DELETE":
        session["user_id"] = None

        return make_response({"msg": "User successfully logged out."}, 204)
    else:
        return make_response({"error": f"Invalid request type. (Expected DELETE; received {request.method}.)"}, 400)
    

# get route for showing the candidates drafted by a logged-in user
@app.get("/api/myaccount/draftedcandidates")
@authorization_required
def get_user_candidates(current_user):
    logged_in_user = User.query.get(current_user["id"])
    candidate_ids = [candidate.rep_id for candidate in logged_in_user.drafted]
    my_candidate_list = find_rep(candidate_ids)
    candidate_list = [item.to_dict() for item in my_candidate_list]
    return make_response(jsonify(candidate_list), 200)

# post route to associate a user and a rep
@app.post("/api/myaccount/draftedcandidates")
@authorization_required
def user_draft_candidate(current_user):
    logged_in_user = User.query.get(current_user["id"])
    draft_proposal = request.get_json()
    league_id=draft_proposal["league_id"]    
    rep_id = draft_proposal["rep_id"]
    check_eligible(league_id, rep_id)

    drafted_rep=Drafts(user_id = logged_in_user.id,
                       rep_id = rep_id)
    recruitment = Team(rep_id=rep_id,
                       league_id=league_id)
    
    db.session.add(drafted_rep)
    db.session.commit()

    db.session.add(recruitment)
    db.session.commit()

    new_rep = Reps.query.filter(rep_id == Reps.id).first()

    return make_response(jsonify(new_rep.to_dict()), 201)


# post route to create a league AS A USER
@app.post("/api/myaccount/leagues")
@authorization_required
def user_create_league(current_user):
    logged_in_user = User.query.get(current_user["id"])
    new_league_data = request.get_json()

    new_league = League(name = new_league_data["name"])
    
    db.session.add(new_league)
    db.session.commit()

    new_membership = Member(user_id= logged_in_user.id,
                            league_id = new_league.id,
                            is_creator = True)
    
    db.session.add(new_membership)
    db.session.commit()

    return make_response(jsonify(new_membership.to_dict()), 201)

# # post route to join a league
@app.post("/api/myaccount/joinleague")
@authorization_required
def join_league(current_user):
    logged_in_user = User.query.get(current_user["id"])
    league_data = request.get_json()
    new_membership = Member(user_id = logged_in_user.id,
                            league_id = league_data,
                            is_creator = False)
    db.session.add(new_membership)
    db.session.commit()

    return make_response(jsonify(new_membership.to_dict()),201)

#  get route to show a user's leagues
@app.get("/api/myaccount/leagues")
@authorization_required
def get_users_leagues(current_user):
    logged_in_user = User.query.get(current_user["id"])
    leagues = [league.to_dict() for league in logged_in_user.joined]

    return make_response(jsonify(leagues), 200)

#get route to show all leagues available to user
@app.get("/api/myaccount/leaguestojoin")
@authorization_required
def get_available_leagues(current_user):
    logged_in_user = User.query.get(current_user["id"])
    available = League.query.filter(logged_in_user not in League.joined).all()
    available_list = [league.to_dict(rules=("-recruited", "-joined")) for league in available]

    return make_response(jsonify(available_list), 200)

# get route to show a user's rosters per league
@app.get("/api/myaccount/league/roster")
@authorization_required  
def get_rosters_by_league(current_user):
    logged_in_user = User.query.get(current_user["id"])
    league_info = request.get_json()
    league_id = league_info["id"]
    this_league = League.query.filter(league_id== League.id)
    candidates = [candidate.to_dict(rules=("-drafted", "-recruited")) for candidate in this_league.recruited]

    def __candidate_multifilter(candidates):
        league_roster_by_user = []
        for candidate in candidates:
            if candidate.rep_id in logged_in_user.drafted:
                league_roster_by_user.append(candidate)
        return league_roster_by_user
    
    roster_list = __candidate_multifilter(candidates)
    return make_response(jsonify(roster_list), 200)
    

# delete route to remove a candidate from a user's roster
# @app.delete('/api/myaccount/league/roster')
# @authorization_required
# def delete_drafted_candidate(current_user):
#     logged_in_user = User.query.get(current_user["id"])

#     rep_to_delete_data = request.get_json()
#     rep_id = rep_to_delete_data["rep_id"]
    
#     association_to_delete = Drafts.query.filter(logged_in_user.id == Drafts.user_id and rep_id == Drafts.rep_id)
#     if not association_to_delete:
#         return make_response({"error":"this link does not exist"}, 404)
    
#     recruitment_to_delete=Team.query.filter(rep_id==Team.rep_id , )

#     db.session.delete(association_to_delete)
#     db.session.commit()

#     db.session.delete(recruitment_to_delete)
#     db.session.commit()

#     return make_response(jsonify(association_to_delete.to_dict(), 200))





