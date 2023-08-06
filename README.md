# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Documentation
You can find the documentation in the /docs directory.
Also after installing and starting the app, Swagger will active on the /api route.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

Rename existing ```.env.example``` to ```.env```

Correct configuration to your preferences. If on ```.env``` file is provided, then default configuration will be used.

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

```
docker compose -f docker-compose.dev.yaml down
docker compose -f docker-compose.dev.yaml up --build --force-recreate
```

To run app by docker in dev mode run this command.

```
docker compose -f docker-compose.yaml down
docker compose -f docker-compose.yaml up --build --force-recreate
```

To run app by docker in production mode run this command.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
