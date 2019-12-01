// Node modules
const inquirer = require("inquirer");
const fs = require("fs");

// Lib modules
const Engineer = require("./Application/Engineer");
const Intern = require("./Application/Intern");
const Manager = require("./Application/Manager");

function validate(input) {
    return input !== '';
}

function askQuestion(){
    const questions = [
        {
            message: "Please choose the team member you want to add?",
            type: "list",
            name: "member",
            choices: ["Engineer", "Intern", "I don't want to add anymore team members"]
        },
        {
            message: `What is your ${member.toLowerCase()}'s ${item}?`,
            type: "input",
            name: "information",
            validate: validate
        }
    ]
};


module.exports = askQuestion;

