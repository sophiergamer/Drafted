from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv
import os


app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///drafted.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

CORS(app)

load_dotenv()

app.secret_key = "%AVD$A%$DAV%D$V$%D$W$D%ACWD%$VWAD$VAW%$DW$D$W%V$DW$ADC$W%FB%NFEMME%F$AWN%F$BWA%$BFW%A$FWA%F$WA%FVW$A%$FW%F"
# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")