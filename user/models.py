from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:
    """
    Handles user operations in a Flask application including signup, login, and signout functionalities.
    Uses MongoDB for database operations.
    """

    def start_session(self, user):
        """
        Initiates a session for a logged-in user.

        Parameters:
        user (dict): The user information dictionary, must include 'password'.

        Returns:
        Tuple[Response, int]: A JSON response containing the user data and the HTTP status code 200.
        """
        del user['password']  # Remove the password before storing user in session for security.
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def signup(self):
        """
        Registers a new user with the data provided via form fields and inserts it into the database.

        Returns:
        Response: JSON response with the result of the signup operation or error message.
        """
        print(request.form)

        # Create the user object with a unique ID.
        user = {
            "_id": uuid.uuid4().hex,
            "name": request.form.get('name'),
            "email": request.form.get('email'),
            "password": request.form.get('password')
        }

        # Encrypt the password using pbkdf2_sha256 algorithm.
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        # Check if the email already exists in the database.
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error": "Email address already in use"}), 400

        # Insert the new user into the database.
        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify({"error": "Signup failed"}), 400

    def signout(self):
        """
        Clears the session and signs the user out.

        Returns:
        Redirect: Redirects to the homepage after clearing the session.
        """
        session.clear()
        return redirect('/')

    def login(self):
        """
        Authenticates a user based on email and password.

        Returns:
        Response: JSON response containing either the start session upon successful login or an error message.
        """
        user = db.users.find_one({
            "email": request.form.get('email')
        })

        # Verify user password.
        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)

        return jsonify({"error": "Invalid login credentials"}), 401
