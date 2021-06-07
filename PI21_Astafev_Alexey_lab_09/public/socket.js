const form = document.getElementById('message-sending-form')
const socket = io()
const roomName = document.getElementById('room-name')
const numberOfUsers = document.getElementById('number-of-users')
const usr = document.getElementById('user-name')
const user = document.getElementById('user')
const messages = document.querySelector('.messages')
const popup = document.getElementById('mypopup')
const popupOnline = document.getElementById('users-online')
const popupClose = document.querySelector('.close')
const input = document.getElementById('msg');
const params = (new URL(document.location)).searchParams
const username = params.get('username')
const room = params.get('room')

usr.innerHTML = username
roomName.innerText = room

socket.emit('join', { username, room })

socket.on('list-users', function({users}) {
    user.innerHTML = `${users.map(user => `<p class="user"><i class="fas fa-user"></i> ${user.username}</p>`).join('')}`
    numberOfUsers.innerHTML = users.length
})

socket.on('message', function(msg) {
    defineUser(msg)
    messages.scrollTop = messages.scrollHeight
})

socket.on('first-connection', function() {
    Swal.fire({
        icon: 'success',
        title: `U are connected to chat ${room}!`
    })
})

socket.on('error', function() {
    let timerInterval
    Swal.fire({
        icon: 'error',
        title: 'User with the same name already exists!',
        html: 'U will be automatically disconnect from the server after <b></b> milliseconds.',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            window.location = "index.html"
        }
    })
    document.getElementById('send').disabled = true;
    document.querySelector('input').disabled = true;
})

popupOnline.onclick = function() {
    popup.style.display = 'block'
}

popupClose.onclick = function() {
    popup.style.display = 'none'
}

form.addEventListener('submit', function(e) {
    e.preventDefault()
    socket.emit('sending-message', e.target.elements.msg.value)
    input.value = ''
    input.focus()
})

function defineUser(msg) {
    const div = document.createElement('div')
    if(msg.username === username) {
        div.classList.add('my-message')
    } else {
        div.classList.add('message')
    }
    div.innerHTML = `<p class="meta"> ${msg.username} <span class='time'>${msg.time}</span></p><p class="text">${msg.text}</p>`
    document.querySelector('.messages').appendChild(div)
}