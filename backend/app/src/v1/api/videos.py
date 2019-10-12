# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas


class Videos(Resource):

    def get(self):
        print(g.args)
        # TODO alex
        return {}, 200, None