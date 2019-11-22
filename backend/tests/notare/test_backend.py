import pytest
import requests
from flask import json
from hypothesis import given, strategies, settings


def test_delete_logout():
    auth_data = get_auth_data()

    response = requests.delete(
        "http://127.0.0.1:6000/v1/logout",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
    )

    assert response.status_code == 200
    auth_response = json.loads(response.text)
    assert "message" in auth_response


def test_post_login():
    payload = {"email": "a@b.com", "password": "password"}
    response = requests.post("http://127.0.0.1:6000/v1/login", json=payload)

    assert response.status_code == 200
    auth_response = json.loads(response.text)
    assert "user_id" in auth_response
    assert "accessToken" in auth_response


def test_post_create_account():
    payload = {"email": "c@d.com", "password": "password"}
    response = requests.post("http://127.0.0.1:6000/v1/createAccount", json=payload)

    assert response.status_code == 200
    auth_response = json.loads(response.text)
    assert "user_id" in auth_response
    assert "accessToken" in auth_response


def test_get_notes():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:6000/v1/notes",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "notes" in response_data
    assert "num_notes" in response_data
    assert len(response_data["notes"]) == response_data["num_notes"]
    for note_response in response_data["notes"]:
        assert "note_id" in note_response
        assert "note" in note_response
        assert "user_id" in note_response
        assert "timestamp" in note_response
        assert "time_created" in note_response
        assert "last_edited" in note_response


def test_get_notes():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:6000/v1/notes",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "notes" in response_data
    assert "num_notes" in response_data
    assert len(response_data["notes"]) == response_data["num_notes"]
    for note_response in response_data["notes"]:
        assert "note_id" in note_response
        assert "note" in note_response
        assert "user_id" in note_response
        assert "timestamp" in note_response
        assert "time_created" in note_response
        assert "last_edited" in note_response


@given(strategies.text(min_size=1), strategies.integers(min_value=1, max_value=10))
@settings(max_examples=10)
def test_post_notes(note_text, timestamp):
    auth_data = get_auth_data()

    payload = {
        "note": note_text,
        "user_id": auth_data["user_id"],
        "video_id": "gSdG3FsMBq4",
        "video_title": "How to code",
        "timestamp": timestamp,
    }

    response = requests.post(
        "http://127.0.0.1:6000/v1/notes",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        json=payload,
    )

    assert response.status_code == 201
    response_data = json.loads(response.text)
    assert "note_id" in response_data
    assert "note" in response_data
    assert "user_id" in response_data
    assert "timestamp" in response_data
    assert "time_created" in response_data
    assert "last_edited" in response_data


def test_get_notes_note_id():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:6000/v1/notes/1",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "note_id" in response_data
    assert "note" in response_data
    assert "user_id" in response_data
    assert "timestamp" in response_data
    assert "time_created" in response_data
    assert "last_edited" in response_data


def test_put_notes_note_id():
    auth_data = get_auth_data()
    new_note = "this is my new note"
    payload = {
        "note_id": 1,
        "note": new_note,
        "user_id": 1,
        "video_id": "LlW7Es7gStA",
        "timestamp": 2.5,
        "time_created": 1573010001000000,
        "last_edited": 1573010001000000,
    }

    response = requests.put(
        "http://127.0.0.1:6000/v1/notes/1",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        json=payload,
    )

    print(response.text)

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "note_id" in response_data
    assert "note" in response_data
    assert response_data["note"] == new_note
    assert "user_id" in response_data
    assert "timestamp" in response_data
    assert "time_created" in response_data
    assert "last_edited" in response_data


