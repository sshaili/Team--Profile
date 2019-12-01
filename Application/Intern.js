const Employee = require("./Employee");

class Intern extends Employee {
    constructor(school) {
        super(id, name);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;