Feature: e2e test - direction

    Scenario Outline: Add direction
        When a client wants to add direction with name "<name>"
        Then server must reply with 200 status code
        And server must reply with the following json in body for direction model:
        """
            <result>
        """

    Examples:
        | name          | result                     |
        | Mathematical  | { "name": "Mathematical"}  |
        | Biological    | { "name": "Biological" }   |

    Scenario: Get directions
        Given a client added direction with name "test1"
        And a client added direction with name "test2"
        When a client wants to get a list of directions
        Then server must reply with 200 status code
        And server must reply with the following json in body for direction model:
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

    Scenario: Get direction on index
        Given a client added direction with name "test1"
        And a client added direction with name "test2"
        When a client wants to get a direction on index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for direction model:
        """
            {
                "name": "test2"
            }
        """

    Scenario: Update direction on index
        Given a client added direction with name "test1"
        And a client added direction with name "test2"
        And a client added direction with name "test3"
        When a client wants to update a direction on index 2 with name "Humanitarian"
        Then server must reply with 200 status code
        And server must reply with the following json in body for direction model:
        """
            {
                "name": "Humanitarian"
            }
        """
        And if client wants to get a list of directions server must reply with a json in body like
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

    Scenario: Delete direction on index
        Given a client added direction with name "test1"
        And a client added direction with name "test2"
        When a client wants to delete a direction on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of directions server must reply with a json in body like
        """
        [
            {
                "name": "test1"
            }
        ]
        """