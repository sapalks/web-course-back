CREATE TABLE GroupP
(
    ID    Serial PRIMARY KEY,
    Name  varchar(255) NOT NULL,
    COUNT int          NULL,
    isDell boolean DEFAULT false
);

CREATE TABLE Product
(
    ID        Serial PRIMARY KEY,
    Name      varchar(255) NOt NULL,
    Price     int          NOT NULL,
    isDell boolean DEFAULT false,
    GroupP_ID int References GroupP (ID) On DELETE CASCADE On UPDATE CASCADE
);

CREATE TABLE User_token
(
    ID        Serial PRIMARY KEY,
    Name      varchar(255) NOt NULL,
    Login varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
    isDell boolean DEFAULT false
);