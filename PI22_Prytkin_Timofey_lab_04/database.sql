CREATE TABLE employer(
    id SERIAL PRIMARY KEY,
    fullnameofemployer VARCHAR(255),
    employerlogin VARCHAR(255),
    employerpassword VARCHAR(255),
    isDeleted boolean DEFAULT FALSE
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    taskname VARCHAR(255),
    taskstartdate DATE,
    taskfinishdate DATE,
    isDeleted boolean DEFAULT FALSE, 
    employer_id INTEGER,
    FOREIGN KEY (employer_id) REFERENCES employer (id)
);

CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    customeremail VARCHAR(255) NOT NULL,
    customerpassword VARCHAR(255) NOT NULL
);