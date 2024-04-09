import React, { useState } from 'react'
import {
    useQuery
} from '@apollo/client'
import {
    GET_ALL_RECIPES,GET_ALL_RECIPES_BY_CUISINE, GET_ALL_RECIPES_BY_DIFFICULTY
} from '../gqlOperations/queries'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Recipe from './Recipe';

export default function Dashboard() {
    const [pageNumber,setPageNumber] = useState(1)
    const [filter,setFilter] = useState("all_recipes")
    const [inputBox,setInputBox] = useState(false)
    const [inputBoxData,setInputBoxData] = useState('')
    const navigate = useNavigate();

    
    let query
    let variables = {}
    
    // if(filter == 'all_recipes'){
        query = GET_ALL_RECIPES
        variables = {page: pageNumber}
        // }
        
        let {loading,error,data,refetch} = useQuery(query,{
            variables: variables
        })
        if(!localStorage.getItem("token")){
            navigate("/")
            return <h1 className='text-9xl'>unauthorized</h1>
        }
        const filterOnClick = () =>{
        if(filter == 'cuisine'){
            query = GET_ALL_RECIPES_BY_CUISINE
            variables = {page: pageNumber, "cuisine": inputBoxData}  //inputBox
            array = data.getRecipeByCuisine
        }else if(filter == 'mealType'){
            
        }else if(filter == 'difficulty'){
            query = GET_ALL_RECIPES_BY_DIFFICULTY
            variables = {page: pageNumber, "difficulty": "Easy"}
        }else if(filter == 'tags'){
            query = GET_ALL_RECIPES
        }
        refetch()
    }
    const handleRecipeButton = () =>{
        navigate('/recipe', { state: inputBoxData });
    }

    if(loading) return <h1 className='text-9xl'>Loading</h1>
    if(error){
        console.log(error.message)
    }
    let array = []
    if(data){
        console.log(data)
        // if(filter == 'all_recipes'){
            array = data.getAllRecipes
        // }
        // else if(filter == 'cuisine'){
        //     array = data.getRecipeByCuisine
        // }else if(filter == 'mealType'){
            
        // }else if(filter == 'difficulty'){
        //     array = data.getRecipeByDifficulty
        // }else if(filter == 'tags'){
            
        // }
    }
    
    const handlePreviousClick = () =>{
        if(pageNumber>1){
            setPageNumber(pageNumber - 1)
        }
    }

    return ( 
        <div className=''>
            <div className='text-center text-6xl p-4'>
                <h1>All Recipes</h1>
            </div>
            <div className="flex items-center justify-center p-4">
            
                <button onClick={handlePreviousClick} className="flex items-center justify-center px-3 h-8 text-md font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                </button>:
            
                <button onClick={()=>setPageNumber(pageNumber + 1)} href="#" className="flex items-center justify-center px-3 h-8 ms-3 text-md font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </button>

                <div className='ml-24 mr-40 '>
                    
                Get Recipe Details
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder = "Recipe Name" type='text' onChange={(e)=>{setInputBoxData(e.target.value)}} value={inputBoxData} name = "inputBoxData"></input>

                <button onClick={handleRecipeButton} className="flex items-center justify-center px-3 h-8 text-md font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Get Recipe</button>
                </div>

                <div className='ml-24 mr-40 '>
                <button onClick={()=>{navigate("/add-recipe")}} className="flex items-center justify-center px-8 h-14 text-md font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Add a Recipe</button>
                </div>

                <div className="flex w-full px-3 mb-12">
                        <span className="text- font-semibold px-1"></span>
                        <select
                            style={{ fontSize: '1.2vw' }}
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value);
                                if(e.target.value == "selectFilter"){
                                    setInputBox(false)
                                }else setInputBox(true)
                            }}
                            className=""
                        >
                        <option value="selectFilter">Select Filter </option>
                        <option value="cuisine">Cuisine </option>
                        <option value="mealType">Meal Type </option>
                        <option value="difficulty">Difficulty </option>
                        <option value="tags">Tags</option>
                        </select>

                        {inputBox ? (<><input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder = {filter} type='text' onChange={(e)=>{setInputBoxData(e.target.value)}} value={inputBoxData} name = "inputBoxData"></input>
                            <button onClick={filterOnClick}> Button </button></>
                        ): ""}
                        
                    </div>
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