const express = require("express");
const app = express();
const port = 3000;

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/weekday", (req, res) => {
  let dayInMonth = Number(req.query.day);
  res.json({
    weekday: nowInMonthToDayInWeek(dayInMonth),
  });
});

// app.post("/calc/", (req, res) => {
//   console.log("body is ", req.body);
//   let result;
//   try {
//     result = calc(
//       request.body.value1,
//       request.body.value2,
//       request.body.operation
//     );
//   } catch (e) {
//     console.log(e);
//     res.json({
//       status: "error",
//       body: e.toString(),
//     });
//   }

//   res.send({
//     status: "ok",
//     body: result,
//   });
// });

app.post("/calc", function (req, res) {
  console.log(`body is `, req.body);
  res.send(calc(req.body.value1, req.body.value2, req.body.operation));
});

app.listen(port, () => {
  console.log(`ping at http://localhost:${port}/ping`);
  console.log(`weekday at http://localhost:${port}/weekday`);
  console.log(`calc at http://localhost:${port}/calc`);
});

function nowInMonthToDayInWeek(dayInMonth) {
  let now = new Date();
  if (
    dayInMonth > daysInMonth(now.getMonth(), now.getFullYear()) ||
    dayInMonth < 1
  ) {
    throw Error("invalid value");
  }

  now.setDate(dayInMonth);
  return dateToStringWeekDay(now);
}

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function dateToStringWeekDay(date) {
  switch (date.getDay()) {
    case 0:
      return "Воскресенье";
    case 1:
      return "Понедельник";
    case 2:
      return "Вторник";
    case 3:
      return "Среда";
    case 4:
      return "Четверг";
    case 5:
      return "Пятница";
    case 6:
      return "Суббота";
  }
}

function calc(value1, value2, operation) {
  switch (operation) {
    case "subtraction":
      return value1 - value2;
    case "addition":
      return value1 + value2;
    case "multiplication":
      return value1 * value2;
    case "division":
      if (value2 == 0) {
        throw Error("Division by zero");
      }
      return value1 / value2;
    default:
      throw Error("Operation does not exist");
  }
}
