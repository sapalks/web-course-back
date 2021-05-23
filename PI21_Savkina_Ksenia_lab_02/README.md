## Лабораторная работа №2
### Создание CRUD API сервера
#### Выполнила студентка группы ПИбд-21 __Савкина Ксения__
__Задание__: 
1. На основе своей темы описать и создать базу данных
   - тема: новостной блог
   - таблицы: пост и комментарий
  
__База данных__: `Postgres` 

```
CREATE TABLE POST(
PostID SERIAL PRIMARY KEY,
Name varchar(25) NOT NULL,
Text varchar(30000) NOT NULL,
CreatedAt date NULL,
Views int NULL DEFAULT 0,
isDel boolean NOT NULL DEFAULT FALSE);

CREATE TABLE COMMENT(
CommentID SERIAL PRIMARY KEY,
CreatedAt date NULL,
Content varchar(10000) NOT NULL,
PostID int NOT NULL,
isDel boolean NOT NULL DEFAULT FALSE,
CONSTRAINT Comment_PostFK
FOREIGN KEY (PostID)
REFERENCES POST (PostID)
ON DELETE CASCADE);
```

2. Реализовать CRUD API для работы с обеими таблицами

__Были реализованы следующие запросы__:
   - `POST /post` - создает запись в таблице постов
   - `GET /post` - возвращает все имебщиеся посты
   - `GET /post?id={id}` - возвращает пост по id
   - `PUT /post` - редактирует запись в таблице постов
   - `DELETE /post?id={id}` - помечает запись с постом удаленной
   - `POST /comment` - создает запись в таблице комментариев
   - `GET /comments` - возвращает все имеющиеся комментарии
   - `GET /comment?id={id}` - возвращает комментариий по id
   - `PUT /comment` - редактирует запись в таблице комментариев
   - `DELETE /comment?id={id}` - помечает запись с комментарием удаленной
  
3. Запросы, описанные в формате Curl

```
curl -X POST http://localhost:3000/post
curl http://localhost:3000/posts
curl http://localhost:3000/post/:id
curl -X PUT http://localhost:3000/post
curl -X DELETE http://localhost:3000/post/:id

curl -X POST http://localhost:3000/comment
curl -X PUT http://localhost:3000/comments
curl http://localhost:3000/comment
curl http://localhost:3000/comment?id={id}
curl -X DELETE http://localhost:3000/comment/:id
```

__Язык программировния__: `Javascript` 

__Среда разработки__: `Visual Studio Code` 

[Ссылка на видео](https://youtu.be/ysGzqyg0mfU "Демонстрация лабораторной")
