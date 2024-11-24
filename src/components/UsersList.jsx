import React from 'react'

const UsersList = ({ users }) => {
  console.log("users in userlist component", users)
  return (

      <div className='flex flex-col gap-4 h-[100vh]'>
        {
          users.map((user) =>
            // Changed: added a unique "key" prop to the "p" tag
            <div key={user._id} className='flex items-center'> 
             <span className='relative'> <img src={`http://localhost:8080${user.profilePicture}`} alt="" className='w-12 h-12 rounded-full object-cover object-center' />
             <span className='block w-3 h-3 bg-gray-500 rounded-full absolute top-0 right-0'></span>
             </span>
              <span className='ml-2 text-lg'> {user.username}</span>
            </div>
          )
        }
      </div>
 
  )
}

export default UsersList
