Feature: Test CRUD Desire

    Scenario Outline: Add Desire
    Given the user added Timofey with surname "Скоропилов" and age 21
    And the user added Timofey with surname "Кочеточков" and age 25
    And the user added Timofey with surname "Лавров" and age 19
    When the user wants to add Desire with Name_desire "<Name_desire>" and Degree_of_desire "<Degree_of_desire>" and Timofey_id "<Timofey_id>"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        <result>
    """

        Examples:
        | Name_desire         | Degree_of_desire  | Timofey_id | result                                                                   |
        | Похавать            | 8                 | 2          | { "name_desire": "Похавать", "degree_of_desire": 8, "timofey_id": 2 }    |
        | Поспать             | 9                 | 2          | { "name_desire": "Поспать", "degree_of_desire": 9, "timofey_id": 2 }     |
        | Пообщаться          | 10                | 3          | { "name_desire": "Пообщаться", "degree_of_desire": 10, "timofey_id": 3 } |

    Scenario: Get Desires
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Лавров" and age 19
        And the user added Desire with Name_desire "Похавать" and Degree_of_desire 8 and Timofey_id 2
        And the user added Desire with Name_desire "Поспать" and Degree_of_desire 9 and Timofey_id 2
        And the user added Desire with Name_desire "Пообщаться" and Degree_of_desire 10 and Timofey_id 3
        When the user wants to get Desires
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
        [
            { 
                "name_desire": "Похавать",
                "degree_of_desire": 8, 
                "timofey_id": 2 
            },
            { 
                "name_desire": "Поспать",
                "degree_of_desire": 9, 
                "timofey_id": 2  
            },
            { 
                "name_desire": "Пообщаться",
                "degree_of_desire": 10, 
                "timofey_id": 3 
            }
        ]
        """

    Scenario: Get Desire with id
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Лавров" and age 19
        And the user added Desire with Name_desire "Похавать" and Degree_of_desire 8 and Timofey_id 2
        And the user added Desire with Name_desire "Поспать" and Degree_of_desire 9 and Timofey_id 2
        And the user added Desire with Name_desire "Пообщаться" and Degree_of_desire 10 and Timofey_id 3
        When the user wants to get a Desire with id 3
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            { 
                "name_desire": "Пообщаться",
                "degree_of_desire": 10, 
                "timofey_id": 3 
            }
        """

    Scenario: Update Desire
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Лавров" and age 19
        And the user added Desire with Name_desire "Похавать" and Degree_of_desire 8 and Timofey_id 2
        And the user added Desire with Name_desire "Поспать" and Degree_of_desire 9 and Timofey_id 2
        And the user added Desire with Name_desire "Пообщаться" and Degree_of_desire 10 and Timofey_id 3
        When the user wants to update a Desire with id 2 and change Name_desire "Побазарить" and change Degree_of_desire 3 and change Timofey_id 3
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            { 
                "name_desire": "Побазарить",
                "degree_of_desire": 3, 
                "timofey_id": 3 
            }
        """
        When the user wants to get Desires
        Then server must reply with 200 status code
        And server must reply with the following json in body:
         """
        [
            { 
                "name_desire": "Похавать",
                "degree_of_desire": 8, 
                "timofey_id": 2
            },
            { 
                "name_desire": "Пообщаться",
                "degree_of_desire": 10, 
                "timofey_id": 3 
            },
            { 
                "name_desire": "Побазарить",
                "degree_of_desire": 3, 
                "timofey_id": 3 
            }
        ]
        """

    Scenario: Remove Desire
        Given the user added Timofey with surname "Скоропилов" and age 21
        And the user added Timofey with surname "Кочеточков" and age 25
        And the user added Timofey with surname "Лавров" and age 19
        And the user added Desire with Name_desire "Похавать" and Degree_of_desire 8 and Timofey_id 2
        And the user added Desire with Name_desire "Поспать" and Degree_of_desire 9 and Timofey_id 2
        And the user added Desire with Name_desire "Пообщаться" and Degree_of_desire 10 and Timofey_id 3
        When the user wants to delete a Desire with id 3
        Then server must reply with 200 status code
        And the user wants to get Desires and server must reply with a json in body like
        """
        [
            { 
                "name_desire": "Похавать",
                "degree_of_desire": 8, 
                "timofey_id": 2 
            },
            { 
                "name_desire": "Поспать",
                "degree_of_desire": 9, 
                "timofey_id": 2 
            }
        ]
        """