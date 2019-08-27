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
  - [x] signUp
  - [x] login
  - [x] verify
  - [x] requestVerify
  - [x] requestRest
  - [x] resetPassword
- [x] Queries
  - [x] me
  - [x] getUsers
- [x] Handle multiple permissions
- [x] Send permissions array on the token
- [ ] Move to oAuth (add expiry to token and use client UI to invalidate them and logout users)

**Library**

- [x] Setup TS project
- [x] Add storybook
- [x] Custom theme color
- [x] Components
  - [x] Verification page
  - [x] Change password page
  - [x] withAuthenticator HOC
  - [ ] Protected component (instead of HOC)
- [x] Expose state in a hook `useLoginServiceContext`
- [ ] Better way to initialize the endpoint just once in the application
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
  "mongodb": "mongodb+srv://prod:prod@prod.mongodb.net/",
  "emailHost": "pop.gmail.com",
  "emailUser": "mygmail@gmail.com",
  "emailPassword": "gmailPassword",
  "emailSender": "no-reply@myemail.com",
  "appSecret": "verySecretThing"
}
```

3. Make sure you are logged in to _Now.sh_ on your cli. Run `now whoami` and you should get a response of your username. If you are not logged in, then run `now login` and follow the steps.

4. Run `npm run deployservice`

5. Add an alias to your deployment in now with the following syntax: `loginplify.[mydomain.com]`

6. Access your graphql endpoint as: `https://loginplify.[mydomain.com]/graphql`

## Implement in a React application

Please refer to the documentation in the [Loginplify component library](https://github.com/danielivert/login-service/tree/master/library)
