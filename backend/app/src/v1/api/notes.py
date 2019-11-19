# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from flask_jwt_extended import jwt_required, get_jwt_identity

from . import Resource
from .. import schemas

import sqlite3
import time

query_mapping = {"note_id": "id"}


class Notes(Resource):
    @jwt_required
    def get(self):
        print(g.args)
        print(g.headers)
        current_user = get_jwt_identity()
        print(f"CURRENT USER IN GET /NOTES {current_user}")
        # NOTE: cannot inject SQL :)
        query_ops = get_notes(
            ["note_id", "video_id", "user_id", "timestamp", "note", "time_created", "last_edited"], g.args
        )

        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM notes {query_ops['query_ops']};"
        c.execute(SQL, tuple(query_ops["data"]))
        entries = c.fetchall()
        conn.close()
        response = {
            "notes": [
                {
                    "note_id": entry[0],
                    "note": entry[1],
                    "user_id": entry[2],
                    "video_id": entry[3],
                    "timestamp": entry[4],
                    "time_created": entry[5],
                    "last_edited": entry[6]
                }
                for entry in entries
            ],
            "num_notes": len(entries),
        }
        if "sort" in g.args:
            descending = g.args["sort"][0] == "-"
            sort_key = g.args["sort"][1:]
            response["notes"] = sorted(
                response["notes"], key=lambda k: k[sort_key], reverse=descending
            )
        return response, 200, None

    @jwt_required
    def post(self):
        print(g.json)
        print(g.headers)
        current_user = get_jwt_identity()
        print(f"CURRENT USER: {current_user}")
        # TODO mitch
        # TODO validate video_id with youtube api
        # TODO get video title
        # TODO leave video category for now

        for param in ["note", "user_id", "video_id", "timestamp", "video_title"]:
            if param not in g.json:
                return {"errorMessage": f"param {param} not in body"}, 400

        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM videos where video_id=? and user_id=?;"
        c.execute(SQL, (g.json["video_id"],g.json["user_id"]))
        video_entries = c.fetchall()
        conn.close()
        print(video_entries)
        current_time = int(str(time.time()).replace(".", ""))
        # if video not in videos table database create new video
        if len(video_entries) == 0:
            SQL = f"INSERT INTO videos (video_id, user_id, video_title, categories, time_created, last_edited) values (?,?,?,?,?,?)"
            conn = sqlite3.connect("database.db")
            c = conn.cursor()
            # TODO get video title from youtube api and category
            c.execute(
                SQL,
                (
                    g.json["video_id"],
                    g.json["user_id"],
                    g.json["video_title"],
                    0, #No Tag
                    current_time,
                    current_time
                ),
            )
            conn.commit()
            conn.close()

        # insert the note
        SQL = f"INSERT INTO notes (note, user_id, video_id, timestamp, time_created, last_edited) values (?,?,?,?,?,?)"
        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        c.execute(
            SQL,
            (
                g.json["note"],
                g.json["user_id"],
                g.json["video_id"],
                g.json["timestamp"],
                current_time,
                current_time
            ),
        )
        conn.commit()
        # get the note id last inserted
        SQL = f"SELECT last_insert_rowid();"
        c.execute(SQL, ())
        note_id = c.fetchall()[0][0]
        conn.close()

        response = {
            "note_id": note_id,
            "note": g.json["note"],
            "user_id": g.json["user_id"],
            "video_id": g.json["video_id"],
            "timestamp": g.json["timestamp"],
            "time_created": current_time,
            "last_edited": current_time
        }

        return response, 201, None


# helper functions


def get_notes(query_params, args):
    query_ops = ""
    data = []
    for query_param in query_params:
        if query_param in args:
            if query_ops == "":
                query_ops = f"WHERE {query_mapping.get(query_param, query_param)}=?"
                data.append(args[query_param])
            else:
                query_ops += f" and {query_mapping.get(query_param, query_param)}=?"
                data.append(args[query_param])
    print(query_ops)
    print(data)
    return {"query_ops": query_ops, "data": data}
