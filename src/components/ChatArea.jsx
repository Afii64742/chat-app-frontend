import React from 'react'

const ChatArea = () => {
  return (
    <div className='flex flex-col justify-end h-full '>
      <form className="flex w-full space-x-2"> {/* Ensure form takes full width */}
        <textarea 
          placeholder='Type Your Message' 
          className='flex-1 h-10 border border-gray-300 p-2' /> {/* flex-1 makes textarea take all available space */}
        <button 
          type='submit' 
          className='bg-blue-500 text-white px-5 py-2 h-10 flex-none'> {/* flex-none to prevent button from growing */}
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatArea
