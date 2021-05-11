CREATE SEQUENCE IF NOT EXISTS users_seq
INCREMENT BY 1 START WITH 1;

CREATE SEQUENCE IF NOT EXISTS events_seq
INCREMENT BY 1 START WITH 1;

CREATE TABLE Users(
Id int DEFAULT nextval('users_seq'),
Name varchar(50) NOT NULL,
Surname varchar(50) NOT NULL,
MiddleName varchar(50) NOT NULL,
IsDeleted bool DEFAULT false,
CONSTRAINT UserPK PRIMARY KEY (Id)
);

CREATE TABLE Events(
Id int DEFAULT nextval('events_seq'),
EventName varchar(50) NOT NULL,
Date date NOT NULL,
IsDeleted bool DEFAULT false,
IDUser int NOT NULL,
CONSTRAINT EventsPK PRIMARY KEY (Id),
CONSTRAINT UsersFK FOREIGN KEY (IDUser) REFERENCES Users (Id)
);