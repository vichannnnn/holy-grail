FROM python:3.12-slim-bookworm

WORKDIR ./app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y build-essential libffi-dev

COPY ./app/requirements.txt ./app/requirements.txt

RUN pip install types-Pygments types-colorama types-setuptools types-ujson
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir --default-timeout=100 -r ./app/requirements.txt

COPY . .
