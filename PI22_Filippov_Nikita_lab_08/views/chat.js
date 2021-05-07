function PublishForm(form, roomId, nickname) {

  function sendMessage(message) {
    fetch(`http://localhost:5294/publish`, {
      method: 'POST',
      body: JSON.stringify({ message: message, roomId: roomId, nickname: nickname })
    });
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

  function showMessage(message) {
    let ar = message.split(';');
    let div = document.createElement('div');
    div.classList.add('div-messages')
    let labelInfo = document.createElement('label');
    labelInfo.classList.add('label-message-info');
    let labelText = document.createElement('label');
    labelText.classList.add('label-message-text');
    labelInfo.append(`${ar[0]} | ${ar[1]}`)
    labelText.append(ar[2]);
    div.append(labelInfo)
    div.append(labelText);
    elem.append(div);
  }

  async function subscribe() {
    let response = await fetch(`http://localhost:5294/subscribe?roomId=${roomId}&random=${Math.random()}&nickname=${nickname}`);

    if (response.status == 502) {
      await subscribe();
    } else if (response.status != 200) {
      showMessage(response.statusText);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }
  subscribe();
}
