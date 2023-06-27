
# Dev. Test-Case
Test project for the position of nodejs developer



## Documentation

Documentation - https://{api}/documentation


## Run Locally

Clone the project

```bash
  git clone https://github.com/kostjaog/dev-test-case
```

Go to the project directory

```bash
  cd dev-test-case
```

Install dependencies

```bash
  npm install | yarn
```

Start database using docker-compose
```bash
  docker-compose -f docker-compose.dev.yml up -d
```

Apply migrations on database
```bash
  npm run migrate:up | yarn migrate:up
```

Start the server

```bash
  npm run start:dev | yarn start:dev
```


## Deployment

To deploy this project run


Install dependencies 
```bash
  npm install | yarn
```

Apply migrations on database
```bash
  npm run migrate:up | yarn migrate:up
```

Create optimized production build
```bash
  npm run build | yarn build
```

Start
```bash
  npm run start | yarn start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`SALT_ROUNDS`



## License

[MIT](https://choosealicense.com/licenses/mit/)

