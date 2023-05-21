FROM python:3.11

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

ADD . /app/

EXPOSE 42069

CMD ["uvicorn", "app.api:app","--host","0.0.0.0","--port","42069"]