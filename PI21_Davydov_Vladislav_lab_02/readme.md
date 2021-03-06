# Отчет по Лабораторной работе № 2 

## Реализация проекта  
 
- Тема: `Учет предметов преподавателей школы` 
- Скачал и установил необходимый модуля для подключения к БД  
- Код создания БД находится в `database.sql`  
- В качестве платформы для запросов использовал `Postman`  

## Возможности программы  

Реализованный сервер обрабатывает CRUD запросы:

- GET /subjects - возвращает список предметов
- GET /subject?id={id} - возвращает предмет по id
- POST /subject - создает предмет
- PUT /subject - редактирует данные по предмету
- DELETE /subject?id={id} - помечает запись удаленной
- GET /teachers - возвращает список преподавателей
- GET /teachers?subjectID={id} - возвращает преподавателей по конкретному предмету
- GET /teacher?id={id} - возвращает преподавателя по id
- POST /teacher - создает преподавателя
- PUT /teacher - редактирует данные по преподавателю
- DELETE /teacher?id={id} - помечает запись удаленной

Ссылка на видео: https://www.youtube.com/watch?v=wkPRyVHK3kw