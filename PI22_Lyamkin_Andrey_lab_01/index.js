const express = require('express')
const loger = require('./loger')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    loger.info(getLogMessage (req, res))
    next()
})

app.get('/ping', (req, res) => {
    res.json({ 
        status: 'ok'
    })
})

app.get('/weekday', (req, res) => {
    const result = getDayOfWeek(req.query.day)

    if(result === null){
        res.send(`В текущем месяце нет дня с номером ${req.query.day}`)
    }else{
        res.json({
            weekday: result 
        })
    } 
})

app.post('/calc', (req, res) => {
    try{
        const result = calculate(req.body.value1, req.body.value2, req.body.operation)
        res.json ({
            status: 'ok',
            body: result
        })
    } catch (err) {
        loger.error(getLogMessage (req, res) + ' { '+ err.message + ' }')
        res.json ({
            status: 'ERROR',
            body: err.message
        })
    }
})

app.listen(PORT, () => {
    console.log('Сервер доступен по адресу http://localhost:%d', PORT)
})

getDayOfWeek = dayNumber => {
    if(dayNumber > 31 || dayNumber < 1){
        return null
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
   
    date = new Date()
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    if((currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0){
        daysInMonths[1]++
    }
    if(dayNumber > daysInMonths[currentMonth]){
        return null
    }
    return days[new Date(currentYear, currentMonth, dayNumber - 1).getDay()]
}

calculate = (val1, val2, operation) => {
    var result
    if(operation === 'addition') {
        result = val1 + val2
    } else if (operation === 'subtraction') {
        result = val1 - val2
    } else if (operation === 'multiplication') {
        result = val1 * val2
    } else if (operation === 'division') {
        if (val2 === 0) {
            throw new Error('Деление на 0')
        }
        result = val1 / val2
    } else {
        throw new Error('Неизвестная операция')
    }
    return result 
}

getLogMessage = (req, res) => {
    console.log('{ ' + new Date().toUTCString() + ' } { ' + req.ip + ' } { ' + req.method + ' } { ' + req.url + ' } { ' + res.statusCode + ' }')
    return '{ ' + new Date().toUTCString() + ' } { ' + req.ip + ' } { ' + req.method + ' } { ' + req.url + ' } { ' + res.statusCode + ' }'
}