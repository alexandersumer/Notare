# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

import sqlite3

query_mapping = {
    'note_id': 'id'
}

class Notes(Resource):

    def get(self):
        print(g.args)
        # NOTE: cannot inject SQL :)
        query_ops = get_notes(
            ['note_id', 'video_id', 'user_id', 'timestamp', 'note'],
            g.args
        )

        notes = []
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        SQL = f"SELECT * FROM notes {query_ops['query_ops']};"
        c.execute(SQL, tuple(query_ops['data']))
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
        # TODO if video_id not in videos table database create new entry
        # TODO leave video category empty for now
        # TODO create new entry for note based off data provided

        

        return {}, 201, None

# helper functions

def get_notes(query_params, args):
    query_ops = ""
    data = []
    for query_param in query_params:
        if query_param in args:
            if query_ops == "":
                query_ops = f"WHERE {query_mapping.get(query_param, default = query_param)}=?"
                data.append(g.args[query_param])
            else:
                query_ops += f" and {query_mapping.get(query_param, default = query_param)}=?"
                data.append(g.args[query_param])

    return {
        'query_ops': query_ops,
        'data': data
    }