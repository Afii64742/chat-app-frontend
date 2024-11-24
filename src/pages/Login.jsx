import { React , useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const Login = () => {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleLoginAPI = async(e) =>{
    e.preventDefault()
    try{
    const response = await axios.post("http://localhost:8080/auth/login", formData)
    Cookies.set("token", response.data.token, {expires:1})
    navigateTo("/chatroom")
    }catch(err){
      console.log("Error in Login API=>", err)
    }
  
  }
  return (
    <div className='container'>
      <h1>Login User</h1>
     <form  onSubmit={handleLoginAPI}>
     <input type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder='Enter Your Email'
      required
      className='form-control'
      />
      <input type="password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      placeholder='Enter Your Password'
      className='form-control'
      />
      <button type='submit' className='submit-btn'>Login</button>
     </form>

    </div>
  )
}

export default Login
