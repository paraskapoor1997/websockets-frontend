import React, { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { UserContext } from './UserContext';
import ChatScreen from './ChatScreen';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [room, setRoom] = useState("")

  const { loggedinUser, setLoggedinUser } = useContext(UserContext);
  console.log("selectedUser", selectedUser)
  useEffect(() => {
    const loggedinUserId = loggedinUser.id.toString();
    const toUserId = selectedUser?._id.toString();
    const createRoomId = [loggedinUserId, toUserId].sort().join("");
    setRoom(createRoomId)
  }, [selectedUser])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setUsers(jsonResponse.users.filter(u => u.id !== loggedinUser.id));
      }
    };
    fetchUsers();
  }, [loggedinUser]);

  const handleLogout = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, { method: 'GET', credentials: 'include' });
    if (response.ok) {
      setLoggedinUser(null);
    }
  };

  return (
    <div className="whatsapp-container">
      {/* Left Panel */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>{loggedinUser.username}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="info-card">
          <h3>Total Users: {users.length}</h3>
        </div>

        <ul className="user-list">
          {users.map(user => (
            <li
              key={user._id}
              className={`user-list-item ${selectedUser?._id === user._id ? 'active' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
              <span className="role">{user.role}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="chat-panel">
        {selectedUser ? (
          <ChatScreen selectedUser={selectedUser} room={room} />
        ) : (
          <div className="empty-chat">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
