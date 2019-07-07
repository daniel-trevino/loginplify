import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import Button from '../src/components/Button'

const stories = storiesOf('Button', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('Default', () => <Button type="submit">Click</Button>)
stories.add('Loading', () => (
  <Button type="submit" loading>
    Click
  </Button>
))
