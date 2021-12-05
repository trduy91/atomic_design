import React from 'react'
import { storiesOf } from '@storybook/react'
import FileInput from './index'
import FileInputReadme from './README.md'

const stories = storiesOf('FileInput', module).addParameters({
  readme: {
    content: FileInputReadme,
  },
})

stories.add('FileInput', () => (
  <div style={{ padding: '24px' }}>
    <FileInput value="" placeholder="選択ファイル" />
  </div>
))
