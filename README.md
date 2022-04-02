# social-network-API

## Description

This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. 

You may view the the walkthru video that demonstrates the application's functionality by [clicking this link for part 1-users and friends](https://drive.google.com/file/d/1OWYnzRi8q8v4JxNK0U3tAXJoHFUC7n1o/view) and [this link for part 2-thoughts and reactions](https://drive.google.com/file/d/1hGcrNr8kLZ7JPvg77ShuGibM947WcD_l/view).


## Technologies

- The application uses Express.js for routing, a MongoDb database and the Mongoose ODM. In addition to the Express.js and Mongoose NPM packages, the native Javascript `Date` object was used to format timestamps.

## Criteria

**User Story**

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

**Acceptance Criteria**

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database

WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database

WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Accomplishments and Challenges

The application successfully connects to the database and syncs the Mongoose models. 
- The API GET routes for thoughts and users displays JSON data for each route.
- the API POST, PUT, and DELETE routes create, update and delete users, their  friends, their associated thoughts, add and remove thoughts associated reactions in the database

**Below are a screenshots of the app showing the functionality:**

Below are images from Insomnia, displaying data:  
<br />
![Add-friend](./public/images/add-friend.jpg)  
<br />
![Add-thought](./public/images/add-thought.jpg)  
<br />
![All-users](./public/images/get-users.jpg) 

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Credits

**The following resources were used to complete this project:**
1. UCONN Coding Bootcamp's modules on NoSQL/MongoDB
2. [Mongoose](https://mongoosejs.com/docs/index.html) Documentation 
3. [MongoDB Schema Validation](https://www.mongodb.com/docs/manual/core/schema-validation/) Documentation 
4. [MDN Web Docs on Javascript Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) Documentation 

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

