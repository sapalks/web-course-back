const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server);
const port = 3000;
const user = require('./user');
var alert = require('alert');

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}));

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/chat', ({
    query: {
        name,
        room
    }
}, res) => {
    if (user.getAll().find(user => user.name === name && user.room === room)) {
        alert('Такой пользователь уже есть в данной комнате!');
        res.render('index.ejs');
    } else {
        res.render('chat.ejs', {
            name: name,
            room: room
        });
    }
});

socketio.on('connection', function (socket) {

    socket.on('join', function ({
        name,
        room
    }) {
        const new_user = user.create(socket.id, name, room)
        socket.join(new_user.room)
        socket.emit('first-connection')
        socketio.to(new_user.room).emit('new_message', {
            name: new_user.name,
            text: `${new_user.name} зашел в чат`,
            time: (new Date).toLocaleTimeString()
        })

        socketio.to(new_user.room).emit('users', {
            users: user.getUsersInRoom(new_user.room)
        })
    });

    socket.on('send-message', function (message) {
        const cur_user = user.get(socket.id)
        socketio.to(cur_user.room).emit('new_message', {
            name: cur_user.name,
            text: message,
            time: (new Date).toLocaleTimeString()
        })
    });

    socket.on('disconnect', function () {
        const del_user = user.delete(socket.id)
        if (del_user) {
            socketio.to(del_user.room).emit('new_message', {
                name: del_user.name,
                text: `${del_user.name} вышел из чата`,
                time: (new Date).toLocaleTimeString()
            })
            socketio.to(del_user.room).emit('users', {
                users: user.getUsersInRoom(del_user.room)
            })
        }
    });
});

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})