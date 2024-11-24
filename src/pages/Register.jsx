import { React, useState } from 'react'
import axios from 'axios'
const Register = () => {
  const [formData, setFormData] = useState({
   firstName: '',
   lastName: '',
   username: '', 
   email:'',  
   password: '',
   profilePicture:null,
  })

  const handleRegisterApi = async(e) =>{
  e.preventDefault();
  const data = new FormData()
  data.append('firstName', formData.firstName)
  data.append('lastName', formData.lastName)
  data.append('username', formData.username)
  data.append('email', formData.email)
  data.append('password', formData.password)
  if(formData.profilePicture){
    data.append('profilePicture', formData.profilePicture)
  }
  try{
    const response = await axios.post('http://localhost:8080/auth/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data)
console.log(response)``
  }catch(err){
    console.log("Error in user register API =>" , err)
  }
  }

  return (
    <div className='container'>
      <h1>Register</h1>
<form  onSubmit={handleRegisterApi}>

<input 
     type="text"
     value={formData.firstName}
     onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
     placeholder='Enter Your First Name'
     required
     className='form-control'
     />

     <input 
     type="text" 
     value={formData.lastName} 
     onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
     placeholder='Enter Your Last Name'
     className='form-control'
     />

     <input 
     type="text"
     value={formData.username}
     onChange={(e)=> setFormData({ ...formData, username: e.target.value })}
     placeholder='Enter Your Username'
     required
     className='form-control'
     /> 

     <input 
     type="email"
     value={formData.email}
     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
     placeholder='Enter Your Email'
     required
     className='form-control'
      />

     <input 
     type="password"
     value={formData.password}
     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
     placeholder='Enter Your Password'
     required
     className='form-control'
     />

     <input 
     type="file"
     onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
     placeholder='Enter Your Profile Picture'
     required
     />
     
     <button type='submit' className='submit-btn'>Register</button>
</form>
  
    </div>
  )
}

export default Register
