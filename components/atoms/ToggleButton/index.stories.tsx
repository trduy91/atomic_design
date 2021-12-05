/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import ToggleButton from './index'
import Readme from './README.md'

const stories = storiesOf('ToggleButton', module).addParameters({
  readme: {
    content: Readme,
  },
})

stories.add('ToggleButton', () => {
  const [toggle, setToggle] = useState(true)
  return (
    <div
      style={{
        display: 'flex',
        padding: '24px',
        fontFamily: 'Yu Gothic',
        columnGap: '10px',
        alignItems: 'center',
      }}
    >
      <ToggleButton
        leftLabel="領収書一覧"
        rightLabel="明細一覧"
        toggle={toggle}
        onClick={() => setToggle(!toggle)}
      />
    </div>
  )
})
