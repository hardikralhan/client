const typeDefs = `
            type User{
                userId:String!
                firstName:String!
                lastName:String!
                email:String!
                password: String
            }
            type Recipe{
                id:Int
                name: String
                ingredients: [String]
                instructions: [String]
                prepTimeMinutes: Int
                cookTimeMinutes: Int
                servings: Int
                difficulty: String
                cuisine: String
                caloriesPerServing: Int
                tags: [String]
                userId: String
                image: String
                rating: Float
                reviewCount: Int
                mealType: [String]
            }
            type Token{
                token:String
            }
            type Query{
                getUsers: [User]
                getAllRecipes(page: Int): [Recipe]
                getRecipeByName(name: String!): Recipe
                getRecipeByMealtype(mealType: String!, page: Int): [Recipe]
                getRecipeByCuisine(cuisine: String!, page: Int): [Recipe]
                getRecipeByDifficulty(difficulty: String!,  page: Int): [Recipe]
                getRecipeByTags(tags: String!, page: Int): [Recipe]
            }
            type Mutation{
                signUpUser(userNew:userInput!): User
                signinUser(userSignin:UserSigninInput!):Token
                addRecipe(recipes:recipesInput!): Recipe
            }
            input userInput{
                firstName:String!
                lastName:String!
                email:String!
                password:String!
            }
            input UserSigninInput{
                email:String!
                password:String!
            }
            input recipesInput{
                name: String
                ingredients: [String]
                instructions: [String]
                prepTimeMinutes: Int
                cookTimeMinutes: Int
                servings: Int
                difficulty: String
                cuisine: String
                caloriesPerServing: Int
                tags: [String]
                image: String
                rating: Float
                reviewCount: Int
                mealType: [String]
            }
        `
module.exports = typeDefs