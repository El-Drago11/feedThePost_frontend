import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Services/Operations/authApi';
import { useDispatch } from 'react-redux';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");

  const userLogin = (e)=>{
    e.preventDefault();
    dispatch(login(email,password,navigate))
  }


  return (
    <div className='flex flex-col-reverse lg:flex-row items-center w-11/12 justify-center max-w-maxContent gap-4 lg:gap-20 min-h-screen mx-auto'>
      <div className='flex flex-col p-4 gap-4 w-11/12 lg:w-[30%]'>
        <div className='text-4xl text-slate-5'>Login</div>
        <div className=' bg-slate-600 p-1 rounded-lg w-full'>
          <ul className='flex flex-row gap-4 text-slate-100'>
                <li className={`text-slate-25 px-2`}>
                  <div>
                    User : 11Rahulsinghrawat@gmail.com  <br/>
                    Admin : 101Rahulsinghrawat@gmail.com  <br/>
                    Password : Abc@123
                  </div>
                </li>
          </ul>
        </div>
        <form onSubmit={userLogin}>
          <label>
            <p className=' text-slate-50'>Email Address</p>
            <input required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email address' className='p-2 bg-slate-700 w-full rounded-md' id="userEmail"/>
          </label>
          <label>
            <p className='text-slate-50 mt-4'>Password</p>
            <input required type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className='p-2 bg-slate-700 w-full rounded-md' id="userPassword"/>
          </label>
          <div className='text-sm text-white font-extrabold text-right mt-4 hover:text-amber-400'><Link to={"/Signup"}>SignUp ?</Link></div>
          <button type="submit" className="bg-yellow-400 text-black w-full mt-4 py-2 px-4 rounded-full  hover:bg-yellow-500 transition-all duration-300 hover:cursor-pointer">LogIn</button>
        </form>
      </div>
    </div>
  )
}

export default Login