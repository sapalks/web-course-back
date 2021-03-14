const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers, getAllUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = 3000 || process.env.PORT

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Bot Sliva'

//Name uniqueness check
const checkUsername = (username, room) =>
    getAllUsers().find(usr => usr.username === username && usr.room === room) ? false : true


// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        if (!checkUsername(username, room)) {
            socket.join('error')
            socket.emit('message', formatMessage(botName, 'This username already exist, press leave button and change your username'))
            return
        }

        const user = userJoin(socket.id, username, room)
        socket.join(user.room)

        socket.emit('message', formatMessage(botName, 'Welcome to Chat!'))

        //Broadcast when user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))

        //Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    //Broadcast when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if (!user) return

        if (user) io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})


server.listen(PORT, () => console.log('Server is started on port ' + PORT))