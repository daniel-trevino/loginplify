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
- [x] Update to Next js 9
- [x] Change the cookie name to `loginplify-token`
- [x] Remove Apollo Client

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
- [x] Change the cookie name to `loginplify-token`
- [x] Support SSR
- [ ] Better way to initialize the endpoint just once in the application
- [ ] Support to modify all strings on the application
- [ ] Support for localization

## Folder structure and development

This is a monorepo, so both client/server are withing the repository. You need to create a `.env` file on the root path of this repository. Make a copy from `.env.sample` and rename it to `.env`. Modify the values to your settings. After doing that, you can run the server locally with:

```
  cd server && npm run dev
```

The GraphQL playground will be available on `http://localhost:3000`

## Get Started

## 1) Deploy the login service to now.sh

1. Clone this repository
2. Make sure you are logged in to _Now.sh_ on your cli. Run `now whoami` and you should get a response of your username. If you are not logged in, then run `now login` and follow the steps.
3. Add the following environmental variables on now:

```
now secret add loginplify-mongodb mongodb+srv://test:test@test.mongodb.net/
now secret add loginplify-app-secret theSecretString
```

### Optional variables

If you want to enable sending emails for verify accounts or reset password, please include these secret variables. To setup using Gmail, please refer to [this guide](#Gmail)

```
now secret add loginplify-email-host pop.gmail.com
now secret add loginplify-email-user mygmail@gmail.com
now secret add loginplify-email-password gmailPassword
now secret add loginplify-email-sender no-reply@gmail.com
```

4. Deploy to now by running:

```
npm run now:deploy
```

5. Add an alias to your deployment in now with the following syntax: `loginplify.[mydomain.com]`

6. Access your graphql endpoint as: `https://loginplify.[mydomain.com]/graphql`

## Using mongo atlas as the database

In order to use Mongo atlas cluster, make sure you whitelist all upcoming IP Addresses. Please follow [this guide](https://docs.atlas.mongodb.com/security-whitelist/). This needs to be done to accept connections from our loginplify serverless service.

## Gmail

### Send emails from loginplify service to verify account and reset password

Loginplify uses nodemailer to send emails. If you want to setup gmail follow [this guide](https://nodemailer.com/usage/using-gmail/)

## Implement in a React application

Please refer to the documentation in the [Loginplify component library](https://github.com/danielivert/login-service/tree/master/library)
