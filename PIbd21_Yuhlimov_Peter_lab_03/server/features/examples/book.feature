Feature: e2e test - book

  Scenario Outline: Add book
    Given a client added test writer with name "Lev" , surname "Tolstoy" and patronymic "Nicolaevich"
    And a client added test writer with name "Ivan" , surname "Ivanov" and patronymic "Ivanovich"
    When a client wants to add book with name "<name>" and writer with index <writerid>
    Then server must reply with 200 status code
    And server must reply with the following json in body for book model:
    """
        <result>
    """

    Examples:
        | name          | writerid       | result                                                                                          |
        | Kolobok       | 1              | { "name": "Kolobok", "writerid": 1}         |
        | It            | 1              | { "name": "It", "writerid": 1}              |
        | Cat in boots  | 2              | { "name": "Cat in boots", "writerid": 2}    |
        
Scenario: Get books
        Given a client added test writer with name "Lev" , surname "Tolstoy" and patronymic "Nicolaevich"
        And a client added test writer with name "Ivan" , surname "Ivanov" and patronymic "Ivanovich"
        And a client added book with name "test1" and writer with index 2
        And a client added book with name "test2" and writer with index 1
        When a client wants to get a list of books
        Then server must reply with 200 status code
        And server must reply with the following json in body for book model:
        """
        [
            {
                "name": "test1",
                "writerid": 2
            },
            {
                "name": "test2",
                "writerid": 1
            }
        ]
        """

Scenario: Get books on writer
        Given a client added test writer with name "Lev" , surname "Tolstoy" and patronymic "Nicolaevich"
        And a client added test writer with name "Ivan" , surname "Ivanov" and patronymic "Ivanovich"
        And a client added book with name "test1" and writer with index 2
        And a client added book with name "test2" and writer with index 1
        And a client added book with name "test3" and writer with index 2
        When a client wants to get a list of books in writer with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for book model:
        """
        [
            {
                "name": "test1",
                "writerid": 2
            },
            {
                "name": "test3",
                "writerid": 2
            }
        ]
        """

Scenario: Get book on index
        Given a client added test writer with name "Lev" , surname "Tolstoy" and patronymic "Nicolaevich"
        And a client added test writer with name "Ivan" , surname "Ivanov" and patronymic "Ivanovich"
        And a client added book with name "test1" and writer with index 1
        And a client added book with name "test2" and writer with index 1
        And a client added book with name "test3" and writer with index 2
        When a client wants to get book on index 3
        Then server must reply with 200 status code
        And server must reply with the following json in body for book model:
        """
            {
                "name": "test3",
                "writerid": 2
            }
        """

Scenario: Update book on index
        Given a client added test writer with name "Lev" , surname "Tolstoy" and patronymic "Nicolaevich"
        And a client added test writer with name "Ivan" , surname "Ivanov" and patronymic "Ivanovich"
        And a client added book with name "test1" and writer with index 2
        And a client added book with name "test2" and writer with index 1
        And a client added book with name "test3" and writer with index 2
        When a client wants to update a book on index 2 with name "test_name" and writer with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for book model:
        """
            {
                "name": "test_name",
                "writerid": 2
            }
        """
        And if client wants to get a list of books server must reply with a json in body like
        """
        [
        {
            "name": "test1",
            "writerid": 2
        },
        {
            "name": "test3",
            "writerid": 2
        },
        {
            "name": "test_name",
            "writerid": 2
        }
        ]
        """

Scenario: Delete book on index
        Given a client added test writer with name "Lev" , surname "Tolstoy" and patronymic "Nicolaevich"
        And a client added test writer with name "Ivan" , surname "Ivanov" and patronymic "Ivanovich"
        And a client added book with name "test1" and writer with index 1
        And a client added book with name "test2" and writer with index 2
        When a client wants to delete book on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of books server must reply with a json in body like
        """
        [
        {
            "name": "test1",
            "writerid": 1
        }
        ]
        """