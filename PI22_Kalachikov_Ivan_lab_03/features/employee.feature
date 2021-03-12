Feature: Testing a REST Employee API

  Scenario: Add employee
    When a client wants to add employee with first name "Ivan" and last name "Ivanov" in department with id 1 and payment 30000.0
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 1,
            "first_name": "Ivan",
            "last_name": "Ivanov",
            "payment": "30000.00",
            "department_id": 1,
            "is_deleted": false
        }
    ]
    """

  Scenario: Get employees
    When a client wants to get a list of employees
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 1,
            "first_name": "Ivan",
            "last_name": "Ivanov",
            "payment": "30000.00",
            "department_id": 1,
            "is_deleted": false
        },
        {
            "id": 2,
            "first_name": "Petr",
            "last_name": "Petrov",
            "payment": "30500.00",
            "department_id": 2,
            "is_deleted": false
        }
    ]
    """

  Scenario: Get employees on current department
    When a client wants to get a list of employees on department with id 1
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 1,
            "first_name": "Ivan",
            "last_name": "Ivanov",
            "payment": "30000.00",
            "department_id": 1,
            "is_deleted": false
        },
        {
            "id": 3,
            "first_name": "Stipan",
            "last_name": "Stipanov",
            "payment": "25000.00",
            "department_id": 1,
            "is_deleted": false
        }
    ]
    """

  Scenario: Get employee with current id
    When a client wants to get employee with id 3
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    {
        "id": 3,
        "first_name": "Stipan",
        "last_name": "Stipanov",
        "payment": "25000.00",
        "department_id": 1,
        "is_deleted": false
    }
    """

  Scenario: Update employee
    When a client wants to update employee with id 3 and change name to "Vlat", last name to "Vlatov", department id to 2, payment to 500.0
    Then server must reply with 200 status code
    And server must reply with a json in body like:
    """
    [
        {
            "id": 3,
            "first_name": "Vlat",
            "last_name": "Vlatov",
            "payment": "500.00",
            "department_id": 2,
            "is_deleted": false
        }
    ]
    """
    And if client wants to get a list of employees server must reply with a json in body like
    """
    [
        {
            "id": 1,
            "first_name": "Ivan",
            "last_name": "Ivanov",
            "payment": "30000.00",
            "department_id": 1,
            "is_deleted": false
        },
        {
            "id": 2,
            "first_name": "Petr",
            "last_name": "Petrov",
            "payment": "30500.00",
            "department_id": 2,
            "is_deleted": false
        },
        {
            "id": 3,
            "first_name": "Vlat",
            "last_name": "Vlatov",
            "payment": "500.00",
            "department_id": 2,
            "is_deleted": false
        }
    ]
    """

  Scenario: Remove employee
    When a client wants to remove employee with id 3
    Then server must reply with 200 status code
    And if client wants to get a list of employees server must reply with a json in body like
    """
    [
        {
            "id": 1,
            "first_name": "Ivan",
            "last_name": "Ivanov",
            "payment": "30000.00",
            "department_id": 1,
            "is_deleted": false
        },
        {
            "id": 2,
            "first_name": "Petr",
            "last_name": "Petrov",
            "payment": "30500.00",
            "department_id": 2,
            "is_deleted": false
        }
    ]
    """