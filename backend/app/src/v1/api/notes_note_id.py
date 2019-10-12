# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas


class NotesNoteId(Resource):

    def get(self, note_id):
        # TODO alex

        return {}, 200, None

    def put(self, note_id):
        print(g.json)
        # TODO alex

        return {}, 200, None

    def delete(self, note_id):

        return None, 200, None