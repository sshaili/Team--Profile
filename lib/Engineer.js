const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(id, name, email, github) {
        super(id, name, email, github);
        this.github = github;
        this.role = "Engineer";
    }
    getRole(){
        return this.role;
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;