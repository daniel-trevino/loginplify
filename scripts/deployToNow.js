const { execSync } = require('child_process')
const dashify = require('dashify')
const deploySettings = require('../deploy-settings.json')

// Setup config to now
execSync('rm -rf dist && mkdir -p dist && rm -rf .next')

function addEnvVariablesToNow() {
  Object.keys(deploySettings).forEach(value => {
    const keyWithDash = `loginplify-${dashify(value)}`

    const nowCommand = `now secret add ${keyWithDash} ${deploySettings[value]}`
    console.log(
      `Adding now secret ${keyWithDash} with value ${deploySettings[value]}`
    )
    execSync(nowCommand)
  })
}

function deployToNow() {
  console.log('Deploying loginplify service to now...')
  execSync(
    'now -e MONGO_DATABASE_URL=@loginplify-mongodb -e APP_SECRET=@loginplify-app-secret -e EMAIL_HOST=@loginplify-email-host -e EMAIL_USER=@loginplify-email-user -e EMAIL_PASSWORD=@loginplify-email-password -e EMAIL_SENDER=@loginplify-email-sender --target production'
  )
}

addEnvVariablesToNow()
deployToNow()
