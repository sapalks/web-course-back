# Отчет по Лабораторной работе № 3
E2E Тестирование (продолжение лабораторной №2)
**Вариант : Библиотека**


##Код для создания базы данных: 
```
CREATE TABLE writer ( 
 writerID BIGSERIAL NOT NULL PRIMARY KEY UNIQUE, 
 lastname VARCHAR(20) NOT NULL,
 firstname VARCHAR(20) NOT NULL, 
 patronymic VARCHAR(20) NOT NULL, 
 isDeleted boolean NOT NULL DEFAULT FALSE);

CREATE TABLE book (  
 bookID BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,  
 name VARCHAR(40) NOT NULL,  
 isDeleted boolean NOT NULL DEFAULT FALSE,
 writerID int NOT NULL, 
 FOREIGN KEY (writerID) 
 REFERENCES writer (writerID) ON DELETE CASCADE ON UPDATE CASCADE); 
 ```

* Запросы, сделанные во 2-ой лабораторной, были покрыты e2e тестами


Видео с демонстрацией : https://disk.yandex.ru/i/3WkVTcUSL-d2CA
