# -*- coding: utf-8 -*-

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###
from __future__ import absolute_import

from .api.auth_google_logout import AuthGoogleLogout
from .api.auth_google_login import AuthGoogleLogin
from .api.notes import Notes
from .api.notes_note_id import NotesNoteId
from .api.videos import Videos


routes = [
    dict(resource=AuthGoogleLogout, urls=['/auth/google/logout'], endpoint='auth_google_logout'),
    dict(resource=AuthGoogleLogin, urls=['/auth/google/login'], endpoint='auth_google_login'),
    dict(resource=Notes, urls=['/notes'], endpoint='notes'),
    dict(resource=NotesNoteId, urls=['/notes/<int:note_id>'], endpoint='notes_note_id'),
    dict(resource=Videos, urls=['/videos'], endpoint='videos'),
]