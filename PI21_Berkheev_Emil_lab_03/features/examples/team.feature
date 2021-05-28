Feature: e2e test - team

    Scenario Outline: Add team
        When a client wants to add team with name "<name>"
        Then server must reply with 200 status code
        And server must reply with the following json in body for team model:
        """
            <result>
        """

    Examples:
        | name  | result              |
        | Navi  | { "name": "Navi"}   |
        | OG    | { "name": "OG" }   |
        | Valor | { "name": "Valor" } |

    Scenario: Get teams
        Given a client added team with name "test1"
        And a client added team with name "test2"
        When a client wants to get a list of teams
        Then server must reply with 200 status code
        And server must reply with the following json in body for team model:
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

    Scenario: Get team on index
        Given a client added team with name "test1"
        And a client added team with name "test2"
        And a client added team with name "test3"
        When a client wants to get a team on index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for team model:
        """
            {
                "name": "test2"
            }
        """

    Scenario: Update team on index
        Given a client added team with name "test1"
        And a client added team with name "test2"
        And a client added team with name "test3"
        When a client wants to update a team on index 2 with name "OG"
        Then server must reply with 200 status code
        And server must reply with the following json in body for team model:
        """
            {
                "name": "OG"
            }
        """
        And if client wants to get a list of teams server must reply with a json in body like
        """
        [
            {
                "name": "test1"
            },
            {
                "name": "test3"
            },
            {
                "name": "OG"
            }
        ]
        """

    Scenario: Delete team on index
        Given a client added team with name "test1"
        And a client added team with name "test2"
        And a client added team with name "test3"
        When a client wants to delete a team on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of teams server must reply with a json in body like
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