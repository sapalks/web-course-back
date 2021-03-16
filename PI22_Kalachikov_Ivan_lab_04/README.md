# Лаботраторная 4 
# ПИбд-22 Калачиков Иван

Для запуска сервера в терминале нужно ввести команду **npm start**

* Аутентификация и авторизация были реализованы с помощью **passport.js**
* Для хэширования паролей перед сохранением в БД используется **bcrypt**

В БД была создана таблица пользователей

```sql
create table client
(
    id serial not null
        constraint user_pk
            primary key,
    login    varchar(255) not null,
    password varchar(255) not null
);

create unique index user_login_uindex
    on client (login);
```

После чего были прописаны запросы **/register** и **/login** и в классах **routes** 
была добавлена авторизация по токену