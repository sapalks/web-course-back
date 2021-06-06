CREATE TABLE employer(
    id SERIAL PRIMARY KEY,
    fullnameofemployer VARCHAR(255),
    employerlogin VARCHAR(255),
    employerpassword VARCHAR(255),
    isDeleted boolean DEFAULT FALSE
);
