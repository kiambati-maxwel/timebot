# timeBot 

timeBot is an agile time management app , gives an anlysis of time 
spent in learning

## requirements
* nodejs version 14 or later *Latest stable release
* git 
* Browser preferably chrome
* Mongodb 
   - install mongodb community version.
   - follow installation instructions for your OS here <a href="https://docs.mongodb.com/manual/administration/install-community/">mongodb installation docs</a>
   - on windows , after downloading and installing the setup, cd to `C:\program files\mongoDB\bin` and click `mongod` to start mongo db
  
      
## installation 
### 1. Clone the app from github: run
``` 
git clone [repo url]
 
 ```
### 2. open the cloned Folder in terminal

### 3. checkout into dev_env branch
``` 
git checkout dev_env

 ```
### 4. run 
 ```
 npm i 
 ```
  to install all nodejs depedencies 

### 5. run 
``` 
npm i bcryptjs core-js 

```
then if there are vulnerabilities run
```

npm audit fix

```

ignore anymore warnings
### 6. run  
```
npm run build
```

### 7. run 
``` 
npm run dev-start 

```
to start the server ` you need internet connection when you first start the server inorder to inject workbox precache.`

### 8. navigate to localhost port 2000 in chrome browser 

## how to use 
1. register 
2. login then proceed to the main page 
2. add main module / modules or subject you want to learn with the add btn 
3. click on the module then add submodules or subtopics 
4. select that particular subtopic you want to learn and start the time 
5. when completed save the time.

#### To add application as a PWA click the + icon that apears on the right side of chromes search bar 