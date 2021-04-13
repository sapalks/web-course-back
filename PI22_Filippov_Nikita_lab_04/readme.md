# Отчет по лабораторной работе №4
#### Выполнил студент группы ПИбд-22 Филиппов Никита

## Задание:
Авторизация и регистрация (продолжение лабораторной №2)
1. Добавить таблицу с пользователями
2. Добавить запрос для регистрации
3. Добавить запрос для авторизации, запрос должен возвращать токен (срок жизни токена - 1 неделя) для доступа к запросам редактирования информации
4. Ограничить доступ к запросам редактирования информации (создания, редактирования и удаления записей в бд). Возвращать 401 статус код отказе в доступе.

## Установка и запуск:
- Ставим модуль для создания сервера: `npm install express --save`
- Ставим модули для работы с PostgreSQL: `npm install postgresql --save`, `npm install pg --save`;
- Ставим модули для работы с токенами: `npm install passport`,`npm install passport jwt` `npm install jsonwebtoken`
- Запускаем сервер: `npm start`

## Описание запросов:
- `POST /register` - регистрация пользователя
```js
body:
	{
		"Login": "Filippov",
		"Password": "Nikita"
	}
	request:
	{
		"Login": "Filippov",
		"Password": "Nikita" // or 'error', and in body field error description
	}
```
- `POST /login` - авторизации пользователя
```js
body:
{
	"Login": "Filippov",
	"Password": "Nikita"
}	
}
request:
{
	"status": "ok", // or 'error'
	"token": "token" // or error description
}
```

## Действия с БД:
В базу данных была добавлена таблица пользователей.
Таблица хранит Id,Login и Password пользователя. Login и Password должны быть длинее 5 символов.
Код всей таблицы предоставлен в файле SQL.txt

### [Видео с демонстрацией работы](https://drive.google.com/file/d/1oSGu5oa7kHyYPJj0z7WXfUWeV00_r8lE/view?usp=sharing)