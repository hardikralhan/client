const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name: String,
    ingredients: [String],
    instructions: [String],
    prepTimeMinutes: Number,
    cookTimeMinutes: Number,
    servings: Number,
    difficulty: String,
    cuisine: String,
    caloriesPerServing: Number,
    tags: [String],
    userId: String,
    image: String,
    rating: Number,
    reviewCount: Number,
    mealType: [String]
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe