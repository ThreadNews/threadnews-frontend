# threadnews-frontend
Front end of ThreadNews

## UI design
https://www.figma.com/file/6rGDnor8J7vn3hfzaOJBZe/threadNews?node-id=50%3A0

Code Formatters Used: 
Prettier 

Pre-setup: Recommend using python virtual environment to create a sandbox for the project and allows for separation of your local python installation with this project's setup. For more information on setting up a virtual environment, please read here. Additionally, a configuration file will be setup in .config directory with a file name api.conf. The format of which will be generated after the first run of the code. Another option is to use environmental variables.

npm is required to install and manage all of the required dependencies. The
file package.json contains all of the currently used dependencies. The file
`.env` contains environment variables for Heroku, the most important of which is `REACT_APP_BACKEND_URL`, which should be updated based on the current backend URL (for example, if this changes or if you want to reference a test/beta/prod backend)

Steps to setup project

npm install
npm start

This should start a local server that can be connected to at the given address

Testing

Tests are currently managed using cypress and stored in the cypress/ directory.
To run tests, 

npx cypress open or
npx cypress run

Testing notes:
* The login API tests depend on what port you are using, and may fail if you are not using the
proper port

CI Management

This project uses Travis CI to run a set of programs to ensure tests are working and code formatting is valid. 

To edit what the CI performs, edit .travis.yml to add new commands.
Deployment

The deployment server is heroku. Since the project splits the frontend and backend into separate repositories, code for the frontend will be ran within its own heroku app.

Heroku deploys the code from the dev branch once the CI passes after an update. Heroku deploys based on the commands set in Procfile.

The current Procfile only contains the command

web: npm start

Which begins the frontend code.

Note: Heroku sleeps the application after a set time when inactive, thus, may take a while to start up