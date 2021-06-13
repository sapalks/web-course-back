create TABLE task(
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255),
    timeOfRemind TIMESTAMP,
    deadline TIMESTAMP
);

create TABLE step(
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255),
    task_id INTEGER,
    FOREIGN KEY (task_id) REFERENCES task (id)
);

create TABLE app_user(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255)
);