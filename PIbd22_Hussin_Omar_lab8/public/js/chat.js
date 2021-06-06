const form = document.getElementById('message-sending-form')
const user = document.getElementById('user')
const messages = document.querySelector('.messages')
const popup = document.getElementById('mypopup')
const popupOnline = document.getElementById('users-online')
const popupClose = document.querySelector('.close')
const room = document.getElementById('room-name')
const usr = document.getElementById('user-name')
const input = document.getElementById('msg')
const params = (new URL(document.location)).searchParams
const username = params.get('username')
const roomId = params.get('roomId')
const url = 'http://localhost:3000/'
var listUsers = []
usr.innerHTML = username
room.innerHTML = roomId
var listUsers = []
function PublishForm() {

    function sendMessage(message) {
        fetch(`${url}publish`, {
            method: 'POST',
            body: JSON.stringify({ message: message, roomId: roomId, username: username })
        })
    }
    form.onsubmit = () => {
        sendMessage(input.value)
        input.value = ''
        return false
    }
}
function SubscribePane(response) {
    if(response === 'false') {
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
                window.location = "/main"
            }
        })
        document.getElementById('send').disabled = true
        document.querySelector('input').disabled = true
        return
    } 
    else {
        Swal.fire({
            icon: 'success',
            title: `U are connected to chat ${roomId}!`
        })
    }

    function showMessageOrListUsers(message) {
        var msg = message.split('&')
        if (msg.length === 3) {
            defineUser(msg)
            messages.scrollTop = messages.scrollHeight
            return
        }
        listUsers = Array.from(message.split(','))
        user.innerHTML = `${listUsers.map(user => `<p class="user"><i class="fas fa-user"></i> ${user}</p>`).join('')}`
    }
    async function subscribe() {
        var response = await fetch(`${url}subscribe?roomId=${roomId}&random=${Math.random()}&username=${username}`)
        if (response.status == 502) {
            await subscribe();
        } else if (response.status != 200) {
            showMessageOrListUsers(response.statusText);
            await new Promise(resolve => setTimeout(resolve, 1000))
            await subscribe()
        } else {
            var message = await response.text()
            showMessageOrListUsers(message)
            await subscribe()
        }
    }
    subscribe()
}
popupOnline.onclick = function() {
    popup.style.display = 'block'
    getListUsers(roomId)
}
popupClose.onclick = function() {
    popup.style.display = 'none'
}
function getListUsers(room) {
    fetch(`${url}fillingFieldOnline?roomId=${room}`)
}

function defineUser(msg) {
    const div = document.createElement('div')
    if (msg[0] === username) {
        div.classList.add('my-message')
    } else {
        div.classList.add('message')
    }
    div.innerHTML = `<p class="meta"><i class="fas fa-user"></i> ${msg[0]} <span class='time'>${msg[1]}</span></p><p class="text">${msg[2]}</p>`
    document.querySelector('.messages').appendChild(div)
}