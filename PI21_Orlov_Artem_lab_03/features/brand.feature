Feature: REST API BRAND TEST

  Scenario Outline: Add brand
    When a client wants to add brand with name "<name>" and with foundername "<foundername>" and with creationyear <creationyear>
    Then server must reply with 200 status code
    And server must reply with the following json in body:
  """
        <result>
    """

    Examples:
      | name  | foundername  | creationyear | result                                                                                  |
      | Name1 | FounderName1 | 2000         | {"creationyear": 2000,"foundername": "FounderName1","isdeleted": false,"name": "Name1"} |
      | Name2 | FounderName2 | 2001         | {"creationyear": 2001,"foundername": "FounderName2","isdeleted": false,"name": "Name2"} |
      | Name3 | FounderName3 | 2002         | {"creationyear": 2002,"foundername": "FounderName3","isdeleted": false,"name": "Name3"} |

  Scenario: Get brands
    Given a client added brand with name "Name1" and with foundername "FounderName1" and with creationyear 2000
    And a client added brand with name "Name2" and with foundername "FounderName2" and with creationyear 2001
    When a client wants to get brands
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
    [
        {
            "creationyear": 2000,
            "foundername": "FounderName1",
            "isdeleted": false,
            "name": "Name1"
        },
        {
            "creationyear": 2001,
            "foundername": "FounderName2",
            "isdeleted": false,
            "name": "Name2"
        }
    ]
    """

  Scenario: Get brand with id
    Given a client added brand with name "Name1" and with foundername "FounderName1" and with creationyear 2000
    And a client added brand with name "Name2" and with foundername "FounderName2" and with creationyear 2001
    And a client added brand with name "Name3" and with foundername "FounderName3" and with creationyear 2002
    When a client wants to get a brand with id 3
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
     [
        {
            "creationyear": 2002,
            "foundername": "FounderName3",
            "isdeleted": false,
            "name": "Name3"
        }
     ]
    """

  Scenario: Update brand
    Given a client added brand with name "Name1" and with foundername "FounderName1" and with creationyear 2000
    And a client added brand with name "Name2" and with foundername "FounderName2" and with creationyear 2001
    And a client added brand with name "Name3" and with foundername "FounderName3" and with creationyear 2002
    When a client wants to update a brand with id 2 and change name "NewName" and foundername "NewFounderName" and creationyear 2020
    Then server must reply with 200 status code
    And server must reply with the following json in body:
    """
        "Done"
    """
    And a client wants to get brands and server must reply with a json in body like
    """
    [
        {
            "creationyear": 2000,
            "foundername": "FounderName1",
            "isdeleted": false,
            "name": "Name1"
        },
        {
            "creationyear": 2002,
            "foundername": "FounderName3",
            "isdeleted": false,
            "name": "Name3"
        },
        {
            "creationyear": 2020,
            "foundername": "NewFounderName",
            "isdeleted": false,
            "name": "NewName"
        }
    ]
    """

  Scenario: Remove brand
    Given a client added brand with name "Name1" and with foundername "FounderName1" and with creationyear 2000
    And a client added brand with name "Name2" and with foundername "FounderName2" and with creationyear 2001
    And a client added brand with name "Name3" and with foundername "FounderName3" and with creationyear 2002
    When a client wants to delete a brand with id 2
    Then server must reply with 200 status code
    And a client wants to get brands and server must reply with a json in body like
    """
    [
        {
            "name": "Name1",
            "foundername": "FounderName1",
            "creationyear": 2000,
            "isdeleted": false
        },
        {
            "name": "Name3",
            "foundername": "FounderName3",
            "creationyear": 2002,
            "isdeleted": false
        }
    ]
    """