afterthink-engine
=================

Backend of a prototype interface
James Wu
Kai Austin
Zach Homans

Notes for Kai and Zach
=====
* The menu is in menu.json.
* Thumbnails should go in public/images/thumbnails
* Photos should go in public/images/photos

Setup
=====

Please pull from this repo.

In order to run the app, you just need node js, which comes with npm, the node package manager.
http://nodejs.org/

Go to the app's root directory and type

```
node app.js
```

into the terminal.

Then go to

```
localhost:3000
```

in your browser.


For best results, run this in Ubuntu.

Database
=====

This app uses Firebase to handle all of its data.
Our app's Firebase root endpoint:

https://groupthought.firebaseio.com/

Dependencies
=====
Firebase
AngularFire
https://github.com/haraldrudell/uinexpress
