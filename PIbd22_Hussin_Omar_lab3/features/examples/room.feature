Feature: e2e test - room

    Scenario Outline: Add room
        When a client wants to add room with name "<name>"
        Then server must reply with 200 status code
        And server must reply with the following json in body for room model:
        """
            <result>
        """

    Examples:
        | name    | result                     |
        | room1   | { "name": "room1"}  |
        | room2   | { "name": "room2" } |
        | room3   | { "name": "room3" }  |

    Scenario: Get rooms
        Given a client added room with name "day1"
        And a client added room with name "day2"
        When a client wants to get a list of rooms
        Then server must reply with 200 status code
        And server must reply with the following json in body for room model:
        """
        [
            {
                "name": "day1"
            },
            {
                "name": "day2"
            }
        ]
        """

    Scenario: Get room on index
        Given a client added room with name "day1"
        And a client added room with name "day2"
        And a client added room with name "day3"
        When a client wants to get a room on index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for room model:
        """
            {
                "name": "day2"
            }
        """

    Scenario: Update room on index
        Given a client added room with name "day1"
        And a client added room with name "day2"
        And a client added room with name "day3"
        When a client wants to update a room on index 2 with name "room2"
        Then server must reply with 200 status code
        And server must reply with the following json in body for room model:
        """
            {
                "name": "room2"
            }
        """
        And if client wants to get a list of rooms server must reply with a json in body like
        """
        [
            {
                "name": "day1"
            },
            {
                "name": "day3"
            },
            {
                "name": "room2"
            }
        ]
        """

    Scenario: Delete room on index
        Given a client added room with name "day1"
        And a client added room with name "day2"
        And a client added room with name "day3"
        When a client wants to delete a room on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of rooms server must reply with a json in body like
        """
        [
            {
                "name": "day1"
            },
            {
                "name": "day3"
            }
        ]
        """