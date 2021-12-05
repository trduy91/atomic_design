/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import React from 'react'
import RequireButton from './index'
import RequireButtonReadme from './README.md'

const stories = storiesOf('RequireButton', module).addParameters({
  readme: {
    content: RequireButtonReadme,
  },
})

stories.add('ButtonBar', () => (
  <div>
    <RequireButton label="必須" />
  </div>
))
