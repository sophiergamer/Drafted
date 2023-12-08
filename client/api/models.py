from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


state_codes = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ","NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]


class User(db.Model, SerializerMixin):
    __tablename__ = "users_table"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable= False)
    username = db.Column(db.String, nullable = False, unique = True)
    password_hash = db.Column(db.String, nullable = False, unique = True)
    email = db.Column(db.String, nullable=False, unique=True)
    building_number = db.Column(db.Integer, nullable = False)
    street_name = db.Column(db.String, nullable = False)
    city_name = db.Column(db.String, nullable = False)
    state_code = db.Column(db.String, nullable = False)
    zip_code = db.Column(db.String, nullable = False)

    drafted = db.relationship("Drafts", back_populates = "user")
    reps = association_proxy("drafted", "rep")

    joined = db.relationship('Member', back_populates = "user")
    leagues = association_proxy("joined", 'league')


    serialize_rules = ("-drafted.user", "-joined.user")
    

    # @validates("state_code")
    # def validate_state_code(self, key, state_code):
    #     if not len(state_code)==2 :
    #         raise ValueError("please enter a 2-letter state code")
    #     if state_code not in state_codes:
    #         raise ValueError("please enter a valid state code")
    #     return state_code
    
    # @validates("zip_code")
    # def validate_zip_code(self, key, zip_code):
    #     if not len(zip_code) == 5:
    #         raise ValueError("please enter a 5-digit zip code")
    #     return zip_code

class Reps(db.Model, SerializerMixin):
    __tablename__ ='reps_table'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    office_held = db.Column(db.String)
    state = db.Column(db.String)
    district_number = db.Column(db.Integer)
    party = db.Column(db.String)
    photo_url = db.Column(db.String)
    seat_status = db.Column(db.String)
    drafted = db.Column(db.Boolean, default=False)

    drafted = db.relationship("Drafts", back_populates="rep")
    users = association_proxy("drafted", 'user')

    recruited = db.relationship("Team", back_populates = "rep")
    leagues = association_proxy("recruited", "league")

    serialize_rules=("-drafts.rep", "-recruited.rep")

    @validates("seat_status")
    def validate_seat_status(self, key, seat_status):
        options=["INCUMBENT", "CHALLENGER", "OPEN"]
        if seat_status not in options:
            raise ValueError("this seat status is not valid")


class League(db.Model, SerializerMixin):
    __tablename__="league_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)

    joined = db.relationship("Member", back_populates="league")
    members = association_proxy("joined", 'user')

    recruited = db.relationship("Team", back_populates = "league")
    reps = association_proxy('recruited', 'rep')

    serialize_rules=("-joined.league", '-recruited.league')


class Drafts(db.Model, SerializerMixin):
    __tablename__ = "users_drafted_politicians_table"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))
    rep_id = db.Column(db. Integer, db.ForeignKey("reps_table.id"))
    

    user = db.relationship("User", back_populates="drafted")
    rep = db.relationship("Reps", back_populates="drafted")
    serialize_rules = ("-rep.drafted", "-user.drafted")


class Member(db.Model, SerializerMixin):
    __tablename__ = "league_members_table"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))   
    league_id = db.Column(db.Integer, db.ForeignKey("league_table.id")) 
    is_creator = db.Column(db.Boolean, default = False)

    user = db.relationship("User", back_populates="joined")
    league = db.relationship("League", back_populates="joined")
    serialize_rules = ("-user.joined", "-league.joined")


class Team(db.Model, SerializerMixin):
    __tablename__ = "teams_table"

    id = db.Column(db.Integer, primary_key = True)
    league_id = db.Column(db.Integer, db.ForeignKey("league_table.id"))
    rep_id = db.Column(db.Integer, db.ForeignKey("reps_table.id"))

    league = db.relationship("League", back_populates="recruited")
    rep = db.relationship("Reps", back_populates = "recruited")
    serialize_rules=("-league.recruited","-rep.recruited")