.ONESHELL:

SHELL := bash

backend_container := backend
backend_container_name := backend
frontend_container := frontend

local_postgres_user := postgres
local_postgres_db_name := app

DC_COMMAND := docker compose

-include ./Makefile.properties

hello:
	echo "Hello, world!"

coverage:
	$(DC_COMMAND) run -e TESTING=true --rm $(backend_container) coverage run --source=app -m pytest -x

generate_xml:
	$(DC_COMMAND) run -e TESTING=true --rm $(backend_container) coverage xml -i

runserver:
	docker exec -it $(backend_container_name) uvicorn app.main:app --port 9000 --host 0.0.0.0 --reload

migrate:
	$(DC_COMMAND) run --rm $(backend_container) alembic upgrade head

downgrade:
	$(DC_COMMAND) run --rm $(backend_container) alembic downgrade -1

migrations:
	$(DC_COMMAND) run --rm $(backend_container) alembic revision --autogenerate -m $(name)

ruff:
	ruff check --fix --select I && ruff format

mypy:
	$(DC_COMMAND) run --rm $(backend_container) mypy ./app --install-types --strict

check: ruff \
	mypy \
	tests \

tests:
	$(DC_COMMAND) run -e TESTING=true --rm $(backend_container) pytest ./app/tests -x -vv

test:
	$(DC_COMMAND) run --rm -e TESTING=true $(backend_container) pytest ./app/tests/api/$(file).py -x -vv

local-dump:
	scp $(user)@$(domain):./holy-grail/$(sql_file_name).sql .
	docker exec -i holy-grail-db psql -U $(local_postgres_user) -d $(local_postgres_db_name) < $(sql_file_name).sql

dump:
	docker exec -i holy-grail-db psql -U $(local_postgres_user) -d $(local_postgres_db_name) < $(sql_file_name).sql
