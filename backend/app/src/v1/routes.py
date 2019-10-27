# -*- coding: utf-8 -*-

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###
from __future__ import absolute_import

from .api.logout import Logout
from .api.login import Login
from .api.notes import Notes
from .api.notes_note_id import NotesNoteId
from .api.videos import Videos


routes = [
    dict(resource=Logout, urls=['/logout'], endpoint='logout'),
    dict(resource=Login, urls=['/login'], endpoint='login'),
    dict(resource=Notes, urls=['/notes'], endpoint='notes'),
    dict(resource=NotesNoteId, urls=['/notes/<int:note_id>'], endpoint='notes_note_id'),
    dict(resource=Videos, urls=['/videos'], endpoint='videos'),
]