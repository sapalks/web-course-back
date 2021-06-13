import React, { useState } from 'react';
import axios from 'axios';
import socket from '../socket';

function JoinBlock({onLogin}) {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if(!roomId || !userName) {
            alert("Введите имя пользователя и номер комнаты");
            return;
        }
        const obj = {
            roomId,
            userName
        }
        setLoading(true);
        await axios.post('/rooms', obj);
        onLogin(obj);

      //  console.log(roomId, userName);
    }
    return (<div className="main">
        <div className="wrap">
            <input type="text" className="input__text input__text_first" placeholder="ID room" value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
            <input type="text" className="input__text" placeholder="Имя" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <button disabled={isLoading} className="btn__enter" onClick={onEnter}>
                {isLoading ? "ВХОД..." : "Войти"}
            </button>
        </div>
    </div>);
}

export default JoinBlock;