import React, { useState, useRef, useEffect, useContext } from 'react';
import './chatscreen.css';
import { UserContext } from './UserContext';
import { createSocketConnection } from './socket';

const ChatScreen = ({ room, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { loggedinUser } = useContext(UserContext);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit('joinChat', { username: loggedinUser.username, room });

    socket.on('messageReceived', ({ _id, id, text, time }) => {
      setMessages((prev) => [...prev, { _id, id, text, time }]);
    });

    socket.on('chatHistory', (msgs) => {
      const transformed = msgs.map(msg => ({
        _id: msg._id,
        id: msg.sender,
        text: msg.text,
        time: msg.time
      }));
      setMessages(transformed);
    });

    return () => socket.disconnect();
  }, [selectedUser, room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    const socket = createSocketConnection();
    socket.emit('sendMessage', { username: loggedinUser.id, room, text: input });
    setInput('');
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="avatar">{selectedUser.username.charAt(0).toUpperCase()}</div>
          <div>
            <h3>{selectedUser.username}</h3>
            <span className="online-status">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`message ${msg.id === loggedinUser.id ? 'user-message' : 'bot-message'}`}
          >
            {msg.id !== loggedinUser.id && <div className="avatar">{selectedUser.username.charAt(0).toUpperCase()}</div>}
            <div className="message-content">
              <p>{msg.text}</p>
              {msg.time && <span className="timestamp">{msg.time}</span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-container">
        <button className="emoji-btn">😊</button>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
