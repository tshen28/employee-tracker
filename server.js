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
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateRole();
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

const allEmployees = () => {
    return new Promise((fulfill, reject) => {
        const employees = [];
        db.query('SELECT first_name, last_name, id FROM employee', (err, res) => {
            if (err) reject (err);
            for (let i = 0; i < res.length; i++) {
                employees.push({ name: res[i].first_name + " " + res[i].last_name, value: res[i].id })
            }
            fulfill(employees)
            console.log(employees)
        })
    })
};

const allRoles = () => {
    return new Promise((fulfill, reject) => {
        const roles = [];
        db.query('SELECT title, id FROM role', (err, res) => {
            if (err) reject (err);
            for (let i = 0; i < res.length; i++) {
                roles.push({ name: res[i].title, value: res[i].id })
            }
            fulfill(roles)
        })
    })
};

const allDepartments = () => {
    return new Promise((fulfill, reject) => {
        const departments = [];
        db.query('SELECT department_name, id FROM department', (err, res) => {
            if (err) reject (err);
            for (let i = 0; i < res.length; i++) {
                departments.push({ name: res[i].department_name, value: res[i].id })
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

const addRole = async () => {
    const departments = await allDepartments();

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter the title of the role."
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary of the role"
        },
        {
            name: "department",
            type: "list",
            message: "Which department does this role belong to?",
            choices: departments
        }
    ]).then(res => {
        db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [res.title, res.salary, res.department]);
        console.log("Role added.");
        ask();
    }).catch(err => {
        console.log(err);
    });
};

const updateRole = async () => {
    const employees = await allEmployees();
    const roles = await allRoles();
    console.log(roles);
    console.log(employees)
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "Select an employee:",
            choices: employees
        },
        {
            name: "role",
            type: "list",
            message: "Select new role:",
            choices: roles
        }
    ]).then(res => {
        db.promise().query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [res.role, res.employee]);
        console.log("Role updated.");
        ask();
    }).catch(err => {
        console.log(err);
    })
};


ask();