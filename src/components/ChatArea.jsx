import React, { useState, useEffect } from 'react';

const ChatArea = ({ selectedUser, sendMessage, messagesArr, myProfileData }) => {
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setMsg(e);
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    sendMessage(msg);
    setMsg('');
  };

  // Log messagesArr when it changes
  useEffect(() => {
    console.log('Updated messagesArr:', messagesArr);
  }, [messagesArr]);

  return (
    <div className="flex flex-col h-full w-full border">
      <div className="flex-none p-2 border-b">
        {selectedUser ? (
          <div className="flex gap-2 items-center border-b p-2">
            <img
              src={`http://localhost:8080${selectedUser.profilePicture}`}
              alt=""
              className="w-12 h-12 rounded-full object-cover object-center"
            />
            <div className="text-center leading-3">
              <span className="ml-2 text-lg block">{selectedUser.username}</span>
              <span className="text-[12px] text-gray-500">
                {selectedUser.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-lg">Select User to start conversation</div>
        )}
      </div>

      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto p-2">
        {messagesArr.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg text-white ${
                msg.sender === 'me' ? 'bg-green-500' : 'bg-gray-300 text-black'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-none border-t p-2">
        <form className="flex w-full items-center">
          <textarea
            value={msg}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Type Your Message"
            className="flex-1 h-10 border border-gray-300 p-2 resize-none overflow-hidden"
          />
          <button
            type="submit"
            onClick={(e) => handleSendMsg(e)}
            className="bg-blue-500 text-white px-5 py-2 h-10 flex-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
