# employee-tracker

## Description
This is a command line application which allows the user to sort an employee database. Using Node.js, Inquirer and MySQL, the user is able to create departments, roles and employees as well as edit them.

## Table of Contents:
    1. [User Story](##User Story) 
    2. [Acceptance Criteria](##Acceptance Criteria)  
    3. [Installation](##Installation)
    4. [Links](##Links)

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Installation
To run the application, VS Code and GitBash/Terminal are required. Follow the steps below to begin installation:

- Open the integrated terminal
    - Run `npm i` to install dependencies
- `node/nodemon server.js` to run server
- Follow the Inquirer prompt choices

## Links
https://github.com/tshen28/employee-tracker

https://drive.google.com/file/d/1Q4189Di6529ZAbPERkxnrSy7OR_yU879/view?usp=sharing
