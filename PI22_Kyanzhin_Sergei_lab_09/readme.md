# Отчет по лабораторной работе № 9

## Чат на web-socket - [socket.io](https://socket.io)

Для работы с датой и временем использовалась библиотека **Moment js**

## Установка и настройка
- В консоли пишем `npm install` чтобы проинициализировались все модули нужные для работы
- - Для запуска приложения в режиме продакшн в терминале нужно ввести команду `npm run start`
- -  Для запуска приложения в режиме разработки в терминале нужно ввести команду `npm run dev`
- Переходим на http://localhost:3000

### Инструкция к приложению
- Пользователь должен указать ник (ник должен быть уникальным)
- Пользователь должен указать название комнаты (если такой комнаты не существует, то она создается)
- Нажать на кнопку **Присоединиться**
- После этого происходит переход в комнату, где видно название комнаты и других пользователей в этой комнате
- Другие пользователи увидят сообщение о присоединении нового пользователя
- Чтобы отправить сообщение, пользователь должен ввести текст сообщения и нажать кнопку **Отправить**
- Чтобы покинуть комнату, нужно нажать кнопку **Покинуть комнату** (остальные пользователи так же будут оповещены)


