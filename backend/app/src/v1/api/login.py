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


class Login(Resource):
    def post(self):
        print(g.json)
        # TODO later make a create account route and email them if time permits

        for param in ["email", "password"]:
            if param not in g.json:
                return {"errorMessage": f"param {param} not in body"}, 400
       
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", g.json['email']): 
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
            print(f"No user with email {g.json['email']} in database. creating")
            # create the user
            conn = sqlite3.connect("database.db")
            c = conn.cursor()
            SQL = f"INSERT INTO users (email, password) values (?, ?)"
            c.execute(SQL, (g.json["email"],hashlib.sha256(g.json["password"].encode()).hexdigest(),))
            conn.commit()
            # get the user id last inserted
            SQL = f"SELECT last_insert_rowid();"
            c.execute(SQL, ())
            user_id = c.fetchall()[0][0]
            conn.close()
            print(f"Created with user id {user_id}")
        else:
            # verify email and password
            if hashlib.sha256(g.json["password"].encode()).hexdigest() != user[0][2]:
                print("Got here")
                # TODO update swagger api doc to be 401 instead
                return {"errorMessage": "Invalid Password"}, 400
            user_id = user[0][0]
            print(f"user {g.json['email']} exists with id {user_id}")

        # create access token for the user
        access_token = create_access_token(identity=g.json["email"])
        response = {"accessToken": access_token, "user_id": user_id}

        return response, 200, None
