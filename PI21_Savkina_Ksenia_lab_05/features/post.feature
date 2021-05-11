Feature: REST API POST TEST

  Scenario Outline: Add post
  When a client wants to add post with name "<name>" and with text "<text>"
  Then server must reply with 200 status code
  And server must reply with the following json in body:
  """
        <result>
    """

  Examples:
  | name             | text                           | result                                                                                      |
  | Важный пост      | Блог создан!                   | { "name": "Важный пост", "text": "Блог создан!", "views": 0, "isdel": false }               |
  | Новость          | Приближаются майские праздники | { "name": "Новость", "text": "Приближаются майские праздники", "views": 0, "isdel": false } |
  | Новость о погоде | На улице похолодало            | { "name": "Новость о погоде", "text": "На улице похолодало", "views": 0, "isdel": false }   |

  Scenario: Get posts
    Given a client added post with name "Важный пост" and with text "Блог создан!"
    And a client added post with name "Новость" and with text "Приближаются майские праздники"
    When a client wants to get posts
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "isdel": false,
            "name": "Важный пост",
            "text": "Блог создан!",
            "views": 0
        },
        {
            "isdel": false,
            "name": "Новость",
            "text": "Приближаются майские праздники",
            "views": 0
        }
    ]
    """

  Scenario: Get post with id
    Given a client added post with name "Важный пост" and with text "Блог создан!"
    And a client added post with name "Новость" and with text "Приближаются майские праздники"
    And a client added post with name "Новость о погоде" and with text "На улице похолодало"
    When a client wants to get a post with id 3
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "isdel": false,
            "name": "Новость о погоде",
            "text": "На улице похолодало",
            "views": 0
        }
    """
  Scenario: Update post
    Given a client added post with name "Важный пост" and with text "Блог создан!"
    And a client added post with name "Новость" and with text "Приближаются майские праздники"
    And a client added post with name "Новость о погоде" and with text "На улице похолодало"
    When a client wants to update a post with id 2 and change name "Новость о празднике" and text "Приближаются майские праздники! Ура!!!"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "name": "Новость о празднике",
            "text": "Приближаются майские праздники! Ура!!!",
            "views": 0,
            "isdel": false
        }
    """
    And a client wants to get posts and server must reply with a json in body like
    """
    [
        {
            "isdel": false,
            "name": "Важный пост",
            "text": "Блог создан!",
            "views": 0
        },
        {
            "isdel": false,
            "name": "Новость о погоде",
            "text": "На улице похолодало",
            "views": 0
        },
        {
            "isdel": false,
            "name": "Новость о празднике",
            "text": "Приближаются майские праздники! Ура!!!",
            "views": 0
        }
    ]
    """

  Scenario: Remove post
    Given a client added post with name "Важный пост" and with text "Блог создан!"
    And a client added post with name "Новость" and with text "Приближаются майские праздники"
    And a client added post with name "Новость о погоде" and with text "На улице похолодало"
    When a client wants to delete a post with id 2
    Then server must reply with 200 status code
    And a client wants to get posts and server must reply with a json in body like
    """
    [
        {
        "isdel": false,
        "name": "Важный пост",
        "text": "Блог создан!",
        "views": 0
        },
        {
        "isdel": false,
        "name": "Новость о погоде",
        "text": "На улице похолодало",
        "views": 0
        }
    ]
    """