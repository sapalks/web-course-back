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

exports.addSubscriber = (socket, data) => {
	let nickname = data.nickname
	let roomId = data.roomId
	let room = rooms.find(x => x.getRoomName() === roomId);
	if (room === undefined) {
		return false
	}
	room.addSubscriber(nickname);
	socket.nickname = nickname
	socket.room = room.getRoomName();
	socket.join(data.roomId)
	return true

}

exports.deleteSubscriber = (socket) => {
	let nickname = socket.nickname
	let roomId = socket.room
	let room = rooms.find(x => x.getRoomName() === roomId);
	if (room === undefined) {
		return false
	}
	room.deleteSubscriber(nickname)
	return true
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