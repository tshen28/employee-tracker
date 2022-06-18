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
                    addEmployee();
                    break;
                case "Update an employee role":
                    break;
                default:
                    console.log("Please choose an option.");
            }
        });
};

const addDepartment = async () => {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "addDepartment"
    })
        .then(res => {
            db.promise().query('INSERT INTO department (department_name) VALUES (?)', [res.addDepartment]);
            console.log(`${res.addDepartment} added.`)
            ask();
        }).catch(err => {
            console.log(err);
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

const allRoles = () => {
    return new Promise((fulfill, reject) => {
        const roles = [];
        db.query('SELECT title, id FROM role', (err, res) => {
            if (err) reject (err);
            for (let i = 0; i < res.length; i++) {
                roles.push({ title: res[i].title, id: res[i].id })
            }
            fulfill(roles)
        })
    })
};

const allDepartments = () => {
    return new Promise((fulfill, reject) => {
        const departments = [];
        db.query('SELECT title, id FROM department', (err, res) => {
            if (err) reject (err);
            for (let i = 0; i < res.length; i++) {
                departments.push({ department: res[i].department_name, id: res[i].id })
            }
            fulfill(departments)
        })
    })
};

const addEmployee = async () => {
    const role = await allRoles();
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Enter employee's first name."
        },
        {
            name: "last",
            type: "input",
            message: "Enter employee's last name."
        },
        {
            name: "role",
            type: "list",
            message: "Enter employee's role.",
            choices: role
        }
    ]).then(res => {
        db.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)', [res.first, res.last, res.role]);
        console.log("Employee added.");
        ask();
    }).catch(err => {
        console.log(err);
    });
};


ask();