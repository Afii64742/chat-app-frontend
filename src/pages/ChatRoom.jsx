import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UsersList from '../components/UsersList';
import ChatArea from '../components/ChatArea';

const ChatRoom = () => {
  const navigate = useNavigate();
  const [ usersList, setUsersList] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token || token === undefined) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  const fetchUsersData = async()=>{
    const response = await axios.get("http://localhost:8080/users", {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    })
    setUsersList(response.data)

  }

useEffect(()=>{
  fetchUsersData()
}, [])

  return (
    <div className='container'>
    
      <div className='flex gap-4'>
        <div className=' border-r-2 px-6'><UsersList users = {usersList}/></div>
       <div> <ChatArea /></div>
      </div>
    </div>
  );
};

export default ChatRoom;

