import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UsersList from '../components/UsersList';
import ChatArea from '../components/ChatArea';
import { io } from 'socket.io-client';

const ChatRoom = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [myProfileData, setMyProfileData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messagesArr, setMessagesArr] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || token === undefined) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  const fetchUsersData = async () => {
    const response = await axios.get("http://localhost:8080/users", {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    setUsersList(response.data);
  };

  const fetchMyProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/me", {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      setMyProfileData(response.data);
    } catch (err) {
      console.log("Error fetching my profile data=>", err);
    }
  };

  useEffect(() => {
    fetchUsersData();
    fetchMyProfileData();
  }, [fetchUsersData]);

  useEffect(() => {
    fetchMyProfileData()
  }, [myProfileData]);

  useEffect(() => {
    if (!selectedUser) return;
    const fetchMessagesHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/chat/history/${selectedUser._id}`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        const formattedMessages = response.data.map((msg) => ({
          sender: msg.sender === myProfileData._id ? 'me' : msg.sender, // Mark sender as 'me' if it's you
          message: msg.message
        }));
        setMessagesArr(formattedMessages);
      } catch (err) {
        console.log("Error fetching messages history:", err);
      }
    };

    fetchMessagesHistory();
  }, [selectedUser, myProfileData]);

  useEffect(() => {
    if (!myProfileData._id) return; // Ensure myProfileData is loaded before socket initialization

    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    // Emit login event with user ID once socket is connected
    newSocket.on('connect', () => {
      newSocket.emit('login', myProfileData._id);
    });

    // Receiving message from the user
    newSocket.on('receiveMessage', (data) => {
      setMessagesArr((prevMessages) => [
        ...prevMessages,
        { sender: data.sender === myProfileData._id ? 'me' : data.sender, message: data.message }
      ]);
    });

    // Cleanup: Disconnect socket on component unmount
    return () => {
      newSocket.disconnect();
    };

  }, [myProfileData]); // Runs when myProfileData is updated

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const sendMessage = async (message) => {
    try {
      const response = await axios.post("http://localhost:8080/chat/message",
        {
          receiverId: selectedUser._id,
          message
        },
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );

      if (response.status === 201) {
        socket.emit('sendMessage', {
          sender: myProfileData._id,
          receiver: selectedUser._id,
          message,
        });

        setMessagesArr((prevMessages) => [
          ...prevMessages,
          { sender: 'me', message }, // Mark sent message as 'me'
        ]);
      }

    } catch (err) {
      console.log("Error in sending message");
    }
  };

  return (
    <div className='container'>
      <div className='flex'>
        <div className='border-r-2 px-6'>
          <UsersList users={usersList} myProfileData={myProfileData} onUserSelect={handleUserSelect} />
        </div>
        <div className='flex-1'>
          <ChatArea selectedUser={selectedUser} sendMessage={sendMessage} messagesArr={messagesArr} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
