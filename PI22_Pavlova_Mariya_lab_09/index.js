import path from 'path'
import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import formatMessage from './middleware/messages'
import {
    getJoinedUser,
    getCurrentUser,
    userExit,
    getUsersInRoom} from './middleware/users'

const PORT = 5000 || process.env.PORT
const app = express()
const index = http.createServer(app)
const io = socketio(index)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = getJoinedUser(socket.id, username, room);
        socket.join(user.room);
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage('Bot', `${user.username} has joined the chat`)
            );
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
        const user = userExit(socket.id);
        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage('Bot', `${user.username} has left the chat`)
            );
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

index.listen(PORT, () => console.log(`Server is running`))