import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import VerifyPage from '../src/pages/VerifyPage'
import NewPasswordPage from '../src/pages/NewPasswordPage'

const stories = storiesOf('Pages', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('Verify success', () => (
  <VerifyPage
    trigggerVerify={false}
    endpoint="https://loginplify.danieltrevino.se/graphql"
    token="test"
  />
))
stories.add('Verify with request', () => (
  <VerifyPage
    endpoint="https://loginplify.danieltrevino.se/graphql"
    token="test"
  />
))

stories.add('New password', () => (
  <NewPasswordPage
    endpoint="https://loginplify.danieltrevino.se/graphql"
    token="test"
  />
))
