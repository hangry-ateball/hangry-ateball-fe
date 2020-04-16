# Hangry Ateball UI/UX
### Can’t figure out where to eat? Shake the magic “ateball” for a restaurant recommendation and let all your friends know where to meet you with a text notification.

### Overview of Site:
You are on your lunch break.  You've already eaten Chipotle 3 times this week.  You and your group of friends decide that it's time to change it up. Everyone is "down for anything" but nobody can make a concrete decision.  That's when you whip out your phone and open up Hangry Ateball.

This app replicates the future-deciding 8 Ball by finding a nearby restaurant for you!  You can decide what kind of food(or leave it up to fate) as well as cost and if you want to walk or drive and the app will do the rest for you.  From the results screen, you can easily open maps to navigate to the restaurant or send the information to your friends via text with the click of a button.  It's munch time.  Where will you be?

### Contributors:
- Caleb Haizlett 
- Kim McCaskill

### Learning Goals:
- Ultimately, demonstrate knowledge we have gained throughout Turing
- Learn and implement a new language: React Native
- Learn and implement a new testing environment: Cypress
- Work closely with a back-end team to create a synchronous application
- Create UI with an intentional and cohesive color palette
- Use an agile process to turn well defined requirements into deployed and production ready software
- Gain experience dividing applications into components and domains of responsibilities to facilitate multi-developer teams. 
- Explore and implement new concepts, patterns, or libraries that have not been explicitly taught while at Turing
- Practice an advanced, professional git workflow 
- Gain more experience using continuous integration tools to build and automate the deployment of features in various environments
- Build applications that execute in development, test, CI, and production environments
- Focus on communication between front-end and back-end teams in order to complete and deploy features that have been outlined by the project spec

#### Wins:

- Achieved MVP with extensions before deadline
- Successful workflow and communication between FE and BE teams
- We made an app we would actually use!
  
#### Challenges
- Learning React Native and technologies along with it like Expo and use of simulators
- Using new testing framework, Cypress
- COVID-19 impacts including remote work and affecting live restaurant data

Endpoints here:
- Endpoint for a longitude and latitude:
  - `https://hangry-ateball-api.herokuapp.com/api/v1/recommendations?latitude=LATITUDE&longitude=LONGITUDE`
- Endpoint for an entered address:
  - `https://hangry-ateball-api.herokuapp.com/api/v1/recommendations?address=ENTEREDADDRESS`
- Endpoint optional keys:
  - Food type: `&categories=RESTAURANTTYPE`
  - Price: `&price=PRICE`

### Hangry Ateball





#### Homepage:
<img alt="homepage screenshot" width="40%" src="https://user-images.githubusercontent.com/19761687/79509423-b6942300-7ff8-11ea-90c1-f63d1679141b.png" />

#### Form:
<img alt="homepage screenshot" width="40%" src="https://user-images.githubusercontent.com/19761687/79509429-b85de680-7ff8-11ea-896d-e0ce004570c6.png" />

#### Result:
<img alt="homepage screenshot" width="40%" src="https://user-images.githubusercontent.com/19761687/79509432-b98f1380-7ff8-11ea-8716-325d9c96ab65.png" />

#### Previous results
<img alt="homepage screenshot" width="40%" src="https://user-images.githubusercontent.com/19761687/79509441-bac04080-7ff8-11ea-9b7f-6d5d0aaa38e5.png" />

#### Favorites
<img alt="homepage screenshot" width="40%" src="https://user-images.githubusercontent.com/19761687/79509462-c6136c00-7ff8-11ea-8931-3de249371447.png" />

### Technologies Used:
#### FE
- JavaScript
- React Native
- Cypress
- Jest
- Expo
- Android Studio
- Xcode
- Balsamiq

#### BE
- Python
- Flask
- Swagger UI
- Travis CI

### Systems/Practices
- Agile

## Setup
