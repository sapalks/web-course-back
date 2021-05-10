Feature: REST API COMMENT TEST

  Scenario Outline: Add comment
    When a client added post for comment with name "Пост для комментариев" and with text "Комментируйте этот пост!"
    And a client wants to add comment with content "<content>" and with postid 1
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        <result>
    """

    Examples:
      | content                          | result                                                                                      |
      | Комментирую                      | { "content": "Комментирую", "isdel": false }                      |
      | Мне нравится ваш блог!           | { "content": "Мне нравится ваш блог!", "isdel": false }           |
      | У вас довольно интересные посты! | { "content": "У вас довольно интересные посты!", "isdel": false } |

  Scenario: Get comments
    Given a client added post for comment with name "Пост для комментариев" and with text "Комментируйте этот пост!"
    And a client added post for comment with name "Просто пост" and with text "Пост ни о чем"
    And a client added comment with content "Комментирую" and with postid 1
    And a client added comment with content "Мне нравится ваш блог!" and with postid 1
    And a client added comment with content "Хороший пост" and with postid 2
    When a client wants to get comments
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "isdel": false,
            "content": "Комментирую"
        },
        {
            "isdel": false,
            "content": "Мне нравится ваш блог!"
        },
        {
            "isdel": false,
            "content": "Хороший пост"
        }
    ]
    """

  Scenario: Get comment with id
    Given a client added post for comment with name "Пост для комментариев" and with text "Комментируйте этот пост!"
    And a client added comment with content "Комментирую" and with postid 1
    And a client added comment with content "Мне нравится ваш блог!" and with postid 1
    And a client added comment with content "У вас довольно интересные посты!" and with postid 1
    When a client wants to get a comment with id 1
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "isdel": false,
            "content": "Комментирую"
        }
    """

  Scenario: Update comment
    Given a client added post for comment with name "Пост для комментариев" and with text "Комментируйте этот пост!"
    And a client added comment with content "Комментирую" and with postid 1
    And a client added comment with content "Мне нравится ваш блог!" and with postid 1
    And a client added comment with content "У вас довольно интересные посты!" and with postid 1
    When a client wants to update a comment with id 3 and change content "У вас довольно интересные посты! Только редко создаются :("
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "isdel": false,
            "content": "У вас довольно интересные посты! Только редко создаются :("
        }
    """
    And a client wants to get comments and server must reply with a json in body like
    """
    [
        {
            "isdel": false,
            "content": "Комментирую"
        },
        {
            "isdel": false,
            "content": "Мне нравится ваш блог!"
        },
        {
            "isdel": false,
            "content": "У вас довольно интересные посты! Только редко создаются :("
        }
    ]
    """

  Scenario: Remove comment
    Given a client added post for comment with name "Пост для комментариев" and with text "Комментируйте этот пост!"
    And a client added comment with content "Комментирую" and with postid 1
    And a client added comment with content "Мне нравится ваш блог!" and with postid 1
    And a client added comment with content "У вас довольно интересные посты!" and with postid 1
    When a client wants to delete a comment with id 1
    Then server must reply with 200 status code
    And a client wants to get comments and server must reply with a json in body like
    """
    [
        {
            "isdel": false,
            "content": "Мне нравится ваш блог!"
        },
        {
            "isdel": false,
            "content": "У вас довольно интересные посты!"
        }
    ]
    """