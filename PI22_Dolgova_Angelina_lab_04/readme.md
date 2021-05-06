## Лабораторная работа №4 "Авторизация и регистрация (продолжение лабораторной №2)"

Выполнила студентка группы **ПИбд-22 Долгова Ангелина**

******

### В рамках лабораторной работы были выполнены следующие задачи:
1. Был добавлена таблица с пользователями ([код создания таблиц](./configurations/tables.sql));
1. Был добавлен запрос для регистрации вида:
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
2. Был добавлен запрос для авторизации вида:
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
3. Ко всем запросам, связанным с редактирование информации, был ограничен доступ для неавторизованных пользователей.

### Примечания:
* Для выполнения задания лабораторной работы использовались следующие технологии:
      * jsonwebtoken;
      * passport passport-jwt;
      * bcryptjs.


[Видео c демонстрацией работы](https://drive.google.com/file/d/1oGC2L1gEWP9wcWTmwXUn55QRpf8IGrnJ/view?usp=sharing)
