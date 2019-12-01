const askQuestion = require("./app") // import function from askQuestions.js file

// Initialize function to start the application 
// calling askQuestions function from askQuestions.js file

function init(){
    askQuestion();
}

init();

module.exports = init;