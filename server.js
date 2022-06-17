const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log("Connected to employees_db")
);

function ask() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "What would you like to do?",
            choices: ["View all Departments", "View all roles", "View all employees", "Add a Department", "Add a role", "Add an employee", "Update an employee role"]
        },
    ])
        .then(answers => {
            switch (answers.start) {
                case "View all Departments":
                    console.log('View all departments:')
                    viewDepartments();
                    break;
                case "View all roles":
                    console.log("View all roles:")
                    viewRoles();
                    break;
                case "View all employees":
                    console.log("View all employees:")
                    viewEmployees();
                    break;
                case "Add a Department":
                    console.log("Add a department:")
                    addDepartment();
                    break;
                case "Add a role":
                    break;
                case "Add an employee":
                    break;
                case "Update an employee role":
                    break;
                default:
                    console.log("Please choose an option.");
            }
        });
};

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "addDepartment"
    })
        .then(({ addDepartment }) => {
            db.query(`INSERT INTO department (name) VALUES ("${addDepartment.name}")`)
            console.log(`Added ${addDepartment} to the database.`)
            ask();
        })
};

const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table(results);
        ask();
    })
};
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.table(results);
        ask();
    })
};
const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.table(results);
        ask();
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "role"
        },
        {
            type: "number",
            message: "What is the salary of the role?",
            name: "salary"
        },
        {
            type: "list",
            choices: departments,
            message: "What departmemnt does the role belong to?",
            name: "whichDepartment"
        }
    ]).then(addRoleAnswers => {
        addRoleAnswers.addRole(addRoleAnswers.role, addRoleAnswers.salary);
        ask();
    })
};

ask();