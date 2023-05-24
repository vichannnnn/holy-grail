FROM python:3.10.0-alpine

WORKDIR ./app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .

EXPOSE 8000

RUN apk add --no-cache build-base
RUN pip install types-Pygments types-colorama types-setuptools types-ujson
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir --default-timeout=100 -r ./app/requirements.txt
