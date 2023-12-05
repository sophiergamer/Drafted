from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()

state_codes = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ","NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]

class YourReps(db.Model, SerializerMixin):
    __tablename__ ='your_reps_table'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    office_held = db.Column(db.String)
    party = db.Column(db.String)
    social_media = db.Column(db.String)
    photo_url = db.Column(db.String)
    drafted = db.Column(db.Boolean, default=False)

    drafted = db.relationship("Drafts", back_populates="rep")
    users = association_proxy("drafted", 'user')


class User(db.Model, SerializerMixin):
    __tablename__ = "users_table"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable= False)
    email = db.Column(db.String, nullable=False)
    building_number = db.Column(db.String, nullable = False)
    street_name = db.Column(db.String, nullable = False)
    city_name = db.Column(db.String, nullable = False)
    state_code = db.Column(db.String, nullable = False)
    zip_code = db.Column(db.Integer, nullable = False)

    drafted = db.relationship("Drafts", back_populates = "user")
    reps = association_proxy("drafted", "rep")
    serialize_rules = ("-drafted.user",)

    @validates("state_code")
    def validate_state_code(self, key, state_code):
        if not len(state_code)==2 :
            raise ValueError("please enter a 2-letter state code")
        if state_code not in state_codes:
            raise ValueError("please enter a valid state code")
        return state_code
    
    @validates("zip_code")
    def validate_zip_code(self, key, zip_code):
        if not len(zip_code) == 5:
            raise ValueError("please enter a 5-digit zip code")
        return zip_code


class Drafts(db.Model, SerializerMixin):
    __tablename__ = "users_drafted_politicians_table"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users_table.id"))
    rep_id = db.Column(db. Integer, db.ForeignKey("your_reps_table.id"))
    

    user = db.relationship("User", back_populates="drafted")
    rep = db.relationship("YourReps", back_populates="drafted")
    serialize_rules = ("-rep.drafted", "-user.drafted")