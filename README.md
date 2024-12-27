# Skufspace microservices

В репозитории содержатся скрипты для инициализации и запуска микросервисов

## Репозитории

- **[Gateway](https://remote_gateway-service)**

  > внешный сервис обработки входящих graphql запросов

- **[Notifications](https://remote_notifications-service)**

  > Сервис уведомлений

- **[Surveys](https://remote_surveys-service)**

  > Mock сервиса опросов

- **[Websockets](https://<remote_websockets-service>)**

  > Сервис вебсокетов

- **[Emails](https://remote_emails-service)**

  > Сервис для верстки / генерации / отправки писем

- **[Lib](https://remote_lib)**
  > Библиотека для общих сущностей / типов / nest компонентов

## До того как запустить

Убедиться, что установлены:

- **Git** `git --version`
- Есть доступы к клонированию с удаленных репозиториев `git ls-remote <repository>`:

1. https://remote_gateway-service
2. https://remote_notifications-service
3. https://remote_surveys-service
4. https://remote_websocket-service
5. https://remote_emails-service
6. https://remote_lib

- Глобально установлен **yarn** `npm list -g | grep yarn`
- Установлен **docker** `docker --version`
- Установлен **docker compose** > v2 `docker compose version`

## Скрипты

**!! Скрипты `инициализации`, `запуска`, `остановки` запускаются из корневой папки проекта**

`bash scripts/run-microservices.sh`

- `init.sh` Скрипт для клонирования структуры проекта, создания `.env` файлов, миграций, сидов, установки зависимостей, создание docker volumes

```
└── project-folder
    ├── lib
    ├── microservices
    │   ├── emails
    │   ├── gateway
    │   ├── notifications
    │   ├── surveys
    │   └── websockets
    └── scripts
```

- `run-microservices.sh` Запускает rmq, базы данных в docker контейнерах, приложения в отдельных окнах терминала

- `run-microservices-dockerized.sh` То же самое, что и run-microservices, только приложения запускаются в `docker` контейнерах

- `stop-microservices.sh` Удаляет запущенные docker контейнеры

- `git-status.sh` Скрипт для проверки изменений внутри микросервисов. Видит изменения только на первом уровне вложенности. Т.е. чтобы просмотреть изменения внутри папки microservices нужно выполнить команду `cd microservice && bash ../scripts/git-status.sh`

## Порты

- Gateway service: **3000**
- Notifications service: **3001**
- Surveys service: **3002**
- Websockets service: **3003**
- Emails service: **3004**

---

- Notifications db: **5001**
- Surveys db: **5002**

---

- Rabbitmq: **5672**
- Rabbitmq managment panel: **15672**
- Emails temaplates service: **3200**

## Протестировать

1. Инициализируем проект `bash scripts/init.sh`
2. После успешного инициализации, запускаем проект одним из скриптов `run-microservices.sh` или `run-microservices-dockerized.sh`. В логах приложений должны быть сообщения об успешном старте: `Gateway service listening on port 3000`, `Emails service listening on port 3004`, ...
3. Открываем браузер, на `http://localhost:3000/graphql` и отправляем тестовый запрос в playground:

```
query Q {
  notifications(schoolId: 12 pagination: { skip: 0 take: 1000}) {
    id
    text
    type
    viewed
    createdAt
    updatedAt
  }

    notificationsCount(schoolId: 12) {
    countAll
    countUnread
    type
  }
}
```

С тестовым jwt токеном в заголовках

```
{
	"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWRhZjNiMTQtYzZhZi00YzZmLWFjNWItYzVmZjYyMmE5YzM0In0.ZlMHlCygjU45qSPywF-3nAgwXuRTuDiO0es5Y0UaW2I"
}
```

4. Устанавливаем ws-connection на 3003 порту: `ws://localhost:3003/connect` с заголовком авторизации

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiYWRhZjNiMTQtYzZhZi00YzZmLWFjNWItYzVmZjYyMmE5YzM0IiwiZXhwaXJlZCI6MTUxNjIzOTAyMn0.Tm-0gxKrldUCyKV9jVUQGVNIODa4kQPqIwbYsuPdMW0
```

5. Открываем `rmq` панель на `http://localhost:15672`

```
username: guest
password: guest
```

6. Отправляем тестовое сообщение в очередь `notifications`, например:

```
{
    "pattern": "notifications.notification.create",
    "data": {
     "userId": "adaf3b14-c6af-4c6f-ac5b-c5ff622a9c34",
     "schoolId": 12,
     "type": "AFFIILIATE",
     "action": "AFFIILIATE_GOLD_STATUS_REACHED",
     "text": "Hello world!",
     "meta": {
       "userEmail": "hello@example.com"
        }
    }
}
```

7. В ответ на ws клиете должно прийти сообщение:

```
{
    "data": {
        "text": "Hello world!",
        "userEmail": "hello@example.com",
    },
    "event": "AFFIILIATE_GOLD_STATUS_REACHED"
}
```

## Примечания

- Для большинства микровсервисаов требуется `node.version > 16`
- Сервис emails требует `node.version > 20` для запуска локального сервера верстки писем
- Сервис websockets требует `bun.version > 1`
- `run-microservices.sh` использует gnome терминал
- Все скрипты, кроме `git-status.sh` запускаются из корневой папки проекта `bash scripts/<script>`
- После запуска `init.sh` создается `docker-network` "skufspace-network" с driver:bridge. Без данной сети не запустятся скрипты `run-microservice` и `run-microservices-dockerized`. Для того, чтобы удалить сеть, запустите `docker network remove skufspace-network`.
