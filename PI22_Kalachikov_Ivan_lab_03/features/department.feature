Feature: Testing a REST Department API

  Scenario Outline: Add department
    When a client wants to add department with name "<name>"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    <result>
    """

    Examples:
      | name             | result                                             |
      | Department 1     | { "name": "Department 1", "is_deleted": false }    |
      | Department Main  | { "name": "Department Main", "is_deleted": false } |
      | Department Test  | { "name": "Department Test", "is_deleted": false } |


  Scenario: Get departments
    Given a client added department with name "test1"
    And a client added department with name "test2"
    When a client wants to get a list of departments
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "name": "test1",
            "is_deleted": false
        },
        {
            "name": "test2",
            "is_deleted": false
        }
    ]
    """

  Scenario: Get department on index
    Given a client added department with name "test1"
    And a client added department with name "test2"
    And a client added department with name "test3"
    When a client wants to get a department on index 2
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "name": "test2",
            "is_deleted": false
        }
    """

  Scenario: Update department
    Given a client added department with name "test1"
    And a client added department with name "test2"
    And a client added department with name "test3"
    When a client wants to update a department on index 2 with name "Main Department"
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """

        {
            "name": "Main Department",
            "is_deleted": false
        }

    """
  And if client wants to get a list of departments server must reply with a json in body like
    """
    [
        {
            "name": "test1",
            "is_deleted": false
        },
        {
            "name": "Main Department",
            "is_deleted": false
        },
        {
            "name": "test3",
            "is_deleted": false
        }
    ]
    """

  Scenario: Remove department
    Given a client added department with name "test1"
    And a client added department with name "test2"
    And a client added department with name "test3"
    When a client wants to remove a department on index 2
    Then server must reply with 200 status code
    And if client wants to get a list of departments server must reply with a json in body like
    """
    [
        {
            "name": "test1",
            "is_deleted": false
        },
        {
            "name": "test3",
            "is_deleted": false
        }
    ]
    """