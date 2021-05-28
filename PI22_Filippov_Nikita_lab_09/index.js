const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/chat.controller')
const chatRoutes = require('./routes/chat.routes.js');

const port = 5294;

const app = express();
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

const io = require("socket.io")(server)

io.on('connection', (socket) => {
    socket.on('new_message', (message) => {
        io.sockets.in(socket.room).emit('new_message', { nickname: socket.nickname, date: new Date().toLocaleTimeString(), message });
    })

    socket.on("new_user", (data, res) => {
        if (controller.addSubscriber(socket, data)) {
            io.sockets.in(socket.room).emit('new_message', { nickname: "System", date: new Date().toLocaleTimeString(), message: `${socket.nickname} присоединился к нам` })
        }
    })

    socket.on('disconnect', () => {
        if (controller.deleteSubscriber(socket)) {
            io.sockets.in(socket.room).emit('new_message', { nickname: "System", date: new Date().toLocaleTimeString(), message: `${socket.nickname} покинул наш мир` })
        }
    })
})

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use('/images', express.static('images'))

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toUTCString() });
});

app.use('/', chatRoutes)