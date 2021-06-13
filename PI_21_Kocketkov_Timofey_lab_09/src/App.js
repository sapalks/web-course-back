import React, { useReducer } from 'react';
import JoinBlock from './components/joinBlock';
import Chat from './components/Chat';
import socket from './socket';
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
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    setUsers(data.users);
  }
  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,

    });
  }


  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;
  //console.log(state);
  return (
    <div>
      {!state.isAuth ? <JoinBlock onLogin={onLogin}></JoinBlock> : <Chat {...state} onAddMessage={addMessage}></Chat>}
    </div>

  );
}

export default App;
