Feature: Testing a CRUD Hotels API

    Scenario Outline: Add hotel
        When a client wants to add hotel with name "<Name>", with rating "<Rating>" in country with id "<CountrieID>", with address "<Address>" and with contact number "<ContactNumber>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                <result>
            ]
            """
        Examples:
            | Name         | Rating | CountrieID | Address              | ContactNumber | result                                                                                                                                  |
            | Blue Bay     | 15     | 401        | Severnaya street, 12 | +79879654455  | { "Id": 301, "Name": "Blue Bay", "Rating": 15, "CountrieID": 401, "Address": "Severnaya street, 12", "ContactNumber": "+79879654455" }  |
            | Resort Hotel | 35     | 402        | Victory Street 33    | +79879654445  | { "Id": 302, "Name": "Resort Hotel", "Rating": 35, "CountrieID": 402, "Address": "Victory Street 33", "ContactNumber": "+79879654445" } |
            | Altera       | 90     | 401        | Yuzhnaya street, 2   | +79879654435  | { "Id": 303, "Name": "Altera", "Rating": 90, "CountrieID": 401, "Address": "Yuzhnaya street, 2", "ContactNumber": "+79879654435" }      |

    Scenario: Get hotels
        When a client wants to get a list of hotels
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 301,
                        "name": "Blue Bay",
                        "rating": 15,
                        "countrieid": 401,
                        "address": "Severnaya street, 12",
                        "contactnumber": "+79879654455"
                    },
                    "1": {
                        "id": 302,
                        "name": "Resort Hotel",
                        "rating": 35,
                        "countrieid": 402,
                        "address": "Victory Street 33",
                        "contactnumber": "+79879654445"
                    },
                    "2": {
                        "id": 303,
                        "name": "Altera",
                        "rating": 90,
                        "countrieid": 401,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            ]
            """

    Scenario Outline: Get hotel by Id
        When a client wants to get hotel by Id "<Id>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                <result>
            ]
            """
        Examples:
            | Id  | result                                                                                                                                  |
            | 301 | { "id": 301, "name": "Blue Bay", "rating": 15, "countrieid": 401, "address": "Severnaya street, 12", "contactnumber": "+79879654455" }  |
            | 302 | { "id": 302, "name": "Resort Hotel", "rating": 35, "countrieid": 402, "address": "Victory Street 33", "contactnumber": "+79879654445" } |
            | 303 | { "id": 303, "name": "Altera", "rating": 90, "countrieid": 401, "address": "Yuzhnaya street, 2", "contactnumber": "+79879654435" }      |

    Scenario: Get hotels in country with Id 401
        When a client wants to get hotels in country with Id 401
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 301,
                        "name": "Blue Bay",
                        "rating": 15,
                        "countrieid": 401,
                        "address": "Severnaya street, 12",
                        "contactnumber": "+79879654455"
                    },
                    "1": {
                        "id": 303,
                        "name": "Altera",
                        "rating": 90,
                        "countrieid": 401,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            ]
            """

    Scenario: Update hotel with Id 302
        When a client wants to update hotel by Id 302. Change Name to "testName", Rating 1, CountrieId 401, Address "testAddr", ContactNumber "+1111111111"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            [
                {
                    "Id": 302,
                    "Name": "testName",
                    "Rating": 1,
                    "CountrieID": 401,
                    "Address": "testAddr",
                    "ContactNumber": "+1111111111"
                }
            ]
            """

        And to request a list of all hotels, the server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 301,
                        "name": "Blue Bay",
                        "rating": 15,
                        "countrieid": 401,
                        "address": "Severnaya street, 12",
                        "contactnumber": "+79879654455"
                    },
                    "1": {
                        "id": 302,
                        "name": "testName",
                        "rating": 1,
                        "countrieid": 401,
                        "address": "testAddr",
                        "contactnumber": "+1111111111"
                    },
                    "2": {
                        "id": 303,
                        "name": "Altera",
                        "rating": 90,
                        "countrieid": 401,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            ]
            """

    Scenario: Delete hotel with Id 301
        When a client wants to delete hotel with Id 301
        Then server must reply with 200 status code
        And to request a list of all hotels, the server must reply with a json in body like:
            """
            [
                {
                    "0": {
                        "id": 302,
                        "name": "testName",
                        "rating": 1,
                        "countrieid": 401,
                        "address": "testAddr",
                        "contactnumber": "+1111111111"
                    },
                    "1": {
                        "id": 303,
                        "name": "Altera",
                        "rating": 90,
                        "countrieid": 401,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            ]
            """