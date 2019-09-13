[![Build Status](https://travis-ci.org/kimenyikevin/FreeMentor.svg?branch=develop)](https://travis-ci.org/kimenyikevin/FreeMentor)
[![Coverage Status](https://coveralls.io/repos/github/kimenyikevin/FreeMentor/badge.svg?branch=develop)](https://coveralls.io/github/kimenyikevin/FreeMentor?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c52cb512a25aee536bb/maintainability)](https://codeclimate.com/github/kimenyikevin/FreeMentor/maintainability)


# FreeMentor BootCamp Project  Andela's-Kigali-cycle-10
**FreeMentor** is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

I developed UI for Fronted with **HTML**,**CSS**,**JavaScript** and also i developed API for functionality of project. 

First let see how my UI look like, here is the list of pages on UI templete 

* Home page.
* Sing up page, after sign up with email only you will be redirected to another pages contain form to fill your profile.
* Sign in page.
* User dashboard,here user will be able to view all mentors available and also can view profile of specific mentor so that he/she can request mentorship session.
* mentor dashboard, here mentor will be able to accept mentorship session request or decide to decline it.
* Admin dashboard,admin will be able to view all mentors and users so that he/she can decide to change user to a mentor.

To view UI templete simply click on this [link](https://kimenyikevin.github.io/FreeMentor/UI/)


### HOW DO I GET STARTED
To get started visist UI templete click on **Get Started** button from the home page and create account and complete the profile. You will be redirected to the **user dashboard** on the dashboard you will see **all mentors** available so you can start creating metorship sessions.
* To see **admin dashboard** simply click on this [link](https://kimenyikevin.github.io/FreeMentor/UI/pages/admin.html)
From **Admin dashboard** admin can change user to mentor. 
* To see **mentor dashboard** simply click on this [link](https://kimenyikevin.github.io/FreeMentor/UI/pages/mentor.html)

### FreeMentor API ENDPOINTS
Here is a list of all API Endpoints that you will find:
* POST /api/v2/auth/signup: before you do anything first create an account.
* POST /api/v2/auth/signin: if you already have an acount you can use this EndPoint to sign in.
* PATCH /api/v2/auth/user/:id : This EndPoint is for admin want to change user to mentor.
* GET /api/v2/auth/mentors : this EndPoint is for user want to view all mentor.
* GET /api/v2/auth/mentors/:id : this EndPoint is for user want to view specific mentor profile.
* POST /api/v2/auth/sessions : this Endpoint is for user want to create sessions.
* PATCH /api/v2/auth/sessions/:sessionsId/reject : Finally mentor can use this to reject.
* PATCH /api/v2/auth/sessions/:sessionsId/accept : and also this to to accept mentorship sessions.

### Technology tools used in this Project
* Server side Framework : **Node/Express**
* Linting Library: **ESLint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha**
* Database: **Postgresql**
### Additional Tools
* JavaScript Es6 with Babel transpiler
* TravisCI for Continous Integration
* nyc for test coverage
* CodeClimate and Coveralls for badges
* Heroku for Deployment
### Here there is important link you may visit
* [freementorss.herokuapp.com](https://freementorss.herokuapp.com/api-docs/) Here is link for documantation for APIs EndPoints
* [UI Templete](https://kimenyikevin.github.io/FreeMentor/UI/) Here is link for UI templete
* For a better test you will need to use [POSTMAN](https://www.getpostman.com/)
### Setup project locally
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)
* Clone Repo [FreeMentor](https://github.com/kimenyikevin/FreeMentor.git)

```
$ To move into folder
```
$ cd FreeMentor-develop
```
Install dependincies as they appear in package.json file by

```
$ npm install
```
To start the server do

```
$ npm run dev-start
```
To run the test do

```
$ npm run test
### Author
[Kevin KIMENYI](https://github.com/kimenyikevin)
### Acknowledgments
[Andela Kigali](https://andela.com)
