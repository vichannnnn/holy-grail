from fastapi import status
from fastapi.testclient import TestClient

PING_URL = "/hello"
BOOK_URL = "/notes"


def test_example(client: TestClient):
    response = client.get(PING_URL)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"Hello": "World!"}

# def test_add_book(client: TestClient, test_book_insert: schemas.core.BookCreateSchema):
#     payload = jsonable_encoder(test_book_insert)
#     response = client.post(BOOK_URL, json=payload)
#     assert response.status_code == status.HTTP_200_OK
#     assert response.json()["id"] == 1
#     assert response.json()["title"] == test_book_insert.title
#     assert response.json()["content"] == test_book_insert.content
#     assert response.json()["pages"] == test_book_insert.pages
#
#
# def test_get_notes(client: TestClient, test_book_insert: schemas.core.BookCreateSchema):
#     response = client.get(BOOK_URL)
#     assert response.status_code == status.HTTP_200_OK
#     assert len(response.json()) == 1
#     assert response.json()[0]["title"] == test_book_insert.title
#
#
# def test_get_one_book(
#     client: TestClient, test_book_insert: schemas.core.BookCreateSchema
# ):
#     book_id = 1
#     response = client.get(f"{BOOK_URL}/{book_id}")
#     assert response.status_code == status.HTTP_200_OK
#     assert response.json()["id"] == book_id
#     assert response.json()["title"] == test_book_insert.title
#
#
# def test_update_book(
#     client: TestClient, test_book_update: schemas.core.BookUpdateSchema
# ):
#     payload = jsonable_encoder(test_book_update)
#     book_id = 1
#     response = client.put(f"{BOOK_URL}/{book_id}", json=payload)
#     assert response.status_code == status.HTTP_200_OK
#     assert response.json()["id"] == 1
#     assert response.json()["title"] == test_book_update.title
#     assert response.json()["content"] == test_book_update.content
#     assert response.json()["pages"] == test_book_update.pages
#
#
# def test_delete_book(client: TestClient):
#     exist_book_id = 1
#     response = client.delete(f"{BOOK_URL}/{exist_book_id}")
#     assert response.status_code == status.HTTP_200_OK
#
#     does_not_exist_id = 2
#     response = client.delete(f"{BOOK_URL}/{does_not_exist_id}")
#     assert response.status_code == status.HTTP_404_NOT_FOUND
