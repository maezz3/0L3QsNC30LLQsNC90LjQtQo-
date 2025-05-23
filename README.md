﻿# 0L3QsNC30LLQsNC90LjQtQo-
# Ship Zone Detection

Этот проект представляет собой веб-приложение, использующее Django Rest Framework (DRF) и React для обработки спутниковых снимков. Система анализирует изображения с помощью ИИ и определяет, находятся ли корабли в запретной зоне.

## Стек технологий
- **Back-end**: Django, Django Rest Framework, PyTorch 
- **Front-end**: React
- **База данных**: PostgreSQL
- **Дополнительно**: Docker
## Установка и запуск

### 1. Клонирование репозитория
```sh
git clone https://github.com/kiozet/0L3QsNC30LLQsNC90LjQtQo-/
cd 0L3QsNC30LLQsNC90LjQtQo-
```

### 2. Настройка бэкенда
#### Установка зависимостей
```sh
cd backend
poetry install 
```

#### Миграции и запуск сервера
```sh
python manage.py migrate
python manage.py runserver
```

### 3. Настройка фронтенда
```sh
cd frontend
npm install
npm start / npm run dev 
```

## Развертывание через Docker
```sh
docker-compose up --build
```

## TODO
- [ ] Улучшить точность модели
- [ ] Оптимизировать API для обработки больших объемов данных
- [ ] Связать backend c frontend
