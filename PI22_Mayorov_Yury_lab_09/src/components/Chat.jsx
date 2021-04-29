import React from 'react';
import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
	const [messageValue, setMessageValue] = React.useState('');
	const messagesRef = React.useRef(null);

	const onSendMessage = () => {
		socket.emit('ROOM:NEW_MESSAGE', {
			userName,
			roomId,
			text: messageValue,
		});
		onAddMessage({ userName, text: messageValue });
		setMessageValue('');
	};

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 99999);
	}, [messages]);
	return (
		<div className="chat">
			<div className="chat-users">
				Room: <b>{roomId}</b>
				<br /><br />
				<b>Online ({users.length}):</b>
				<ul>
					{users.map((name, index) => (
						<li key={name + index}>{name}</li>
					))}
				</ul>
			</div>
			<div className="chat-messages">
				<div ref={messagesRef} className="messages">
					{messages.map((message) => (
						<div className="message">
							<div>
								<span>{message.userName}</span>
							</div>
							<p>{message.text}</p>
						</div>
					))}
				</div>
				<form>
					<textarea
						value={messageValue}
						onChange={(e) => setMessageValue(e.target.value)}
						className="form-control"
						placeholder="Type your text here..."
						rows="3"></textarea>
					<button onClick={onSendMessage} type="button" className="btn">Send</button>
				</form>
			</div>
		</div>
	);
}

export default Chat