# CMSC-447-Spotify-04 - Andrew's Develop Branch

## Changelog - 11/21/21

* Created new views for Home, Join Room, Create Room, and Room
* Users can create a room by specifying bracket type, artist, and max users
* Users can join a created room

## Changelog - 11/17/21

* Added React App for Generating the Brackets
* Contains template based off of James' Designs
* Currently just has single elimination, but will add more

## Changelog - 11/2/21

* Very basic shell used for incorporating BootStrap into Django
* Contains a NavBar that allows you to jump between the 'Home' page, the 'About' page, and the 'Login' page
* NavBar will automatically resize when the browser width reaches a certain value (done automatically by BootStrap)
* NavBar is global, so any updates to it will be reflected across all pages that include it
* Allows you to login with your Spotify account


## Dependencies

* Python 3.8
* Django 3.2.8
* social-auth-app-django 5.0.0
* social-auth-core 4.1.0
* npm 6.14.13

## How To Run

* Clone the repository to a local project in your IDE (PyCharm preferred)
* Make sure all dependencies are installed (if in root directory, type in termal "pip install -r requirements.txt")
* Run the following commands in the terminal: "cd brackets" -> "npm i" -> "npm run build"
* To run the server, ensure you are in root directory (from last step, type "cd .."). Then, run "python manage.py runserver"
* Once the server is running, click the link in the terminal or visit "http://127.0.0.1:8000/"
* To close the server, press "CTRL+C" in the terminal

## Future Additions

* Functional dropdown menu when browser resize occurs
* Begin creating more brackets and add interactivity
* Add a way to see who all is in the room
* Store previous brackets/results into the database
* Enfore max user rule
* Make front-end look more aesthetically pleasing
