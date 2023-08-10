# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js v 18 or higher - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker **
- PostgreSQL Server **

** Conditional, depending on your desired method of run app.

## Documentation

You can find the documentation in the /docs directory.
Also after installing and starting the app, Swagger will active on the /api route.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/api/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.

## Downloading

``` npm cli
git clone {repository URL}
```

## Installing NPM modules

``` npm cli
npm install
```

## Configuring .env

Rename existing ```.env.example``` to ```.env```

Correct configuration to your preferences. If on ```.env``` file is provided, then default configuration will be used.

## Running application

## Local run

Before starting the app you need to run postgresql on your machine, it could be a stand-alone version or docker container, or even a remote server.

Put you connection data in .env file.

Before starting app you will need start

``` npm cli
npx prisma generate
npx prisma migrate deploy
```

To generate prisma client and push migration to DB.

You can start the application in dev or prod mode by running

``` npm cli
npm startstart:dev
```

or

``` npm cli
npm start start:prod
```

## Docker run

You can run the application in docker containers for development mode and also in production.

### Docker run in development mode

To run app by docker in dev mode run this command.

``` npm cli
docker compose -f docker-compose.dev.yaml down
docker compose -f docker-compose.dev.yaml up --build --force-recreate
```

First command ensures that all corresponding containers are down.

Second command will start build and then run containers.

Postgres container will start with connection data which is stored in .env file and exposed ports.

App container after start will copy all files (excluding some from .dockerignore) to container then install all packages from ```package-lock.json``` and then generate prisma client and stop in "install" stage.

After build docker compose will send commends to container:

```npx prisma migrate deploy``` - this will start the prisma migration on fresh DB.

```npm run start:dev``` - this will start the nestjs app in watch mode.

After container started you are free to edit you app files in src directory in you local machine, docker container will receive all changes and rebuild app.

### Docker run in production mode

To run app by docker in production mode run this command.

``` npm cli
docker compose -f docker-compose.yaml down
docker compose -f docker-compose.yaml up --build --force-recreate
```

First command ensures that all corresponding containers are down.

Second command will start build and then run containers.

Postgres container will start with connection data which is stored in .env file.

App container after start will copy all files (excluding some from .dockerignore) to container then install all packages from ```package-lock.json``` and then generate prisma client and stop in "install" stage.

Then in stage build app will be builded.

Then in "production" stage, result of build will be copied and set ownership to "node" user. NODE_ENV will be set to production and ```npm prune --production``` will be started to remove all dev dependencies. This step will decrease size of container.

After build docker compose will send commends to container:

```npx prisma migrate deploy``` - this will start the prisma migration on fresh DB.

```npm run start:prod``` - this will start the nestjs app in prod mode.

After container started only app container will be exposed to the world on port used in .env file.

## Vulnerabilities scanning

You can scan images and npm packages for vulnerabilities with command ```npm run scan:dev``` or ```npm run scan:prod```

Depending on current docker composer run you need to run corresponding command.

```npm run scan:dev``` - for ```docker-compose.dev.yaml```

```npm run scan:prod``` - for ```docker-compose.yaml```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

``` npm cli
npm run test
```

To run only one of all test suites

``` npm cli
npm run test -- <path to suite>
```

To run all test with authorization

``` npm cli
npm run test:auth
```

To run only specific test suite with authorization

``` npm cli
npm run test:auth -- <path to suite>
```

### Auto-fix and format

``` npm cli
npm run lint
```

``` npm cli
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: <https://code.visualstudio.com/docs/editor/debugging>
