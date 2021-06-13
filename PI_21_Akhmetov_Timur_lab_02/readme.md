# Отчет по Лабораторной работе № 2  

## Тема:  
Учет направлений обучения студентов  

## Создание и запуск проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:  
```  
CREATE TABLE speciality ( 
 specialityID int NOT NULL PRIMARY KEY, 
 name VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE);

CREATE TABLE student ( 
 studentID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL, 
 isDeleted boolean NOT NULL DEFAULT FALSE,
 specialityID int NOT NULL, 
 FOREIGN KEY (specialityID) 
 REFERENCES speciality (specialityID) ON DELETE CASCADE ON UPDATE CASCADE);
 ```
- Для запуска сервера используем `npm run dev`.  
- В качестве платформы выступает `Postman`.  

## Возможности программы  

Реализованный сервер обрабатывает CRUD запросы:  
- `GET /specialities` - возвращает список всех направлений
- `GET /speciality?id={id}` - возвращает направление обучения по id  
- `POST /speciality` - создает запись в таблице направлений обучения
- `PUT /speciality` - редактирует запись в таблице направлений обучения 
- `DELETE /speciality?id={id}` - помечает запись со специальностью удаленной  
- `GET /students` - возвращает список всех студентов  
- `GET /students?specialityID={id}` - возвращает всех студентов по указанному направлению 
- `GET /student?id={id}` - возвращает студента по id  
- `POST /student` - создает запись в таблице студентов  
- `PUT /student` - редактирует запись в таблице студентов  
- `DELETE /student?id={id}` - помечает запись со студентом удаленной  

ВИДЕО: https://drive.google.com/file/d/1BYIes6jHCvsRx4XG_YR_Je5R0nDEaZo-/view?usp=sharing
