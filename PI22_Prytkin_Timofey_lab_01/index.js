const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const winston = require('winston'); //Подключаем логгер
const port = 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text({extend:true}));
app.use(bodyParser.json({extend:true}));

var logger = winston.createLogger({
    format: winston.format.json (),
    transports: [
        new winston.transports.File({
            filename: 'logs.log',
            handleExceptions: true
        })
    ]
})

//Записываем в логгер при любом удобном случае
app.use((request, response, next) => {
    logger.info("{" + new Date().toUTCString() + "} {" + request.ip + "} {" + request.method + "} {" + request.protocol + '://' + request.get('host') + request.url + "} {" + response.statusCode + "}");
    next();
});

/**
 * Функция для получения дня недели по номеру дня в (текущем месяце).
 * По идее, тут можно обосраться, и в текущем месяце не будет такого дня.
 * Этот случай обработан на более высшем уровне.
 * @param {number} dayNumber Номер дня в месяце
 * @return {object} Информация о дне недели
*/
function getDayByNumber (dayNumber) {
    //Названия дней недели
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var normalYear = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    var leapYear = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    //Текущая дата
    var currentDate = new Date();

    //Требуемая дата
    var requiredDate;

    if ((currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0){//Если високосный год
        if (leapYear[currentDate.getMonth()] >= dayNumber) {
            requiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
            return {"weekday":daysOfWeek[requiredDate.getDay()]};
        } else {
            return null;
        }
    } else {// Если не високоснный год
        if (normalYear[currentDate.getMonth()] >= dayNumber) {
            requiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
            return {"weekday":daysOfWeek[requiredDate.getDay()]};
        } else {
            return null;
        }
    }
}

/**
 * Супер функция-калькулятор, которая может посчитать такие операции калькулятор
 * сложение, вычитание, умножение, деление и т.д.
 * @param {number} value1 Первое число
 * @param {number} value2 Второе число
 * @param {string} operation Выполняемая над числами операция
 * @return {object } Информация о результате операции
*/
function calculate (value1, value2, operation) {
    var result;
    switch (operation) {
        case 'addition':
            result = value1 + value2
            break;
        case 'subtraction':
            result = value1 - value2
            break;
        case 'multiplication':
            result = value1 * value2
            break;
        case 'division':
            result = value1 / value2
            break;
        default:
            return ({status:'error', body:'Увы, в математике еще не придумали такую операцию: ' + operation})
    }

    //Если получилась бесконечность значит мы где то поделили на ноль
    if (!Number.isFinite(result)) {
        return({status:'error', body:'На ноль делят только нехорошие люди!'})
    }

    return {status:'ok', body:result};
}

//Пингануть
app.get('/ping', function (request, response) {
    response.send({ status: 'ok' });
});

//Определить день недели по номеру дня текущего месяца
app.get('/weekday', function (request, response) {
    if (Number(request.query.day) > 0 && Number(request.query.day) < 32) {
      var result = getDayByNumber(Number(request.query.day));

      if (result != null) {
          response.send(result);
      } else {
          logger.error("{" + new Date().toUTCString() + "} {" + request.ip + "} {" + request.method + "} {" + request.protocol + '://' + request.get('host') + request.url + "} { Недопустимый день в месяце }");
          response.send({"weekday":"Недопустимый день в месяце"});
      }
    } else {
        logger.error("{" + new Date().toUTCString() + "} {" + request.ip + "} {" + request.method + "} {" + request.protocol + '://' + request.get('host') + request.url + "} { Недопустимый номер дня в месяце }");
        throw new Error("Ошибка! Недопустимый номер дня в месяце. Принимаются значения только от 1 до 31.")
    }
})

//Посчитать математическую операцию
app.post('/calc', function (request, response) {
    response.send(calculate(request.body.value1, request.body.value2, request.body.operation));
})

//Как дела?
app.listen(port, () => {
    console.log(`Для проверки работоспособности приложения перейдите в браузере по следующему пути: http://localhost:${port}`)
})
