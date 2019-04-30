# Login service

## 🧐 What is this?

Handle all the logins for multiple applications with a serverless graphql backend.

## 🚀 Quick start development

1.  **Clone this repository.**

    ```sh
    git clone https://github.com/danielivert/money-tracker-frontend.git
    ```

2.  **Run the project.**

    ```sh
    npm run dev
    ```

3.  **Deploy to now.**

    ```sh
    npm run deploy
    ```

## Deployment with CircleCI

Before deploying this to circle CI you need to first create the `@mongo-database-url` secret environmental variable on now locally from your computer.

The command for that is

```
now secret add mongo-database-url mongodb+srv://test:test@test.mongodb.net/
```
