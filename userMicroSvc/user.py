from flask import Flask, request, jsonify
import json
import pyrebase as pb

from flask_cors import CORS,cross_origin
app = Flask(__name__)
CORS(app)

# app.config['CORS_HEADERS'] = 'Content-Type'


firebaseConfig = {
    "apiKey": "your api key",
    "authDomain": "your auth domain",
    "databaseURL": "your realtime database url",
    "projectId": "your project id",
    "storageBucket": "your storage bucket",
    "messagingSenderId": "your messaging sender id or smth",
    "appId":"your app id"
}

firebase = pb.initialize_app(firebaseConfig)
auth = firebase.auth() #use authentication
db = firebase.database() #user realtime db
auth.current_user = None

@app.route("/users")
def getUsers():
    try:
        users = db.child("users").get()
        userDict = {}        
                
    
        for user in users.each():
            print(type(user.key()))
            print("___________") 
            print("key:",user.key())
            print("value:",user.val())
            userDict[user.key()] = user.val()
        # return userDict
        return userDict #return all user data
    except Exception as e:
        return e

@app.route("/login",methods = ["POST"])
def login():
    try:
        data = request.data.decode("utf-8") #decode bytes 
        data = json.loads(data)
        email = data["loginEmail"] #variable from the react UI
        password = data["loginPassword"] #variable from react UI
        auth.sign_in_with_email_and_password(email,password)
    
        # print("HHHA")
        return "OK"
    except:
        # print("Invalid email and/or password!")
        return "NOT OK"


@app.route("/user/<string:registerEmail>")
def findByEmail(registerEmail):
    try:
        userDict = {}
        user = db.child("users").order_by_child("registerEmail").equal_to(registerEmail).get()
        userDict[user.key()] = user.val()
        print(user.key())
        print(userDict)
        # print(type(user))
        return userDict
    #     # pass
    except:
        return "NOT OK"


@app.route("/register",methods = ["POST"])
# @cross_origin()
def register():
    try:
        data = request.data.decode("utf-8") #decode bytes --> data received is in bytes; need to decode 
        data = json.loads(data)
        print(data)
        email = data["registerEmail"]
        password = data["registerPassword"]
        cfmpassword = data["registerConfirmPassword"]
        print(cfmpassword == password)
        if(cfmpassword == password):
            #remove password from the json data;
            #we are not saving passwords in the realtime database for security reasons
            del data['registerPassword']
            del data['registerConfirmPassword']

            #create user account in the authentication part
            auth.create_user_with_email_and_password(email,password)
            #add record into realtime database
            db.child("users").push(data)
            return "OK"
        else:
            print("GG")
            return "NOT OK"
        
    except Exception as e:
        print(e)
        return "NOT OK"


if __name__ == "__main__":
    app.run(host="0.0.0.0",port = 5000,debug = True)