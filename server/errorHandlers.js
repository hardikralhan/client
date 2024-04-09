const { GraphQLError } = require("graphql");

const errorHandler = (errorMessage, errorCode)=>{
    console.log(`---ERROR----> ${errorMessage}`);
    throw new GraphQLError(errorMessage, {
        extensions: {
          code: errorCode,
        }, 
    });
}

module.exports = errorHandler