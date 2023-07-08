from fastapi.testclient import TestClient
from fastapi.encoders import jsonable_encoder
from fastapi import status
from app import schemas
from io import BytesIO

CREATE_URL = "/auth/create"
GET_USER_URL = "/auth/get"
LOGIN_URL = "/auth/login"
SUBJECT_URL = "/subject"
DOCUMENT_TYPE_URL = "/document_type"
CATEGORY_LEVEL_URL = "/category"
NOTE_URL = "/note"
NOTES_URL = "/notes"


def test_create_note_with_mocks(
    test_category_insert_gce_a_level: schemas.categories.CategoryCreateSchema,
    test_subject_insert_mathematics: schemas.categories.SubjectCreateSchema,
    test_doc_type_insert_notes: schemas.categories.DocumentTypeCreateSchema,
    test_note_insert: schemas.library.NoteCreateSchema,
    test_client_developer: TestClient,
    test_valid_user: schemas.auth.AccountSchema,
):
    file_content = BytesIO(b"Some file content")

    payload = jsonable_encoder(test_valid_user)
    response = test_client_developer.post(CREATE_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK

    payload = jsonable_encoder(test_category_insert_gce_a_level)
    response = test_client_developer.post(CATEGORY_LEVEL_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    res1 = response.json()
    assert res1 == {"name": test_category_insert_gce_a_level.name, "id": res1["id"]}

    payload = jsonable_encoder(test_subject_insert_mathematics)
    response = test_client_developer.post(SUBJECT_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    res2 = response.json()
    assert res2 == {"name": test_subject_insert_mathematics.name, "id": res2["id"]}

    payload = jsonable_encoder(test_doc_type_insert_notes)
    response = test_client_developer.post(DOCUMENT_TYPE_URL, json=payload)
    assert response.status_code == status.HTTP_200_OK
    res3 = response.json()
    assert res3 == {"name": test_doc_type_insert_notes.name, "id": res3["id"]}

    payload = dict(test_note_insert)
    response = test_client_developer.post(
        NOTE_URL,
        files={
            "file": (
                "test.pdf",
                file_content,
                "application/pdf",
            )
        },
        params={**payload},
    )

    assert response.status_code == 200
