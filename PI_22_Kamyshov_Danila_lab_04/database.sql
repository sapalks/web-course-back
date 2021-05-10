CREATE SEQUENCE contract_seq
INCREMENT BY 1 START WITH 1;

CREATE SEQUENCE employee_seq
INCREMENT BY 1 START WITH 1;

CREATE SEQUENCE user_seq
INCREMENT BY 1 START WITH 1;

CREATE TABLE employee (
ID int DEFAULT nextval('employee_seq'),
FIO varchar(255) NOT NULL,
Date_Of_Birthday date NOT NULL,
Post varchar(255) NOT NULL,
isDeleted bool DEFAULT false,
CONSTRAINT employeePK PRIMARY KEY (ID));

CREATE TABLE user_ip (
ID int DEFAULT nextval('user_seq'),
FIO varchar(255) NOT NULL,
Login varchar(255) NOT NULL,
Password varchar(255) NOT NULL,
isDeleted bool DEFAULT false,
CONSTRAINT user_ipPK PRIMARY KEY (ID));

CREATE TABLE contract (
ID int DEFAULT nextval('contract_seq'),
Date_Of_Conclusion date NOT NULL,
EmployeeID int not NULL,
isDeleted bool DEFAULT false,
CONSTRAINT contractPK PRIMARY KEY (ID),
CONSTRAINT employeeFK FOREIGN KEY (EmployeeID) REFERENCES employee(ID));
