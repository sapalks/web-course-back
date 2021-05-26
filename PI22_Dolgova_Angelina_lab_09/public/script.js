const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const sendButton = document.getElementById('send-button')
const exitButton = document.getElementById('exit-button')
const roomLabel = document.getElementById('room-label')

if (messageForm != null) {
    roomLabel.innerHTML = `Room: "${roomName}"`
    const username = prompt('What is your name?')

    socket.emit('new-user', roomName, username)

    messageForm.addEventListener('submit', e => {
        e.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', roomName, message)
        messageInput.value = ''
    })
}

exitButton.addEventListener('submit', e => {
    location.href = "http://localhost:3000/";
})

socket.on('room-created', room => {
    const roomElement = document.createElement('div')
    roomElement.innerText = room
    const roomLink = document.createElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)
})

socket.on('username-error', () => {
    messageInput.placeholder = "";
    messageInput.setAttribute("disabled", "")
    sendButton.setAttribute("disabled", "")
    alert("This username is already taken. Please press 'Exit' button and choose different username or try to enter another room.")
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
