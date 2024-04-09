import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastError, ToastSuccess} from '../common/Toast'
import { useNavigate } from "react-router-dom";
import { SIGNUP_USER } from '../gqlOperations/mutations';

import React from 'react'
import { useMutation } from '@apollo/client';


export const SignUp = (props) => {

  const [formData, setFormdata] = useState({})
  const [signUpUser,{data,loading,error}] = useMutation(SIGNUP_USER)
  const navigate = useNavigate();

  if(loading) return <h1>Loading</h1>
  if(error){ 
    ToastError("eoeoe")
    console.log(error);
  }
  if(data){
    navigate("/")
  }

  const handleChange = (e)=>{
    setFormdata({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  // console.log("hello");

  const handleClick = async(e) =>{
    
      try {   
        if(formData.firstName && formData.lastName && formData.email && formData.password){
          e.preventDefault()
          console.log(formData);
          signUpUser({
            variables:{
                userNew: formData
            }
          })
          // navigate("/login")
        }
        else {
          ToastError("Please fill all details")
        }
    } catch (error) {
        ToastError(error+"please Fill details"); 
    }
  }

  return (
//     /*
//   Heads up! 👋

//   Plugins:
//     - @tailwindcss/forms
// */
<div className='py-20'> 
      {error && ToastError(error.message)}
      {error && ToastSuccess("Please login now")}

<div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg">

    {/* <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
      <img src= {logo}></img>
    </p>  */}

    <div
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white"
    >
      <p className="text-center text-lg font-medium">Create Account</p>

      <div>
        <label htmlFor="firstName" className="sr-only">First Name</label>

        <div className="relative">
          <input
          style={{ color: "#646E82", important: true }}

            onChange={handleChange}
            name= "firstName"
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter First Name"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="lastName" className="sr-only">Last Name</label>

        <div className="relative">
          <input
          style={{ color: "#646E82", important: true }}

            onChange={handleChange}
            name= "lastName"
            type="text"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Last Name"
            required
          />
        </div>
      </div>

      <div>
            <label htmlFor="email" className="sr-only">Email</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={handleChange}
                    name= "email"
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    required
                />
            </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
          style={{ color: "#646E82", important: true }}

            onChange={handleChange}
            name= "password"
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            required
          />
        </div>
      </div>

      <button
       onClick={handleClick}
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign Up
      </button>
    </div>
  </div>
</div>
</div>
  )
}
