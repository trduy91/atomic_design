import React from 'react'
import { storiesOf } from '@storybook/react'
import Stepper from './index'
import Readme from './README.md'

const stories = storiesOf('Stepper', module).addParameters({
  readme: {
    content: Readme,
  },
})

type StepProps = {
  label?: string
  onClick?: () => void
  active?: boolean
  done?: boolean
}

stories.add('Stepper - init', () => {
  const items: StepProps[] = [
    {
      label: '申請内容の編集',
      onClick: () => {
        // do nothing
      },
      active: true,
    },
    {
      label: '承認者の選択',
      onClick: () => {
        // do nothing
      },
      active: false,
    },
    {
      label: '内容の確認',
      onClick: () => {
        // do nothing
      },
      active: false,
    },
    {
      label: '申請完了',
      onClick: () => {
        // do nothing
      },
      active: false,
    },
  ]

  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        fontFamily: 'Yu Gothic',
        backgroundColor: '#f1f1f2',
      }}
    >
      <Stepper items={items} />
    </div>
  )
})

stories.add('Stepper - done step 1', () => {
  const items: StepProps[] = [
    {
      label: '申請内容の編集',
      onClick: () => {
        // do nothing
      },
      active: false,
      done: true,
    },
    {
      label: '承認者の選択',
      onClick: () => {
        // do nothing
      },
      active: true,
    },
    {
      label: '内容の確認',
      onClick: () => {
        // do nothing
      },
      active: false,
    },
    {
      label: '申請完了',
      onClick: () => {
        // do nothing
      },
      active: false,
    },
  ]

  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        fontFamily: 'Yu Gothic',
        backgroundColor: '#f1f1f2',
      }}
    >
      <Stepper items={items} />
    </div>
  )
})
