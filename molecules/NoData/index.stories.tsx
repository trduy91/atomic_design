import React from 'react'
import { storiesOf } from '@storybook/react'
import NoData from './index'
import NoDataReadme from './README.md'

const stories = storiesOf('NoData', module).addParameters({
  readme: {
    content: NoDataReadme,
  },
})

stories.add('NoData', () => (
  <div style={{ padding: '24px' }}>
    <NoData />
  </div>
))
