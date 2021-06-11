Feature: Ping server
    @start
    Scenario Outline: Create tasks
        Given a client have database with name "tasktracker"
        When a client create task with theme "<theme>", Time of remind "<timeofremind>", Deadline "<deadline>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
        """
            <output>
        """
    
    @example
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
    
    @end
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
    
    
    # Scenario: Update task by index
    #     Given a client have task with theme "Wash the dishes"
    #     When a client wants update record in task table with id 2
    #     Then server must reply with 200 status code
    #     And server must reply with the following json in body for education model:
    #     """
    #         {
    #             "name": "Humanitarian"
    #         }
    #     """