# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/desktop/).
- [Docker Scout](https://docs.docker.com/scout/install/).

## Downloading

```bash

git clone https://github.com/dmitry-a-rolling-scopes/nodejs2025Q2-service.git
```

## Installing NPM modules

```bash

npm install
```

## Configuration
Create .env file (copy from .env.example):
```bash

cp .env.example .env
```

## Docker
### Up
```bash

docker compose up --detach --wait
```
or
```bash

npm run docker:up
```

### Down
```bash

docker compose down
```
or
```bash

npm run docker:down
```

## Running application

```bash

npm run start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scanning
```bash

docker scout cves dmitryarollingscopes/nodejs2025q2-service:dev
```

```bash

docker scout cves dmitryarollingscopes/nodejs2025q2-postgres:dev
```

```bash

npm run audit
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash

npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```bash

npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash

npm run lint
```

```bash

npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
