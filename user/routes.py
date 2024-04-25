# Author: Shubham Sharma
# Email: sharma.shubham6522@gmail.com
# Flask Application Routes for User Authentication

from flask import Flask
from app import app
from user.models import User

# Route to handle user signup requests.
# Accepts only POST methods to ensure data privacy and integrity.
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

# Route to handle user signout requests.
@app.route('/user/signout')
def signout():
    return User().signout()

# Route to handle user login requests.
# Accepts only POST methods to protect user credentials during transmission.
@app.route('/user/login', methods=['POST'])
def login():
    return User().login()
