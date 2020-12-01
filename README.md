# COMP1800Group16App## My Web Application (NlightN)

* [General info](#general-info)
* [Members](#Team-16-Members)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
NlightN is a web appplication that allows students to find, rate and share
online learning resources

## Team 16 Members 
[Owen Arando](https://github.com/owenarando)
[Junxian Liu](https://github.com/ggbullet16688)
[Gavin Knoke](https://github.com/GavinGD)
[Ranbir Hundal](https://github.com/RanbirH)

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Jquery 
* FireBase
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url,  it also has the user login 
├── home.html                # User home page, where the user is brought after logging in. Displays the groups that has joined 
├── group.html               # A group from the home page, displays the threads within a group.
├── thread.html              # A thread from the group page, displays the posts within a thread.
├── post.html                # A post from the thread page, displays the post itself with its likes and comments.
├── 404.html                 # Where the user is brought if the page they are looking for cannot be found
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /NlightN-logo.PNG        # NlightN logo
├── scripts                  # Folder for scripts
    /clickButtonEffects.js   # Adds feedback to all the buttons
    /firebaseApi.js          # For the firebase Api
    /group.js                # For the group page
    /home.js                 # For the home page
    /index.js                # For the index page
    /post.js                 # For the post page
    /settingsMenu.js         # For the settings menu for each page
    /thread.js               # For the thread page
    └──CreationPages         # Sub folder for the creation pages
        /commentCreation.js  # For the comment creation page.
        /postCreation.js     # For the post creation page.
        /threadCreation.js   # For the thread creation page.
├── styles                   # Folder for styles
    /group&Thread.css        # For the group and thread page
    /home.css                # For the home page
    /index.css               # For the index page
    /post.css                # For the post page
    /variables.css           # For color variables and shared classes
    └──CreatioPages          # Sub folder for the creation pages
        /commentCreation.css # For the comment creation page.
        /postCreation.css    # For the post creation page.
        /threadCreation.css  # For the thread creation page.
├── creationPages            # Folder for the creation pages HTML
    /commentCreation.html    # For the comment creation page.
    /postCreation.js         # For the post creation page.
    /threadCreation.js       # For the thread creation page.
Firebase hosting files: 
├── .firebase
    /hosting..cache
├── .firebaserc
├── .firebase.json
├── .firebase.indexes.json
├── .firestore.rules


```


