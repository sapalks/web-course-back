import React, { useReducer } from 'react';
import JoinBlock from './components/joinBlock';
import Chat from './components/Chat';
import reducer from './reducer';
import axios from 'axios'

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'IS_AUTH',
      payload: obj
    });
    //socket.emit('ROOM:JOIN', obj);
    await axios.post('/connect', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    setUsers(data.users);

  }
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  }

  const checkMessages = (messages) => {
    dispatch({
      type: 'SET_MESSAGES',
      payload: messages
    });
  }
  
  const onSubscribe = async (obj) => {
    dispatch({
      type: 'CHECK',
      payload: obj
    });
    try {
      const { data } = await axios.get(`/rooms/${obj.roomId}`);
      setUsers(data.users);
      checkMessages(data.messages);
      //console.log(obj);
      // const p = obj.userName
      // console.log(p);
      await axios.post(`/check/${obj.roomId}`, { userName: obj.userName});
    }
    catch {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await onSubscribe(obj);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    await onSubscribe(obj);
  }


  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,

    });
  }

  return (
    <div>
      {!state.isAuth ? <JoinBlock onLogin={onLogin} onSubscribe={onSubscribe}></JoinBlock> : <Chat {...state} onAddMessage={addMessage}></Chat>}
    </div>

  );
}

export default App;
