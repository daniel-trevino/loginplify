const { execSync } = require('child_process')
const dashify = require('dashify')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const deploySettingsFile = path.join(__dirname, '../deploy-settings.json')
const showHelpLog = () => {
  console.log(
    'Read more about deployment at',
    chalk.underline(
      'https://github.com/danielivert/loginplify#1-deploy-the-login-service'
    )
  )
}

if (!fs.existsSync(deploySettingsFile)) {
  console.log(chalk.red('Missing deploy-settings.json'))
  showHelpLog()
  process.exit(0)
}

const deploySettings = require(deploySettingsFile) || {}
const keys = [
  'mongodb',
  'emailHost',
  'emailUser',
  'emailPassword',
  'emailSender',
  'appSecret'
]

const missingKeys = keys.filter(settingsKey => !deploySettings[settingsKey])
if (missingKeys.length > 0) {
  console.log(
    chalk.red(`Missing keys: ${missingKeys.join(', ')} in deploy-settings.json`)
  )
  showHelpLog()
  process.exit(0)
}

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
  const parts = [
    'now',
    '-e MONGO_DATABASE_URL=@loginplify-mongodb',
    '-e APP_SECRET=@loginplify-app-secret',
    '-e EMAIL_HOST=@loginplify-email-host',
    '-e EMAIL_USER=@loginplify-email-user',
    '-e EMAIL_PASSWORD=@loginplify-email-password',
    '-e EMAIL_SENDER=@loginplify-email-sender',
    '--target production'
  ]
  execSync(parts.join(' '))
}

addEnvVariablesToNow()
deployToNow()
