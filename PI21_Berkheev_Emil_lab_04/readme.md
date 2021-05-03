# Отчет по Лабораторной работе № 4  

## Тема:  
Учет команд игрока в FPS

## Запуск проекта  
- Сервер запускаем с помощью npm run dev.  
- Для проверки запросов используем Postman. 

## Создание проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`
- Для работы с токенами используем `JWT`
- Для обработки токена используем `Passport`

## Сервер обрабатывает следующие CRUD запросы: 

### POST /register - регистрация
body:
{
    "username": "login",
    "password": "password"
}
request:
{
    "status": "ok" // or 'error', and in body field error description
}

### POST /login - авторизация
body:
{
    "username": "login",
    "password": "password"
}
request:
{
    "status": "ok", // or 'error'
    "body": "token" // or error description
}

Ссылка на видео: https://youtu.be/-VVnkBZhZgc
