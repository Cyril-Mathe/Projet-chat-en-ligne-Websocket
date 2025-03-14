import React , { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

function Chat () {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleMessage = (msg) => {
            setMessages(messages => [...messages, msg]);
        };

        socket.on('chat message', handleMessage);

        return () => {
            socket.off('chat message', handleMessage);
        }

}, []);


const sendMessage =(e) => {
    e.preventDefault();
    if (message && name) {
        const msg = { name, message };
        socket.emit('chat message', msg);
        setMessage('');
    }
};

return (
    <div>
        <input type="text" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} />
        <ul>
            {messages.map((msg, index) => (
                <li key={index}>{msg.name} : {msg.message}</li>
                ))}
        </ul>
        <form onSubmit={sendMessage}>
        <input type="text" placeholder="Votre Message" value={message} onChange={(e) => setMessage (e.target.value)} />
        <button type="submit">Envoyer</button>
        </form>
    </div>
    
    );
}

export default Chat;
