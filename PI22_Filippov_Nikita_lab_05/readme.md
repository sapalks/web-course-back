# Отчет по лабораторной работе №5
#### Выполнил студент группы ПИбд-22 Филиппов Никита

## Задание:
Публикация сервера (продолжение лабораторной №2)
1. Настроить авто деплой своего сервера и базы на Heroku.
2. На видео продемострировать работоспособность всех запросов при помощи e2e тестов

## Установка и запуск:
- Ставим модуль для создания сервера: `npm install express --save`
- Ставим модули для работы с PostgreSQL: `npm install postgresql --save`, `npm install pg --save`;
- Ставим модуль Cucumber как зависимость решения: `npm install --save-dev @cucumber/cucumber`
- Ставим модуль sync-request: `npm install sync-request`
- Ставим модуль chai: `npm install chai`
- Запускаем сервер: `npm start`
- Запускаем тест: `npm run test:e2e`

## [Адрес деплоя на Heroku](https://young-taiga-95436.herokuapp.com/ping)

## [Видео с демонстрацией работы](https://drive.google.com/file/d/1XYBv_naOZfXem3H63N_gcMrco1ftnnmb/view?usp=sharing)