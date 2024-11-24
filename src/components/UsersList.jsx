import React, { useState } from 'react'

const UsersList = ({ users, myProfileData, onUserSelect }) => {
  // const [selectedUser, setSelectedUser] = useState({})
  const handleUserSelect =(user)=>{
    // setSelectedUser(user)
    onUserSelect(user)
  }
  return (

      <div className='flex flex-col justify-between h-[100vh]'>
        <div className='flex flex-col gap-4'>
        {
          users.map((user) =>
            
            <div key={user._id} className='flex items-center'> 
             <span className='relative'> <img src={`http://localhost:8080${user.profilePicture}`} alt="" className='w-12 h-12 rounded-full object-cover object-center' />
             <span
              className={`block w-3 h-3 rounded-full absolute top-0 right-0 ${user.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
            ></span>
             </span>
             <div className='flex flex-col ml-2'>
             <p onClick={()=>handleUserSelect(user)} className='text-lg'> {user.username}</p>
             <p className="block text-sm text-gray-500">{user?.lastMessage?.content}</p>
             </div>

        
            </div>
          )
        }
        </div>

        <div>
          {
            myProfileData && (
              <div className='flex items-center'>
                <span className='relative'> <img src={`http://localhost:8080${myProfileData.profilePicture}`} alt="" className='w-12 h-12 rounded-full object-cover object-center' />
                <span className='block w-3 h-3 bg-green-500 rounded-full absolute top-0 right-0'></span>
                </span>
                <span className='ml-2 text-lg'> {myProfileData.username}</span>
              </div>
          )}
        </div>
      </div>
 
  )
}

export default UsersList
