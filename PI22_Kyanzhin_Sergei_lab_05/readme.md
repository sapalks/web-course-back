# Отчет по лабораторной работе №5

## Тема - **Доска объявлений**.
Деплой на сервисе [heroku](heroku.com)

[Ссылка на сам деплой](https://adboard123.herokuapp.com/)

Были созданы таблицы для пользователей(Users) и объявлений (Ad).

В качестве базы данных использовался **Postgres**

Для работы с токенами использовался **Json web token**

Для обработки токена использовался **Passport**

Теперь ограничен доступ к запросам редактирования информации (создания, редактирования и удаления записей), если вы не авторизованы

Команды создания таблиц находятся в файле `database.sql`   
 
## Установка и настройка
- В консоли пишем `npm install` чтобы проинициализировались все модули нужные для работы
--- Для запуска приложения в режиме продакшн в терминале нужно ввести команду `npm run start`
--- Для запуска приложения в режиме разработки в терминале нужно ввести команду `npm run dev`
- Переходим по адресу указанному в консоли

## Описание запросов
### register
- `POST /register` - запрос для регистрации, например:
```json
body:
{
    "login": "sergei",
    "password": "123",
    "username": "sereja",
    "phone": "+1233211233"
}
request:
{
    "status": "ok" // or 'error'
}
``` 
### login
- `POST /login` - возвращает token при успешном входе, например: 
```json
{
    "login": "sergei",
    "password": "123"
}
request:
{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlcmdlaSIsInVzZXJJZCI6MTMsImlhdCI6MTYyMTA4MDQxNSwiZXhwIjoxNjIxNjg1MjE1fQ.c9xaknE049J7YmoFxDAsak-983A-FH45LsTfdkWCgi4"
}
``` 
