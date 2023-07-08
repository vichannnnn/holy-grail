.ONESHELL:

SHELL := bash

backend_container := holy-grail-backend
backend_container_name := holy-grail-backend
frontend_container := holy-grail-frontend

-include ./Makefile.properties

hello:
	echo "Hello, world!"

coverage:
	docker compose -f docker-compose.$(version).yml run -e TESTING=true --rm $(backend_container) coverage run --source=app -m pytest -x

generate_xml:
	docker compose -f docker-compose.$(version).yml run -e TESTING=true --rm $(backend_container) coverage xml

build:
	docker compose -f docker-compose.$(version).yml stop && docker compose -f docker-compose.$(version).yml build --no-cache && docker compose -f docker-compose.$(version).yml up -d

stop:
	docker compose -f docker-compose.$(version).yml stop

run:
	docker compose -f docker-compose.$(version).yml up -d
down:
	docker compose -f docker-compose.$(version).yml down

runserver:
	docker exec -it $(backend_container_name) uvicorn app.main:app --port 9005 --host 0.0.0.0 --reload

buildbackend:
	docker compose -f docker-compose.$(version).yml up -d --build $(backend_container)

buildfrontend:
	docker compose -f docker-compose.$(version).yml up -d --build $(frontend_container)

migrate:
	docker compose -f docker-compose.$(version).yml run --rm $(backend_container) alembic upgrade head

migrations:
	docker compose -f docker-compose.$(version).yml run --rm $(backend_container) alembic revision --autogenerate -m $(name)

pylint:
	docker compose -f docker-compose.$(version).yml run --rm $(backend_container) pylint ./app --disable=C0114,C0115,C0116,R0903,R0913,C0411 --extension-pkg-whitelist=pydantic --load-plugins pylint_flask_sqlalchemy

mypy:
	docker compose -f docker-compose.$(version).yml run --rm $(backend_container) mypy ./app --install-types

check: pylint \
	mypy \
	tests \

tests:
	docker compose -f docker-compose.$(version).yml run -e TESTING=true --rm $(backend_container) pytest ./app/tests -x -vv

venv:
	( \
	  pip install virtualenv; \
	  virtualenv holy-grail-backend/backend/app/.venv --prompt="holy-grail-py1.0"; \
      source holy-grail-backend/backend/app/.venv/bin/activate; \
      pip install -r holy-grail-backend/backend/app/requirements.txt; \
      )
