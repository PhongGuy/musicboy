# Birdykit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20 and [Angular Material](https://material.angular.io) version 8.2.3

# Getting setup

## Git

You need to have git installed first of all. You can download git from here [https://git-scm.com](https://git-scm.com/downloads).

## NodeJS

You also will need to install NodeJS, we use node in our project as JavaScript runtime this is also needed for angular(angular is the framework the this is project is build on) You can downaload i from here [https://nodejs.org](https://nodejs.org/en/download/)

## Visual studio code

*Visual Studio Code* or ***vscode*** is the best tool for developing this app and i highly recommended using that. You can download vscode from here [https://code.visualstudio.com](https://code.visualstudio.com/Download)

Once this is downloaded you can clone the project to your computer. Press F1 and type clone. "*Git: clone*" should show up, pick that and type the url of the project "https://github.com/PhongGuy/birdykit", there after you can login and it will start downloading the project.

When that is done, you can do the same with the API "https://github.com/PhongGuy/birdykit-api".

## XAMPP

XAMPP is the server side and database, You can download it from here [https://www.apachefriends.org](https://www.apachefriends.org/download.html).

When that is done installing you can open it and click on the ***Config*** ud fra ***Apache*** and click on the first one "*httpd.conf*". Now you need to scroll down the where it says  ***DocumentRoot*** and change that path to where you placed the **birdykit-api**.

Now you can start *Apache* and *MySQL*. The database is located at http://localhost/phpmyadmin/ and the apache server is located at http://localhost/.

Go into the API project and find the ***birdykit.sqp*** file and copy it all. Go to the database,click in the console in the lower left corner and pase all from the file in, hit *ctrl+enter*. **It will show an error, you can ignore that**. Now you have the database added.


## Getting the project ready for local development

Open the birdykit project with vscode. If you don't se a terminal at the bottom you need to click in the ternaimal in the top left, "New terminal". Type in the terminal "*npm install -g @angular/cli*" this will install the angular commands. when that is done you need to type "*npm i*" this will install all the things that the application is using.

Now you should be able to launch the project locally, type "*ng serve*" to start the application.
