const socket = io()

const params = (new URL(document.location)).searchParams
const username = params.get('username')
const room = params.get('room')

document.getElementById('user-name').innerHTML = username
document.getElementById('room-name').innerText = room

socket.emit('join', { username, room })

socket.on('list-users', function({users}) {
    document.getElementById('user').innerHTML = `${users.map(user => `<p class="user"><i class="fas fa-user"></i> ${user.username}</p>`).join('')}`
    document.getElementById('number-of-users').innerHTML = users.length
})

socket.on('message', function(msg) {
    defineUser(msg)
    messages = document.querySelector('.messages')
    messages.scrollTop = messages.scrollHeight
})

socket.on('first-connection', function() {
    Swal.fire({
        icon: 'success',
        title: `Connected to room number ${room}!`
    })
})

socket.on('error', function() {
    let timerInterval
    Swal.fire({
        icon: 'error',
        title: 'User name violation',
        html: 'Disconnect in <b></b> milliseconds.',
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

const popup = document.getElementById('userList')
const input = document.getElementById('msg');
document.getElementById('users-online').onclick = function() {
    popup.style.display = 'block'
}

document.querySelector('.close').onclick = function() {
    popup.style.display = 'none'
}

document.getElementById('message-sending-form').addEventListener('submit', function(e) {
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
    div.innerHTML = `<i class="fas fa-user"></i> ${msg.username} </span></p><p class="text">${msg.text}</p>`
    document.querySelector('.messages').appendChild(div)
}