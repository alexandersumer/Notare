# -*- coding: utf-8 -*-
from __future__ import absolute_import

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import v1
import os
import sqlite3
import hashlib

notes = [
    [1, "this is the note", 1, "https://www.youtube.com/watch?v=gSdG3FsMBq4", 2.5],
    [
        2,
        "this is the second note",
        1,
        "https://www.youtube.com/watch?v=gSdG3FsMBq4",
        4.5,
    ],
    [3, "different video note", 1, "https://www.youtube.com/watch?v=AMwYoA1kvqc", 1.2],
    [
        4,
        "different video differnt user note",
        2,
        "https://www.youtube.com/watch?v=6C9hOtchZD8",
        43.2,
    ],
]

videos = [
    ["https://www.youtube.com/watch?v=gSdG3FsMBq4", 1, "racing cars", "comedy"],
    ["https://www.youtube.com/watch?v=AMwYoA1kvqc", 1, "more racing cars", "romance"],
    ["https://www.youtube.com/watch?v=6C9hOtchZD8", 2, "humpty dumpty", "physics"],
    ["https://www.youtube.com/watch?v=743hghchZD8", 2, "sat on a wall", "physics"],
    ["https://www.youtube.com/watch?v=6C9gidchZhl", 2, "and fell off", "physics"],
    ["https://www.youtube.com/watch?v=fgyhOtchZD8", 2, "robots", "ai"],
    ["https://www.youtube.com/watch?v=pflhOtchlok", 2, "riperoni", "ai"]
]

users = [[1, "mitchellshelton97@gmail.com", hashlib.sha256("password".encode()).hexdigest()], [2, "mitchell_shelton@y7mail.com", hashlib.sha256("secret".encode()).hexdigest()]]


def create_db():
    """
    create the database
    """
    # if db file does not exist use db file
    if not os.path.isfile("./database.db"):
        try:
            print("Creating DB!")
            conn = sqlite3.connect("database.db")
            cur = conn.cursor()
            sql_command = """
            CREATE TABLE notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                note VARCHAR,
                user_id INTEGER,
                video_id VARCHAR,
                timestamp DOUBLE
            );
            CREATE TABLE videos (
                id VARCHAR NOT NULL,
                user_id INTEGER,
                video_title VARCHAR,
                categories VARCHAR,
                PRIMARY KEY (id)
            );
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email VARCHAR,
                password VARCHAR
            );
            CREATE TABLE blacklisted_access_tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                access_token VARCHAR
            );
            """
            cur.executescript(sql_command)
            conn.commit()
            for note in notes:
                cur.execute(
                    "INSERT INTO notes (id, note, user_id, video_id, timestamp) values (?,?,?,?,?)",
                    note,
                )
            for video in videos:
                cur.execute(
                    "INSERT INTO videos (id, user_id, video_title, categories) values (?,?,?,?)",
                    video,
                )
            for user in users:
                cur.execute("INSERT INTO users (id, email, password) values (?,?,?)", user)

            conn.commit()
            cur.execute("""SELECT * FROM notes""")
            entries = cur.fetchall()
            print(entries)
            cur.execute("""SELECT * FROM videos""")
            entries = cur.fetchall()
            print(entries)
            cur.execute("""SELECT * FROM users""")
            entries = cur.fetchall()
            print(entries)

        except sqlite3.Error as e:
            print(e)
        finally:
            conn.close()


def create_app():
    app = Flask(__name__, static_folder="static")
    app.register_blueprint(v1.bp, url_prefix="/v1")
    cors = CORS(app)
    # Setup the Flask-JWT-Extended extension
    app.config["JWT_SECRET_KEY"] = "This key is super secret"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = (
        60 * 60 * 24
    )  # access tokens last for a day
    app.config["JWT_BLACKLIST_ENABLED"] = True
    app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access"]
    jwt = JWTManager(app)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token["jti"]
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM blacklisted_access_tokens WHERE access_token = ?;"
        c.execute(SQL, (jti,))
        entries = c.fetchall()
        conn.close()
        return False if len(entries) == 0 else True

    return app


if __name__ == "__main__":
    create_db()
    create_app().run(host="127.0.0.1", port="5000", debug=True)
