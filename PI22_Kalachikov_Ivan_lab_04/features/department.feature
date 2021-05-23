Feature: Testing a REST Department API

  Scenario: Add department
    When a client wants to add department with name "boss"
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 1,
            "name": "boss",
            "is_deleted": false
        }
    ]
    """

  Scenario: Get departments
    When a client wants to get a list of departments
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 1,
            "name": "boss",
            "is_deleted": false
        },
        {
            "id": 2,
            "name": "middle",
            "is_deleted": false
        }
    ]
    """

  Scenario: Get department on index
    When a client wants to get a department on index 2
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 2,
            "name": "middle",
            "is_deleted": false
        }
    ]
    """

  Scenario: Update department
  When a client wants to update a department on index 1 with name "main dep"
  Then server must reply with 200 status code
  And server must reply with a json in body like:
    """
    [
        {
            "id": 1,
            "name": "main dep",
            "is_deleted": false
        }
    ]
    """
  And if client wants to get a list of departments server must reply with a json in body like
    """
    [
        {
            "id": 1,
            "name": "main dep",
            "is_deleted": false
        },
        {
            "id": 2,
            "name": "middle",
            "is_deleted": false
        }
    ]
    """

  Scenario: Remove department
    When a client wants to remove a department on index 2
    Then server must reply with 200 status code
    And if client wants to get a list of departments server must reply with a json in body like
    """
    [
        {
            "id": 1,
            "name": "main dep",
            "is_deleted": false
        }
    ]
    """