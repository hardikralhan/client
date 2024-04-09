import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {ToastError} from '../common/Toast'
import { useNavigate } from "react-router-dom";
import { LOGIN_USER, ADD_RECIPE } from '../gqlOperations/mutations';

import React from 'react'
import { useMutation } from '@apollo/client';

export const AddRecipe = (props) => {

    const [name,setName] = useState("")
    // const [id,setId] = useState(101)
    const [inputValueIngredients, setInputValueIngredients] = useState(''); // State to hold input value
  const [ingredients,setIngredients] = useState([]);
  const [inputValueInstructions, setInputValueInstructions] = useState(''); // State to hold input value
  const [instructions,setInstructions] = useState([]);
  const [prepTimeMinutes,setPrepTimeMinutes] = useState(0)
  const [cookTimeMinutes,setcookTimeMinutes] = useState(0)
  const [servings,setServings] = useState(0)
  const [difficulty,setDifficulty] = useState("")
  const [cuisine,setCuisine] = useState("")
  const [caloriesPerServing,setCaloriesPerServing] = useState(0)
  const [inputValueTags, setInputValueTags] = useState(''); // State to hold input value
  const [tags,setTags] = useState([]);
  const [image,setImage] = useState("https://cdn.dummyjson.com/recipe-images/23.webp")
  const [rating,setRating] = useState(0)
  const [reviewCount,setReviewCount] = useState(0)
  const [inputValueMealType, setInputValueMealType] = useState(''); // State to hold input value
  const [mealType,setMealType] = useState([]);

  const [addRecipe,{data,loading,error}] = useMutation(ADD_RECIPE)
  const navigate = useNavigate();

  if(!localStorage.getItem("token")){
    navigate("/login")
    return <h1 className='text-9xl'>unauthorized</h1>
    }

  const validateData = () =>{debugger
    if(ingredients.length != 0 && instructions.length != 0
    && difficulty && cuisine && tags.length != 0 && mealType.length != 0){
        ToastError("click on Add button as well")
        return true
    }
    else return false
  }

  if(loading) return <h1>Loading</h1>
  if(error){ 
    ToastError("")
    console.log(error);
  }
  if(data){
    console.log(data);
    navigate('/recipe', { state: name });
    }

  const handleClick = async(e) =>{
    
      try { 
          
        if(validateData()){ 
        e.preventDefault()

        console.log({
            "name": name,
            "prepTimeMinutes":parseInt(prepTimeMinutes),
            "rating":parseInt(rating),
            "reviewCount":parseInt(reviewCount),
            "servings":parseInt(servings),
            "tags":tags,
            "mealType":mealType,
            "instructions":instructions,
            "ingredients":ingredients,
            "image":image,
            "difficulty":difficulty,
            "cuisine":cuisine,
            "cookTimeMinutes":parseInt(cookTimeMinutes),
            "caloriesPerServing":parseInt(caloriesPerServing)
        })

        addRecipe({
            variables:{
                recipes: {
                    "name": name,
                    "prepTimeMinutes":parseInt(prepTimeMinutes),
                    "rating":parseInt(rating),
                    "reviewCount":parseInt(reviewCount),
                    "servings":parseInt(servings),
                    "tags":tags,
                    "mealType":mealType,
                    "instructions":instructions,
                    "ingredients":ingredients,
                    "image":image,
                    "difficulty":difficulty,
                    "cuisine":cuisine,
                    "cookTimeMinutes":parseInt(cookTimeMinutes),
                    "caloriesPerServing":parseInt(caloriesPerServing)
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
      <p className="text-center text-lg font-medium">Add Recipe</p>

      <div>
            <label htmlFor="name" className="sr-only">Name</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setName(e.target.value)}}
                    value={name}
                    name= "name"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter recipe name"
                />
            </div>
      </div>

        <div>
            <label htmlFor="password" className="sr-only">Ingredients</label>

            <div className="relative">
            <input
            style={{ color: "#646E82", important: true }}

                onChange={(e)=>{setInputValueIngredients(e.target.value)}}
                value={inputValueIngredients}
                name= "inputValueIngredients"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Ingredients"
            />
            <button
                onClick={(e) => { 
                    console.log(inputValueIngredients)
                    if (inputValueIngredients.trim() !== '') {
                        setIngredients([...ingredients, inputValueIngredients.trim()]); // Add input value to array state
                        setInputValueIngredients(''); // Clear input value after adding
                    }
                }}
                    type="submit"
                    className="block w-1/2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                    + Add Ingredients
                </button>
            </div>
        </div>

        <div>
            <label htmlFor="" className="sr-only">Instructions</label>

            <div className="relative">
            <input
            style={{ color: "#646E82", important: true }}

                onChange={(e)=>{setInputValueInstructions(e.target.value)}}
                value={inputValueInstructions}
                name= "inputValueInstructions"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Instructions"
            />
            <button
                onClick={(e) => { 
                    console.log(inputValueInstructions)
                    if (inputValueInstructions.trim() !== '') {
                        setInstructions([...instructions, inputValueInstructions.trim()]); // Add input value to array state
                    }
                    setInputValueInstructions(''); // Clear input value after adding
                }}
                    type="submit"
                    className="block w-1/2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                    + Add Instructions
                </button>
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Prep Time Minutes</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setPrepTimeMinutes(e.target.value)}}
                    value={prepTimeMinutes}
                    name= "prepTimeMinutes"
                    type="Number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Number"
                />
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Cook Time Minutes</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setcookTimeMinutes(e.target.value)}}
                    value={cookTimeMinutes}
                    name= "cookTimeMinutes"
                    type="Number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Number"
                />
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Servings</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setServings(e.target.value)}}
                    value={servings}
                    name= "servings"
                    type="Number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Number"
                />
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Difficulty</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setDifficulty(e.target.value)}}
                    value={difficulty}
                    name= "difficulty"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Difficulty"
                />
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Cuisine</label>

            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setCuisine(e.target.value)}}
                    value={cuisine}
                    name= "cuisine"
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Cuisine"
                />
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Calories Per Serving</label>
            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setCaloriesPerServing(e.target.value)}}
                    value={caloriesPerServing}
                    name= "caloriesPerServing"
                    type="number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Calories Per Serving"
                />
            </div>
        </div>

        <div>
            <label htmlFor="" className="">Tags</label>

            <div className="relative">
            <input
            style={{ color: "#646E82", important: true }}

                onChange={(e)=>{setInputValueTags(e.target.value)}}
                value={inputValueTags}
                name= "inputValueTags"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Tags"
            />
            <button
                onClick={(e) => { 
                    console.log(inputValueTags)
                    if (inputValueTags.trim() !== '') {
                        setTags([...tags, inputValueTags.trim()]); // Add input value to array state
                    }
                    setInputValueTags(''); // Clear input value after adding
                }}
                    type="submit"
                    className="block w-1/2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                    + Add Tags
                </button>
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Rating</label>
            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setRating(e.target.value)}}
                    value={rating}
                    name= "rating"
                    type="number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Rating"
                />
            </div>
        </div>

        <div>
            <label htmlFor="name" className="">Review Count</label>
            <div className="relative">
                <input 
                     style={{color :"#646E82", Important : true}}
                    onChange={(e)=> {setReviewCount(e.target.value)}}
                    value={reviewCount}
                    name= "reviewCount"
                    type="number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Review Count"
                />
            </div>
        </div>

        <div>
            <label htmlFor="" className="">Meal Type</label>

            <div className="relative">
            <input
            style={{ color: "#646E82", important: true }}

                onChange={(e)=>{setInputValueMealType(e.target.value)}}
                value={inputValueMealType}
                name= "inputValueMealType"
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Meal Type"
            />
            <button
                onClick={(e) => { 
                    console.log(inputValueMealType)
                    if (inputValueMealType.trim() !== '') {
                        setMealType([...mealType, inputValueMealType.trim()]); // Add input value to array state
                    }
                    setInputValueMealType(''); // Clear input value after adding
                }}
                    type="submit"
                    className="block w-1/2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                >
                    + Add Meal Type
                </button>
            </div>
        </div>
        
      <button
       onClick={(e) => { handleClick(e) }}
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
      >
        Click to Add Recipe
      </button>
    </div>
  </div>
</div>
</div>
  )
}
