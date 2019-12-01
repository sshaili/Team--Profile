const Employee = require("./Employee");

class Manager extends Employee {
    constructor(phone) {
        super(id, name);
        this.phone = phone;
    }

    getPhone(){
        return this.phone;
    }
}


module.exports = Manager;