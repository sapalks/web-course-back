Feature: Test CRUD Cook

    Scenario Outline: Add Cook
    When the user wants to add Cook with surname "<surname>" and age "<age>"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        <result>
    """

        Examples:
        | surname         | age  | result                               |
        | Tanaka          | 22   | { "surname": "Tanaka", "age": 22 }   |
        | Natsuki         | 25   | { "surname": "Natsuki", "age": 25 }  |
        | Yusuke          | 19   | { "surname": "Yusuke", "age": 19 }   |

    Scenario: Get Cooks
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Yusuke" and age 20
        When the user wants to get Cooks
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
        [
            {
                "surname": "Tanaka",
                "age": 21
            },
            {
                "surname": "Natsuki",
                "age": 25
            },
            {
                "surname": "Yusuke",
                "age": 20
            }
        ]
        """

    Scenario: Get Cook with id
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Osumi" and age 22
        When the user wants to get a Cook with id 3
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            {
                "surname": "Osumi",
                "age": 22
            }
        """

    Scenario: Update Cook
         Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Yusuke" and age 19
        When the user wants to update a Cook with id 3 and change surname "Martin" and change age 46
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            {
                "surname": "Martin",
                "age": 46
            }
        """
        When the user wants to get Cooks
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
        [
            {
                "surname": "Tanaka",
                "age": 21
            },
            {
                "surname": "Natsuki",
                "age": 25
            },
            {
                "surname": "Martin",
                "age": 46
            }
        ]
        """

    Scenario: Remove Cook
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 27
        And the user added Cook with surname "Yusuke" and age 19
        When the user wants to delete a post with id 1
        Then server must reply with 200 status code
        And the user wants to get Cooks and server must reply with a json in body like
        """
        [
            {
                "surname": "Natsuki",
                "age": 27
            },
            {
                "surname": "Yusuke",
                "age": 19
            }
        ]
        """