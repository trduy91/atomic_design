import { storiesOf } from '@storybook/react'
import React from 'react'
import TextArea from './index'
import Readme from './README.md'

const stories = storiesOf('TextArea', module).addParameters({
  readme: {
    content: Readme,
    sidebar: Readme,
  },
})

stories.add('TextArea', () => (
  <div
    style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Yu Gothic',
    }}
  >
    <TextArea label="普通" value="テキスト" />
    <div style={{ marginTop: '20px' }} />
    <TextArea label="プレースホルダー" placeholder="テキスト" />
    <div style={{ marginTop: '20px' }} />
    <TextArea
      label="バリデーション表示"
      error="バリデーションメッセージが入る"
      value="テキスト"
    />
    <div style={{ marginTop: '20px' }} />
    <TextArea label="入力不可" value="テキスト" disabled />
    <div style={{ marginTop: '20px' }} />
    <TextArea label="入力必須" isRequired />
  </div>
))
