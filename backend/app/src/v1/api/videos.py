# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g
from flask_jwt_extended import jwt_required, get_jwt_identity

from . import Resource
from .. import schemas

from .notes import get_notes

import sqlite3


class Videos(Resource):
    @jwt_required
    def get(self):
        current_user = get_jwt_identity()
        data = []
        query_ops = ""
        for query_param in [
            "video_id",
            "user_id",
            "video_title",
            "categories",
            "time_created",
            "last_edited",
        ]:
            if query_param in g.args:
                if query_ops == "":
                    query_ops = f"WHERE {query_param}=?"
                    data.append(g.args[query_param])
                else:
                    query_ops += f" and {query_param}=?"
                    data.append(g.args[query_param])

        conn = sqlite3.connect("database.db")
        c = conn.cursor()
        SQL = f"SELECT * FROM videos {query_ops};"
        c.execute(SQL, tuple(data))
        videos_entries = c.fetchall()
        conn.close()

        videos = []
        for video in videos_entries:
            conn = sqlite3.connect("database.db")
            c = conn.cursor()
            query_ops = get_notes(["user_id", "video_id"], g.args)
            SQL = f"SELECT * FROM notes {query_ops['query_ops']};"
            c.execute(SQL, tuple(query_ops["data"]))
            notes_entries = c.fetchall()
            SQL = f"SELECT * FROM tags where id=?;"
            c.execute(SQL, (video[4],))
            tags_entries = c.fetchall()
            tag = tags_entries[0][2] if len(tags_entries) == 1 else "No Tag"
            conn.close()
            videos.append(
                {
                    "video_id": video[1],
                    "user_id": video[2],
                    "video_title": video[3],
                    "categories": tag,
                    "time_created": int(video[5]),
                    "last_edited": int(video[6]),
                    "notes_ids": [note_id[0] for note_id in notes_entries],
                    "notes_count": len(notes_entries),
                }
            )

        response = {"videos": videos, "num_videos": len(videos)}

        if "sort" in g.args:
            descending = g.args["sort"][0] == "-"
            sort_key = g.args["sort"][1:]
            response["videos"] = sorted(
                response["videos"], key=lambda k: k[sort_key], reverse=descending
            )

        return response, 200, None
