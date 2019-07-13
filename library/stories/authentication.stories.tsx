import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import ProtectedPage from '../src/components/helpers/ProtectedPage'
import ProtectedPageCustomTheme from '../src/components/helpers/ProtectedPageCustomTheme'

const stories = storiesOf('Authentication', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('Default', () => <ProtectedPage />)
stories.add('With custom theme', () => <ProtectedPageCustomTheme />)
