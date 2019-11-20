import pytest
import requests
from flask import json

# log into my account
def test_post_login_account():

    body = {"email": "a@b.com", "password": "password"}
    print(f"Logging in with details: {body}")
    response = requests.post("http://127.0.0.1:5000/v1/login", json=body)
    print(response.status_code)
    print(response.text)

    assert response.status_code == 200
    r = json.loads(response.text)
    assert "user_id" in r
    assert "accessToken" in r
    return r


# get notes for myself
def test_get_notes():

    # need to login to get my accessToken
    me = test_post_login_account()

    print(f"my details {me}")
    params = {"user_id": me["user_id"]}
    response = requests.get(
        "http://127.0.0.1:5000/v1/notes",
        headers={"Authorization": f"Bearer {me['accessToken']}"},
        params=params,
    )
    print(response.status_code)
    print(response.text)

    assert response.status_code == 200
    r = json.loads(response.text)
    assert "notes" in r
    assert "num_notes" in r
    assert len(r["notes"]) == r["num_notes"]
    for note in r["notes"]:
        assert "note_id" in note
        assert "note" in note
        assert "user_id" in note
        assert "timestamp" in note
        assert "time_created" in note
        assert "last_edited" in note
