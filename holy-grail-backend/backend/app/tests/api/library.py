from fastapi.testclient import TestClient

from app import schemas

CREATE_URL = "/auth/create"
GET_USER_URL = "/auth/get"
LOGIN_URL = "/auth/login"
SUBJECT_URL = "/subject"
DOCUMENT_TYPE_URL = "/document_type"
CATEGORY_LEVEL_URL = "/category"
NOTE_URL = "/note"
GET_APPROVED_NOTES_URL = "/notes/approved"
GET_PENDING_NOTES_URL = "/notes/pending"
ADMIN_APPROVE_NOTES_URL = "/admin/approve"


# -------- INSERT TEST --------


def test_create_note_with_verified_user_and_create_two_notes_separately(
    create_doc_type_subject_education_level,
    test_note_insert: schemas.library.NoteCreateSchema,
    test_note_insert_2: schemas.library.NoteCreateSchema,
    test_client_verified_user: TestClient,
):
    files_1 = {
        "0[file]": (
            "document_name.pdf",
            test_note_insert.file.getvalue(),
            "application/pdf",
        )
    }

    data_1 = {
        "0[name]": test_note_insert.document_name,
        "0[category]": test_note_insert.category,
        "0[subject]": test_note_insert.subject,
        "0[type]": test_note_insert.type,
        "0[year]": test_note_insert.year if test_note_insert.year else "",
    }

    files_2 = {
        "0[file]": (
            "document_name2.pdf",
            test_note_insert_2.file.getvalue(),
            "application/pdf",
        )
    }

    data_2 = {
        "0[name]": test_note_insert_2.document_name,
        "0[category]": test_note_insert_2.category,
        "0[subject]": test_note_insert_2.subject,
        "0[type]": test_note_insert_2.type,
        "0[year]": 0,
    }

    response = test_client_verified_user.post(NOTE_URL, data=data_1, files=files_1)

    assert response.status_code == 200

    note_response_json = response.json()
    user_response = test_client_verified_user.get(GET_USER_URL)
    user_response_json = user_response.json()

    assert note_response_json[0]["document_name"] == test_note_insert.document_name
    assert not note_response_json[0]["approved"]
    assert (
        note_response_json[0]["category"] == note_response_json[0]["doc_category"]["id"]
    )
    assert (
        note_response_json[0]["subject"] == note_response_json[0]["doc_subject"]["id"]
    )
    assert note_response_json[0]["type"] == note_response_json[0]["doc_type"]["id"]
    assert (
        note_response_json[0]["uploaded_by"] == user_response_json["user_id"]
        and user_response_json["user_id"] == note_response_json[0]["account"]["user_id"]
    )
    assert note_response_json[0]["extension"] == ".pdf"

    response = test_client_verified_user.post(
        NOTE_URL,
        data=data_2,
        files=files_2,
    )

    note_response_json = response.json()
    user_response = test_client_verified_user.get(GET_USER_URL)
    user_response_json = user_response.json()

    assert response.status_code == 200
    assert note_response_json[0]["document_name"] == test_note_insert_2.document_name
    assert not note_response_json[0]["approved"]
    assert (
        note_response_json[0]["category"] == note_response_json[0]["doc_category"]["id"]
    )
    assert (
        note_response_json[0]["subject"] == note_response_json[0]["doc_subject"]["id"]
    )
    assert note_response_json[0]["type"] == note_response_json[0]["doc_type"]["id"]
    assert user_response_json["user_id"] == note_response_json[0]["account"]["user_id"]
    assert note_response_json[0]["extension"] == ".pdf"


