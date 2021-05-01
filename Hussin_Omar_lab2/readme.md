# Отчет по Лабораторной работе № 2  

## Тема:  
Гостиница
## Создание и запуск проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:  
```  
CREATE TABLE rooms ( 
 roomsID int NOT NULL PRIMARY KEY, 
 name VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE rooms_seq START 1;

ALTER TABLE rooms ALTER COLUMN roomsID SET DEFAULT nextval('rooms_seq');


CREATE TABLE person ( 
 personID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL, 
 currentGroup VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 roomsID int NOT NULL, 
 FOREIGN KEY (roomsID) 
 REFERENCES rooms (roomsID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE person_seq START 1;

ALTER TABLE person ALTER COLUMN personID SET DEFAULT nextval('person_seq'); 
 ```
- Ставим модуль для создания сервера: npm install express --save.  
- Запускаем сервер: npm start. 
(Возможности программы
Реализованный сервер обрабатывает CRUD запросы:)
- •	GET /rooms - возвращает список всех комнатов
•	GET /rooms?id={id} - возвращает комнатов по id
•	POST /rooms - создает запись в таблице комнатов
•	PUT /rooms - редактирует запись в таблице комнатов
•	DELETE /rooms?id={id} - помечает запись со комнатую удаленной
•	GET /persons - возвращает список всех человеков
•	GET /persons?roomsID={id} - возвращает всех человеков по указанной комнатые
•	GET /person?id={id} - возвращает человека по id
•	POST /person - создает запись в таблице человеков
•	PUT /person - редактирует запись в таблице человеков
•	DELETE /person?id={id} - помечает запись со человеком удаленной




Ссылка на видео: https://www.youtube.com/watch?v=JIbDHA-QZ7U