def test_delete_notes_note_id():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.delete(
        "http://127.0.0.1:6000/v1/notes/1",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200

    # check that the note with ID 1 has been deleted
    response = requests.get(
        "http://127.0.0.1:6000/v1/notes/1",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 404


def test_get_videos():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:6000/v1/videos",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "videos" in response_data
    assert "num_videos" in response_data
    assert len(response_data["videos"]) == response_data["num_videos"]
    for video_response in response_data["videos"]:
        assert "video_id" in video_response
        assert "user_id" in video_response
        assert "video_title" in video_response
        assert "categories" in video_response
        assert "time_created" in video_response
        assert "last_edited" in video_response
        assert "notes_ids" in video_response
        assert "notes_count" in video_response


# TODO: Fix this test
# def test_post_videos_video_id_tag():
#     auth_data = get_auth_data()
#     payload = {"user_id": 1, "tag": "new_tag"}
#     response = requests.post(
#         "http://127.0.0.1:6000/v1/videos/LlW7Es7gStA",
#         headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
#         json=payload,
#     )

#     print(response.text)

#     assert response.status_code == 200
#     response_data = json.loads(response.text)
#     assert "video_id" in response_data
#     assert "user_id" in response_data
#     assert "video_title" in response_data
#     assert "categories" in response_data
#     assert response_data["categories"] == "new_tag"
#     assert "time_created" in response_data
#     assert "last_edited" in response_data
#     assert "notes_ids" in response_data
#     assert "notes_count" in response_data


def test_get_tags():
    auth_data = get_auth_data()

    params = {"user_id": auth_data["user_id"]}
    response = requests.get(
        "http://127.0.0.1:6000/v1/tags",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "tags" in response_data
    assert "num_tags" in response_data
    assert len(response_data["tags"]) == response_data["num_tags"]
    for tag_response in response_data["tags"]:
        assert "tag" in tag_response
        assert "user_id" in tag_response

    # get 1 tag
    params = {"user_id": auth_data["user_id"], "tag": "comedy"}
    response = requests.get(
        "http://127.0.0.1:6000/v1/tags",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "tags" in response_data
    assert "num_tags" in response_data
    assert len(response_data["tags"]) == response_data["num_tags"]
    for tag_response in response_data["tags"]:
        assert "tag" in tag_response
        assert "user_id" in tag_response


def test_post_tags():
    auth_data = get_auth_data()
    new_tag = "gaming"

    payload = {"tag": new_tag, "user_id": 1}
    response = requests.post(
        "http://127.0.0.1:6000/v1/tags",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        json=payload,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "tag" in response_data
    assert "tag" in response_data["tag"]
    assert "user_id" in response_data["tag"]

    # confirm new tag exists
    params = {"user_id": auth_data["user_id"], "tag": new_tag}
    response = requests.get(
        "http://127.0.0.1:6000/v1/tags",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "tags" in response_data
    assert "num_tags" in response_data
    assert len(response_data["tags"]) == response_data["num_tags"]
    for tag_response in response_data["tags"]:
        assert "tag" in tag_response
        assert tag_response["tag"] == new_tag
        assert "user_id" in tag_response


def test_delete_tags():
    auth_data = get_auth_data()
    to_delete = "gaming"

    payload = {"tag": to_delete, "user_id": 1}
    response = requests.delete(
        "http://127.0.0.1:6000/v1/tags",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        json=payload,
    )

    assert response.status_code == 200

    # confirm tag is deleted
    params = {"user_id": auth_data["user_id"], "tag": to_delete}
    response = requests.get(
        "http://127.0.0.1:6000/v1/tags",
        headers={"Authorization": f"Bearer {auth_data['accessToken']}"},
        params=params,
    )

    assert response.status_code == 200
    response_data = json.loads(response.text)
    assert "tags" in response_data
    assert "num_tags" in response_data
    assert len(response_data["tags"]) == response_data["num_tags"]
    assert response_data["num_tags"] == 0


# helper functions


def get_auth_data():
    payload = {"email": "a@b.com", "password": "password"}
    response = requests.post("http://127.0.0.1:6000/v1/login", json=payload)
    auth_response = json.loads(response.text)
    return auth_response
