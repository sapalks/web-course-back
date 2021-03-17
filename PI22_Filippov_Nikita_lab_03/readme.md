# Отчет по лабораторной работе №3
#### Выполнил студент группы ПИбд-22 Филиппов Никита

## Задание:
Покрыть e2e тестами все запросы, сделанные во 2-ой лабораторной

## Установка и запуск:
- Ставим модуль для создания сервера: `npm install express --save`
- Ставим модуль для работы с PostgreSQL: `npm install postgresql --save`
- Ставим модуль Cucumber как зависимость решения: `npm install --save-dev @cucumber/cucumber`
- Ставим модуль sync-request: `npm install sync-request`
- Ставим модуль chai: `npm install chai`
- Запускаем сервер: `npm start`
- Запускаем тест: `npm run test:e2e`

## Описание сценариев:
1. `Add countries` - сценарий добавления страны
2. `Get countries`- сценарий получения списка стран
3. `Get country by Id` - сценарий получения страны по Id
4. `Update country with id 402` - сценарий изменения страны с Id 402
5. `Delete country with Id 401` - сценарий удаления страны с Id 401
6. `Add hotell` - сценарий добавления отеля
7. `Get hotels` - сценарий получения списка отелей
8. `Get hotel by Id` - сценарий получения отеля по Id
9. `Get hotels in country with Id 401` - сценарий получения списка отелей в стране с Id 401
10. `Update hotel with Id 302` - сценарий изменения отеля с Id 302
11. `Delete hotel with Id 301` - сценарий удаления отеля с Id 301

### [Видео с демонстрацией работы](https://drive.google.com/file/d/1RMk-6V9nc1tO7_2Kg5Y92aC_NI4jRse2/view?usp=sharing)



