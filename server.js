const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const ask = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "start",
            choices: ["View all Departments", "View all roles", "View all employees", "Add a Department", "Add a role", "Add an employee", "Update an employee role"] 
        },
    ])
    .then(answers => {
        switch(answers.selection) {
            case "View all Departments":
                break;
            case "View all roles":
                break;
            case "View all employees":
                break;
            case "Add a Department":
                break;
            case "Add a role":
                break;
            case "Add an employee":
                break;
            case "Update an employee role":
                break;
        }
    });
};

ask();