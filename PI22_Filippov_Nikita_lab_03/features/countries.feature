Feature: Testing a CRUD Countries API

    Scenario Outline: Add countries
        When a client wants to add country with name "<name>" and language "<language>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                <result>
            ]
            """
        Examples:
            | name    | language    | result                                                      |
            | Russia  | Russian     | { "Id": 401, "Name": "Russia", "Language": "Russian" }      |
            | Ukraine | Ukrainian   | { "Id": 402, "Name": "Ukraine", "Language": "Ukrainian" }   |
            | Belarus | Belorussian | { "Id": 403, "Name": "Belarus", "Language": "Belorussian" } |

    Scenario: Get countries
        When a client wants to get a list of countries
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 401,
                        "name": "Russia",
                        "language": "Russian"
                    },
                    "1": {
                        "id": 402,
                        "name": "Ukraine",
                        "language": "Ukrainian"
                    },
                    "2": {
                        "id": 403,
                        "name": "Belarus",
                        "language": "Belorussian"
                    }
                }
            ]
            """

    Scenario Outline: Get country by Id
        When a client wants to get country with Id "<Id>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                <result>
            ]
            """
        Examples:
            | Id  | result                                                      |
            | 401 | { "id": 401, "name": "Russia", "language": "Russian" }      |
            | 402 | { "id": 402, "name": "Ukraine", "language": "Ukrainian" }   |
            | 403 | { "id": 403, "name": "Belarus", "language": "Belorussian" } |

    Scenario: Update country with id 402
        When a client wants to update country by Id 402. Change name to "testName" and language to "testLang"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                {
                    "Id": 402,
                    "Name": "testName",
                    "Language": "testLang"
                }
            ]
            """

        And to request a list of all countries, the server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 401,
                        "name": "Russia",
                        "language": "Russian"
                    },
                    "1": {
                        "id": 402,
                        "name": "testName",
                        "language": "testLang"
                    },
                    "2": {
                        "id": 403,
                        "name": "Belarus",
                        "language": "Belorussian"
                    }
                }
            ]
            """

    Scenario: Delete country with Id 401
        When a client wants to delete country with Id 401
        Then server must reply with 200 status code
        And to request a list of all countries, the server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 402,
                        "name": "testName",
                        "language": "testLang"
                    },
                    "1": {
                        "id": 403,
                        "name": "Belarus",
                        "language": "Belorussian"
                    }
                }
            ]
            """
