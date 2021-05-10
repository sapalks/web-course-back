const { response } = require('express');
const express = require('express')
const app = express();
const port = 3000;
const winston = require('winston');


app.use((req, res, next) => {
  logger.info(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode);
  next();
});


//Настройка JSON
app.use(express.json({limit: '1mb' }));
app.get('/', (req, res) => {
  res.send('Hello World!');
})


//логированиe
logger = winston.createLogger({
  format: winston.format.json (),
  transports: [
      new winston.transports.File({
          filename: 'log.log',
          handleExceptions: true
      })
  ]
})


//Выводит в консольку сервер
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


//Пинг
app.get('/ping', (req, res) => {
  res.json({
      status: 'ok'
  });
});


//Запрос ГЕТ, формат $/weekday?day=10
app.get('/weekday', (req, res) => {
  try {   
    if (req.query.day === undefined || req.query.day < 1 || req.query.day > 31) {
        throw new Error('input error');
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const newDate = new Date(now.getFullYear(), now.getMonth(), req.query.day);
    res.json({weekday: days[newDate.getDay()]});
} catch (err) {
    res.json({status: 'error'});
    throw new Error('Error in weekday');
}
});


//По запросу /calc я выдаю страницу ХТМЛ
app.get("/calc", function (req, res) {
  res.sendFile(__dirname + "/calc.html");
});
//Из страницы ХТМЛ я делаю Фетчем Пост-запрос
app.post("/calc", function (req, res) {
    console.log(req.body);
    var result;
    try{
      var value1 = parseInt(req.body.value1);
      var value2 = parseInt(req.body.value2);
      if(req.body.operation == "subtraction"){
          result = value1 - value2;
      }
      else if(req.body.operation == "addition"){
          result = value1 + value2;
      }
      else if(req.body.operation == "division"){
          result = value1 / value2;
      }
      else if(req.body.operation == "multiplication"){
          result = value1 * value2;
      }
      else{
          res.json({
            status: 'error', 
            body : 'this operation not exist'});
          throw new Error(`Неверный ввод оператора ${operation}`);
      }
      console.log(result);
      const data={result};
      res.json({
        status: 'ok',
        result: data.result
      });
    }
    catch {
      res.json({
        status: 'error'
      });
      throw new Error("Some mistake happen");
    }
    
});


app.use((err, req, res, next) => {
  logger.error(new Date().toUTCString() + "  " + req.ip + "  " + req.method + "  " + req.url + "  " + res.statusCode + " " + err.message);
  next();
}); 
  
  