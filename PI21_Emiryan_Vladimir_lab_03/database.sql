create TABLE task(
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255),
    timeOfRemind TIMESTAMPTZ,
    deadline TIMESTAMPTZ
);

create TABLE step(
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255),
    task_id INTEGER,
    FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE CASCADE
);