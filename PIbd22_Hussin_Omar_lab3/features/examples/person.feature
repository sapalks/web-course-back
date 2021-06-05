Feature: e2e test - person

  Scenario Outline: Add person
    Given a client added test room with name "sundy"
    And a client added test room with name "mondy"
    When a client wants to add person with firstname "<firstname>" and lastname "<lastname>" and currentGroup "<currentgroup>" in room with index <roomid>
    Then server must reply with 200 status code
    And server must reply with the following json in body for person model:
    """
        <result>
    """

    Examples:
        | firstname | lastname      | currentgroup  | roomid   | result                                                                                       |
        | hussin    | omar          | PIbd-22       | 1             | { "firstname": "hussin", "lastname": "omar", "currentgroup": "PIbd-22", "roomid": 1}    |
        | omar      | hussin        | ISE-22        | 2             | { "firstname": "omar", "lastname": "hussin", "currentgroup": "ISE-22", "roomid": 2 }     |
        | rageh     | ali           | PIbd-12       | 1             | { "firstname": "rageh", "lastname": "ali", "currentgroup": "PIbd-12", "roomid": 1 }   |

    Scenario: Get persons
        Given a client added test room with name "sundy"
        And a client added test room with name "mondy"
        And a client added person with firstname "day_firstname" and lastname "day_lastname" and currentGroup "day_group" in room with index 2
        And a client added person with firstname "day_firstname_2" and lastname "day_lastname_2" and currentGroup "day_group_2" in room with index 1
        When a client wants to get a list of persons
        Then server must reply with 200 status code
        And server must reply with the following json in body for person model:
        """
        [
            {
                "firstname": "day_firstname",
                "lastname": "day_lastname",
                "currentgroup": "day_group",
                "roomid": 2
            },
            {
                "firstname": "day_firstname_2",
                "lastname": "day_lastname_2",
                "currentgroup": "day_group_2",
                "roomid": 1
            }
        ]
        """

    Scenario: Get persons on room
        Given a client added test room with name "sundy"
        And a client added test room with name "mondy"
        And a client added person with firstname "day_firstname" and lastname "day_lastname" and currentGroup "day_group" in room with index 2
        And a client added person with firstname "day_firstname_2" and lastname "day_lastname_2" and currentGroup "day_group_2" in room with index 1
        And a client added person with firstname "day_firstname_3" and lastname "day_lastname_3" and currentGroup "day_group_3" in room with index 2
        When a client wants to get a list of persons in room with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for person model:
        """
        [
            {
                "firstname": "day_firstname",
                "lastname": "day_lastname",
                "currentgroup": "day_group",
                "roomid": 2
            },
            {
                "firstname": "day_firstname_3",
                "lastname": "day_lastname_3",
                "currentgroup": "day_group_3",
                "roomid": 2
            }
        ]
        """

    Scenario: Get person on index
        Given a client added test room with name "sundy"
        And a client added test room with name "mondy"
        And a client added person with firstname "day_firstname" and lastname "day_lastname" and currentGroup "day_group" in room with index 1
        And a client added person with firstname "day_firstname_2" and lastname "day_lastname_2" and currentGroup "day_group_2" in room with index 1
        And a client added person with firstname "day_firstname_3" and lastname "day_lastname_3" and currentGroup "day_group_3" in room with index 2
        When a client wants to get person on index 3
        Then server must reply with 200 status code
        And server must reply with the following json in body for person model:
        """
            {
                "firstname": "day_firstname_3",
                "lastname": "day_lastname_3",
                "currentgroup": "day_group_3",
                "roomid": 2
            }
        """

    Scenario: Update person on index
        Given a client added test room with name "sundy"
        And a client added test room with name "mondy"
        And a client added person with firstname "day_firstname" and lastname "day_lastname" and currentGroup "day_group" in room with index 2
        And a client added person with firstname "day_firstname_2" and lastname "day_lastname_2" and currentGroup "day_group_2" in room with index 1
        And a client added person with firstname "day_firstname_3" and lastname "day_lastname_3" and currentGroup "day_group_3" in room with index 2
        When a client wants to update a person on index 2 with firstname "firstname_changed" and lastname "lastname_changed" and currentGroup "group_changed" in room with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for person model:
        """
            {
                "firstname": "firstname_changed",
                "lastname": "lastname_changed",
                "currentgroup": "group_changed",
                "roomid": 2
            }
        """
        And if client wants to get a list of persons server must reply with a json in body like
        """
        [
        {
            "firstname": "day_firstname",
            "lastname": "day_lastname",
            "currentgroup": "day_group",
            "roomid": 2
        },
        {
            "firstname": "day_firstname_3",
            "lastname": "day_lastname_3",
            "currentgroup": "day_group_3",
            "roomid": 2
        },
        {
            "firstname": "firstname_changed",
            "lastname": "lastname_changed",
            "currentgroup": "group_changed",
            "roomid": 2
        }
        ]
        """
    
    Scenario: Delete person on index
        Given a client added test room with name "sundy"
        And a client added test room with name "mondy"
        And a client added person with firstname "day_firstname" and lastname "day_lastname" and currentGroup "day_group" in room with index 1
        And a client added person with firstname "day_firstname_2" and lastname "day_lastname_2" and currentGroup "day_group_2" in room with index 2
        When a client wants to delete person on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of persons server must reply with a json in body like
        """
        [
        {
            "firstname": "day_firstname",
            "lastname": "day_lastname",
            "currentgroup": "day_group",
            "roomid": 1
        }
        ]
        """