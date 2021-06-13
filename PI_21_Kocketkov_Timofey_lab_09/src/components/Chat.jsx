import React, { useState } from 'react';
import axios from 'axios';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
    const [messageValue, setMessageValue] = React.useState('');

    const onSendMessage = () => {
        if(messageValue == '') {
            return;
        }
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            userName,
            text: messageValue
        });
        onAddMessage({
            userName,
            text: messageValue
        });      
        setMessageValue('');
    }
    return (
        <div className="main__chat">
            <div className="chat__wrap">

                <div className="chat__users">
                    <h2>Комната: {roomId}</h2>
                    <hr />
                    <h3>Пользователи ({users.length}) :</h3>
                    <ul>
                        {users.map((name, index) => (<li key={name + index} className="user">{name}</li>))}
                    </ul>

                </div>
                <div className="chat__messages_wrap">
                    <div className="chat__messages">
                        {
                            messages.map(message => <div className="message">
                                <p>{message.text}</p>
                                <div>
                                    <span>{message.userName}</span>
                                </div>

                            </div>)
                        }

                    </div>
                    <form action="">
                        <textarea name="" id="" rows="3"
                            value={messageValue}
                            onChange={(e) => setMessageValue(e.target.value)}
                            placeholder="Введите сообщение">

                        </textarea>
                        <button type="button" onClick={onSendMessage} className="btn__chat_enter">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
       
    );
}

export default Chat;