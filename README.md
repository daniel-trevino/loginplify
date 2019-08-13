# Loginplify

## 🧐 What is this?

Handle all the logins for multiple applications with a serverless graphql backend.

## Goal

The goal of this project is to provide a modern and easy to integrate login service.

## TODO

**Client**

- [x] Account verification page
- [x] Password reset page
- [x] Working Backend
- [x] Setup Apollo Client
- [x] Update to Next js 9

**Backend**

- [x] Serverless GraphQL server
- [x] Serverless mongoose with express
- [x] Mutations
      _ [x] signUp
      _ [x] login
  - [x] verify
        _ [x] requestVerify
        _ [x] requestRest
  - [x] resetPassword
- [x] Queries \* [x] me
  - [x] getUsers
- [x] Handle multiple permissions
- [ ] Send permissions array on the token
- [ ] Move to oAuth (add expiry to token and use client UI to invalidate them and logout users)

**Library**

- [x] Setup TS project
- [x] Add storybook
- [x] Custom theme color
- [x] Components
      _ [x] Verification page
      _ [x] Change password page - [ ] Protected component (instead of HOC)
  - [x] withAuthenticator HOC
- [x] Expose state in a hook `useLoginServiceContext`
- [ ] Better way to initialize the endpoint once in the application
- [ ] Update to react-apollo 3.X.X

## Folder structure and development

This is a monorepo, so both client/server are withing the repository. You need to create a `.env` file on the root path of this repository. Make a copy from `.env.sample` and rename it to `.env`. Modify the values to your settings. After doing that, you can run the server locally with:

```
  cd server && npm run dev
```

The GraphQL playground will be available on `http://localhost:3000`

## Get Started

## 1) Deploy the login service

1. Clone this repository
2. Create a file on the root folder called `deploy-settings.json` copy this JSON object into it with your config settings

```js
{
  mongodb: 'mongodb+srv://test:test@test.mongodb.net/',
  emailHost: 'pop.gmail.com',
  emailUser: 'mygmail@gmail.com',
  emailPassword: 'gmailPassword',
  emailSender: 'no-reply@myemail.com',
  appSecret: 'verySecretThing'
}
```

3. Make sure you are logged in to _Now.sh_ on your cli. Run `now whoami` and you should get a response of your username. If you are not logged in, then run `now login` and follow the steps.

4. Run `npm run deployservice`

## Client - Protect a page using

```js
import * as React from 'react'
import withAuthenticator from '../../components/withAuthenticator'

const settings = {
  endpoint: 'https://loginservice.mydomain.se/graphql'
}

const ProtectedPage = () => {
  return (
    <div>
      <h1>This is private content</h1>
    </div>
  )
}

export default withAuthenticator(ProtectedPage, settings)
```

## Generate Now.sh secret environmental variables

- `@login-service-mongodb`
- `@login-service-email-host`
- `@login-service-email-user`
- `@login-service-email-password`
- `@login-service-email-sender`
- `@login-service-app-secret`

Examples of the commands

```
now secret add login-service-mongodb mongodb+srv://test:test@test.mongodb.net/
now secret add login-service-email-host pop.gmail.com
now secret add login-service-email-user mygmail@gmail.com
now secret add login-service-email-password gmailPassword
now secret add login-service-email-sender no-reply@gmail.com
now secret add login-service-app-secret theSecretString
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
