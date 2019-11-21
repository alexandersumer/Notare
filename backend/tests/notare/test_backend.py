import pytest
import requests
from flask import json


def get_auth_data():
    body = {"email": "a@b.com", "password": "password"}
    response = requests.post("http://127.0.0.1:5000/v1/login", json=body)
    response_data = json.loads(response.text)
    return response_data


def auth_logout():
    auth_data = get_auth_data()

    requests.delete(
        "http://127.0.0.1:5000/v1/logout",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
    )


def test_delete_logout():
    auth_data = get_auth_data()

    response = requests.delete(
        "http://127.0.0.1:5000/v1/logout",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "message" in response_data


def test_post_login():
    body = {"email": "a@b.com", "password": "password"}
    response = requests.post("http://127.0.0.1:5000/v1/login", json=body)

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "user_id" in response_data
    assert "accessToken" in response_data


def test_post_create_account():
    body = {"email": "c@d.com", "password": "password"}
    response = requests.post("http://127.0.0.1:5000/v1/createAccount", json=body)

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "user_id" in response_data
    assert "accessToken" in response_data


def test_get_notes():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:5000/v1/notes",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "notes" in response_data
    assert "num_notes" in response_data
    assert len(response_data["notes"]) == response_data["num_notes"]
    for note in response_data["notes"]:
        assert "note_id" in note
        assert "note" in note
        assert "user_id" in note
        assert "timestamp" in note
        assert "time_created" in note
        assert "last_edited" in note


def test_get_notes():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:5000/v1/notes",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "notes" in response_data
    assert "num_notes" in response_data
    assert len(response_data["notes"]) == response_data["num_notes"]
    for note in response_data["notes"]:
        assert "note_id" in note
        assert "note" in note
        assert "user_id" in note
        assert "timestamp" in note
        assert "time_created" in note
        assert "last_edited" in note
