# [React Application Template](http://react.app.k0nrt15.com)

Stack:
  - Chai Assertion Library
  - Express.js - v4.14.1
  - Jasmine - v2.5.3
  - JWT
  - Karma - v1.5.0
  - MongoDB - v3.2.9
  - Node.js - v6.5.0
  - Passport
  - Pug
  - React - v15.4.2
  - React Router - v3.0.2
  - React Toolbox - v1.3.4
  - SASS
  - Webpack - v2.2.1

Getting started:
1.	Install packages
	1. npm install
2.	Install (global) [cross-env](https://www.npmjs.com/package/cross-env), [karma-cli](https://www.npmjs.com/package/karma-cli), and [nodemon](https://www.npmjs.com/package/nodemon)
	1. npm install -g cross-env nodemon
3.	Build application
 	1.	npm run dev (Development)
	2.	npm run build (Production)

Run Tests:
1.  Install (global) [karma-cli](https://www.npmjs.com/package/karma-cli)
  1. npm install -g karma-cli
2.  Run once
  1.  karma start
3.  Run continuous
  1.  karma start --single-run=false

Set Environment Variables (optional):
	Rename '.env.sample' to '.env' and set values

	Bash: source set-env-vars
	Powershell: ./set-env-vars.ps1
	Powershell (Heroku): ./set-env-vars.heroku.ps1