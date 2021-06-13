Feature: REST API CAR TEST

  Scenario Outline: Add car
    When a client added brand for car with name "Name5" and with foundername "FounderName5" and with creationyear 2005
    And a client wants to add car with name "<name>" and with enginename "<enginename>" and with hp "<hp>" and with enginevolume "<enginevolume>" and with creationyear <creationyear> and with brandid <brandid>
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        <result>
    """

    Examples:
      | name  | enginename  | hp    | enginevolume | creationyear | brandid | result                                                                                                                     |
      | name1 | enginename1 | 280ls | 1.8          | 1990         | 1       | {"name": "name1","enginename": "enginename1", "hp": "280ls","enginevolume": "1.8","creationyear": 1990,"isdeleted": false} |
      | name2 | enginename2 | 290ls | 1.3          | 1991         | 1       | {"name": "name2","enginename": "enginename2", "hp": "290ls","enginevolume": "1.3","creationyear": 1991,"isdeleted": false} |
      | name3 | enginename3 | 189ls | 1.9          | 2000         | 1       | {"name": "name3","enginename": "enginename3", "hp": "189ls","enginevolume": "1.9","creationyear": 2000,"isdeleted": false} |


  Scenario: Get cars
    Given a client added brand for car with name "Name5" and with foundername "FounderName5" and with creationyear 2005
    And a client added brand for car with name "Name6" and with foundername "FounderName6" and with creationyear 2006
    And a client added car with name "name1" and with enginename "enginename1" and with hp "280ls" and with enginevolume "1.8" and with creationyear 1990 and with brandid 1
    And a client added car with name "name2" and with enginename "enginename2" and with hp "289ls" and with enginevolume "1.9" and with creationyear 1999 and with brandid 1
    And a client added car with name "name3" and with enginename "enginename3" and with hp "281ls" and with enginevolume "1.3" and with creationyear 1993 and with brandid 2
    When a client wants to get cars
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "name": "name1",
            "hp": "280ls",
            "creationyear": 1990,
            "enginevolume": "1.8",
            "isdeleted": false,
            "enginename": "enginename1"
        },
        {
            "name": "name2",
            "hp": "289ls",
            "creationyear": 1999,
            "enginevolume": "1.9",
            "isdeleted": false,
            "enginename": "enginename2"
        },
        {
            "name": "name3",
            "hp": "281ls",
            "creationyear": 1993,
            "enginevolume": "1.5",
            "isdeleted": false,
            "enginename": "enginename3"
        }
    ]
    """

  Scenario: Get car with id
    Given a client added brand for car with name "Name5" and with foundername "FounderName5" and with creationyear 2005
    And a client added car with name "name1" and with enginename "enginename1" and with hp "280ls" and with enginevolume "1.8" and with creationyear 1990 and with brandid 1
    And a client added car with name "name2" and with enginename "enginename2" and with hp "289ls" and with enginevolume "1.9" and with creationyear 1999 and with brandid 1
    And a client added car with name "name3" and with enginename "enginename3" and with hp "281ls" and with enginevolume "1.3" and with creationyear 1993 and with brandid 1
    When a client wants to get a car with id 1
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
      [
        {
            "name": "name1",
            "hp": "280ls",
            "creationyear": 1990,
            "enginevolume": "1.8",
            "isdeleted": false,
            "enginename": "enginename1"
        }
     ]
    """

  Scenario: Update car
    Given a client added brand for car with name "Name5" and with foundername "FounderName5" and with creationyear 2005
    And a client added car with name "name1" and with enginename "enginename1" and with hp "280ls" and with enginevolume "1.8" and with creationyear 1990 and with brandid 1
    And a client added car with name "name2" and with enginename "enginename2" and with hp "289ls" and with enginevolume "1.9" and with creationyear 1999 and with brandid 1
    And a client added car with name "name3" and with enginename "enginename3" and with hp "281ls" and with enginevolume "1.3" and with creationyear 1993 and with brandid 1
    When a client wants to update a car with id 2 and change name "newname" and enginename "newEnginename" and hp "123ls" and creationyear 2090 and enginevolume "1.7" and brandid 1
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        "Done"
    """
    And a client wants to get cars and server must reply with a json in body like
    """
    [
        {
            "name": "name1",
            "hp": "280ls",
            "creationyear": 1990,
            "enginevolume": "1.8",
            "isdeleted": false,
            "enginename": "enginename1"
        },
        {
            "name": "name3",
            "hp": "281ls",
            "creationyear": 1993,
            "enginevolume": "1.3",
            "isdeleted": false,
            "enginename": "enginename3"
        },
        {
            "name": "newname",
            "hp": "123ls",
            "creationyear": 2090,
            "enginevolume": "1.7",
            "isdeleted": false,
            "enginename": "newEnginename"
        }
    ]
    """

  Scenario: Remove car
    Given a client added brand for car with name "Name5" and with foundername "FounderName5" and with creationyear 2005
    And a client added car with name "name1" and with enginename "enginename1" and with hp "280ls" and with enginevolume "1.8" and with creationyear 1990 and with brandid 1
    And a client added car with name "name2" and with enginename "enginename2" and with hp "289ls" and with enginevolume "1.9" and with creationyear 1999 and with brandid 1
    And a client added car with name "name3" and with enginename "enginename3" and with hp "281ls" and with enginevolume "1.3" and with creationyear 1993 and with brandid 1
    When a client wants to delete a car with id 1
    Then server must reply with 200 status code
    And a client wants to get cars and server must reply with a json in body like
    """
    [
        {
            "name": "name2",
            "hp": "289ls",
            "creationyear": 1999,
            "enginevolume": "1.9",
            "isdeleted": false,
            "enginename": "enginename2"
        },
        {
            "name": "name3",
            "hp": "281ls",
            "creationyear": 1993,
            "enginevolume": "1.3",
            "isdeleted": false,
            "enginename": "enginename3"
        }
    ]
    """
