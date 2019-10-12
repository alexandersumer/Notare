# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import sqlite3

class Notes(Resource):

    def get(self):
        # TODO implement sort
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
        return response, 200, None

    def post(self):
        print(g.json)

        return {}, 201, None