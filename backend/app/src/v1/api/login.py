# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)

from . import Resource
from .. import schemas

import sqlite3
import requests
import re
import hashlib
from validate_email import validate_email


class Login(Resource):
    def post(self):

        for param in ["email", "password"]:
            if param not in g.json:
                return {"errorMessage": f"param {param} not in body"}, 400

        if not validate_email(g.json["email"]):
            return {"errorMessage": "Invalid Email"}, 400

        # check email if already in database
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM users where email=?;"
        c.execute(SQL, (g.json["email"],))
        user = c.fetchall()
        conn.close()
        user_id = None
        if len(user) == 0:
            return {"errorMessage": "Invalid Email or Password"}, 400
        else:
            # verify email and password
            if hashlib.sha256(g.json["password"].encode()).hexdigest() != user[0][2]:
                return {"errorMessage": "Invalid Email or Password"}, 400
            user_id = user[0][0]

        # create access token for the user
        access_token = create_access_token(identity=g.json["email"])
        response = {"accessToken": access_token, "user_id": user_id}

        return response, 200, None
