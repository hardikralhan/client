const express = require("express")
// const {
//     ApolloServer
// } = require("@apollo/server")
const {ApolloServer} = require("apollo-server-express")
const {
    expressMiddleware
} = require("@apollo/server/express4")
const cors = require("cors")
const bodyParser = require("body-parser")
const typeDefs = require("./schemaGql")
const resolvers = require("./resolvers")
const mongoose = require("mongoose")
const axios = require("axios")
const jwt = require('jsonwebtoken');
const Recipe = require("./models/RecipeModel")
const dotenv = require("dotenv");
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

// Fetch JSON data from the API and save it to the database
async function fetchAndSaveData() {
    try {
        // Check if there are any existing recipes in the database
        const existingRecipesCount = await Recipe.countDocuments();
        if(existingRecipesCount == 0){
            const response = await axios.get('https://dummyjson.com/recipes?limit=50');
            const {recipes} = response.data;
            await Recipe.insertMany(recipes);
            console.log('Data successfully fetched and saved to the database.');
        }
        else {
            console.log('Data already exists in the database. Skipping fetching and saving.');
        }
    } catch (error) {
        console.error('Error fetching or saving data:', error);
    }
}

async function startServer() {
    const app = express()
    const context = ({req})=>{
        const { authorization } = req.headers;
        if(authorization){
         const {userId} = jwt.verify(authorization,process.env.JWT_SECRET_KEY)
         return {userId}
        }
    }
    // middlewares
    app.use(bodyParser.json())
    app.use(cors())
    mongoose.connect(process.env.MONGO_CONNECTION)
        .then(() => {
            console.log('mongoose Connected successfully');
        })
        .catch((err) => {
            console.log(err)
        })

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context
    })

    await server.start()
    server.applyMiddleware({app})
    // app.use("/graphql", expressMiddleware(server))
    app.listen(4000, () => console.log(`Listening at 4000`))
}

startServer()
// Fetch and save data when the server starts
fetchAndSaveData();