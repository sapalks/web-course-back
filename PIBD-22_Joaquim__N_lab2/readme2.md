# Отчет по Лабораторной работе № 2  

## Тема:  
Строительная фирма
## Создание и запуск проект  

- Создаем в Visual Studio Code проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:  
```  
CREATE TABLE company ( 
 compID int NOT NULL PRIMARY KEY, 
 name VARCHAR(40) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);
 
CREATE SEQUENCE comp_seq START 1;

ALTER TABLE company ALTER COLUMN compID SET DEFAULT nextval('company_seq');


CREATE TABLE employee ( 
 empID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(15) NOT NULL, 
 lastname VARCHAR(30) NOT NULL, 
 email VARCHAR(50) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 compID int NOT NULL, 
 FOREIGN KEY (compID) 
 REFERENCES company (compID) ON DELETE CASCADE ON UPDATE CASCADE);
 
CREATE SEQUENCE employee_seq START 1;

ALTER TABLE employee ALTER COLUMN empID SET DEFAULT nextval('employee_seq');
 ```
- Ставим модуль для создания сервера: npm install express --save.  
- Запускаем сервер: npm start. 
(Возможности программы
Реализованный сервер обрабатывает CRUD запросы:)

Таблица Компания:
- •	GET /companys - возвращает список всех компания
•	GET /companys?id={id} - возвращает компания по id
•	POST /company - создает запись в таблице компания
•	PUT /company - редактирует запись в таблице компании
•	DELETE /company?id={id} - помечает запись удаленной компания

Таблица работник:
•	GET /employees - возвращает список всех работников
•	GET /employees?compID={id} - возвращает всех работников указанная компания
•	GET /employee?id - возвращает работников по id
•	POST /employee - создает запись в таблице работников
•	PUT /employee - редактирует запись в таблице работников
•	DELETE /employee?id={id} - помечает запись удаленной работников


Ссылка на видео: https://drive.google.com/file/d/1bR1cD-Qm2e9FJEGGKLHF_OA8TZ7PaMYG/view?usp=sharing
