const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
let choices = [];
let employees = [];
var isManager = false

const app = function(){
    if(isManager === false){
    choices = [ "Manager", "Engineer", "Intern"]
    }
    else if(isManager == true){
        choices = [ "Engineer", "Intern"]
    };
    
    
    console.log("-----------------------");
    
    inquirer
        .prompt([
            {
                type: "list",
                name:"role",
                message:"Employee role?",
                choices: choices
            },
            {
                type: "input",
                name:"name",
                message: "Employee Name?",
                
                validate: function (input) {
                    if (input !== null || input !== undefined || input==="") {
                        return true;
                    }
                    return "Must Enter Name";
                }
            },
            {
                type: "input",
                name:"id",
                message: "Employee Id?",
                
                validate: function (input) {
                    if (input !== null || input !== undefined || input==="") {
                        return true;
                    }
                    return "Must Enter Id";
                }
            },
            {
                type: "input",
                name:"email",
                message: "Employee email?",
                
                validate: function (input) {
                    if (input.includes("@") === true && input.includes(".com") === true) {
                        return true;
                    }
                    return "Must Enter Email";
                }
            },
        ]).then(function(response){
            if(response.role === "Manager"){
                isManager = true
                inquirer
                    .prompt(
                        {
                        type: "number",
                        name:"officeNumber",
                        message:"Manager Office Number?",
                        
                        validate: function (input) {
                            if (input !== null || input !== undefined || input==="") {

                                return true;
                            }
                            return "Must Enter Office Number";
                        }
                        }
                    ).then(function(resp){
                        const manager = new Manager(response.name,response.id, response.email, resp.officeNumber)
                        employees.push(manager);
                        inquirer.prompt({
                            type: "confirm",
                            message: "Add New Employee?",
                            name:"verify"
                        }).then(function(restart){
                            if(restart.verify === true){
                                app();
                            }
                            else{
                                write();
                                return false;
                            }
                        })
                    })
            }
            else if(response.role === "Engineer"){
                inquirer
                    .prompt(
                        {
                        name:"github",
                        message:"Input Engineer's Github Username",
                        
                        validate: function (input) {
                            if (input !== null || input !== undefined || input ==="") {

                                return true;
                            }
                            return "Must Enter Github Username";
                        }
                        }
                    ).then(function(resp){
                        const engineer = new Engineer(response.name,response.id, response.email, resp.github)
                        employees.push(engineer);
                        inquirer
                        .prompt({
                            type: "confirm",
                            name:"verify",
                            message: "Add New employee?"
                        }).then(function(restart){
                            if(restart.verify === true){
                                app();
                            }
                            else{
                                write();
                                return false;
                            }
                        })
                    })
            }
            else if(response.role === "Intern"){
                inquirer
                    .prompt(
                        {
                        name:"school",
                        message:"Input Intern's School Name",
                        
                        validate: function (input) {
                            if (input !== null || input !== undefined || input ==="") {
                                
                                return true;
                            }
                            return "Must Enter School Name";
                        }
                        }
                    ).then(function(resp){
                        const intern = new Intern(response.name,response.id, response.email, resp.school)
                        employees.push(intern);
                        inquirer.prompt({
                            type: "confirm",
                            name:"verify",
                            message: "Add New Employee?"
                        }).then(function(restart){
                            if(restart.verify === true){
                                app();
                            }
                            else{
                                write();
                                return false;
                            }
                        })
                    })
            }
        });
    }
const write = function(){
fs.writeFile(outputPath, render(employees), function(err){
if (err) throw err;});}
app();