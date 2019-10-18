# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
import json

from . import Resource
from .. import schemas

from .notes import get_notes

import sqlite3

query_mapping = {"note_id": "id"}

db_mapping = {
    "note_id": 0,
    "note": 1,
    "user_id": 2,
    "video_id": 3,
    "timestamp": 4
}

class NotesNoteId(Resource):
    def get(self, note_id):
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
        }

        return response, 200, None

    def put(self, note_id):
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM notes where id=?;"
        c.execute(SQL, (note_id,))
        current_note = c.fetchall()
        conn.close()

        if len(current_note) == 0:
            return {"errorMessage": f"note id {note_id} not found"}, 404

        query_params = ["note_id", "note", "user_id", "video_id", "timestamp"]

        for query_param in query_params:
            if query_param not in query_params:
                return {"errorMessage": f"param {query_param} not in body"}, 400
            elif query_param != "note" and g.json[query_param] != current_note[0][db_mapping[query_param]]:
                return {"errorMessage": f"You cannot change the value of {query_param}"}, 400

        SQL = f"UPDATE notes SET note=? WHERE id=?;"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (g.json["note"], note_id))
        conn.commit()

        response = {
            "note_id": note_id,
            "note": g.json["note"],
            "user_id": g.json["user_id"],
            "video_id": g.json["video_id"],
            "timestamp": g.json["timestamp"],
        }

        return response, 200, None

    def delete(self, note_id):
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM notes where id=?;"
        c.execute(SQL, (note_id,))
        current_note = c.fetchall()
        conn.close()

        if len(current_note) == 0:
            return {"errorMessage": f"note id {note_id} not found"}, 404

        SQL = f"DELETE FROM notes WHERE id=?;"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(SQL, (note_id,))
        conn.commit()
        
        return None, 200, None
