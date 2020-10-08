FROM python:3.6

LABEL maintainer="Nisarg Patel <https://nisarg73.github.io/>"

ENV PYTHONUNBUFFERED 1

RUN mkdir /backend

WORKDIR /backend

COPY requirements.txt /backend/

EXPOSE 8000

RUN pip install -r requirements.txt

COPY . /backend/
