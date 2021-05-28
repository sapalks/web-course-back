const socket = io.connect('http://localhost:3000');
const name = getURLVar('name')
const room = getURLVar('room')

socket.emit('join', {
    name,
    room
})

socket.on('users', function ({
    users
}) {
    document.querySelector('#inRoom').innerHTML = `${users.map(user => `<tr><td>${user.name}</td></tr>`).join('')}`
})

socket.on('new_message', function (msg) {
    let table = document.querySelector('#viewMess');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    if (msg.name === name) {
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute("id", "new-my-message");
        let p = document.createElement('p');
        p.setAttribute("id", "name-time");
        p.innerHTML = `<i>Вы</i> ${msg.time}`;
        td.appendChild(p);
        td.appendChild(document.createTextNode(msg.text));
    } else {
        td.setAttribute("id", "new-message");
        let p = document.createElement('p');
        p.setAttribute("id", "name-time");
        p.innerHTML = `<i>${msg.name}</i> ${msg.time}`;
        td.appendChild(p);
        td.appendChild(document.createTextNode(msg.text));
        tr.appendChild(td);
        td = document.createElement('td');
    }
    tr.appendChild(td);
    table.appendChild(tr);
})

socket.on('first-connection', function () {
    Swal.fire({
        icon: 'success',
        title: 'Добро пожаловать в чат!',
        showConfirmButton: false,
        timer: 1500
    })
})

function send(text) {
    socket.emit('send-message', text)
};

function getURLVar(key) {
    var query = String(document.location.href).split('?');
    if (query[1]) {
        var part = query[1].split('&');
        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');
            if (data[0] == key && data[1]) return data[1];
        }
    }
    return '';
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}