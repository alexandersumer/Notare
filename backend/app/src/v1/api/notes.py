# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import sqlite3

class Notes(Resource):

    def get(self):
        print(g.args)
        query_ops = ""
        data = []
        # NOTE: cannot inject SQL :)
        for query_param in ['note_id', 'video_id', 'user_id', 'timestamp', 'note']:
            if query_param in g.args:
                if query_ops == "":
                    query_ops = f"WHERE {query_param}=?"
                    data.append(g.args[query_param])
                else:
                    query_ops += f" and {query_param}=?"
                    data.append(g.args[query_param])

        notes = []
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        SQL = f"SELECT * FROM notes {query_ops};"
        c.execute(SQL, tuple(data))
        entries = c.fetchall()
        conn.close()
        print(entries)
        response = {
            'notes': [
                {
                    'note_id': entry[0],
                    'note': entry[1],
                    'user_id': entry[2],
                    'video_id': entry[3],
                    'timestamp': entry[4]
                } for entry in entries
            ],
            'num_notes': len(entries)
        }
        if 'sort' in g.args:
            descending = (g.args['sort'][0] == '-')
            sort_key = g.args['sort'][1:]
            response['notes'] = sorted(response['notes'], key=lambda k: k[sort_key], reverse=descending)
        return response, 200, None

    def post(self):
        print(g.json)
        # TODO mitch
        # TODO validate video_id with youtube api
        # TODO get video title
        # TODO leave video category empty for now
        # TODO create new entry for note based off data provided

        for param in ["note", "user_id", "video_id", "timestamp"]:
            if param not in g.json:
                return {"errorMessage": f"param {param} not in body"}, 400

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        SQL = f"SELECT * FROM videos where id=?;"
        c.execute(SQL, (g.json['video_id'], ))
        entries = c.fetchall()
        conn.close()
        print(entries)
        if len(entries) == 0:
            # TODO if video_id not in videos table database create new entry
            # TODO how to update SQL = f"UPDATE timeslots SET status=?, reserved_by=? WHERE id=? and dentist_id=?;"
            # TODO how to insert 'INSERT INTO notes (id, note, user_id, video_id, timestamp) values (?,?,?,?,?)', note)
            SQL = f"INSERT INTO videos (id, user_id, video_title, categories) values (?,?,?,?)"
            conn = sqlite3.connect('database.db')
            c = conn.cursor()
            c.execute(SQL, (g.json['video_id'], g.json['user_id'], "GET VIDEO TITLE", "GET VIDEO CATEGORY",))
            conn.close()



        return {}, 201, None