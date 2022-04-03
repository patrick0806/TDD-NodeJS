# Story: Renting a car

## Use Case 01 

As a system user
In order to get an availble car in a specific category
Given a car category containing 3 different cars
When I check if there's a car available
Then it should choose randomly a car from the category chosen

## Use case 02

A system user
In order to calculate the final renting price
Give a customer who wants to rent a car for 5 days
And he is 50 years old
When he chooses a car category that costs $37.6 per day
Then i must add the Tax of his age which is 30% to te car category price
Then the final formula will be ((price per day * tax) * number of days)
And the final result will be ((37.6 * 1.3) * 5) = 244.4
And the final price will be printed in Brazillian Portuguese format as R$ 244,40

## Use case 03

As a system user
In order to register a renting transaction
Given a registered customer who is 50 years old
And a car model that costs $37.6 per day
And a delivery data that is for 05 days behind
And given a actual data 03/04/2022
When I rent a car i should see the customer data
And the car selected
And the final price which will be R$ 244,40
ANd Due Date which will be printed in Brazilian Portuguese format "8 de Abril de 2022"  