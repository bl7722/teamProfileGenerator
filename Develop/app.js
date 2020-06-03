const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
    

    inquirer
        .prompt([
        {
            type: "list",
            message:"Employee role?",
            name:"role",
        },
        {
            message: "Employee Name?",
            name:"name"
            
        },
        {
            message: "Employee Id?",
            name:"id"
            
        },
        {
            message: "Employee email?",
            name:"email"
            
        },

        ])

        
fs.writeFile(outputPath, render(employees), function(err){
    if (err) throw err;});
