import { Routes, Route } from "react-router-dom";
import {Login} from "./components/Login";
import { Toaster } from 'react-hot-toast';
import { SignUp } from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Cuisine from "./components/Cuisine";
import Recipe from "./components/Recipe";
import { AddRecipe } from "./components/AddRecipe";

function App() {
  return (
    <>
      <Toaster></Toaster>
      <>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/signUp" element={<SignUp/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/cuisine" element={<Cuisine/>}/>
          <Route exact path="/recipe" element={<Recipe/>}/>
          <Route exact path="/add-recipe" element={<AddRecipe/>}/>
        </Routes>
      </>
    </>
  );
}

export default App;
