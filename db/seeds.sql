INSERT INTO department (department_name)
VALUES ("Product Management"),
       ("Engineering"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 80000, 1),
        ("Lead Engineer", 120000, 2),
        ("Representative", 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Smith", 1, null),
        ("Sara", "Richardson", 2, 2),
        ("Kevin", "Lin", 3, 3);
