import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import TabBar from '.'

import TabBarReadme from './README.md'

const stories = storiesOf('TabBar', module).addParameters({
  readme: {
    content: TabBarReadme,
    sidebar: TabBarReadme,
  },
})

const TabOptions = [
  { value: '1', label: 'Item 1' },
  { value: '2', label: 'Item 2' },
]
stories.add('TabBar', () => {
  const [value, setValue] = useState('1')
  return (
    <TabBar
      items={TabOptions}
      value={value}
      onChange={(selected: any) => setValue(selected)}
    />
  )
})
