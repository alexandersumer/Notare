# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from flask_jwt_extended import get_raw_jwt, jwt_required, get_jwt_identity

from . import Resource
from .. import schemas

import sqlite3


class AuthGoogleLogout(Resource):
    #@jwt_required
    def delete(self):
        print(g.headers)
        #current_user = get_jwt_identity()
        #print(f"CURRENT USER: {current_user}")
        # jti = get_raw_jwt()["jti"]
        SQL = f"INSERT INTO blacklisted_access_tokens (access_token) values (?)"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (jti,))
        conn.commit()
        conn.close()
        return {"message": "Successfully logged out"}, 200, None
