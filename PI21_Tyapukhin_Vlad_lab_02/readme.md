# Отчет по Лабораторной работе № 2  

## Тема:  
Учет специальностей студентов  

## Создание и запуск проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`:  
```  
CREATE TABLE education (  
 educationID int NOT NULL PRIMARY KEY,  
 name VARCHAR(100) NOT NULL,  
 isDeleted boolean NOT NULL DEFAULT FALSE);  

CREATE TABLE student ( 
 studentID int NOT NULL PRIMARY KEY, 
 firstname VARCHAR(100) NOT NULL, 
 lastname VARCHAR(100) NOT NULL, 
 currentGroup VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 educationID int NOT NULL, 
 FOREIGN KEY (educationID) 
 REFERENCES education (educationID) ON DELETE CASCADE ON UPDATE CASCADE);  
 ```
- Для запуска сервера используем `npm run dev`.  
- В качестве платформы выступает `Postman`.  

## Возможности программы  

Реализованный сервер обрабатывает CRUD запросы:  
- `GET /educations` - возвращает список всех специальностей  
- `GET /education?id={id}` - возвращает специальность по id  
- `POST /education` - создает запись в таблице специальностей  
- `PUT /education` - редактирует запись в таблице специальностей  
- `DELETE /education?id={id}` - помечает запись со специальностью удаленной  
- `GET /students` - возвращает список всех студентов  
- `GET /students?educationID={id}` - возвращает всех студентов по указанной специальности  
- `GET /student?id={id}` - возвращает студента по id  
- `POST /student` - создает запись в таблице студентов  
- `PUT /student` - редактирует запись в таблице студентов  
- `DELETE /student?id={id}` - помечает запись со студентом удаленной 