Feature: e2e test - schoolboy

    Scenario Outline: Add schoolboy
        Given a client added test direction with name "programming"
        And a client added test direction with name "biology"
        When a client wants to add schoolboy with fullname "<fullname>" and classNumber <classnumber> in direction with index <directionid>
        Then server must reply with 200 status code
        And server must reply with the following json in body for schoolboy model:
        """
            <result>
        """

        Examples:
            | fullname       | classnumber   | directionid   | result                                                             |
            | Testname1      | 10            | 1             | { "fullname": "Testname1", "classnumber": 10, "directionid": 1}    |
            | Testname2      | 2             | 2             | { "fullname": "Testname2", "classnumber": 2, "directionid": 2 }    |
            | Testname3      | 7             | 1             | { "fullname": "Testname3", "classnumber": 7, "directionid": 1 }    |

    Scenario: Get schoolboys
        Given a client added test direction with name "programming"
        And a client added test direction with name "biology"
        And a client added schoolboy with fullname "test_fullname" and classNumber 2 in direction with index 2
        And a client added schoolboy with fullname "test_fullname_2" and classNumber 11 in direction with index 1
        When a client wants to get a list of schoolboys
        Then server must reply with 200 status code
        And server must reply with the following json in body for schoolboy model:
        """
        [
            {
                "fullname": "test_fullname",
                "classnumber": 2,
                "directionid": 2
            },
            {
                "fullname": "test_fullname_2",
                "classnumber": 11,
                "directionid": 1
            }
        ]
        """
    
    Scenario: Get schoolboys on direction
        Given a client added test direction with name "programming"
        And a client added test direction with name "biology"
        And a client added schoolboy with fullname "test_fullname" and classNumber 9 in direction with index 2
        And a client added schoolboy with fullname "test_fullname_2" and classNumber 6 in direction with index 1
        And a client added schoolboy with fullname "test_fullname_3" and classNumber 3 in direction with index 2
        When a client wants to get a list of schoolboys in direction with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for schoolboy model:
        """
        [
            {
                "fullname": "test_fullname",
                "classnumber": 9,
                "directionid": 2
            },
            {
                "fullname": "test_fullname_3",
                "classnumber": 3,
                "directionid": 2
            }
        ]
        """

    Scenario: Get schoolboy on index
        Given a client added test direction with name "programming"
        And a client added test direction with name "biology"
        And a client added schoolboy with fullname "test_fullname" and classNumber 10 in direction with index 1
        And a client added schoolboy with fullname "test_fullname_2" and classNumber 1 in direction with index 1
        And a client added schoolboy with fullname "test_fullname_3" and classNumber 5 in direction with index 2
        When a client wants to get schoolboy on index 3
        Then server must reply with 200 status code
        And server must reply with the following json in body for schoolboy model:
        """
            {
                "fullname": "test_fullname_3",
                "classnumber": 5,
                "directionid": 2
            }
        """

    Scenario: Update schoolboy on index
        Given a client added test direction with name "programming"
        And a client added test direction with name "biology"
        And a client added schoolboy with fullname "test_fullname" and classNumber 3 in direction with index 2
        And a client added schoolboy with fullname "test_fullname_2" and classNumber 7 in direction with index 1
        When a client wants to update a schoolboy on index 2 with fullname "fullname_changed" and classNumber 10 in direction with index 2
        Then server must reply with 200 status code
        And server must reply with the following json in body for schoolboy model:
        """
            {
                "fullname": "fullname_changed",
                "classnumber": 10,
                "directionid": 2
            }
        """
        And if client wants to get a list of schoolboys server must reply with a json in body like
        """
        [
        {
            "fullname": "test_fullname",
            "classnumber": 3,
            "directionid": 2
        },
        {
            "fullname": "fullname_changed",
            "classnumber": 10,
            "directionid": 2
        }
        ]
        """

    Scenario: Delete schoolboy on index
        Given a client added test direction with name "programming"
        And a client added test direction with name "biology"
        And a client added schoolboy with fullname "test_fullname" and classNumber 11 in direction with index 1
        And a client added schoolboy with fullname "test_fullname_2" and classNumber 9 in direction with index 2
        When a client wants to delete schoolboy on index 2
        Then server must reply with 200 status code
        And if client wants to get a list of schoolboys server must reply with a json in body like
        """
        [
        {
            "fullname": "test_fullname",
            "classnumber": 11,
            "directionid": 1
        }
        ]
        """