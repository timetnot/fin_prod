# Subscription Tracker

Приложение для управления подписками с аналитикой и календарем списаний.

## 🚀 Возможности

- **Управление подписками** - добавление, редактирование, удаление
- **Календарь списаний** - визуализация дат платежей
- **Аналитика** - графики расходов по категориям
- **Мультивалютность** - поддержка RUB, USD, EUR, GBP
- **Экспорт в iCal** - интеграция с календарями
- **JWT авторизация** - безопасная аутентификация
- **Responsive дизайн** - работа на всех устройствах

## 🛠️ Технологии

### Backend
- **NestJS** - фреймворк для Node.js
- **Prisma** - ORM для PostgreSQL
- **JWT** - аутентификация
- **Docker** - контейнеризация

### Frontend
- **Next.js** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стили
- **Recharts** - графики
- **date-fns** - работа с датами

## 📦 Установка и запуск

### Требования
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (если запуск без Docker)

### Быстрый старт с Docker

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd subscription-tracker
```

2. Создайте файл `.env`:
```bash
cp .env.example .env
# Отредактируйте .env при необходимости
```

3. Запустите приложение:
```bash
docker-compose up -d
```

4. Приложение будет доступно по адресу:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Ручной запуск

#### Backend
```bash
cd backend
npm install
cp ../.env.example .env
npm run start:dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 API документация

### Аутентификация
- `POST /auth/register` - регистрация
- `POST /auth/login` - вход

### Подписки
- `GET /subscriptions` - получить все подписки
- `POST /subscriptions` - создать подписку
- `GET /subscriptions/:id` - получить подписку
- `PATCH /subscriptions/:id` - обновить подписку
- `DELETE /subscriptions/:id` - удалить подписку

### Health
- `GET /health` - проверка состояния сервера

## 🔧 Конфигурация

### Переменные окружения

```bash
# База данных
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/subscription_tracker

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Сервер
PORT=3001
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Деплой

### Docker (рекомендуется)
```bash
# Сборка и запуск
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f app

# Остановка
docker-compose down
```

### Ручной деплой
```bash
# Сборка бэкенда
cd backend
npm run build
npm run start:prod

# Сборка фронтенда
cd frontend
npm run build
npm run start
```

## 📊 Мониторинг

### Health checks
- Backend: `GET /health`
- Database: автоматическая проверка через Docker healthcheck

### Логи
```bash
# Docker логи
docker-compose logs app

# Логи в реальном времени
docker-compose logs -f app
```

## 🔄 Резервное копирование

### PostgreSQL
```bash
# Создание бэкапа
docker exec subscription_tracker_postgres pg_dump -U postgres subscription_tracker > backup.sql

# Восстановление
docker exec -i subscription_tracker_postgres psql -U postgres subscription_tracker < backup.sql
```

## 🤝 Вклад

1. Fork проекта
2. Создайте ветку (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 🆘 Поддержка

Если у вас есть вопросы или проблемы, создайте Issue в репозитории.

---

**Создано с ❤️ для управления подписками**
