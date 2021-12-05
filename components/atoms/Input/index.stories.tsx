import { storiesOf } from '@storybook/react'
import React from 'react'
import Input from './index'
import InputReadme from './README.md'

const stories = storiesOf('Input', module).addParameters({
  readme: {
    content: InputReadme,
    sidebar: InputReadme,
  },
})

stories.add('Input', () => (
  <div
    style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Yu Gothic',
    }}
  >
    <Input label="普通" value="テキスト" />
    <div style={{ marginTop: '20px' }} />
    <Input label="プレースホルダー" placeholder="テキスト" />
    <div style={{ marginTop: '20px' }} />
    <Input
      label="バリデーション表示"
      error="バリデーションメッセージが入る"
      value="テキスト"
    />
    <div style={{ marginTop: '20px' }} />
    <Input label="入力不可" value="テキスト" disabled />
    <div style={{ marginTop: '20px' }} />
    <Input label="入力必須" isRequired />
    <div style={{ marginTop: '20px' }} />
    <Input label="入力" isRequired suffix="円" />
  </div>
))
