Feature: Ping server

    Scenario Outline: Create task
        When a client create task with theme "<theme>", Time of remind "<timeOfRemind>", Deadline "<deadline>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
        """
            <result>
        """

    Examples:
        | theme            | timeOfRemind     | deadline         | result                                                                                             | 
        | Wash the dishes  | 2021-01-01 20:20 | 2021-01-01 20:20 | { "theme": "Wash the dishes", "timeofremind": "2021-01-01 20:20", "deadline": "2021-01-01 20:20" } |
        | Walk the dog     | 2021-01-01 20:20 | 2021-01-01 20:20 | { "theme": "Walk the dog", "timeofremind": "2021-01-01 20:20", "theme": "2021-01-01 20:20" }       |
        | Go to the store  | 2021-01-01 20:20 | 2021-01-01 20:20 | { "theme": "Go to the store", "timeofremind": "2021-01-01 20:20", "theme": "2021-01-01 20:20" }    |