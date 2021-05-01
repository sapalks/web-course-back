Feature: Testing a CRUD Countries API

    Scenario Outline: Add countries
        When a client wants to add country with name "<name>" and language "<language>"
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                <result>
            """
        Examples:
            | name    | language    | result                                                      |
            | Russia  | Russian     | { "Name": "Russia", "Language": "Russian" }      |
            | Ukraine | Ukrainian   | { "Name": "Ukraine", "Language": "Ukrainian" }   |
            | Belarus | Belorussian | { "Name": "Belarus", "Language": "Belorussian" } |

    Scenario: Get countries
        Given a client added country with name "Russia_test" and language "Russian_test"
        And a client added country with name "Ukraine_test" and language "Ukrainian_test"
        And a client added country with name "Belarus_test" and language "Belorussian_test"
        When a client wants to get a list of countries
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                {
                    "0": {
                        "name": "Russia_test",
                        "language": "Russian_test"
                    },
                    "1": {
                        "name": "Ukraine_test",
                        "language": "Ukrainian_test"
                    },
                    "2": {
                        "name": "Belarus_test",
                        "language": "Belorussian_test"
                    }
                }
            """

    Scenario Outline: Get country by Id
        Given a client added country with name "Russia_test2" and language "Russian_test2"
        And a client added country with name "Ukraine_test2" and language "Ukrainian_test2"
        And a client added country with name "Belarus_test2" and language "Belorussian_test2"
        When a client wants to get country with Id "<Id>"
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                <result>
            """
        Examples:
            | Id  | result                                                      |
            | 1 | {  "name": "Russia_test2", "language": "Russian_test2" }      |
            | 2 | {  "name": "Ukraine_test2", "language": "Ukrainian_test2" }   |
            | 3 | {  "name": "Belarus_test2", "language": "Belorussian_test2" } |

    Scenario: Update country with id 1
        Given a client added country with name "Russia_test3" and language "Russian_test3"
        And a client added country with name "Ukraine_test3" and language "Ukrainian_test3"
        And a client added country with name "Belarus_test3" and language "Belorussian_test3"
        When a client wants to update country by Id 1. Change name to "testName" and language to "testLang"
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                {
                    "Name": "testName",
                    "Language": "testLang"
                }
            """

        And to request a list of all countries, the server must reply with a json in body like:
            """
                {
                    "0": {
                        "name": "testName",
                        "language": "testLang"
                    },
                    "1": {
                        "name": "Ukraine_test3",
                        "language": "Ukrainian_test3"
                    },
                    "2": {
                        "name": "Belarus_test3",
                        "language": "Belorussian_test3"
                    }
                }
            """

    Scenario: Delete country with Id 401
        Given a client added country with name "Russia_test4" and language "Russian_test4"
        And a client added country with name "Ukraine_test4" and language "Ukrainian_test4"
        And a client added country with name "Belarus_test4" and language "Belorussian_test4"
        When a client wants to delete country with Id 1
        Then server must reply with 200 status code
        And to request a list of all countries, the server must reply with a json in body like:
            """
                {
                    "0": {
                        "name": "Ukraine_test4",
                        "language": "Ukrainian_test4"
                    },
                    "1": {
                        "name": "Belarus_test4",
                        "language": "Belorussian_test4"
                    }
                }
            """
