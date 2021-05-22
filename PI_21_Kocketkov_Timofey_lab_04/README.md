# Лабораторная работа №2
### ПИбд-21 Кочетков Тимофей
## Задание:
1. Добавить таблицу с пользователями
2. Добавить запрос для регистрации
3. Добавить запрос для авторизации, запрос должен возвращать токен (срок жизни токена - 1 неделя) для доступа к запросам редактирования информации

Была обновлена БД:

```
create TABLE Users (
id integer PRIMARY KEY,
Login VARCHAR(50) not null,
Password VARCHAR(30) not null,
DateCreate Date not null DEFAULT CURRENT_DATE
);

alter table Users alter column id set default nextval('User_Seq');
```
## Функционал программы: 
  - `register` - запрос для регистрации
  - `login` - запрос для авторизации, возвращает токен (срок жизни токена - 1 неделя) 

### Демонстрация работы:
https://youtu.be/7Yq4V0AXtvg