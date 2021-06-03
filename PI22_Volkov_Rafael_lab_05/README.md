# Лабораторная работа № 5

## ПИбд-22 Волков Рафаэль

## Задание
1. Настроить Auto-Deploy своего сервера и БД на Heroku
2. На видео продемонстрировать работоспособность всех запросов в ручную (или при помощи e2e тестов)

### Тема - Учет продукции
Было выделены 2 сущности: Продукция и Группа продукции. Использовалась база данных PostgreSQL Код создания таблиц указан в файле CreateDB.sql

### Описание запросов:
* GET /products - возвращает список всех неудалённых записей в таблице продукции
* GET /product?id={id} - возвращает элемент из неудалённых запискй в таблице продукции по указанному первичному ключу
* POST /product - создаёт запись в таблице продукции с указанными параметрами
* PUT /product - редактирует запись на указанные параметры
* DELETE /product?id={id} - удаляет запись с указанными первичным ключом
* GET /groupps - возвращает список всех неудалённых записей в таблице групп
* GET/groupp?id={id} - возвращает элемент из неудалённых записей в таблице групп по указанному первичному ключу
* GET /groupp?bulletinboardsid={id} - возвращает список элементов из таблицы групп по указанному внешнему ключу
* POST /groupp - создаёт запись в таблице с указанными параметрами
* PUT /groupp - редактирует запись на указанные параметры
* DELETE /groupp?id={id} - удаляет запись с указанным первичным ключом

- [Сервер](https://young-sea-38329.herokuapp.com)