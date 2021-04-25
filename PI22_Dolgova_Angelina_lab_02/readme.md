## Лабораторная работа №2 "Создание CRUD API сервера"

Выполнила студентка группы **ПИбд-22 Долгова Ангелина**

******

### В рамках лабораторной работы были выполнены следующие задачи:
1. В выбранной предметной области (**библиотека**) были выделены две сущности: *книга* и *тематика*. На основе этого была создана база данных, состоящая из двух таблиц ([код создания таблиц](tables.sql));
1. Были реализованы следующие запросы:
      * `GET /topics` - для возврата всех тематик;
      * `GET /topic?id={id}` - для возврата тематики с определённым идентификатором;
      * `POST /topic` - для создания записи в таблице тематик;
      * `PUT /topic` - для редактирования записи в таблице тематик;
      * `DELETE /topic?id={id}` - для удаления записи в таблице тематик;
      * `GET /books` - для возврата всех книг;
      * `GET /books?top_id={id}` - для возврата книг определённой тематики;
      * `GET /book?id={id}` - для возврата книги с определённым идентификатором;
      * `POST /book` - для создания записи в таблице книг;
      * `PUT /book` - для редактирования записи в таблице книг;
      * `DELETE /book?id={id}` - для удаления записи в таблице книг;


### Примечания:
* Для работы с базой данных была выбрана СУБД PostgreSQL, и в проекте был установлен соответствующий модуль.


[Видео c демонстрацией работы](https://drive.google.com/file/d/1vIF6Pl-XytP024wQexSJKeq2_Pua0GFs/view?usp=sharing)