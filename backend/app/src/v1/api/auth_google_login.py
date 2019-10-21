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


class AuthGoogleLogin(Resource):
    def post(self):
        print(g.json)

        for param in ["googleAccessToken", "email"]:
            if param not in g.json:
                return {"errorMessage": f"param {param} not in body"}, 400

        # verify googleAccessToken
        r = requests.post(
            f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={g.json['googleAccessToken']}"
        )
        if r.status_code != 200:
            return {"errorMessage": "invalid google access token"}, 400

        # check email if already in database
        # if not create user
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM users where email=?;"
        c.execute(SQL, (g.json["email"],))
        user = c.fetchall()
        conn.close()
        user_id = None
        if len(user) == 0:
            print(f"No user with email {g.json['email']} in database. creating")
            # create the user
            conn = sqlite3.connect("database.db")
            c = conn.cursor()
            SQL = f"INSERT INTO users (email) values (?)"
            c.execute(SQL, (g.json["email"],))
            conn.commit()
            # get the user id last inserted
            SQL = f"SELECT last_insert_rowid();"
            c.execute(SQL, ())
            user_id = c.fetchall()[0][0]
            conn.close()
            print(f"Created with user id {user_id}")
        else:
            user_id = user[0][0]
            print(f"user {g.json['email']} exists with id {user_id}")

        # create access token for the user
        access_token = create_access_token(identity=g.json["email"])
        # return jsonify(access_token=access_token), 200
        response = {"accessToken": access_token, "user_id": user_id}

        return response, 200, None
