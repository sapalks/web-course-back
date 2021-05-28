Feature: e2e test - player

  Scenario Outline: Add player
    Given a client added test team with name "teamVictory"
    And a client added test team with name "teamLost"
    When a client wants to add player with login "<login>" and mail "<mail>" and Division "<division>" in team with index <teamid>
    Then server must reply with 200 status code
    And server must reply with the following json in body for player model:
    """
        <result>
    """

    Examples:
        | login | mail            | division  | teamid        | result                                                                        |
        | Sanya | sanya@mail.ru   | 3         | 1             | { "login": "Sanya", "mail": "sanya@mail.ru", "division": "3", "teamid": 1}    |
        | Vitya | vitya@mail.ru   | 2         | 2             | { "login": "Vitya", "mail": "vitya@mail.ru", "division": "2", "teamid": 2 }   |
        | Igor  | gor@mail.ru     | 1         | 1             | { "login": "Igor", "mail": "gor@mail.ru", "division": "1", "teamid": 1 }      |

    Scenario: Get players
        Given a client added test team with name "teamVictory"
        And a client added test team with name "teamLost"
        And a client added player with login "test_login" and mail "test_mail" and Division "test_div" in team with index 2
        And a client added player with login "test_login_2" and mail "test_mail_2" and Division "test_div_2" in team with index 1
        When a client wants to get a list of players
        Then server must reply with 200 status code
        And server must reply with the following json in body for player model:
        """
        [
            {
                "login": "test_login",
                "mail": "test_mail",
                "division": "test_div",
                "teamid": 2
            },
            {
                "login": "test_login_2",
                "mail": "test_mail_2",
                "division": "test_div_2",
                "teamid": 1
            }
        ]
        """

    Scenario: Get players on team
        Given a client added test team with name "teamVictory"
        And a client added test team with name "teamLost"
        And a client added player with login "test_login" and mail "test_mail" and Division "test_div" in team with index 2
        And a client added player with login "test_login_2" and mail "test_mail_2" and Division "test_div_2" in team with index 1
        And a client added player with login "test_login_3" and mail "test_mail_3" and Division "test_div_3" in team with index 2
        When a client wants to get a list of players in team with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for player model:
        """
        [
            {
                "login": "test_login",
                "mail": "test_mail",
                "division": "test_div",
                "teamid": 2
            },
            {
                "login": "test_login_3",
                "mail": "test_mail_3",
                "division": "test_div_3",
                "teamid": 2
            }
        ]
        """

    Scenario: Get player on index
        Given a client added test team with name "teamVictory"
        And a client added test team with name "teamLost"
        And a client added player with login "test_login" and mail "test_mail" and Division "test_div" in team with index 1
        And a client added player with login "test_login_2" and mail "test_mail_2" and Division "test_div_2" in team with index 1
        And a client added player with login "test_login_3" and mail "test_mail_3" and Division "test_div_3" in team with index 2
        When a client wants to get player on index 3
        Then server must reply with 200 status code
        And server must reply with the following json in body for player model:
        """
            {
                "login": "test_login_3",
                "mail": "test_mail_3",
                "division": "test_div_3",
                "teamid": 2
            }
        """

    Scenario: Update player on index
        Given a client added test team with name "teamVictory"
        And a client added test team with name "teamLost"
        And a client added player with login "test_login" and mail "test_mail" and Division "test_div" in team with index 2
        And a client added player with login "test_login_2" and mail "test_mail_2" and Division "test_div_2" in team with index 1
        And a client added player with login "test_login_3" and mail "test_mail_3" and Division "test_div_3" in team with index 2
        When a client wants to update a player on index 2 with login "login_changed" and mail "mail_changed" and Division "div_changed" in team with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for player model:
        """
            {
                "login": "login_changed",
                "mail": "mail_changed",
                "division": "div_changed",
                "teamid": 2
            }
        """
        And if client wants to get a list of players server must reply with a json in body like
        """
        [
        {
            "login": "test_login",
            "mail": "test_mail",
            "division": "test_div",
            "teamid": 2
        },
        {
            "login": "test_login_3",
            "mail": "test_mail_3",
            "division": "test_div_3",
            "teamid": 2
        },
        {
            "login": "login_changed",
            "mail": "mail_changed",
            "division": "div_changed",
            "teamid": 2
        }
        ]
        """
    
    Scenario: Delete player on index
        Given a client added test team with name "teamVictory"
        And a client added test team with name "teamLost"
        And a client added player with login "test_login" and mail "test_mail" and Division "test_div" in team with index 1
        And a client added player with login "test_login_2" and mail "test_mail_2" and Division "test_div_2" in team with index 2
        When a client wants to delete player on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of players server must reply with a json in body like
        """
        [
        {
            "login": "test_login",
            "mail": "test_mail",
            "division": "test_div",
            "teamid": 1
        }
        ]
        """