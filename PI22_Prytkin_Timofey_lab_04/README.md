## Лабораторная работа №3

Выполнил студент группы **ПИбд-22 Прыткин Тимофей**

## Задание

1. Добавить таблицу с пользователями
2. Добавить запрос для регистрации
```js
GET /register
body:
{
    "username": "login",
    "password": "pass"
}
request:
{
    "status": "ok" // or 'error', and in body field error description
}
```
3. Добавить запрос для авторизации, запрос должен возвращать токен (срок жизни токена - 1 неделя) для доступа к запросам редактирования информации
```js
GET /login
body:
{
    "username": "login",
    "password": "pass"
}
request:
{
    "status": "ok", // or 'error'
    "body": "token" // or error description
}
```
4. Ограничить доступ к запросам редактирования информации (создания, редактирования и удаления записей в бд). Возвращать 401 статус код отказе в доступе.

----------------------------------------------------------------- 

Для запуска сервера в терминале нужно ввести команду `npm run dev`.

Был реализован вариант **Таск-трекер**.



Запросы к серверу отправлялись через **Postman**.

В качестве базы данных выступает **PostgreSQL**.

[Видео-демонстрация работы](https://vk.com/away.php?to=https%3A%2F%2Fdisk.yandex.ru%2Fi%2FfL5cgBQnOqCEXA).


