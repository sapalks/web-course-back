Feature: e2e test - education

    Scenario Outline: Add education
        When a client wants to add education with name "<name>"
        Then server must reply with 200 status code
        And server must reply with the following json in body for education model:
        """
            <result>
        """

    Examples:
        | name          | result                     |
        | Mathematical  | { "name": "Mathematical"}  |
        | Humanitarian  | { "name": "Humanitarian" } |
        | Biological    | { "name": "Biological" }   |

    Scenario: Get educations
        Given a client added education with name "test1"
        And a client added education with name "test2"
        When a client wants to get a list of educations
        Then server must reply with 200 status code
        And server must reply with the following json in body for education model:
        """
        [
            {
                "name": "test1"
            },
            {
                "name": "test2"
            }
        ]
        """

    Scenario: Get education on index
        Given a client added education with name "test1"
        And a client added education with name "test2"
        And a client added education with name "test3"
        When a client wants to get a education on index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for education model:
        """
            {
                "name": "test2"
            }
        """

    Scenario: Update education on index
        Given a client added education with name "test1"
        And a client added education with name "test2"
        And a client added education with name "test3"
        When a client wants to update a education on index 2 with name "Humanitarian"
        Then server must reply with 200 status code
        And server must reply with the following json in body for education model:
        """
            {
                "name": "Humanitarian"
            }
        """
        And if client wants to get a list of educations server must reply with a json in body like
        """
        [
            {
                "name": "test1"
            },
            {
                "name": "test3"
            },
            {
                "name": "Humanitarian"
            }
        ]
        """

    Scenario: Delete education on index
        Given a client added education with name "test1"
        And a client added education with name "test2"
        And a client added education with name "test3"
        When a client wants to delete a education on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of educations server must reply with a json in body like
        """
        [
            {
                "name": "test1"
            },
            {
                "name": "test3"
            }
        ]
        """