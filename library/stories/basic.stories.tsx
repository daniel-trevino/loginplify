import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { withAuthenticator } from '../src'
import ProtectedPage from '../src/components/helpers/ProtectedPage'

const stories = storiesOf('Basic', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <div style={{ height: '100vh' }}>{withAuthenticator(ProtectedPage)}</div>
))
