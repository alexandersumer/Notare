# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function

from flask import request, g

from . import Resource
from .. import schemas


class VideosVideoIdTag(Resource):

    def post(self, video_id):
        print(g.json)
        print(g.headers)

        return {}, 200, None