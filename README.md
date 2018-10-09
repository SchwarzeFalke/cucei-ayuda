# Cucei Ayuda (QCInf)

QCInf RESTful API designed for the Web Programming course (2018-B) in Node.js.

### Description

This is the RESTful API for the CUCEI's help application. It is designed for giving all the information related to scheduling and orientation (maps) for students inside the campus. Also, it gives the information with regard to teachers, doubts and/or recommendations through a forum resource.

### REQUIRED

The app need some packages or specific programs to run, here is a list of all the dependencies:

+ "body-parser"
+ "dotenv"
+ "express"
+ "mysql"
+ "faker"

All of these packages are installed using node package manager.
To install npm refer to this official website with all the details https://www.npmjs.com/get-npm

For example to install body-parser use the following command in your terminal window:
	npm install body-parser
And do the same with all the other dependencies.

### DEPLOYMENT

To use this app in real time it's necesary to deploy the app to a server, for this app we choosed to use heroku's free app hosting.
Also we need to use ClearDB a package for heroku for connecting to a mysql database.

To use heroku you first need to create an account on heroku's official website https://heroku.com
. Install heroku CLI (Command Line Interface)
. create an app
. clone git repository
. configure heroku to use your newly created app
. install ClearDB
. Configure environment variables in heroku to use ClearDB
. Create the tables in your database using mysql

Use heroku open to open the app

### 1- USERS MODULE
### 2- MAP MODULE
### 3- SUBECT MODULE
### 4- FORUM MODULE

The forum allows user to create topics, which is usually a word describing the main theme of the topic. ej "Comida"

Inside each Topics users can create threads, the threads are composed by a sentences that describes his/her problem
or opinion related to the topic.

All users can make posts on the threads to answer the questions made by the author of the thread.

All the users can enter their subjects and with their schedule they can generate a map with routes to their daily classrooms.

For more information about the forum:
  + [Topics](https://github.com/SchwarzeFalke/cucei-ayuda/wiki/Topics)
  + [Threads](https://github.com/SchwarzeFalke/cucei-ayuda/wiki/Threads)
  + [Posts](https://github.com/SchwarzeFalke/cucei-ayuda/wiki/Posts)


## Authors

+ Carlos
+ Brandon
+ Tyler
+ Julio 

## License
This project is licensed under the MIT License - see the [LICENSE.md] file for details
