const Room = require('../models/room.model')

let rooms = [];

exports.main = (req, res) => {
  res.render('index.ejs');
};

exports.enter = (req, res) => {
  let roomId = req.query.roomId;
  let nickname = req.query.nickname;
  if (roomId.length == 0) {
    error = 'Введите название комнаты'
    res.render('error.ejs', { error })
    return
  }
  if (nickname.length == 0) {
    error = 'Введите свой никнейм'
    res.render('error.ejs', { error })
    return
  }
  if (checkRoomAndUser(roomId, nickname, res)) {
    res.render('room.ejs', { roomId, nickname });
  }
}

exports.subscribe = (req, res) => {
  let roomId = req.query.roomId
  let nickname = req.query.nickname
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  if (checkRoomAndUser(roomId, nickname, res)) {
    let room = rooms.find(x => x.getRoomName() === roomId);
    room.addSubscriber(res, nickname);

    req.on('close', function () {
      subs = room.getSubscribers();
      if (subs.length > 0) {
        room.deleteSubscriber(nickname)
      }
    });
  }
}

exports.publish = (req, res) => {
  let message = '';
  let roomId;
  let nickname;
  req.on('data', function (chunk) {
    data = JSON.parse(chunk)
    message += data.message;
    roomId = data.roomId;
    nickname = data.nickname;
  }).on('end', function () {
    publish(message, roomId, nickname);
    res.end("ok");
  });
}

exports.createRoom = (req, res) => {
  let roomId = req.body.roomId;
  let room = rooms.find(x => x.getRoomName() === roomId);
  if (room != undefined) {
    let error = "Комната уже существует"
    res.render('error.ejs', { error })
    return;
  }
  rooms.push(new Room(roomId));
  res.redirect('main')
}

function checkRoomAndUser(roomId, nickname, res) {
  let room = rooms.find(x => x.getRoomName() === roomId);
  if (room === undefined) {
    let error = "Комната не найдена"
    res.render('error.ejs', { error })
    return false;
  }
  if (room.findSubscribers(nickname) !== undefined) {
    let error = "Такой пользователь уже есть в комнате"
    res.render('error.ejs', { error })
    return false
  }
  return true
}

function publish(message, roomId, nickname) {
  let room = rooms.find(x => x.getRoomName() === roomId);
  subs = room.getSubscribers();
  subs.forEach(x => {
    x.res.end(`${nickname};${new Date().toLocaleString()};${message}`)
  });
  room.clearSubscribers();
}