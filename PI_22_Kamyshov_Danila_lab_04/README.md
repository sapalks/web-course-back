# Лабораторная работа № 4
## ПИбд-22 Камышов Данила
### Запуск сервера
Чтобы запустить сервер необходимо:

* Прописать в терминале команду `npm install` (установка необходимых модулей)
* Прописать в терминале команду `npm run start`

### Выполнение:
В рамках лабораторной работы была добавлена таблица с пользователями и реализованы следующие запросы:
* `POST /register` - регистрация юзера;
```js
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
* `POST /login` - авторизация юзера;
```js
body:  
{  
 "username": "login", 
 "password": "pass"
}  
request:  
{  
 "status": "ok", // or 'error' "body": "token" // or error description
}
```
*Не авторизованные пользователи не могут вносить изменения в записанные данные базы данных.*
### Видео:
[Видео можно найти по этой ссылке](https://drive.google.com/file/d/1B1namTfc3pS44lXJSfE5pwYCs14jBKOl/view?usp=sharing)