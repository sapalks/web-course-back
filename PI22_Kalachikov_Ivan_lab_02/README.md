# Лаботраторная 2 
# ПИбд-22 Калачиков Иван

Для запуска сервера в терминале нужно ввести команду **node server.js**

Выбранная тема - учет сотрудников. Были созданы сущности отдела и работника. В качестве базы данных использовался **Postgres**

```
CREATE TABLE department(
id SERIAL PRIMARY KEY,
name varchar(50) NOT NULL);

CREATE TABLE employee(
id SERIAL PRIMARY KEY,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
payment(30) NOT NULL,
department_id REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE);
```



После чего запустится сервер, обрабатывающий все запросы по чтению/удалению/созданию/обновлении данных:

1. **POST** /department - создание нового отдела, достаточно ввести name
1. **GET** /department - получения списка всех отделов
1. **GET** /department/:id - получение отдела по id
1. **PUT** /department - обновление отдела
1. **DELETE** /department/:id - удаление отдела по id

1. **POST** /employee - создание нового сотрудника, нужно ввести имя, фамилию, оплату и id отдела
1. **GET** /employees - получение списка всех работников
1. **GET** /employees/:dep_id - получение списка работников в указанном отделе
1. **GET** /employee/:id - получение работника по id
1. **PUT** /employee - обновление работника
1. **DELETE** /employee/:id - удаление работника по id

