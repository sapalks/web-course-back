const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

let channels = [];
let users = [];

app.set('view engine', 'ejs')
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('channels.ejs', {channels: channels});
});
app.post('/addChannel', async (req, res) => {
    if (channels.indexOf(req.body.name) === -1) {
        channels.push(req.body.name);
    }
    res.render('channels.ejs', {channels: channels});
});
app.post('/visit', async (req, res) => {
    res.render('messages.ejs', {channel: req.body.channelName})
});

connections = [];

io.sockets.on('connection', (socket) => {
    console.log("Успешное соединение");
    socket.join(socket.handshake.query.channel);
    connections.push(socket);

    socket.on('disconnect', (data) => {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1);
        users.splice(users.indexOf({name: data.name, channel: data.channel}), 1);
        console.log("Отключились");
    });

    socket.on('send mess', (data) => {
        let isUser = false;
        for (let i = 0, len = users.length; i < len; i++) {
            if (users[i].name === data.name && users[i].channel === data.channel && users[i].socketId !== socket.id) {
                isUser = true;
                break;
            }
        }
        if (isUser) {
            io.sockets.to(data.channel).emit('bad name', {id: socket.id});
            return;
        }
        io.sockets.to(data.channel).emit('add mess', {
            mess: data.mess,
            name: data.name,
            className: data.className,
            channel: data.channel
        });
        users.push({name: data.name, channel: data.channel, socketId: socket.id});
    });
});