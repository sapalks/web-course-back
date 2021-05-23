# Лаботраторная 4 
# ПИбд-21 Орлов Артем

Для запуска сервера в терминале нужно ввести команду **npm run dev**

* Аутентификация и авторизация были реализованы с помощью **passport.js**

В БД была создана таблица пользователей

```sql
CREATE TABLE client(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) not null,
    password VARCHAR(255) not null
);
```

После чего были прописаны запросы **/register** и **/login** и в классах **routes** 
была добавлена авторизация по токену

Ссылка на видео: https://drive.google.com/file/d/14jGkNkMptgBMv_wIByP0IUZZjb0AV8aO/view?usp=sharing