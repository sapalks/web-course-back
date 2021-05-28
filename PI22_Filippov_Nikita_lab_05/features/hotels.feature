Feature: Testing a CRUD Hotels API

    Scenario Outline: Add hotel
        Given a client added country for add hotels with name "testCountry1" and language "testLang1"
        And  a client added country for add hotels with name "testCountry2" and language "testLang2"
        When a client wants to add hotel with name "<Name>", with rating "<Rating>" in country with id "<CountrieID>", with address "<Address>" and with contact number "<ContactNumber>"
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                <result>
            """
        Examples:
            | Name         | Rating | CountrieID | Address              | ContactNumber | result                                                                                                                                  |
            | Blue Bay     | 15     | 1          | Severnaya street, 12 | +79879654455  | { "Name": "Blue Bay", "Rating": "15", "Address": "Severnaya street, 12", "ContactNumber": "+79879654455" }  |
            | Resort Hotel | 35     | 2          | Victory Street 33    | +79879654445  | { "Name": "Resort Hotel", "Rating": "35", "Address": "Victory Street 33", "ContactNumber": "+79879654445" } |
            | Altera       | 90     | 1          | Yuzhnaya street, 2   | +79879654435  | { "Name": "Altera", "Rating": "90", "Address": "Yuzhnaya street, 2", "ContactNumber": "+79879654435" }      |

    Scenario: Get hotels
        Given a client added country for add hotels with name "testCountry1" and language "testLang1"
        And  a client added country for add hotels with name "testCountry2" and language "testLang2"
        And a client added hotel with name "Blue Bay", with rating "15" in country with id "1", with address "Severnaya street, 12" and with contact number "+79879654455"
        And a client added hotel with name "Resort Hotel", with rating "35" in country with id "2", with address "Victory Street 33" and with contact number "+79879654445"
        And a client added hotel with name "Altera", with rating "90" in country with id "1", with address "Yuzhnaya street, 2" and with contact number "+79879654435"
        When a client wants to get a list of hotels
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                {
                    "0": {
                        "name": "Blue Bay",
                        "rating": 15,
                        "address": "Severnaya street, 12",
                        "contactnumber": "+79879654455"
                    },
                    "1": {
                        "name": "Resort Hotel",
                        "rating": 35,
                        "address": "Victory Street 33",
                        "contactnumber": "+79879654445"
                    },
                    "2": {
                        "name": "Altera",
                        "rating": 90,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            """

    Scenario Outline: Get hotel by Id
        Given a client added country for add hotels with name "testCountry1" and language "testLang1"
        And  a client added country for add hotels with name "testCountry2" and language "testLang2"
        And a client added hotel with name "Blue Bay", with rating "15" in country with id "1", with address "Severnaya street, 12" and with contact number "+79879654455"
        And a client added hotel with name "Resort Hotel", with rating "35" in country with id "2", with address "Victory Street 33" and with contact number "+79879654445"
        And a client added hotel with name "Altera", with rating "90" in country with id "1", with address "Yuzhnaya street, 2" and with contact number "+79879654435"
        When a client wants to get hotel by Id "<Id>"
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
                <result>
            """
        Examples:
            | Id  | result                                                                                                                                  |
            | 1 | { "name": "Blue Bay", "rating": 15, "address": "Severnaya street, 12", "contactnumber": "+79879654455" }  |
            | 2 | { "name": "Resort Hotel", "rating": 35,  "address": "Victory Street 33", "contactnumber": "+79879654445" } |
            | 3 | { "name": "Altera", "rating": 90, "address": "Yuzhnaya street, 2", "contactnumber": "+79879654435" }      |

    Scenario: Get hotels in country with Id 1
    Given a client added country for add hotels with name "testCountry1" and language "testLang1"
        And  a client added country for add hotels with name "testCountry2" and language "testLang2"
        And a client added hotel with name "Blue Bay", with rating "15" in country with id "1", with address "Severnaya street, 12" and with contact number "+79879654455"
        And a client added hotel with name "Resort Hotel", with rating "35" in country with id "2", with address "Victory Street 33" and with contact number "+79879654445"
        And a client added hotel with name "Altera", with rating "90" in country with id "1", with address "Yuzhnaya street, 2" and with contact number "+79879654435"
        When a client wants to get hotels in country with Id "1"
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                {
                    "0": {
                        "name": "Blue Bay",
                        "rating": 15,
                        "address": "Severnaya street, 12",
                        "contactnumber": "+79879654455"
                    },
                    "1": {
                        "name": "Altera",
                        "rating": 90,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            """

    Scenario: Update hotel with Id 2
    Given a client added country for add hotels with name "testCountry1" and language "testLang1"
        And  a client added country for add hotels with name "testCountry2" and language "testLang2"
        And a client added hotel with name "Blue Bay", with rating "15" in country with id "1", with address "Severnaya street, 12" and with contact number "+79879654455"
        And a client added hotel with name "Resort Hotel", with rating "35" in country with id "2", with address "Victory Street 33" and with contact number "+79879654445"
        And a client added hotel with name "Altera", with rating "90" in country with id "1", with address "Yuzhnaya street, 2" and with contact number "+79879654435"
        When a client wants to update hotel by Id "2". Change Name to "testName", Rating 1, CountrieId "1", Address "testAddr", ContactNumber "+1111111111"
        Then server must reply with 200 status code
        And server must reply with the following json in body:
            """
                {
                    "Name": "testName",
                    "Rating": 1,
                    "Address": "testAddr",
                    "ContactNumber": "+1111111111"
                }
            """

        And to request a list of all hotels, the server must reply with a json in body like:
            """
                {
                    "0": {
                        "name": "Blue Bay",
                        "rating": 15,
                        "address": "Severnaya street, 12",
                        "contactnumber": "+79879654455"
                    },
                    "1": {
                        "name": "testName",
                        "rating": 1,
                        "address": "testAddr",
                        "contactnumber": "+1111111111"
                    },
                    "2": {
                        "name": "Altera",
                        "rating": 90,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            """

    Scenario: Delete hotel with Id 1
        Given a client added country for add hotels with name "testCountry1" and language "testLang1"
        And  a client added country for add hotels with name "testCountry2" and language "testLang2"
        And a client added hotel with name "Blue Bay", with rating "15" in country with id "1", with address "Severnaya street, 12" and with contact number "+79879654455"
        And a client added hotel with name "Resort Hotel", with rating "35" in country with id "2", with address "Victory Street 33" and with contact number "+79879654445"
        And a client added hotel with name "Altera", with rating "90" in country with id "1", with address "Yuzhnaya street, 2" and with contact number "+79879654435"
        When a client wants to delete hotel with Id 1
        Then server must reply with 200 status code
        And to request a list of all hotels, the server must reply with a json in body like:
            """
                {
                    "0": {
                        "name": "Resort Hotel",
                        "rating": 35,
                        "address": "Victory Street 33",
                        "contactnumber": "+79879654445"
                    },
                    "1": {
                        "name": "Altera",
                        "rating": 90,
                        "address": "Yuzhnaya street, 2",
                        "contactnumber": "+79879654435"
                    }
                }
            """