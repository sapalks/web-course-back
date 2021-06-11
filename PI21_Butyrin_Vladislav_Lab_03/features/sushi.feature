Feature: Test CRUD Sushi

    Scenario Outline: Add Sushi
    Given the user added Cook with surname "Tanaka" and age 21
    And the user added Cook with surname "Natsuki" and age 25
    And the user added Cook with surname "Yusuke" and age 19
    When the user wants to add Sushi with Name_Sushi "<Name_Sushi>" and Ingredients "<Ingredients>" and Cook_id "<Cook_id>"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        <result>
    """

        Examples:
        | Name_Sushi             | Ingredients       | Cook_id    | result                                                                                 |
        | Филадельфия            | Рис, рыба         | 2          | { "name_sushi": "Филадельфия", "ingredients": "Рис, рыба", "cook_id": 2 }              |
        | Классика с огурцом     | Рис, огурец       | 2          | { "name_sushi": "Классика с огурцом", "ingredients": "Рис, огурец", "cook_id": 2 }     |
        | Классика с креветкой   | Рис, креветка     | 3          | { "name_sushi": "Классика с креветкой", "ingredients": "Рис, креветка", "cook_id": 3 } |

    Scenario: Get Sushies
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Yusuke" and age 19
        And the user added Sushi with Name_Sushi "Филадельфия" and Ingredients "Рис, рыба" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с огурцом" and Ingredients "Рис, огурец" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с креветкой" and Ingredients "Рис, креветка" and Cook_id 3
        When the user wants to get Sushies
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
        [
            { 
                "name_sushi": "Филадельфия",
                "ingredients": "Рис, рыба", 
                "cook_id": 2
            },
            { 
                "name_sushi": "Классика с огурцом",
                "ingredients": "Рис, огурец", 
                "cook_id": 2  
            },
            { 
                "name_sushi": "Классика с креветкой",
                "ingredients": "Рис, креветка", 
                "cook_id": 3 
            }
        ]
        """

    Scenario: Get Sushi with id
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Yusuke" and age 19
        And the user added Sushi with Name_Sushi "Филадельфия" and Ingredients "Рис, рыба" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с огурцом" and Ingredients "Рис, огурец" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с креветкой" and Ingredients "Рис, креветка" and Cook_id 3
        When the user wants to get a Sushi with id 3
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            { 
                "name_sushi": "Классика с креветкой",
                "ingredients": "Рис, креветка", 
                "cook_id": 3 
            }
        """

    Scenario: Update Sushi
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Yusuke" and age 19
        And the user added Sushi with Name_Sushi "Филадельфия" and Ingredients "Рис, рыба" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с огурцом" and Ingredients "Рис, огурец" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с креветкой" and Ingredients "Рис, креветка" and Cook_id 3
        When the user wants to update a Sushi with id 2 and change Name_Sushi "Классика с лососем" and change Ingredients "Рис, лосось" and change Cook_id 3
        Then server must reply with 200 status code
        And server must reply with the following json in body:
        """
            { 
                "name_sushi": "Классика с лососем",
                "ingredients": "Рис, лосось", 
                "cook_id": 3 
            }
        """
        When the user wants to get Sushies
        Then server must reply with 200 status code
        And server must reply with the following json in body:
         """
        [
            { 
                "name_sushi": "Филадельфия",
                "ingredients": "Рис, рыба", 
                "cook_id": 2
            },
            { 
                "name_sushi": "Классика с креветкой",
                "ingredients": "Рис, креветка", 
                "cook_id": 3 
            },
            { 
                "name_sushi": "Классика с лососем",
                "ingredients": "Рис, лосось", 
                "cook_id": 3 
            }
        ]
        """

    Scenario: Remove Sushi
        Given the user added Cook with surname "Tanaka" and age 21
        And the user added Cook with surname "Natsuki" and age 25
        And the user added Cook with surname "Yusuke" and age 19
        And the user added Sushi with Name_Sushi "Филадельфия" and Ingredients "Рис, рыба" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с огурцом" and Ingredients "Рис, огурец" and Cook_id 2
        And the user added Sushi with Name_Sushi "Классика с креветкой" and Ingredients "Рис, креветка" and Cook_id 3
        When the user wants to delete a Sushi with id 3
        Then server must reply with 200 status code
        And the user wants to get Sushies and server must reply with a json in body like
        """
        [
            { 
                "name_sushi": "Филадельфия",
                "ingredients": "Рис, рыба", 
                "cook_id": 2 
            },
            { 
                "name_sushi": "Классика с огурцом",
                "ingredients": "Рис, огурец", 
                "cook_id": 2 
            }
        ]
        """