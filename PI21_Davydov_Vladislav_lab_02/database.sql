CREATE TABLE subject ( 
    subjectID int NOT NULL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    isDeleted boolean NOT NULL DEFAULT FALSE
);
 
CREATE SEQUENCE subject_seq START 1;

ALTER TABLE subject ALTER COLUMN subjectID SET DEFAULT nextval('subject_seq');

CREATE TABLE teacher ( 
    teacherID int NOT NULL PRIMARY KEY, 
    fullname VARCHAR(100) NOT NULL,
    isDeleted boolean NOT NULL DEFAULT FALSE,
    subjectID int NOT NULL, 
    FOREIGN KEY (subjectID) 
    REFERENCES subject (subjectID) ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE SEQUENCE teacher_seq START 1;

ALTER TABLE teacher ALTER COLUMN teacherID SET DEFAULT nextval('teacher_seq');