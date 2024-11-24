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
            // Changed: added a unique "key" prop to the "p" tag
            <div key={user._id} className='flex items-center'> 
             <span className='relative'> <img src={`http://localhost:8080${user.profilePicture}`} alt="" className='w-12 h-12 rounded-full object-cover object-center' />
             <span
              className={`block w-3 h-3 rounded-full absolute top-0 right-0 ${user.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
            ></span>
             </span>
              <span onClick={()=>handleUserSelect(user)} className='ml-2 text-lg'> {user.username}</span>
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
