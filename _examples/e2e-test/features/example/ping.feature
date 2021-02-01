Feature: Ping server

    Scenario: Ping ¯\_(ツ)_/¯
        When a client pings the service
        Then server must reply with 200 status code
        And server must reply with a json in body like:
            """
            {
                "status": "ok"
            }
            """