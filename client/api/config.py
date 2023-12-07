from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///drafted.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

CORS(app)

load_dotenv()

app.secret_key = "%AVD$A%$DAV%D$V$%D$W$D%ACWD%$VWAD$VAW%$DW$D$W%V$DW$ADC$W%FB%NFEMME%F$AWN%F$BWA%$BFW%A$FWA%F$WA%FVW$A%$FW%F"
# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")


if __name__ == "__main__":
    app.run(host="127.0.0.1",port=8000 ,debug=True)