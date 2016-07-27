# Project overview

TODO

#Installation
The application can be run with docker. If you want to run it with this technology, you need to install previously docker in your server. To see how to do it, you can go on the official web site : https://www.docker.com/products/docker.
If you install this application in a windows environment, don't forget to put the application inside the virtual machine (through a dynamic montage for example)  

The next step is to go to the directory **docker** on this project and run the command `docker-compose up` in a bash terminal. Some scripts will download all dependencies need by the application and after that, will start the application.

* On a windows environment, you can see if it's working by going to the website http://192.168.99.100:3000 where 192.168.99.100 is the virtual machine IP and 3000 is the port of the application.

# Node.js

## Configuration

#### ```Package.json``` properties

scripts:
* start: command lines executed when running ```npm start``` command
* postinstall: command lines executed after running ```npm install``` command AND after installation process is completed

# Dependencies

## Typescript

#### What is it?
TypeScript is a free and open source programming language developed and maintained by Microsoft. It is a strict superset of JavaScript, and adds optional static typing and class-based object-oriented programming to the language.

#### How to use?
Add dependency in __package.json__:
```json
{
    "devDependencies": {
        "typescript": "^1.8.10"
    }
}
```
The __tsconfig.json__ file specifies the root files and the compiler options required to compile the project:
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "outDir" : "./dist/js"
  },
  "compileOnSave": false,
  "exclude": [
    "node_modules",
    "typings",
    "dist"
  ]
}
```
```compilerOptions --module``` Specify module code generation.

```compilerOptions --outDir``` Redirect output structure to the directory.

```compileOnSave``` Signal to IDE to generate all files upon saving.

```exclude``` Exclude all files in specified directories.

Because there is no ```files``` property set, all Typescript files are included (except for those in ```exclude``` directories).

#### More information
http://www.typescriptlang.org/index.html

http://www.typescriptlang.org/docs/handbook/tsconfig-json.html

https://angular.io/docs/ts/latest/guide/typescript-configuration.html
## Typings

#### What is it?
Typings is the simple way to manage and install TypeScript definitions.
#### How to use?
Add dependency in __package.json__:
```json
{
    "devDependencies": {
        "typings": "^1.0.4"
    }
}
```
Install it globally (not a requirement, but definitely more practical):
```shell
npm install typings --global
```
The __typings.json__ file specifies what JS definition are required for the project:
```json
{
  "globalDependencies": {
      "core-js": "registry:dt/core-js#0.0.0+20160602141332",
      "express": "registry:dt/express#4.0.0+20160708185218",
      "express-serve-static-core": "registry:dt/express-serve-static-core#4.0.0+20160715232503",
      "jquery": "registry:dt/jquery#1.10.0+20160704162008",
      "mime": "registry:dt/mime#0.0.0+20160316155526",
      "mysql": "registry:dt/mysql#0.0.0+20160316155526",
      "node": "registry:dt/node#6.0.0+20160720070758",
      "serve-static": "registry:dt/serve-static#0.0.0+20160606155157"
    }
}

```

#### Install new typings definition
```shell
typings install <definitionName> --save                        # simple way, but require global installation
npm run typings -- install <definitionName> --global --save    # other way through npm ; require to define command in "scripts" in package.json
```

--save option permits to update your ```typings.json``` file. A simple way to find out __definitionName__ is to use ```typings search``` command.

Then just download and install definitions:
```shell
typings install                  # simple way, but require global installation
npm run typings -- install       # other way through npm ; require to define command in "scripts" in package.json
```
#### More information
https://github.com/typings/typings

https://angular.io/docs/ts/latest/guide/typescript-configuration.html#!#typings

## Express
#### What is it?
Express is a simple web framework for Node.js. It allows to simplify basic tasks like routing.
#### How to use?
Add dependency in __package.json__:
```json
{
    "dependencies": {
        "express": "^4.13.4"
    }
}
```
#### More information
http://expressjs.com/

## Systemjs
#### What is it?
Systemjs is an universal dynamic module loader. It allows to import module in a more practical way.
#### How to use?
Add dependency in __package.json__:
```json
{
    "dependencies": {
        "systemjs": "0.19.27"
    }
}
```
The __systemjs.config.js__ file specifies the root files and the compiler options required to compile the project:
```javascript
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app':                        'dist/js',
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
    };
    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }
    System.config(config);
})(this);
```
#### More information
https://github.com/systemjs/systemjs

https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

## MySQL
#### What is it?
Let's assume you know what MySQL is and what it is used for :)
#### How to use?
Add dependency in __package.json__:
```json
{
    "dependencies": {
        "mysql": "^2.5.4"
    }
}
```
Add Typings definition:
```shell
typings install mysql --save
```
#### More information
https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

