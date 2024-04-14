import React, { useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {
    useQuery
} from '@apollo/client'

export default function Filter() {

    const [pageNumber,setPageNumber] = useState(1)
    
    let location = useLocation()
    let navigate = useNavigate()
    let array = []
    let {state} = location
    let {filter,query,variables} = state

    const [variable,setVariable] = useState(variables)
    
    let {loading,error,data} = useQuery(query,{
        variables: variable
    })

    if(!localStorage.getItem("token")){
        navigate("/login")
        return <h1 className='text-9xl'>unauthorized</h1>
    }

    if(loading) return <h1 className='text-9xl'>Loading</h1>
    if(error){
        console.log(error.message)
    }
    if(data){
        console.log(data)
        if(filter == "cuisine" && data.getRecipeByCuisine.length != 0){
            array = data.getRecipeByCuisine
        }else if(filter == "difficulty" && data.getRecipeByDifficulty.length != 0){
            array = data.getRecipeByDifficulty
        }else if(filter == "mealType" && data.getRecipeByMealtype.length != 0){
            array = data.getRecipeByMealtype
        }
        else if(filter == "tags" && data.getRecipeByTags.length != 0){
            array = data.getRecipeByTags
        }else{
            if(variable.page){
                setVariable({
                    ...variable,
                    page: 1
                })
            }
            setPageNumber(1)
        }
    }

    const handlePreviousClick = () =>{
        if(pageNumber>1){
            if(variable.page){
                setVariable({
                    ...variable,
                    page: pageNumber - 1
                })
            }
            setPageNumber(pageNumber - 1)
        }
    }

    const handleNextClick = () =>{
        if(variable.page){
            setVariable({
                ...variable,
                page: pageNumber + 1
            })
        }
        setPageNumber(pageNumber + 1)
    }
    
    return (
    <div>
        <div className="flex items-center justify-center p-4">
            <button onClick={handlePreviousClick} className="flex items-center justify-center px-3 h-8 text-md font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
            </button>:
            
            <button onClick={handleNextClick} href="#" className="flex items-center justify-center px-3 h-8 ms-3 text-md font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
            </button>
        </div>
        <div className='relative overflow-x-auto'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-base">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                    <th className='px-6 py-3'>S.no</th>
                    <th className='px-6 py-3'>Name</th>
                    <th className='px-6 py-3'>Image</th>
                    <th className='px-6 py-3'>Cuisine</th>
                    <th className='px-6 py-3'>Meal Type</th>
                    <th className='px-6 py-3'>Tags</th>
                    <th className='px-6 py-3'>Instructions</th>
                    </tr>       
                </thead>
                <tbody>
                {array.map((recipe,i)=>{
                    return(
                    <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{((pageNumber - 1)* 10) + (i+1)}</th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{recipe.name}</th>
                        <td className='px-6 py-4'><img className='max-h-96 max-w-56' src={recipe.image}></img></td>
                        <td className='px-6 py-4'>{recipe.cuisine}</td>
                        <td className='px-6 py-4'>
                        {recipe.mealType.map((inst,i)=>{
                            return(
                                <ul key={i}>
                                <li className="text-justify">{inst}</li>
                                </ul>
                            )
                        })}</td>
                        <td className='px-6 py-4'>
                        {recipe.tags.map((inst,i)=>{
                            return(
                                <ul key={i}>
                                <li className="text-justify">{inst}</li>
                                </ul>
                            )
                        })}</td>
                        <td className='px-6 py-4 w-auto'>{recipe.instructions.map((inst, i)=>{
                            return(
                                <ul key={i}>
                                <li className="text-justify">{inst}</li>
                                </ul>
                            )
                        })}</td>
                    </tr>
                    )
                })}
                    </tbody>
            </table>
        </div>
    </div>
  )
}
