import React, { useEffect, useState,useCallback  } from 'react'
import {
    useQuery
} from '@apollo/client'
import {
    GET_ALL_RECIPES_BY_NAME
} from '../gqlOperations/queries'
import {useLocation, useNavigate} from 'react-router-dom'

export default function () {

    let location = useLocation()
    let navigate = useNavigate()
    let {state} = location
    console.log(state);
    let {loading,error,data} = useQuery(GET_ALL_RECIPES_BY_NAME,{
        variables: {
            "name": state
        }
    })
    if(!localStorage.getItem("token")){
        navigate("/")
        return <h1 className='text-9xl'>unauthorized</h1>
    }
    if(loading) return <h1 className='text-9xl'>Loading</h1>
    if(error){
        console.log(error.message)
    }
    if(data){
        console.log(data)
    }
    
  return (
    <div className='text-base'>
    <img className='w-96 h-96' src={data.getRecipeByName.image}></img>
     <p><b>Name:</b> {data.getRecipeByName.name}</p>
     <p><b>Cuisine:</b> {data.getRecipeByName.cuisine}</p>
     <div className=''>
     <b>Ingredients:</b>{data.getRecipeByName.ingredients.map((recipe)=>{
        return(
            <ul className='ml-11'>
                <li className='text-justify'>
                    {recipe}
                </li>
            </ul>
        )
     })}
     </div>
     <div className=''>
     <b>Instructions:</b>{data.getRecipeByName.instructions.map((recipe)=>{
        return(
            <ul className='ml-11'>
                <li className='text-justify'>
                    {recipe}
                </li>
            </ul>
        )
     })}
     </div>
     <div className=''>
     <b>Tags:</b>{data.getRecipeByName.tags.map((recipe)=>{
        return(
            <ul className='ml-11'>
                <li className='text-justify'>
                    {recipe}
                </li>
            </ul>
        )
     })}
     </div>
    </div>
  )
}
