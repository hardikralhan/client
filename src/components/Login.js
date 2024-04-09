import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastError} from '../common/Toast'
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from '../gqlOperations/mutations';

import React from 'react'
import { useMutation } from '@apollo/client';

export const Login = (props) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');

  const [SigninUser,{data,loading,error}] = useMutation(LOGIN_USER,{
    onCompleted(data){
        localStorage.setItem("token",data.user.token)
        navigate('/dashboard')
    }
    })
  const navigate = useNavigate();

  const validateData = () =>{
    if(email && password){
        return true   
    } 
    else return false
  }

  if(loading) return <h1>Loading</h1>
  if(error){ 
    ToastError("eoeoe")
    console.log(error);
  }
  if(data){
    console.log(data);
    }

  const handleClick = async(e) =>{
    
      try { 
          
        if(validateData()){ 
        e.preventDefault()
        console.log(email + " -- " + password);

        SigninUser({
            variables:{
                userSignin: {
                    email:email,
                    password:password
                }
            }
          })

      }else {
        ToastError("Please fill Details") 
      }
    } catch (error) {
        ToastError(error+"please enter valid email and password"); 
    }
  }

  return (
//     /*
//   Heads up! 👋

//   Plugins:
//     - @tailwindcss/forms
// */
<div className='py-20'> 
<div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">

    {/* <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      <img src= {logo}></img>
    </p>  */}

    <div
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
    >
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setEmail(e.target.value)}}
                    value={email}
                    name= "email"
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                />
            </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
          style={{ color: "#646E82", important: true }}

            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            name= "password"
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div>

      <button
       onClick={(e) => { handleClick(e) }}
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <Link className="underline" to="/signUp">Register Now</Link>
      </p>
    </div>
  </div>
</div>
</div>
  )
}
