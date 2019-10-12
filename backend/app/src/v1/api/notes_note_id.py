# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas

from .notes import get_notes

import sqlite3


class NotesNoteId(Resource):

    def get(self, note_id):
        # TODO alex
        conn = sqlite3.connect('database.db')
        c = conn.cursor()

        query_ops = get_notes(['id'], {'id': note_id})

        SQL = f"SELECT * FROM notes {query_ops['query_ops']};"
        c.execute(SQL, tuple(query_ops['data']))

        note_entry = c.fetchall()

        if (len(note_entry) == 0):
            return {"errorMessage": f"Cannot find note {note_id}."}, 404, None

        conn.close()

        response = {
            'note_id': note_entry[0][0],
            'note': note_entry[0][1],
            'user_id': note_entry[0][2],
            'video_id': note_entry[0][3],
            'timestamp': note_entry[0][4]
        }

        return response, 200, None

    def put(self, note_id):
        print(g.json)
        # TODO alex
        # TODO how to update SQL = f"UPDATE timeslots SET status=?, reserved_by=? WHERE id=? and dentist_id=?;"


        return {}, 200, None

    def delete(self, note_id):

        return None, 200, None