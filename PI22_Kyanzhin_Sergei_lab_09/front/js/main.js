const chatFrom = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


//Get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

//Join chatroom
socket.emit('joinRoom', { username, room })

//Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoom(room)
    outputUsers(users)
})

socket.on('message', message => {
    outputMessage(message)

    //Scroll down after new message
    chatMessages.scrollTop = chatMessages.scrollHeight
})

//Message submit
chatFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const msg = e.target.elements.msg.value

    socket.emit('chatMessage', msg)

    //Clear & focus input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

const outputMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                <p class="text">
                   ${message.text}
                </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

//Add room name to DOM
const outputRoom = (room) => {
    roomName.innerText = room
}

//Add users to DOM
const outputUsers = (users) => {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}