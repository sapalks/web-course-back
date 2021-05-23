# Отчет по лабораторной работе № 2  

## Тема:  
Учет пациентов медицинского учереждения 

## Создание проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:

CREATE TABLE CustomerCard(
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    TelNumber VARCHAR(255),
    isDeleted boolean DEFAULT FALSE

CREATE TABLE SickList(
     id SERIAL PRIMARY KEY,
     StartDate DATE,
     EndDate DATE,
     CustomerCardId INTEGER,
     FOREIGN KEY (CustomerCardId) REFERENCES CustomerCard (id) ON DELETE CASCADE ON UPDATE CASCADE,
     isDeleted boolean DEFAULT FALSE


## Запуск проекта  
- Сервер запускаем с помощью node npm run dev. 
- Для проверки запросов используем Postman.  

## Сервер обрабатывает следующие CRUD запросы:
  
GET /CustomerCards - возвращает все медицинские карты
GET /CustomerCard?Id={Id} - возвращает медицинскую карту по Id 
POST /CustomerCard - создает запись в таблице медицинских карт
PUT /CustomerCard - редактирует запись в таблице медицинских карт
DELETE /CustomerCard?Id={Id} - помечает запись медицинской карты удаленной 
GET /SickLists - возвращает все больничные листы 
GET /SickLists?CustomerCardId={CustomerCardId} - возвращает все имеющиеся больничные определенной мед карты 
GET /SickList?Id={Id} - возвращает больничные листы по Id 
POST /SickList - создает запись в таблице больничных листов 
PUT /SickList - редактирует запись в таблице больничных листов 
DELETE /SickList?id={Id} - помечает запись больничного листа удаленной 

Ссылка на видео: https://drive.google.com/file/d/1XWHm5bIdhZ2CdV4b6XPQ_O5EmXPToP3k/view?usp=sharing