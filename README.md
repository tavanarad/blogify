# Blogify
Blogify is a simple blog system that is powered by Django and Angularjs. 

## Step 1: Requirements
1. Install python and bower
2. Install vritualenv via `pip install virtualenv`
3. make a new python virtual enviroment `virtualenv blogify-env`
4. clone blogify from [git@github.com:mory0tiki/blogify.git](git@github.com:mory0tiki/blogify.git)
5. switch to virtual enviroment `source blogify-env/bin/active`
6. Install requirements `pip install blogify/requirements`
6. go to next step

## Step2: How to run
1. run `bower install` to install javascript and css frameworks.
2. run `./manage.py makemigrations` to update migration files.
3. run `./manage.py migrate` to create or update your database.
4. run `./manage.py runserver` to run wcgi server.
5. go to [http://localhost:8000](http://localhost:8000).
6. Enjoy it!
