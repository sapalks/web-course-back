# Отчет по Лабораторной работе № 2  

## Тема:  
Учет специальностей студентов  

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
- `GET /specialities` - возвращает список всех специальностей  
- `GET /speciality?id={id}` - возвращает специальность по id  
- `POST /speciality` - создает запись в таблице специальностей  
- `PUT /speciality` - редактирует запись в таблице специальностей  
- `DELETE /speciality?id={id}` - помечает запись со специальностью удаленной  
- `GET /students` - возвращает список всех студентов  
- `GET /students?specialityID={id}` - возвращает всех студентов по указанной специальности  
- `GET /student?id={id}` - возвращает студента по id  
- `POST /student` - создает запись в таблице студентов  
- `PUT /student` - редактирует запись в таблице студентов  
- `DELETE /student?id={id}` - помечает запись со студентом удаленной  
