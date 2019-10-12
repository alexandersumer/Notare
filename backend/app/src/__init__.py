# -*- coding: utf-8 -*-
from __future__ import absolute_import

from flask import Flask
from flask_cors import CORS


import v1
import os
import sqlite3

notes = [
    [1, "this is the note", 1, "https://www.youtube.com/watch?v=045L8bBVF8A", 2.5],
    [2, "this is the second note", 1, "https://www.youtube.com/watch?v=045L8bBVF8A", 4.5],
    [3, "different video note", 1, "https://www.youtube.com/watch?v=AMwYoA1kvqc", 1.2],
    [4, "different video differnt user note", 2, "https://www.youtube.com/watch?v=6C9hOtchZD8", 43.2]
]

videos = [
    ["https://www.youtube.com/watch?v=045L8bBVF8A", 1, "racing cars", "comedy"],
    ["https://www.youtube.com/watch?v=AMwYoA1kvqc", 1, "more racing cars", "romance"],
    ["https://www.youtube.com/watch?v=6C9hOtchZD8", 2, "humpty dumpty", "physics"]
]

def create_db():
    '''
    create the database
    '''
    # if db file does not exist use db file
    if not os.path.isfile("./database.db"):
        try:
            print("Creating DB!")
            conn = sqlite3.connect("database.db")
            cur = conn.cursor()
            sql_command = """
            CREATE TABLE notes (
                id INT NOT NULL, 
                note VARCHAR,
                user_id INT,
                video_id VARCHAR,
                timestamp DOUBLE,
                PRIMARY KEY (id)
            );
            CREATE TABLE videos (
                id VARCHAR NOT NULL,
                user_id INT,
                video_title VARCHAR,
                categories VARCHAR,
                PRIMARY KEY (id)
            );
            """
            cur.executescript(sql_command)
            conn.commit()
            for note in notes:
                cur.execute('INSERT INTO notes (id, note, user_id, video_id, timestamp) values (?,?,?,?,?)', note)
            for video in videos:
                cur.execute('INSERT INTO videos (id, user_id, video_title, categories) values (?,?,?,?)', video)

            conn.commit()
            cur.execute("""SELECT * FROM notes""")
            entries = cur.fetchall()
            print(entries)
            cur.execute("""SELECT * FROM videos""")
            entries = cur.fetchall()
            print(entries)

        except sqlite3.Error as e:
            print(e)
        finally:
            conn.close()

def create_app():
    app = Flask(__name__, static_folder='static')
    app.register_blueprint(
        v1.bp,
        url_prefix='/v1')
    cors = CORS(app)
    return app

if __name__ == '__main__':
        create_db()
        create_app().run(host="0.0.0.0", port="5000", debug=True)