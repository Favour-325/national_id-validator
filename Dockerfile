# Setup Frontend
FROM node:trixie-slim

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build

# Setup Python backend
FROM python:3.11-slim

WORKDIR /app

COPY codebase/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY codebase/app ./backend

COPY --from=build-stage /app/frontend/build ./backend/static

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
