FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice \
    fonts-dejavu-core \
    fonts-thai-tlwg \
    fonts-noto-core \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

RUN fc-cache -f -v

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=10000
EXPOSE 10000

RUN pip install --no-cache-dir gunicorn
CMD ["sh", "-c", "gunicorn -w 2 -b 0.0.0.0:$PORT src.app:app"]