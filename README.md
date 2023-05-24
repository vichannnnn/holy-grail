=======
# FastAPI Boilerplate


[![codecov](https://codecov.io/gh/vichannnnn/fastapi-boilerplate/branch/main/graph/badge.svg)](https://codecov.io/gh/vichannnnn/fastapi-boilerplate)
[![Python](https://img.shields.io/badge/python-3.8-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/built%20with-Docker-blue)](https://www.docker.com/)
[![CI](https://github.com/vichannnnn/fastapi-boilerplate/actions/workflows/codecov.yml/badge.svg)](https://github.com/vichannnnn/fastapi-boilerplate/actions)


FastAPI Boilerplate is a backend boilerplate to help you get quickly started for projects of any scale without having to set up all the nitty-gritty details. 

The boilerplate contains the following:

- JWT Authentication with basic authentication endpoints included with session dependencies.
- Pytest to run unit tests for your endpoints and business logic.
- SQLAlchemy ORM for your CRUD operations with Pydantic validation models.
- Alembic for your ORM migrations and database version control.
- Makefile with all the necessary deployment and set-up commands built in to quickly help you set up without having to type them all in.
- Docker and Docker Compose for ease of deployment and containerization.
- Postgres for the backend database running in a container.
- Celery Task Runner running in a container for your tasks and pings.
- Mypy and Pylint for your code quality check and type checks.
- Caddy for your reverse proxy to handle routing between containers and your DNS.



## Set up and Deployment

- Run your Python on the shell and type in this, copy the result and paste into the `.env_example` for your `SECRET_KEY`.

```python
import secrets
secret_key = secrets.token_hex(32)
```

- Run the following command 

```
touch .env
# Copy the content from .env_example into .env and edit based on your own needs.

make runbackend
make migrations name="init"
make migrate
```

## Usage

Go to `http://localhost:8000/api/v1/docs` to access the endpoints from the Swagger UI 

You can also run `make runserver` to access the same application connected to the same database in port 9000, this is purely for debugging purpose.

You can run `make check` to run your code through mypy, pylint and pytest as a pre-hook commit for your own projects. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

