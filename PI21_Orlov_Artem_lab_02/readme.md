# Отчет по лабораторной работе №2
#### Выполнил студент группы ПИбд-21 Орлов Артем

## Задание:
1. На основе своей темы описать и создать базу данных (минимум из 2х связанных таблиц)
2. Реализовать CRUD API для работы с обеими таблицами.
3. Pull request должен содержать все запросы для демонстрации работы каждого запроса, описанные в формате Curl

## Тема - автосалон японских автомобилей:
В рамках предметной области были выделены 2 сущности:
Бренд(brand) и Машина(car)
Использовалась база данных PostgreSQL
Код создания таблиц указан в файле tables.sql

## Установка и запуск:
- Запускаем сервер: `npm run dev`

## Описание запросов:
`GET /brands` - возвращает все бренды
`GET /brand?Id={Id} `- возвращает бренд по Id
`POST /brand` - создает запись в таблице брендов
`PUT /brand` - редактирует запись в таблице брендов
`DELETE /brand?Id={Id}` - помечает запись с брендом удаленной
`GET /cars` - возвращает все имеющиеся машины
`GET /cars?brandId={brandId}` - возвращает все имеющиеся машины определенного бренда
`GET /car?Id={Id}` - возвращает машину по Id
`POST /car` - создает запись в таблице машин
`PUT /car` - редактирует запись в таблице машин
`DELETE /car?id={Id}` - помечает запись с машиной удаленной

### [Видео с демонстрацией работы](https://drive.google.com/file/d/1vrW6tfi0fgtIOnXyj7JaMo-RScfAcL9V/view?usp=sharing)
