import React from 'react'
import { storiesOf } from '@storybook/react'
import Alert from './index'
import AlertReadme from './README.md'

const stories = storiesOf('Alert', module).addParameters({
  readme: {
    content: AlertReadme,
  },
})

stories.add('Alert', () => (
  <div style={{ padding: '24px' }}>
    <Alert text="従業員保存が完了しました" show />
    <div style={{ marginTop: '10px' }} />
    <Alert text="削除が完了しました" variant="warning" show />
    <div style={{ marginTop: '10px' }} />
    <Alert text="エラーが発生しました" variant="danger" show />
  </div>
))
