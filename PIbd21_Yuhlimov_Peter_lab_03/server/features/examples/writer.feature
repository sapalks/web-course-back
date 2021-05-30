Feature: e2e test - writer

    Scenario Outline: Add writer
        When a client wants to add writer with name "<firstname>", surname "<lastname>" and patronymic "<patronymic>"
        Then server must reply with 200 status code
        And server must reply with the following json in body for writer model:
        """
            <result>
        """

    Examples:
        | firstname     | lastname      | patronymic        | result                                                                |
        | Lev           | Tolstoy       | Nicolaevich       | { "firstname": "Lev", "lastname": "Tolstoy", "patronymic": "Nicolaevich"}   |
        | Ivan          | Ivanov        | Ivanovich         | { "firstname": "Ivan", "lastname": "Ivanov", "patronymic": "Ivanovich"}     |
        | Stanislav     | Lem           | Nicolaevich       | { "firstname": "Stanislav", "lastname": "Lem", "patronymic": "Nicolaevich"} |

Scenario: Get writers
        Given a client added writer with name "test1.1", surname "test1.2" and patronymic "test1.3"
        And a client added writer with name "test2.1", surname "test2.2" and patronymic "test2.3"
        When a client wants to get a list of writers
        Then server must reply with 200 status code
        And server must reply with the following json in body for writer model:
        """
        [
            {
                "firstname": "test1.1",
                "lastname": "test1.2",
                "patronymic": "test1.3" 
            },
            {
                "firstname": "test2.1",
                "lastname": "test2.2",
                "patronymic": "test2.3" 
            }
        ]
        """   
Scenario: Get writer on index
        Given a client added writer with name "test1.1", surname "test1.2" and patronymic "test1.3"
        And a client added writer with name "test2.1", surname "test2.2" and patronymic "test2.3"
        And a client added writer with name "test3.1", surname "test3.2" and patronymic "test3.3"
        When a client wants to get a writer on index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for writer model:
        """
            {
                "firstname": "test2.1",
                "lastname": "test2.2",
                "patronymic": "test2.3" 
            }
        """ 
Scenario: Update writer on index
        Given a client added writer with name "test1.1", surname "test1.2" and patronymic "test1.3"
        And a client added writer with name "test2.1", surname "test2.2" and patronymic "test2.3"
        And a client added writer with name "test3.1", surname "test3.2" and patronymic "test3.3"
        When a client wants to update a writer on index 2 with name "Ivan", surname "Ivanov" and patronymic "Ivanovich"
        Then server must reply with 200 status code
        And server must reply with the following json in body for writer model:
        """
            {
                "firstname": "Ivan",
                "lastname": "Ivanov",
                "patronymic": "Ivanovich" 
            }
        """
        And if client wants to get a list of writers server must reply with a json in body like
        """
        [
            {
                "firstname": "test1.1",
                "lastname": "test1.2",
                "patronymic": "test1.3" 
            },
            {
                "firstname": "test3.1",
                "lastname": "test3.2",
                "patronymic": "test3.3" 
            },
            {
                "firstname": "Ivan",
                "lastname": "Ivanov",
                "patronymic": "Ivanovich" 
            }
        ]
        """
Scenario: Delete writer on index
        Given a client added writer with name "test1.1", surname "test1.2" and patronymic "test1.3"
        And a client added writer with name "test2.1", surname "test2.2" and patronymic "test2.3"
        And a client added writer with name "test3.1", surname "test3.2" and patronymic "test3.3"
        When a client wants to delete a writer on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of writers server must reply with a json in body like
        """
        [
            {
                "firstname": "test1.1",
                "lastname": "test1.2",
                "patronymic": "test1.3" 
            },
            {
                "firstname": "test3.1",
                "lastname": "test3.2",
                "patronymic": "test3.3" 
            }
        ]
        """