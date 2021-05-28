import React, { useState } from 'react';
import axios from 'axios';

function MainBlock({ onLogin }) {
	const [roomId, setRoomId] = React.useState('');
	const [userName, setUserName] = React.useState('');
	const [isLoad, setLoad] = React.useState(false);

	const onEnter = async () => {
		if (!roomId || !userName) {
			return alert("Empty field");
		}
		const obj = {
			roomId,
			userName
		};
		setLoad(true);
		await axios.post('/rooms', obj);
		onLogin(obj);
	};

	return (
		<div className="main-block">
			<h1>Chat Web-Socket</h1>
			<input type="text" placeholder="ID Room" value={roomId} onChange={(event) => setRoomId(event.target.value)}></input>
			<input type="text" placeholder="Nickname" value={userName} onChange={(event) => setUserName(event.target.value)}></input>
			<button disabled={isLoad} onClick={onEnter} className="btn btn-succes">
				{isLoad ? 'Enter...' : 'Enter'}
			</button>
		</div>
	);
}

export default MainBlock