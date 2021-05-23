var socket;

function PublishForm(form) {
  function sendMessage(message) {
    if (socket !== undefined) {
      socket.emit('new_message', message)
    }
  }

  form.onsubmit = function () {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

function SubscribePane(elem, roomId, nickname) {
  socket = io.connect('http://localhost:5294');
  socket.emit("new_user", { nickname, roomId });

  function showMessage(data) {
    let message = data.message
    let nickname = data.nickname
    let date = data.date
    let div = document.createElement('div');
    div.classList.add('div-messages')
    let labelInfo = document.createElement('label');
    labelInfo.classList.add('label-message-info');
    let labelText = document.createElement('label');
    labelText.classList.add('label-message-text');
    labelInfo.append(`${nickname} | ${date}`)
    labelText.append(message);
    div.append(labelInfo)
    div.append(labelText);
    elem.append(div);
  }

  socket.on("new_message", (data) => {
    showMessage(data);
  })
}

