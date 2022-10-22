# Sprint 2 Planning Meetings
The Sprint 2 planning meeting was held on Oct 16th, 2022 on Discord. During this meeting we discussed our goal for Sprint 2, and the stories we would accomplish by the end of the sprint. We agreed to break down stories into subtasks due to their large size, and discussed how we would divide them. Tasks were then distributed in an optimized way, due to the sheer amount of assignments and midterms from other courses, to improve development efficiency. 

Due to reading week, we decided to have an extra meeting on Sunday to enure at least 3 standups were completed.

# Sprint Goal (Stories)
We plan to finish the following stories
- BRAV-65 (Ryan)
- BRAV-66 (Bryan)
- BRAV-67 (Jason)
- BRAV-68 (Avi)
- BRAV-38 (Kevin)

- BRAV-3 (Dominik)
  - BRAV-45 (Dominik)
  - BRAV-46 (Dominik)

- BRAV-4 (Dominik)
  - BRAV-47 (Dominik)
  - BRAV-48 (Dominik)
  - BRAV-62 (Dominik)
 
- BRAV-5 (Porom)
  - BRAV-49 (Porom)
  - BRAV-50 (Porom)
- BRAV-69 (Porom)


# Task Breakdown

## BRAV 65
- Updated the Calculate Calories from a old box style.
- New UI is a line, with text on top gives a unique fresh sleek look to our application.
- This helps to keep our UI Standard throughout the whole application

## BRAV 66
- Updated the Nutrition Adder from a old box style.
- The UI for adding food looks attractive, and intuitive, so that our application can provide a pleasant user experience.

## BRAV 67
- Changed formatting of food log UI
- New UI provides a clearer and neater version of the food log's representation

## BRAV-68
- Implemented MongoDB Trigger to Reset caloriesAte
- Same implementation will used to clear other stuff such as the amount of food eaten in day for all users at 12:00am

## BRAV-45
- Implemented UI for Button to direct user to new page to add new food.
- Implemented UI for input for food (calories, protein, carbs, etc.)
- Implemented UI for Button to save food to database.
- Implemented UI for list of logged food for user to see.

## BRAV-46
- Create backend methods (MongoDB trigger), to let user save a food into their food log.
- Implement backend methods to get all logged foods from the user, and connect them to the UI list.
- Implement UI and logic to display logged food information depending on which item is clicked in the list.

## BRAV-47
- Implement UI for Button to direct user to new page to add a meal plan.
- Implemented UI for input for meal plan (breakfast, lunch, dinner, snacks information)
- Implemented UI for Button to save meal plan to database.
- Implemented UI for list of saved meal plans, along with button to publish them (publish not implemented yet).

## BRAV-48
- Create backend methods and routes to save meal plan, and all its info into MongoDB.
- Create backend methods and routes to get all meal plans so that they can be displayed in the UI list.

## BRAV-62
- Create UI and logic to display meal plan information depending on which item is clicked in the list.

## BRAV-3
- Complete stories/tasks BRAV-45, BRAV-46

## BRAV-4
- Complete stories/tasks BRAV-47, BRAV-48, BRAV-62

## BRAV-69
- Change the data architecture of database, clustering meal plans and attaching a user_id to each one

## BRAV-5
- As a nutrition content creator, I want to publish my meals on the app so that other users can use my meal plans, and I can gain credibility as a nutrition content creator.
- Clicking publish on a meal card within a user’s collection should publish the meal to the explore page within the nutrition tab.

## BRAV-49
- As a user I want a button on my meal plans so I can publish them

## BRAV-50
- As a user, I want to publish my meal plan so others can see it
- Send a request to the backend to change the meal plan to published, as well as have it displayed on the explore page

## BRAV-38
- As a user interested in working out, I want to be able to effectively view and use the Workout page UI.


# Spikes/Blockers
- Using React Native is still fairly new to many of us so it takes alot of research before implementing something
- Certain stories/tasks need other stories/tasks to be completed first.
- Alot of members have midterms and assignments for the whole week
- Work capacity will fluctuate based off our personal schedules (ie. exam season, times of increased workload)
- Certain UI issues, for example sliders not working properly on web (reported issue online)

# Team Capacity
___
| Member | Estimated hours of work per day |
|---|---|
| Porom Kamal | 4|
| Ryan Ramroop | 4|
| Kevin Xiong  | 4|
| Dominik Luszczynski  | 4|
| Bryan Wan | 4|
| Aviraj Waraich  | 4|
|Jason Kenneth Setiawan | 4|

# Participants
- Porom Kamal
- Ryan Ramroop
- Kevin Xiong 
- Dominik Luszczynski 
- Bryan Wan 
- Aviraj Waraich 
- Jason Kenneth Setiawan
