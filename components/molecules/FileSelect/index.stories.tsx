import React from 'react'
import { storiesOf } from '@storybook/react'
import FileSelect from './index'
import FileSelectReadme from './README.md'

const stories = storiesOf('FileSelect', module).addParameters({
  readme: {
    content: FileSelectReadme,
  },
})

stories.add('FileSelect', () => (
  <div style={{ padding: '24px' }}>
    <FileSelect
      setFile={() => {
        // do nothing
      }}
    />
  </div>
))
