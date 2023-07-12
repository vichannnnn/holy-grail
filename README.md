=======

# Holy Grail

[![codecov](https://codecov.io/gh/vichannnnn/holy-grail/branch/dev/graph/badge.svg)](https://codecov.io/gh/vichannnnn/holy-grail/tree/dev)
[![Python](https://img.shields.io/badge/python-3.10-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/built%20with-Docker-blue)](https://www.docker.com/)
[![test](https://github.com/vichannnnn/holy-grail/actions/workflows/test.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)
[![build](https://github.com/vichannnnn/holy-grail/actions/workflows/build.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)
[![deployment](https://github.com/vichannnnn/holy-grail/actions/workflows/deploy.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)
[![uptime](https://img.shields.io/uptimerobot/ratio/m794760445-dff1c0837b5b490bd3695fc5)](https://grail.moe)

This is a monorepo for the Holy Grail webapp consisting of a few services: Celery task runner, Redis broker, Postgres
database, FastAPI backend and React Frontend.

## Set up and Deployment

- Run your Python on the shell and type in this, copy the result and paste into the `.env_example` for your `SECRET_KEY`
  .

```python
import secrets
secret_key = secrets.token_hex(32)
```

- Run the following command (For backend and frontend development)

```
cp .env.example .env
make build version="dev"
make migrate version="dev"
```

- Run the following command (For frontend development only)

```
cp .env.example .env
cd holy-grail-frontend
yarn --frozen-lockfile
yarn dev
```

- To set up your virtualenv for pre-commit hooks

```
make venv
source holy-grail-backend/backend/app/.venv/bin/activate
pre-commit install
```

You should be able to see (holy-grail-py1.0) in your terminal beside your name, this means you're accessing all the
packages required for development of the app now. If your pre-commit hook is failing, please check the error and
make sure you re-add and commit the changed files.


NOTE: You can also run the `make build` instructions and `yarn dev` instructions, but your frontend will be
in http://localhost:5174, it will still connect to the backend API correctly.

## Usage

Go to `http://localhost:8005/docs` to access the endpoints from the Swagger UI. (We don't use /api/v1/ in local anymore.)

Go to `http://localhost:5173/` or `http://localhost:5175/` to access the web application.

You can also run `make runserver` to access the same application connected to the same database in port 9005, this is
purely for debugging purpose with `pdb`. In this way, you have to access `http://localhost:9005/docs`.

You can run `make check` to run your code through mypy, pylint and pytest as a pre-hook commit for your own projects.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure that all backend contributions are updated with appropriate tests and passed
with `make tests version="dev"` first.
