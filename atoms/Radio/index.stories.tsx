import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Radio from '.'

import RadioReadme from './README.md'

const stories = storiesOf('Radio', module).addParameters({
  readme: {
    content: RadioReadme,
    sidebar: RadioReadme,
  },
})

stories.add('checkbox', () => {
  const [checked, setChecked] = useState(1)
  return (
    <Radio
      id="checkbox"
      labelText="選択中"
      checked={checked}
      valueRadio={checked}
      onChange={(value: any) => setChecked(value)}
      disabled={false}
    />
  )
})

stories.add('checkbox disabled', () => {
  const [checked, setChecked] = useState(2)
  return (
    <Radio
      id="checkbox"
      labelText="選択中"
      checked={checked}
      valueRadio={1}
      onChange={(value: any) => setChecked(value)}
      disabled
    />
  )
})

stories.add('checkbox hidden label', () => {
  const [checked, setChecked] = useState(2)
  return (
    <Radio
      id="checkbox"
      labelText=""
      checked={checked}
      valueRadio={1}
      onChange={(value: any) => setChecked(value)}
      disabled={false}
    />
  )
})
