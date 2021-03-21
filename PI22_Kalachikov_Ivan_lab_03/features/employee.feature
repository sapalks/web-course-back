Feature: Testing a REST Employee API

  Scenario Outline: Add employee
    Given a client added test department with name "main_department"
    When a client wants to add employee with first name "<firstName>" and last name "<lastName>" and payment <payment> in department with index 1
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    <result>
    """

    Examples:
      | firstName | lastName  | payment  | result                                                                                      |
      | Иван      | Иванов    | 500      | { "first_name": "Иван", "last_name": "Иванов", "payment": "500.00", "is_deleted": false }   |
      | Петр      | Петров    | 1000     | { "first_name": "Петр", "last_name": "Петров", "payment": "1000.00", "is_deleted": false }  |
      | Кирилл    | Попов     | 300      | { "first_name": "Кирилл", "last_name": "Попов", "payment": "300.00", "is_deleted": false }  |


  Scenario: Get employees
    Given a client added test department with name "main_department"
    And a client added employee with first name "Тест1" and last name "Тест1.1" and payment 500 in department with index 1
    And a client added employee with first name "Тест2" and last name "Тест2.1" and payment 300 in department with index 1
    When a client wants to get a list of employees
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "first_name": "Тест1",
            "last_name": "Тест1.1",
            "payment": "500.00",
            "is_deleted": false
        },
        {
            "first_name": "Тест2",
            "last_name": "Тест2.1",
            "payment": "300.00",
            "is_deleted": false
        }
    ]
    """

  Scenario: Get employees on department
    Given a client added test department with name "main_department"
    And a client added test department with name "other_department"
    And a client added employee with first name "Тест1" and last name "Тест1.1" and payment 500 in department with index 2
    And a client added employee with first name "Тест2" and last name "Тест2.1" and payment 300 in department with index 2
    And a client added employee with first name "Тест3" and last name "Тест3.1" and payment 400 in department with index 1
    When a client wants to get a list of employees in department with index 2
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "first_name": "Тест1",
            "last_name": "Тест1.1",
            "payment": "500.00",
            "is_deleted": false
        },
        {
            "first_name": "Тест2",
            "last_name": "Тест2.1",
            "payment": "300.00",
            "is_deleted": false
        }
    ]
    """

  Scenario: Get employee on index
    Given a client added test department with name "main_department"
    And a client added employee with first name "Тест1" and last name "Тест1.1" and payment 500 in department with index 1
    And a client added employee with first name "Тест2" and last name "Тест2.1" and payment 300 in department with index 1
    And a client added employee with first name "Тест3" and last name "Тест3.1" and payment 400 in department with index 1
    When a client wants to get employee on index 2
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "first_name": "Тест2",
            "last_name": "Тест2.1",
            "payment": "300.00",
            "is_deleted": false
        }
    """

  Scenario: Update employee
    Given a client added test department with name "main_department"
    And a client added test department with name "other_department"
    And a client added employee with first name "Тест1" and last name "Тест1.1" and payment 500 in department with index 1
    And a client added employee with first name "Тест2" and last name "Тест2.1" and payment 300 in department with index 1
    And a client added employee with first name "Тест3" and last name "Тест3.1" and payment 400 in department with index 1
    When a client wants to update a employee on index 2 with first name "Changed" and last name "Opa" and payment 3500 in department with index 2
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        {
            "first_name": "Changed",
            "last_name": "Opa",
            "payment": "3500.00",
            "is_deleted": false
        }
    """
    And if client wants to get a list of employees server must reply with a json in body like
    """
    [
    {
        "first_name": "Тест1",
        "last_name": "Тест1.1",
        "payment": "500.00",
        "is_deleted": false
    },
    {
        "first_name": "Тест3",
        "last_name": "Тест3.1",
        "payment": "400.00",
        "is_deleted": false
    },
    {
        "first_name": "Changed",
        "last_name": "Opa",
        "payment": "3500.00",
        "is_deleted": false
    }
    ]
    """

  Scenario: Remove employee
    Given a client added test department with name "main_department"
    And a client added employee with first name "Тест1" and last name "Тест1.1" and payment 500 in department with index 1
    And a client added employee with first name "Тест2" and last name "Тест2.1" and payment 300 in department with index 1
    When a client wants to remove employee on index 1
    Then server must reply with 200 status code
    And if client wants to get a list of employees server must reply with a json in body like
    """
    [
    {
        "first_name": "Тест2",
        "last_name": "Тест2.1",
        "payment": "300.00",
        "is_deleted": false
    }
    ]
    """