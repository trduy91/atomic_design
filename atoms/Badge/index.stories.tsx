import React from 'react'
import { storiesOf } from '@storybook/react'
import Badge from './index'
import BadgeReadme from './README.md'

const stories = storiesOf('Badge', module).addParameters({
  readme: {
    content: BadgeReadme,
  },
})

stories.add('Badge', () => (
  <div style={{ padding: '24px', display: 'flex' }}>
    <Badge number={1} />
  </div>
))
