CREATE SEQUENCE IF NOT EXISTS role_seq
INCREMENT BY 1 START WITH 1;

CREATE SEQUENCE IF NOT EXISTS user_seq
INCREMENT BY 1 START WITH 1;

CREATE SEQUENCE IF NOT EXISTS PassportUser_seq
INCREMENT BY 1 START WITH 1;

CREATE TABLE Roles(
IDRole int DEFAULT nextval ('role_seq'),
NameRole varchar(50) NOT NULL,
IsDeleted bool DEFAULT false,
CONSTRAINT RolePK PRIMARY KEY (IDRole)
);

CREATE TABLE Users(
IDUser int DEFAULT nextval ('user_seq'),
NickName varchar(50) NOT NULL,
IDRole int NOT NULL,
IsDeleted bool DEFAULT false,
CONSTRAINT UserPK PRIMARY KEY (IDUser),
CONSTRAINT RoleFK FOREIGN KEY (IDRole) REFERENCES Role (IDRole)
);

CREATE TABLE PassportUsers (
	Id int DEFAULT nextval ('PassportUser_seq'),
	Login varchar(50) NOT NULL,
	Password varchar(50) NOT NULL,
	CONSTRAINT PassportUserPK PRIMARY KEY(Id)
);