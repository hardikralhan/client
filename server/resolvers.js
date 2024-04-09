const {} = require("crypto")
const {
    v4: uuidv4
} = require("uuid");
const User = require("./models/userModel")
const Recipe = require("./models/RecipeModel")
const errorHandler = require("./errorHandlers")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let limit = 10
const resolvers = {
    Query: {
        getUsers: async () => await User.find({}),
        getAllRecipes: async (_, {
            page
        }) => await Recipe.find({}).skip((page - 1) * limit).limit(limit),
        getRecipeByName: async (_, {
            name
        }) => await Recipe.findOne({
            name: {
                $regex: new RegExp(`^${name}$`, "i")
            }
        }),
        getRecipeByMealtype: async (_, {
            mealType,
            page
        }) => {

            let aggregate = [{
                    $match: {
                        mealType: {
                            $in: [new RegExp(`^${mealType}$`, "i")]
                        }
                    }
                },
                {
                    $skip: (page - 1) * limit
                },
                {
                    $limit: limit
                }
            ]
            let data = Recipe.aggregate(aggregate);
            return data
        },
        getRecipeByCuisine: async (_, {
            cuisine,
            page
        }) => await Recipe.find({
            cuisine: {
                $regex: new RegExp(`^${cuisine}$`, "i")
            }
        }).skip((page - 1) * limit).limit(limit),
        getRecipeByDifficulty: async (_, {
            difficulty,
            page
        }) => await Recipe.find({
            difficulty: {
                $regex: new RegExp(`^${difficulty}$`, "i")
            }
        }).skip((page - 1) * limit).limit(limit),
        getRecipeByTags: async (_, {
            tags,
            page
        }) => {

            let aggregate = [{
                    $match: {
                        tags: {
                            $in: [new RegExp(`^${tags}$`, "i")]
                        }
                    }
                },
                {
                    $skip: (page - 1) * limit
                },
                {
                    $limit: limit
                }
            ]
            let data = Recipe.aggregate(aggregate);
            return data
        }
    },
    // Recipe:{
    //     users: async(rec)=> await Recipe.
    // }
    // User: {
    //     quotes: (us) => quotes.filter(quote => quote.by == us.id) // us (User) is the parent of quotes
    // },
    Mutation: {
        signUpUser: async (_, {
            userNew
        }) => {
            const userId = uuidv4()
            let userExistsData = await User.findOne({
                email: userNew.email
            })
            if (userExistsData) {
                return errorHandler("User exists with same email", "BAD_REQUEST")
            }

            const hashedPassword = await bcrypt.hash(userNew.password, 12)

            const newUser = new User({
                ...userNew,
                userId: userId,
                password: hashedPassword
            })
            return await newUser.save()
        },
        signinUser: async (_, {
            userSignin
        }) => {
            const user = await User.findOne({
                email: userSignin.email
            })
            if (!user) {
                return errorHandler("User dosent exists with that email", "BAD_REQUEST")
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if (!doMatch) {
                return errorHandler("email or password in invalid", "BAD_REQUEST")
            }
            const token = jwt.sign({
                userId: user.userId
            }, process.env.JWT_SECRET_KEY)
            return {
                token
            }
        },
        addRecipe: async (_, {
            recipes
        }, {userId}) => {
            let latestId = await Recipe.findOne().sort({
                id: -1
            })
            latestId = latestId._doc.id + 1;
            const newRecipe = new Recipe({
                id: latestId,
                name:recipes.name,
                cuisine:recipes.cuisine,
                mealType:recipes.mealType,
                difficulty:recipes.difficulty,
                tags:recipes.tags,
                ingredients:recipes.ingredients,
                instructions:recipes.instructions,
                prepTimeMinutes:recipes.prepTimeMinutes,
                cookTimeMinutes:recipes.cookTimeMinutes,
                servings:recipes.servings,
                caloriesPerServing:recipes.caloriesPerServing,
                image:recipes.image,
                rating:recipes.rating,
                reviewCount:recipes.reviewCount,
                userId: userId
            });
            return newRecipe.save();
        }
    }
}

module.exports = resolvers