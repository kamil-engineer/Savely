Feature: API Health check
    Scenario: Check is API healthy
        Given the API is running
        When I send a "GET" request to "/health"
        Then the response status code should be 200
        And the response body status should be "ok" 