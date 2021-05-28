Feature: Test CRUD Timofey

    Scenario Outline: Add Timofey
    When the user wants to add Timofey with surname "<surname>" and age "<age>"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        <result>
    """

        Examples:
        | surname         | age  | result                                     |
        | Скоропилов      | 22   | { "surname": "Скоропилов", "age": 22 }   |
        | Кочеточков      | 25   | { "surname": "Кочеточков", "age": 25 }   |
        | Лавров          | 19   | { "surname": "Лавров", "age": 19 }       |

    Scenario: Get Timofeys
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Лавров" and age 20
        When the user wants to get Timofeys
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
        [
            {
                "surname": "Скоропилов",
                "age": 21
            },
            {
                "surname": "Кочеточков",
                "age": 25
            },
            {
                "surname": "Лавров",
                "age": 20
            }
        ]
        """

    Scenario: Get Timofey with id
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Полянов" and age 22
        When the user wants to get a Timofey with id 3
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            {
                "surname": "Полянов",
                "age": 22
            }
        """

    Scenario: Update Timofey
         Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Лавров" and age 19
        When the user wants to update a Timofey with id 3 and change surname "Лаврушин" and change age 23
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            {
                "surname": "Лаврушин",
                "age": 23
            }
        """
        When the user wants to get Timofeys
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
        [
            {
                "surname": "Скоропилов",
                "age": 21
            },
            {
                "surname": "Кочеточков",
                "age": 25
            },
            {
                "surname": "Лаврушин",
                "age": 23
            }
        ]
        """

    Scenario: Remove Timofey
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 27
        And the user added Timofey with surname "Лавров" and age 19
        When the user wants to delete a post with id 1
        Then server must reply with 200 status code
        And the user wants to get Timofeys and server must reply with a json in body like
        """
        [
            {
                "surname": "Кочеточков",
                "age": 27
            },
            {
                "surname": "Лавров",
                "age": 19
            }
        ]
        """