# Holy Grail

[![codecov](https://codecov.io/gh/vichannnnn/holy-grail/branch/dev/graph/badge.svg)](https://codecov.io/gh/vichannnnn/holy-grail/tree/dev)
[![Python](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/built%20with-Docker-blue)](https://www.docker.com/)
[![Deploy](https://github.com/vichannnnn/holy-grail/actions/workflows/deploy-dev.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)
[![Deploy](https://github.com/vichannnnn/holy-grail/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/vichannnnn/holy-grail/actions)

![Grail-chan](https://image.himaa.me/grail-chan-sparkling-640x480.png)

This is a GitHub monorepo for the Holy Grail webapp consisting of a few services: Celery task runner, Redis broker,
Postgres database, FastAPI backend and React Frontend.

Updated changes are automatically deployed to their respective environment (development, production).

Holy Grail is a completely free-to-access web library aimed at Singaporean students that houses all the summary
notes and practice papers for GCE 'O' Levels, GCE 'A' Levels and
International Baccalaureate.

## Overview

The backend is deployed with Docker, development is also done through Docker with hot reload properly set up for
the best development experience while keeping everything isolated.

The frontend can be run with `bun` runtime (or `yarn` and `pnpm`) and built with Vite, development experience is
also ensured with hot reload properly in place.

## Quick set-up and Local Deployment

- Run your Python on the shell and type in this, copy the result and paste into the `.env_example` for your `SECRET_KEY`
  .

```python
import secrets
secret_key = secrets.token_hex(32)
```

- Run the following command (For backend development only)

```
cd holy-grail-backend
cp .env.example .env
make build
make migrate
```

- Run the following command (For frontend development only)

```
cd holy-grail-frontend
while read -r line; do export "$line"; done < .env.example
bun install
bun run local
```

_NOTE: If you don't have WSL installed and you're using Windows environment, you could use any other JavaScript
runtime such as `yarn` or `pnpm`, just make sure you don't push the lockfile when you're done._

- To set up your virtualenv for pre-commit hooks

```
make venv
source holy-grail-backend/backend/app/.venv/bin/activate
pre-commit install
```

You should be able to see (holy-grail-py1.0) in your terminal beside your name, this means you're accessing all the
packages required for development of the app now. If your pre-commit hook is failing, please check the error and
make sure you re-add and commit the changed files.

## Usage

Go to `http://localhost:8005/docs` to access the endpoints from the Swagger UI.
Go to `http://localhost:5173/` or `http://localhost:5175/` (most likely 5175 unless you set something else) to access
the web application.

You can also run `make runserver` to access the same application connected to the same database in port 9005, this is
purely for debugging purpose with `pdb`. In this way, you have to access `http://localhost:9005/docs` while allowing
interactive CLI for your debugging purpose.

You can run `make check` to run your code through mypy, ruff and pytest as a pre-hook commit for your own projects.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure that all backend contributions are updated with appropriate tests and passed with `make tests` first.
