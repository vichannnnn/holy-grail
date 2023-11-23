.ONESHELL:

SHELL := bash

backend_container := holy-grail-backend
backend_container_name := holy-grail-backend
frontend_container := holy-grail-frontend

local_postgres_user := postgres
local_postgres_db_name := app

ifeq ($(version),)
	DC_COMMAND := docker compose
else
	DC_COMMAND := docker compose -f docker-compose.$(version).yml
endif

-include ./Makefile.properties

hello:
	echo "Hello, world!"

coverage:
	$(DC_COMMAND) run -e TESTING=true --rm $(backend_container) coverage run --source=app -m pytest -x

generate_xml:
	$(DC_COMMAND) run -e TESTING=true --rm $(backend_container) coverage xml -i

build:
	$(DC_COMMAND) stop && $(DC_COMMAND) build --no-cache && $(DC_COMMAND) up -d

stop:
	$(DC_COMMAND) stop

run:
	$(DC_COMMAND) up -d
down:
	$(DC_COMMAND) down

runserver:
	docker exec -it $(backend_container_name) uvicorn app.main:app --port 9005 --host 0.0.0.0 --reload

buildbackend:
	$(DC_COMMAND) up -d --build $(backend_container)

buildfrontend:
	$(DC_COMMAND) up -d --build $(frontend_container)

migrate:
	$(DC_COMMAND) run --rm $(backend_container) alembic upgrade head

downgrade:
	$(DC_COMMAND) run --rm $(backend_container) alembic downgrade -1

migrations:
	$(DC_COMMAND) run --rm $(backend_container) alembic revision --autogenerate -m $(name)

ruff:
	$(DC_COMMAND) run --rm $(backend_container) ruff check .

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

venv:
	( \
	  pip install virtualenv; \
	  virtualenv holy-grail-backend/backend/app/.venv --prompt="holy-grail-py1.0"; \
      source holy-grail-backend/backend/app/.venv/bin/activate; \
      pip install -r holy-grail-backend/backend/app/requirements.txt; \
      )
