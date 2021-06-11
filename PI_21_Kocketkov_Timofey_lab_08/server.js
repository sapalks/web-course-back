const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 8000;
const rooms = new Map();

app.use(express.json());

app.get('/rooms/:id', (req, res) => {
	const { id: roomId } = req.params;
	//console.log(roomId);
	const obj = rooms.has(roomId)
		? {
			users: [...rooms.get(roomId).get('users').keys()],
			messages: [...rooms.get(roomId).get('messages').values()],
		} : { users: [], messages: [] };
	res.json(obj);
});

app.post('/rooms', (req, res) => {
	//console.log(req.body);
	const { roomId, userName } = req.body;
	if (!rooms.has(roomId)) {
		rooms.set(roomId, new Map([
			['users', new Map()],
			['messages', []]
		]
		))
	}

	res.send();
});
app.post('/newMessage', (req, res) => {
	const { roomId, userName, text } = req.body;
	//console.log(roomId,userName,text);
	const obj = {
		userName, text
	}
	//console.log(req.body);
	if (rooms.has(roomId)) {
		rooms.get(roomId).get('messages').push(obj);
	}
	else {
		console.log("error");
	}
	res.send();
});

app.post('/connect', (req, res) => {
	const { roomId, userName } = req.body;
	rooms.get(roomId).get('users').set(userName, new Date());;
	//const users = [...rooms.get(roomId).get('users').values()];
	//console.log(users);
	res.send();
});
app.post('/check/:id', (req, res) => {
	const { id: roomId } = req.params;
	const { userName } = req.body;
	//console.log(req.body)
	//console.log(roomId, userName);
	if (rooms.has(roomId)) {
		rooms.get(roomId).get('users').set(userName, new Date());
		//	const d = [rooms.get(roomId).get('users').values()];
		//console.log(d);
	}
	else {
		console.log("err");
	}

	res.send();
});


function logMapElements(value, key, map) {

	//console.log("m[" + key + "] = " + value);
	value.forEach(logMapElements1);
}

function logMapElements1(value, key, map) {

	//console.log("m[" + key + "] = " + value);
	if(key == 'users') {
		//console.log(key);
	value.forEach(logMapElements2)
	
	}

}

function logMapElements2(value, key, map) {

	//console.log("m[" + key + "] = " + value + map);
	
	let ong = new Date();
	//console.log(Math.abs(value.getSeconds() -ong.getSeconds()))
	//console.log(map.values(), map.keys())
	if (Math.abs(value.getSeconds() - ong.getSeconds()) < 3) {
		//console.log("111");
		return true;
	}
	map.delete(key);
	//console.log("qqqq");
	return false;
	
}

const disconnect = async () => {
	const data = [rooms.forEach(logMapElements)];
	//console.log("cfdd");
	await new Promise(resolve => setTimeout(resolve, 1000));
	await disconnect();
}
server.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
	disconnect();
})
