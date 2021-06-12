@start
Feature: Ping server
    Scenario Outline: Create tasks
        Given a client have database with name "tasktracker"
        When a client create task with theme "<theme>", time of remind "<timeofremind>", deadline "<deadline>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
        """
            <output>
        """

    Examples:
        | theme            | timeofremind       | deadline           | output                                                                                             | 
        | Walk the dog     | 2021-01-01 20:20-0 | 2021-01-01 20:20-0 | { "theme": "Walk the dog", "timeofremind": "2021-01-01 20:20", "deadline": "2021-01-01 20:20" }    |
        | Wash the dishes  | 2021-01-01 20:20-0 | 2021-01-01 20:20-0 | { "theme": "Wash the dishes", "timeofremind": "2021-01-01 20:20", "deadline": "2021-01-01 20:20" } |
        | Go to the store  | 2021-01-01 20:20-0 | 2021-01-01 20:20-0 | { "theme": "Go to the store", "timeofremind": "2021-01-01 20:20", "deadline": "2021-01-01 20:20" } |

    Scenario: Get tasks
        Given a client have some tasks in database "tasktracker"
        When a client receives a list of tasks
        Then server must reply with 200 status code
        And server must reply with the following json:
        """
        [
            {
                "theme": "Walk the dog",
                "timeofremind": "2021-01-01 20:20",
                "deadline": "2021-01-01 20:20"
            },
            {
                "theme": "Wash the dishes",
                "timeofremind": "2021-01-01 20:20",
                "deadline": "2021-01-01 20:20"
            },
            { 
                "theme": "Go to the store", 
                "timeofremind": "2021-01-01 20:20", 
                "deadline": "2021-01-01 20:20" 
            }
        ]
        """

    Scenario: Get task by index
        Given a client have some tasks in database "tasktracker"
        When a client receives task by index 3
        Then server must reply with 200 status code
        And server must reply with the following json:
        """         
        { 
            "theme": "Go to the store", 
            "timeofremind": "2021-01-01 20:20", 
            "deadline": "2021-01-01 20:20" 
        }
        """
    
    Scenario: Update task by index
        Given a client have task with theme "Wash the dishes"
        When a client update task with theme "Wash my dog", time of remind "2021-02-22 20:20-0", deadline "2021-04-12 20:20-0" by index 2
        Then server must reply with 200 status code
        And server must reply with the following json:
        """
            {
                "theme": "Wash my dog",
                "timeofremind": "2021-02-22 20:20",
                "deadline": "2021-04-12 20:20"
            }
        """

    @end
    Scenario: Delete task by index
        Given a client have task with theme "Wash my dog"
        When a client delete task with theme by index 2
        Then server must reply with 200 status code