# timeBot 

timeBot is an agile time management app, gives an anlysis of time 
spent in learning.

## Usage Demo
![Showcase](demo/demo.gif)

## Prerequisites
* nodejs version 14 or later *Latest stable release
* git 
* Browser preferably chrome
* Mongodb 
   - install mongodb community version.
   - follow installation instructions for your OS here [mongodb installation docs](https://docs.mongodb.com/manual/administration/install-community/)</a>
   - on windows , after downloading and installing the setup, cd to `C:\program files\mongoDB\bin` and click `mongod` to start mongo db
  
      
## Installation 
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

### 8. Navigate to localhost port 2000 in chrome browser 

## Usage 
1. Register 
2. Login then proceed to the main page 
2. Add main module / modules or subject you want to learn with the add btn 
3. Click on the module then add submodules or subtopics 
4. Select that particular subtopic you want to learn and start the time 
5. When completed save the time.

## PWA
* To add application as a PWA click the + icon that apears on the right side of chromes search bar.

## Contributions
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change

Master branch is empty,  marge request to this branch from dev_env branch will be done during deployment. All contributions should be done from dev_env branch.

LICENCE [MIT](LICENSE)
