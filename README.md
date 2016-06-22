# chuus

Dynamic web project in php, sql, ajax, jquery and javascript on apache server. 

If you want to upload this project take into account this instructions:

# Connecting with the new server

- update connect.inc.php and connect2.inc.php

# Security precautions

- Change the htaccess.txt, change to .htaccess on your server

# bbdd 
- You can upload the bbdd example file chuus.sql 

# updating APIs and urls:

- bacward.js and forward.js:  update the url for twitter page on lines 82 and 101, respectively.
- fb.shareme.js:              update  http url at line 12 and picture url at line 20, include your Facebook appId at line 18.
- fb.connect.js:              include your Facebook appId at line 5.
- api.script.twitter.js:      change the http url at line 12.
- check.signup.ajax.php:      change url at line 49 and type your Sendgrid Key at line 51.
- recover.pass.inc.php:       add your Your API SendGrid key at line 59 and change http url at line 59.
- validate.admin.pass.ajax.php: configure your admin pass at line 20.
- head.inc.php:               update FB ID at line 10 and urls at lines 11 and 15, google id verification at line 8.
- footer.inc.php:             update twitter configuration from line 15 to 21.
