
const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let employees = [];



const questions = {
    role : function() {
        return {
            message: "Which employee would you like to add to your team?",
            type: "list",
            name: "employee",
            choices: [
                "Engineer", 
                "Intern", 
                "I don't want to add anymore team members"
            ]
        }
    },
    information: function(employee, variable, information = variable) {
        return {
            message: `What is your ${employee}'s ${information}?`,
            type: "input",
            name: variable,
            validate: function(value){
                var string = value.match(/^\s*\S+.*/);
                if (string) {
                  return true;
                } else {
                  return "Please enter the information";
                }
            }
        }
    }
};


async function makeTeam(employee) {
    
    let { id } = await inquirer.prompt(questions.information(employee, "id"));
    let { name } = await inquirer.prompt(questions.information(employee, "name"));
    let { email } = await inquirer.prompt(questions.information(employee, "email"));

    switch (employee) {
        
        case "Manager":
            let { officenumber } = await inquirer.prompt(questions.information(employee, "officenumber"));
            employees.push(new Manager(name, id, email, officenumber));
            break;
            
        case "Engineer":
            let { github } = await inquirer.prompt(questions.information(employee, "github"));
            employees.push(new Engineer(name, id, email, github));
            break;

        case "Intern":
            let { school } = await inquirer.prompt(questions.information(employee, "school"));
            employees.push(new Intern(name, id, email, school));
            break;
    }
}


function getHTMLModule(file) {
    return readFile(file, "utf8");
}


async function generateHTML() {
    let Template = {
        Main: await getHTMLModule("./Templates/main.html"),
        Manager: await getHTMLModule("./Templates/manager.html"),
        Engineer: await getHTMLModule("./Templates/engineer.html"),
        Intern: await getHTMLModule("./Templates/intern.html")
    }

    let htmlReview = "";

    for (let employee of employees) {
        let html = Template[employee.constructor.name]
        .replace(/{id}/, employee.id)
        .replace(/{name}/, employee.name)
        .replace(/{email}/, employee.email);
        switch (employee.constructor.name) {
            case "Manager":
                html = html.replace(/{officenumber}/, employee.officenumber);
                break;
            case "Engineer":
                html = html.replace(/{github}/, employee.github);
                break;
            case "Intern":
                html = html.replace(/{school}/, employee.school);
                break;
        }
        htmlReview += html;
    }
    let completeHTML = Template["Main"].replace(/{employees}/, htmlReview);

    createHTML(completeHTML);
}


async function createHTML(html) {
    if (!fs.existsSync("./output")) {
        fs.mkdirSync("./output");
    }
    await writeFile("./output/team.html", html);
    console.log("HTML has been created to output.");
    return;
}


async function init() {

    await makeTeam("Manager");

    let employee = "";
    let exit = "I don't want to add anymore team members";

    while (employee != exit) {
        let { employee } = await inquirer.prompt(questions.role());

        if (employee === exit) {
            return generateHTML();
        }

        await makeTeam(employee);
    }
}

init();
