# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)

import sqlite3
import requests
import re
import hashlib


class Createaccount(Resource):
    def post(self):
        # print(g.json)

        for param in ["email", "password"]:
            if param not in g.json:
                return {"errorMessage": f"param {param} not in body"}, 400

        if not re.match(
            r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", g.json["email"]
        ):
            return {"errorMessage": "Invalid Email"}, 400

        # check email if already in database
        # if not create user with that password
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM users where email=?;"
        c.execute(SQL, (g.json["email"],))
        user = c.fetchall()
        conn.close()
        user_id = None
        if len(user) == 0:
            # print(f"No user with email {g.json['email']} in database. creating")
            # create the user
            conn = sqlite3.connect("database.db")
            c = conn.cursor()
            SQL = f"INSERT INTO users (email, password) values (?, ?)"
            c.execute(
                SQL,
                (
                    g.json["email"],
                    hashlib.sha256(g.json["password"].encode()).hexdigest(),
                ),
            )
            conn.commit()
            # get the user id last inserted
            SQL = f"SELECT last_insert_rowid();"
            c.execute(SQL, ())
            user_id = c.fetchall()[0][0]
            conn.close()
            # print(f"Created with user id {user_id}")
        else:
            # user already exists
            return {"errorMessage": "Invalid Email or Password"}, 400

        # create access token for the user
        access_token = create_access_token(identity=g.json["email"])
        response = {"accessToken": access_token, "user_id": user_id}

        return response, 200, None
