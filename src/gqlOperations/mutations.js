import {gql} from '@apollo/client'
export const SIGNUP_USER = gql`
    mutation signUpUser ($userNew:userInput!){
        signUpUser(userNew: $userNew) {
            firstName
        }
    }
`
export const LOGIN_USER = gql`
mutation SigninUser($userSignin:UserSigninInput!){
    user:signinUser(userSignin:$userSignin){ 
      token
    }
  }
`

export const ADD_RECIPE = gql`
mutation addRecipe($recipes: recipesInput!){
    addRecipe(recipes: $recipes) {
        name
        prepTimeMinutes
        rating
        reviewCount
        servings
        tags
        userId
        mealType
        instructions
        ingredients
        image
        id
        difficulty
        cuisine
        cookTimeMinutes
        caloriesPerServing
    }
  }
`