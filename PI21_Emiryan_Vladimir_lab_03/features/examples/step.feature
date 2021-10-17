@start
Feature: Step feature
    Scenario Outline: Create step
        Given a client have database with name "tasktracker"
        And a client create task with theme "Walk the dog", time of remind "2021-01-01 20:20-0", deadline "2021-01-01 20:20-0"
        When a client create step with theme "<theme>", task id "<taskId>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
        """
            <output>
        """
    
    Examples:
        | theme            | taskId | output                                        |
        | Walk the dog     | 1      | { "theme": "Walk the dog", "task_id": 1}    |
        | Wash the dishes  | 1      | { "theme": "Wash the dishes", "task_id": 1} |
        | Go to the store  | 1      | { "theme": "Go to the store", "task_id": 1} |
    
    Scenario: Get steps
        Given a client have some steps in database "tasktracker"
        When a client receives a list of steps
        Then server must reply with 200 status code
        And server must reply with the following json:
        """
        [
            {
                "theme": "Walk the dog",
                "task_id": 1
            },
            {
                "theme": "Wash the dishes",
                "task_id": 1
            },
            { 
                "theme": "Go to the store", 
                "task_id": 1 
            }
        ]
        """

    
    Scenario: Get steps in task
        Given a client have some steps in database "tasktracker"
        When a client receives a list of steps by task index 1
        Then server must reply with 200 status code
        And server must reply with the following json:
        """
        [
            {
                "theme": "Walk the dog",
                "task_id": 1
            },
            {
                "theme": "Wash the dishes",
                "task_id": 1
            },
            { 
                "theme": "Go to the store", 
                "task_id": 1 
            }
        ]
        """

    
    Scenario: Get step by index
        Given a client have some steps in database "tasktracker"
        When a client receives step by index 3
        Then server must reply with 200 status code
        And server must reply with the following json:
        """         
        { 
            "theme": "Go to the store", 
            "task_id": 1 
        }
        """
    
    Scenario: Update step by index
        Given a client have step with theme "Wash the dishes"
        When a client update step with id 2 theme "Do my homework", task index 1
        Then server must reply with 200 status code
        And server must reply with the following json:
        """
            {
                "theme": "Do my homework", 
                "task_id": 1
            }
        """

    @end
    Scenario: Delete step by index
        Given a client have step with theme "Do my homework"
        When a client delete step by index 2
        Then server must reply with 200 status code