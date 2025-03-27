# Используем официальный образ Python
FROM python:3.10

# Устанавливаем переменные среды
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Создаем и переходим в рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY pyproject.toml poetry.lock README.md /app/
RUN pip install poetry && \
    pip install poetry gunicorn && \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi || true && \
    pip install -U pip setuptools wheel

# Копируем остальные файлы проекта
COPY . /app/

# Собираем статику (если нужно)
RUN python manage.py collectstatic --noinput

# Открываем порт, который будет использоваться приложением
EXPOSE 8000

# Команда для запуска сервера
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "photo_api.wsgi"]