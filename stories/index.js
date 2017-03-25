import React, { createElement } from 'react'

const { storiesOf, action, linkTo } = require('@kadira/storybook')

const Button = require('./Button')
const Welcome = require('./Welcome')

import Ticket from '../src/locationsList/ticket'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    React.createElement(Welcome, { showApp: linkTo('Button') })
  ))

storiesOf('Button', module)
  .add('with text', () => (
    React.createElement(Button, { onClick: action('clicked') }, 'Hello Button')
  ))
  .add('with some emoji', () => (
    React.createElement(Button, { onClick: action('clicked') }, `😀 😎 👍 💯`)
  ))

storiesOf('Ticket', module)
  .add('with some data', () => (
    <Ticket item={{
        user: 'Admin',
        created_at: new Date(),
        timestamp: new Date(),
        modified: new Date(),
        lat: 45.754109791149894,
        lng: 16.077117919921875,
        description: 'Test!'
    }} />
  ))
