# Отчет по лабораторной работе № 2  

## Тема:  
Учет команд игрока в FPS  

## Создание проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:

CREATE TABLE team (  
 teamID int NOT NULL PRIMARY KEY,  
 name VARCHAR(100) NOT NULL,  
 isDeleted boolean NOT NULL DEFAULT FALSE);  

CREATE TABLE player ( 
 playerID int NOT NULL PRIMARY KEY, 
 login VARCHAR(100) NOT NULL, 
 mail VARCHAR(100) NOT NULL, 
 division VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 teamID int NOT NULL, 
 FOREIGN KEY (teamID) 
 REFERENCES team (teamID) ON DELETE CASCADE ON UPDATE CASCADE);  

## Запуск проекта  
- Сервер запускаем с помощью npm run dev.  
- Для проверки запросов используем Postman.  

## Сервер обрабатывает следующие CRUD запросы:
  
### GET
* /teams - список всех команд  
* /team?id={id} - команду по id
* /players - список всех игроков  
* /players?teamID={id} - всех игроков по введенной команде  
* /player?id={id} - игрока по id    
### POST
* /team - создает запись в таблице команд  
* /player - создает запись в таблице игроков  
### PUT
* /team - редактирует запись в таблице команд  
* /player - редактирует запись в таблице игроков  
### DELETE
* /team?id={id} - помечает запись с командой удаленной  
* /player?id={id} - помечает запись с игроком удаленной  

Ссылка на видео: https://youtu.be/tfQjbr3B9_A