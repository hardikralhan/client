import {gql} from '@apollo/client'
export const GET_ALL_RECIPES = gql`
query getAllQuery($page: Int) {
    getAllRecipes(page: $page) {
        name
        cuisine
        ingredients
        difficulty
        tags
        mealType
        image
        rating
        instructions
    }
  }
`
export const GET_ALL_RECIPES_BY_CUISINE = gql`
query getAllQuery($cuisine: String!, $page: Int) {
    getRecipeByCuisine(cuisine: $cuisine, page: $page) {
        name
        cuisine
        ingredients
        difficulty
        tags
        mealType
        image
        rating
        instructions
    }
  }
`
export const GET_ALL_RECIPES_BY_DIFFICULTY = gql`
query getAllQuery($difficulty: String!, $page: Int) {
        getRecipeByDifficulty(difficulty: $difficulty, page: $page) {
            name
            cuisine
            ingredients
            difficulty
            tags
            mealType
            image
            rating
            instructions
        }
    }
`
export const GET_ALL_RECIPES_BY_NAME = gql`
query getAllQuery($name: String!) {
        getRecipeByName(name: $name) {
            name
            cuisine
            ingredients
            difficulty
            tags
            mealType
            image
            rating
            instructions
        }
    }
`