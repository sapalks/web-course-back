# 1 лабораторная работа
## ПИбд-22 Симонов Владимир

## Задание

1. Создать каркас сервера
  - Реализовать запрос `GET /ping`, ответ на запрос
  - Реализовать запрос, определяющий день недели по номеру дня текущего месяца. 
  - Реализовать запрос для выполнения простых математических операций:

2. Настроить логирование в файл
    - всех запросов к серверу в следующем формате `{Date and time in UTC} {Ip} {Method} {Url} {Status code}`
    - всех исключений на сервере

### Запуск сервера
- Ставим модули командой `npm install`, `npm init -y`
- Ставим Winston командой `npm install winston`
 -Для запуска сервера вводим в терминале команду `npm start`

### Логирование
Для логирования используется модуль Winston
Файлы логируются в папку logs

### Ссылки
Ссылка на видео: https://drive.google.com/file/d/1D6ziyw0e0Oe6s3tX9qD1Gj_MaL9d4NZO/view?usp=sharing