def test_create_note_with_verified_user_and_create_two_notes_at_once(
    create_doc_type_subject_education_level,
    test_note_insert: schemas.library.NoteCreateSchema,
    test_note_insert_2: schemas.library.NoteCreateSchema,
    test_client_verified_user: TestClient,
):
    files_1 = {
        "0[file]": (
            "document_name.pdf",
            test_note_insert.file.getvalue(),
            "application/pdf",
        )
    }

    data_1 = {
        "0[name]": test_note_insert.document_name,
        "0[category]": test_note_insert.category,
        "0[subject]": test_note_insert.subject,
        "0[type]": test_note_insert.type,
        "0[year]": test_note_insert.year if test_note_insert.year else "",
    }

    files_2 = {
        "1[file]": (
            "document_name2.pdf",
            test_note_insert_2.file.getvalue(),
            "application/pdf",
        )
    }

    data_2 = {
        "1[name]": test_note_insert_2.document_name,
        "1[category]": test_note_insert_2.category,
        "1[subject]": test_note_insert_2.subject,
        "1[type]": test_note_insert_2.type,
        "1[year]": 0,
    }

    response = test_client_verified_user.post(
        NOTE_URL, data={**data_1, **data_2}, files={**files_1, **files_2}
    )

    assert response.status_code == 200

    note_response_json = response.json()
    user_response = test_client_verified_user.get(GET_USER_URL)
    user_response_json = user_response.json()

    assert note_response_json[0]["document_name"] == test_note_insert.document_name
    assert not note_response_json[0]["approved"]
    assert (
        note_response_json[0]["category"] == note_response_json[0]["doc_category"]["id"]
    )
    assert (
        note_response_json[0]["subject"] == note_response_json[0]["doc_subject"]["id"]
    )
    assert note_response_json[0]["type"] == note_response_json[0]["doc_type"]["id"]
    assert (
        note_response_json[0]["uploaded_by"] == user_response_json["user_id"]
        and user_response_json["user_id"] == note_response_json[0]["account"]["user_id"]
    )
    assert note_response_json[0]["extension"] == ".pdf"

    assert note_response_json[1]["document_name"] == test_note_insert_2.document_name
    assert not note_response_json[1]["approved"]
    assert (
        note_response_json[1]["category"] == note_response_json[1]["doc_category"]["id"]
    )
    assert (
        note_response_json[1]["subject"] == note_response_json[1]["doc_subject"]["id"]
    )
    assert note_response_json[1]["type"] == note_response_json[1]["doc_type"]["id"]
    assert user_response_json["user_id"] == note_response_json[1]["account"]["user_id"]
    assert (
        note_response_json[1]["uploaded_by"] == user_response_json["user_id"]
        and user_response_json["user_id"] == note_response_json[1]["account"]["user_id"]
    )
    assert note_response_json[1]["extension"] == ".pdf"


