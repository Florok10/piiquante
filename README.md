# Piiquante

## _An OpenClassrooms Web Developer project_

![Piiquante's logo](https://github.com/Florok10/piiquante/blob/main/packages/frontend/src/assets/images/flame.png 'Awesome logo')

## Setup the project

### First make sure to have Angular and Lerna installed on your machine

    In a terminal run :

```console
npm i -g lerna@latest && npm i -g @angular/cli
```

### Then once you installed the project, at its **root**

    Still in a terminal :

```console
npm run i
```

    This will install the depedencies for our packages.

    Now that our depedencies are installed, run :

```console
npm run build:client
```

    This will make angular build our hot-takes package.

    You will have to have a MongoDB database up.

    Go to packages/backend and create a .env file

    This file will need to have :
    - DB_NAME String
    - DB_USER String
    - DB_PASSWORD String
    - DB_URL String
    - APP_PORT Int
    - JWT_TOKEN String

    Now that everything is ready, go to the project's root and run :

```console
npm run start
```

### The project is now running at [default address](http://localhost:4200)

## Postman

    You can find a postman folder at the project's root

    It contains a postman collection and a postman environment, you can use it to setup quickly your postman tests

## License

    MIT

    Free Software, feel free to edit it !
