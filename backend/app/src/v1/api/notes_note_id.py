# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

from . import Resource
from .. import schemas

from .notes import get_notes

import sqlite3
import time

query_mapping = {"note_id": "id"}

db_mapping = {
    "note_id": 0,
    "note": 1,
    "user_id": 2,
    "video_id": 3,
    "timestamp": 4,
    "time_created": 5,
    "last_edited": 6,
}


class NotesNoteId(Resource):
    @jwt_required
    def get(self, note_id):
        # print(g.headers)
        current_user = get_jwt_identity()
        # print(f"CURRENT USER: {current_user}")
        conn = sqlite3.connect("database.db")
        c = conn.cursor()

        query_ops = get_notes(["id"], {"id": note_id})

        SQL = f"SELECT * FROM notes {query_ops['query_ops']};"
        c.execute(SQL, tuple(query_ops["data"]))

        note_entry = c.fetchall()

        if len(note_entry) == 0:
            return {"errorMessage": f"Cannot find note {note_id}."}, 404, None

        conn.close()

        response = {
            "note_id": note_entry[0][0],
            "note": note_entry[0][1],
            "user_id": note_entry[0][2],
            "video_id": note_entry[0][3],
            "timestamp": note_entry[0][4],
            "time_created": note_entry[0][5],
            "last_edited": note_entry[0][6],
        }

        return response, 200, None

    @jwt_required
    def put(self, note_id):
        # print(g.json)
        # print(g.headers)
        current_user = get_jwt_identity()
        # print(f"CURRENT USER: {current_user}")
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM notes where id=?;"
        c.execute(SQL, (note_id,))
        current_note = c.fetchall()
        conn.close()

        if len(current_note) == 0:
            return {"errorMessage": f"note id {note_id} not found"}, 404

        body_keys = [
            "note_id",
            "note",
            "user_id",
            "video_id",
            "timestamp",
            "time_created",
            "last_edited",
        ]

        for body_key in body_keys:
            if body_key not in g.json:
                return {"errorMessage": f"param {body_key} not in body"}, 400
            elif (
                body_key != "note"
                and g.json[body_key] != current_note[0][db_mapping[body_key]]
            ):
                return (
                    {"errorMessage": f"You cannot change the value of {body_key}"},
                    400,
                )

        time_edited = int(str(time.time()).replace(".", ""))
        SQL = f"UPDATE notes SET note=?, last_edited=? WHERE id=?;"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (g.json["note"], time_edited, note_id))
        conn.commit()

        SQL = f"UPDATE videos SET last_edited=? WHERE video_id=? and user_id=?;"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (time_edited, g.json["video_id"], g.json["user_id"]))
        conn.commit()
        conn.close()

        response = {
            "note_id": note_id,
            "note": g.json["note"],
            "user_id": g.json["user_id"],
            "video_id": g.json["video_id"],
            "timestamp": g.json["timestamp"],
            "time_created": g.json["time_created"],
            "last_edited": time_edited,
        }

        return response, 200, None

    @jwt_required
    def delete(self, note_id):
        # print(g.headers)
        current_user = get_jwt_identity()
        # print(f"CURRENT USER: {current_user}")
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM notes where id=?;"
        c.execute(SQL, (note_id,))
        current_note = c.fetchall()
        conn.close()

        if len(current_note) == 0:
            return {"errorMessage": f"note id {note_id} not found"}, 404

        SQL = f"SELECT * FROM notes where video_id=? and user_id=?;"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (current_note[0][3], current_note[0][2]))
        users_video_notes = c.fetchall()
        conn.close()

        # if last note, delete video for user
        if len(users_video_notes) == 1:
            # delete the video
            SQL = f"DELETE FROM videos WHERE video_id=? and user_id=?;"
            conn = sqlite3.connect("database.db")
            c = conn.cursor()
            c.execute(SQL, (current_note[0][3], current_note[0][2]))
            conn.commit()
            conn.close()

        SQL = f"DELETE FROM notes WHERE id=?;"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (note_id,))
        conn.commit()
        conn.close()

        return None, 200, None
