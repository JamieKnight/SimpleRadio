Feature: playback

    As a user i would like to start and stop playback from my selected stations
    As a user i would like to switch stations
    
    Scenario: I select a station to start playback
        Given I am on simple radio
        When I select Radio 2
        Then Radio 2 playback starts
        
    Scenario: I select a playing station to end playback
        Given I am on simple radio 
        And radio 2 is playing
        When I select Radio 2
        Then Radio 2 playback stops