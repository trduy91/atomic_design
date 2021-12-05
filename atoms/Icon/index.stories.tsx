import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from './index'
import IconReadme from './README.md'

const stories = storiesOf('Icon', module).addParameters({
  readme: {
    content: IconReadme,
    sidebar: IconReadme,
  },
})

stories.add('Icon', () => (
  <div style={{ padding: '24px', display: 'flex' }}>
    <Icon src="/static/images/ic_clear.svg" width="24" height="24" />
  </div>
))
