# Отчет по лабораторной работе № 3  

## Тема:  
Учет команд игрока в FPS  

## Создание проекта  

- Создаем в VS проект и устанавливаем соответсвующие модули для удобства работы с БД.  
- Создаем базу данных, используя `Postgres`.
- Устанавливаем cucumber и пишем тесты.  

## Запуск проекта  
- Сервер запускаем с помощью npm run dev.  

## Запросы покрытые тестами:

### GET
* /teams - список всех команд  
* /team?id={id} - команду по id
* /players - список всех игроков  
* /players?teamID={id} - всех игроков по введенной команде  
* /player?id={id} - игрока по id    
### POST
* /team - создает запись в таблице команд  
* /player - создает запись в таблице игроков  
### PUT
* /team - редактирует запись в таблице команд  
* /player - редактирует запись в таблице игроков  
### DELETE
* /team?id={id} - помечает запись с командой удаленной  
* /player?id={id} - помечает запись с игроком удаленной  

Ссылка на видео: https://youtu.be/q-EPUyhaACI
