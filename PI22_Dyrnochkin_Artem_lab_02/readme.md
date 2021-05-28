# Отчет по Лабораторной работе № 2  

## Тема:  
Книжный интернет-магазин 

## Создание и запуск проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:  
```  
CREATE TABLE author ( 
 authorID int NOT NULL PRIMARY KEY, 
 name VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);

CREATE TABLE book ( 
 bookID int NOT NULL PRIMARY KEY, 
 name_book VARCHAR(100) NOT NULL,  
 genre VARCHAR(100) NOT NULL,
 page_count Integer NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 authorID int NOT NULL, 
 FOREIGN KEY (authorID) 
 REFERENCES author (authorID) ON DELETE CASCADE ON UPDATE CASCADE); 
 ```
- Для запуска сервера используем `npm run dev`.  
- В качестве платформы выступает `Postman`.  

## Возможности программы  

Реализованный сервер обрабатывает CRUD запросы:  
- `GET /authors` - возвращает список всех авторов  
- `GET /author?id={id}` - возвращает автора по id  
- `POST /author` - создает запись в таблице авторов  
- `PUT /author` - редактирует запись в таблице авторов  
- `DELETE /author?id={id}` - помечает запись автора удаленной  
- `GET /books` - возвращает список всех книг  
- `GET /books?authorID={id}` - возвращает все книги по указанному автору  
- `GET /book?id={id}` - возвращает книги по id  
- `POST /books` - создает запись в таблице книг  
- `PUT /books` - редактирует запись в таблице книг  
- `DELETE /books?id={id}` - помечает запись книги удаленной  

Ссылка на видео: https://disk.yandex.ru/i/w6grCAiBzeb6vg