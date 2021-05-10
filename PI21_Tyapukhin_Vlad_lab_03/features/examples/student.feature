Feature: e2e test - student

  Scenario Outline: Add student
    Given a client added test education with name "programming"
    And a client added test education with name "biology"
    When a client wants to add student with firstname "<firstname>" and lastname "<lastname>" and currentGroup "<currentgroup>" in education with index <educationid>
    Then server must reply with 200 status code
    And server must reply with the following json in body for student model:
    """
        <result>
    """

    Examples:
        | firstname | lastname      | currentgroup  | educationid   | result                                                                                          |
        | Vlad      | Tyapukhin     | PIbd-21       | 1             | { "firstname": "Vlad", "lastname": "Tyapukhin", "currentgroup": "PIbd-21", "educationid": 1}    |
        | Ivan      | Ivanov        | ISE-22        | 2             | { "firstname": "Ivan", "lastname": "Ivanov", "currentgroup": "ISE-22", "educationid": 2 }       |
        | Slava     | Sevseev       | PIbd-23       | 1             | { "firstname": "Slava", "lastname": "Sevseev", "currentgroup": "PIbd-23", "educationid": 1 }    |

    Scenario: Get students
        Given a client added test education with name "programming"
        And a client added test education with name "biology"
        And a client added student with firstname "test_firstname" and lastname "test_lastname" and currentGroup "test_group" in education with index 2
        And a client added student with firstname "test_firstname_2" and lastname "test_lastname_2" and currentGroup "test_group_2" in education with index 1
        When a client wants to get a list of students
        Then server must reply with 200 status code
        And server must reply with the following json in body for student model:
        """
        [
            {
                "firstname": "test_firstname",
                "lastname": "test_lastname",
                "currentgroup": "test_group",
                "educationid": 2
            },
            {
                "firstname": "test_firstname_2",
                "lastname": "test_lastname_2",
                "currentgroup": "test_group_2",
                "educationid": 1
            }
        ]
        """

    Scenario: Get students on education
        Given a client added test education with name "programming"
        And a client added test education with name "biology"
        And a client added student with firstname "test_firstname" and lastname "test_lastname" and currentGroup "test_group" in education with index 2
        And a client added student with firstname "test_firstname_2" and lastname "test_lastname_2" and currentGroup "test_group_2" in education with index 1
        And a client added student with firstname "test_firstname_3" and lastname "test_lastname_3" and currentGroup "test_group_3" in education with index 2
        When a client wants to get a list of students in education with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for student model:
        """
        [
            {
                "firstname": "test_firstname",
                "lastname": "test_lastname",
                "currentgroup": "test_group",
                "educationid": 2
            },
            {
                "firstname": "test_firstname_3",
                "lastname": "test_lastname_3",
                "currentgroup": "test_group_3",
                "educationid": 2
            }
        ]
        """

    Scenario: Get student on index
        Given a client added test education with name "programming"
        And a client added test education with name "biology"
        And a client added student with firstname "test_firstname" and lastname "test_lastname" and currentGroup "test_group" in education with index 1
        And a client added student with firstname "test_firstname_2" and lastname "test_lastname_2" and currentGroup "test_group_2" in education with index 1
        And a client added student with firstname "test_firstname_3" and lastname "test_lastname_3" and currentGroup "test_group_3" in education with index 2
        When a client wants to get student on index 3
        Then server must reply with 200 status code
        And server must reply with the following json in body for student model:
        """
            {
                "firstname": "test_firstname_3",
                "lastname": "test_lastname_3",
                "currentgroup": "test_group_3",
                "educationid": 2
            }
        """

    Scenario: Update student on index
        Given a client added test education with name "programming"
        And a client added test education with name "biology"
        And a client added student with firstname "test_firstname" and lastname "test_lastname" and currentGroup "test_group" in education with index 2
        And a client added student with firstname "test_firstname_2" and lastname "test_lastname_2" and currentGroup "test_group_2" in education with index 1
        And a client added student with firstname "test_firstname_3" and lastname "test_lastname_3" and currentGroup "test_group_3" in education with index 2
        When a client wants to update a student on index 2 with firstname "firstname_changed" and lastname "lastname_changed" and currentGroup "group_changed" in education with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for student model:
        """
            {
                "firstname": "firstname_changed",
                "lastname": "lastname_changed",
                "currentgroup": "group_changed",
                "educationid": 2
            }
        """
        And if client wants to get a list of students server must reply with a json in body like
        """
        [
        {
            "firstname": "test_firstname",
            "lastname": "test_lastname",
            "currentgroup": "test_group",
            "educationid": 2
        },
        {
            "firstname": "test_firstname_3",
            "lastname": "test_lastname_3",
            "currentgroup": "test_group_3",
            "educationid": 2
        },
        {
            "firstname": "firstname_changed",
            "lastname": "lastname_changed",
            "currentgroup": "group_changed",
            "educationid": 2
        }
        ]
        """
    
    Scenario: Delete student on index
        Given a client added test education with name "programming"
        And a client added test education with name "biology"
        And a client added student with firstname "test_firstname" and lastname "test_lastname" and currentGroup "test_group" in education with index 1
        And a client added student with firstname "test_firstname_2" and lastname "test_lastname_2" and currentGroup "test_group_2" in education with index 2
        When a client wants to delete student on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of students server must reply with a json in body like
        """
        [
        {
            "firstname": "test_firstname",
            "lastname": "test_lastname",
            "currentgroup": "test_group",
            "educationid": 1
        }
        ]
        """