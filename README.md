# Login service

## 🧐 What is this?

Handle all the logins for multiple applications with a serverless graphql backend.

## Folder structure and development

This is a monorepo, so both client/server are withing the repository. You need to create a `.env` file on the root path of this repository. Make a copu from `.env.sample` and rename it to `.env`. Modify the values to your settings. After doing that, you can run the server locally with:

```
  cd server && npm run dev
```

The GraphQL playground will be available on `http://localhost:3000`

## Generate Now.sh secret environmental variables

- `@login-service-mongodb`
- `@login-service-email-host`
- `@login-service-email-user`
- `@login-service-email-password`
- `@login-service-email-sender`
- `@app-secret`

Examples of the commands

```
now secret add login-service-mongodb mongodb+srv://test:test@test.mongodb.net/
now secret add login-service-email-host pop.gmail.com
now secret add login-service-email-user mygmail@gmail.com
now secret add login-service-email-password gmailPassword
now secret add login-service-email-sender no-reply@gmail.com
now secret add app-secret theSecretString
```

## 🚀 Deploy to Now.sh

Assuming you have already forked this repository:

1. Before deploying this to _Now.sh_ you need to first create secret environmental variables.

2. Go to `now.json` and change the alias of your application

3. Run the following command:

```
  now --target production
```

## 🚀 Deployment to Now with CircleCI

Assuming you have already forked this repository:

1. Before deploying this to circle CI you need to first create secret environmental variables on _Now.sh_

2. Then you have to generate an auth token in _Now.sh_ that will be configured on the Circle CI pipeline.

3. Now you can create a new CircleCI project, link it with your repository where you forked this one, and run the pipeline.