#
#
# def test_create_note_for_category_does_not_exist(
#     create_doc_type_subject_education_level,
#     test_category_does_not_exist_note_insert: schemas.library.NoteCreateSchema,
#     test_client_verified_user: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_category_does_not_exist_note_insert)
#     response = test_client_verified_user.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 404
#
#
# def test_create_note_and_get(
#     create_doc_type_subject_education_level,
#     test_note_insert: schemas.library.NoteCreateSchema,
#     test_client_verified_user: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_note_insert)
#     response = test_client_verified_user.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#
#     note_response_json = response.json()
#     user_response = test_client_verified_user.get(GET_USER_URL)
#     user_response_json = user_response.json()
#     note_id = 1
#
#     assert note_response_json["id"] == note_id
#     assert note_response_json["document_name"] == test_note_insert.document_name
#     assert not note_response_json["approved"]
#     assert note_response_json["category"] == note_response_json["doc_category"]["id"]
#     assert note_response_json["subject"] == note_response_json["doc_subject"]["id"]
#     assert note_response_json["type"] == note_response_json["doc_type"]["id"]
#     assert user_response_json["user_id"] == note_response_json["account"]["user_id"]
#
#     response = test_client_verified_user.get(NOTE_URL + f"/{note_id}")
#     assert response.status_code == 200
#     note_response_json = response.json()
#     assert note_response_json["document_name"] == test_note_insert.document_name
#     assert note_response_json["id"] == note_id
#
#
# def test_create_two_notes_and_get_all_pending_notes_verified_user(
#     create_doc_type_subject_education_level,
#     test_note_insert: schemas.library.NoteCreateSchema,
#     test_note_insert_2: schemas.library.NoteCreateSchema,
#     test_client_verified_user: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_note_insert)
#     response = test_client_verified_user.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     first_note_response = response.json()
#     assert first_note_response["id"] == 1
#     assert first_note_response["document_name"] == test_note_insert.document_name
#
#     payload = dict(test_note_insert_2)
#     response = test_client_verified_user.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     second_note_response = response.json()
#     assert second_note_response["id"] == 2
#     assert second_note_response["document_name"] == test_note_insert_2.document_name
#
#     response = test_client_verified_user.get(GET_PENDING_NOTES_URL)
#     assert response.status_code == 401
#
#
# def test_create_two_notes_and_get_all_pending_notes_admin(
#     create_doc_type_subject_education_level,
#     test_note_insert: schemas.library.NoteCreateSchema,
#     test_note_insert_2: schemas.library.NoteCreateSchema,
#     test_client_admin: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_note_insert)
#     response = test_client_admin.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     first_note_response = response.json()
#     assert first_note_response["id"] == 1
#     assert first_note_response["document_name"] == test_note_insert.document_name
#
#     payload = dict(test_note_insert_2)
#     response = test_client_admin.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     second_note_response = response.json()
#     assert second_note_response["id"] == 2
#     assert second_note_response["document_name"] == test_note_insert_2.document_name
#
#     response = test_client_admin.get(GET_PENDING_NOTES_URL)
#     assert response.status_code == 200
#     pending_notes_response = response.json()
#     assert len(pending_notes_response["items"]) == pending_notes_response["total"]
#     assert pending_notes_response["items"][0] == first_note_response
#     assert pending_notes_response["items"][1] == second_note_response
#
#     response = test_client_admin.put(
#         ADMIN_APPROVE_NOTES_URL + f"/{first_note_response['id']}"
#     )
#     assert response.status_code == 200
#     approved_note_response = response.json()
#     assert approved_note_response["approved"]
#     assert approved_note_response["id"] == first_note_response["id"]
#
#     response = test_client_admin.put(
#         ADMIN_APPROVE_NOTES_URL + f"/{second_note_response['id']}"
#     )
#     assert response.status_code == 200
#     approved_note_response = response.json()
#     assert approved_note_response["approved"]
#     assert approved_note_response["id"] == second_note_response["id"]
#
#
# def test_create_two_notes_and_get_all_pending_notes_and_approve_and_get_approved_notes_developer(
#     create_doc_type_subject_education_level,
#     test_note_insert: schemas.library.NoteCreateSchema,
#     test_note_insert_2: schemas.library.NoteCreateSchema,
#     test_client_developer: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_note_insert)
#     response = test_client_developer.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     first_note_response = response.json()
#     assert first_note_response["id"] == 1
#     assert first_note_response["document_name"] == test_note_insert.document_name
#
#     payload = dict(test_note_insert_2)
#     response = test_client_developer.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     second_note_response = response.json()
#     assert second_note_response["id"] == 2
#     assert second_note_response["document_name"] == test_note_insert_2.document_name
#
#     response = test_client_developer.get(GET_PENDING_NOTES_URL)
#     assert response.status_code == 200
#     pending_notes_response = response.json()
#     assert len(pending_notes_response["items"]) == pending_notes_response["total"]
#     assert pending_notes_response["items"][0] == first_note_response
#     assert pending_notes_response["items"][1] == second_note_response
#
#     response = test_client_developer.put(
#         ADMIN_APPROVE_NOTES_URL + f"/{first_note_response['id']}"
#     )
#     assert response.status_code == 200
#     first_approved_note_response = response.json()
#     assert first_approved_note_response["approved"]
#     assert first_approved_note_response["id"] == first_note_response["id"]
#
#     response = test_client_developer.put(
#         ADMIN_APPROVE_NOTES_URL + f"/{second_note_response['id']}"
#     )
#     assert response.status_code == 200
#     second_approved_note_response = response.json()
#     assert second_approved_note_response["approved"]
#     assert second_approved_note_response["id"] == second_note_response["id"]
#
#     response = test_client_developer.get(GET_APPROVED_NOTES_URL)
#     assert response.status_code == 200
#     approved_notes_response = response.json()
#     assert len(approved_notes_response["items"]) == approved_notes_response["total"]
#     assert approved_notes_response["items"][0] == first_approved_note_response
#     assert approved_notes_response["items"][1] == second_approved_note_response
#
#
# # -------- UPDATE TEST --------
#
#
# def test_create_two_notes_and_update_notes_by_id_developer(
#     create_doc_type_subject_education_level,
#     test_note_insert: schemas.library.NoteCreateSchema,
#     test_note_update: schemas.library.NoteUpdateSchema,
#     test_client_developer: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_note_insert)
#     response = test_client_developer.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     first_note_response = response.json()
#     assert first_note_response["id"] == 1
#     assert first_note_response["document_name"] == test_note_insert.document_name
#
#     payload = jsonable_encoder(test_note_update)
#     response = test_client_developer.put(
#         NOTE_URL + f"/{first_note_response['id']}", json=payload
#     )
#     assert response.status_code == 200
#     first_updated_note_response = response.json()
#     assert (
#         first_updated_note_response["document_name"] == test_note_update.document_name
#     )
#
#
# # -------- DELETE TEST --------
#
#
# def test_create_note_and_delete_developer(
#     create_doc_type_subject_education_level,
#     test_note_insert: schemas.library.NoteCreateSchema,
#     test_client_developer: TestClient,
# ):
#     file_content = BytesIO(b"Some file content")
#
#     payload = dict(test_note_insert)
#     response = test_client_developer.post(
#         NOTE_URL,
#         files={
#             "file": (
#                 "test.pdf",
#                 file_content,
#                 "application/pdf",
#             )
#         },
#         params={**payload},
#     )
#
#     assert response.status_code == 200
#     first_note_response = response.json()
#     assert first_note_response["id"] == 1
#     assert first_note_response["document_name"] == test_note_insert.document_name
#
#     response = test_client_developer.delete(NOTE_URL + f"/{first_note_response['id']}")
#     assert response.status_code == 200
#     first_updated_note_response = response.json()
#     assert (
#         first_updated_note_response["document_name"] == test_note_insert.document_name
#     )
