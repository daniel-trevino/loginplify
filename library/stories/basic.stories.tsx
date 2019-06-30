import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { Login } from '../src'

const stories = storiesOf('Basic', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('Default', () => (
  <div style={{ height: '100vh' }}>
    <Login />
  </div>
))
