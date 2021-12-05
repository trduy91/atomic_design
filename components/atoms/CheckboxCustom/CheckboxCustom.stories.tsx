import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import CheckboxCustom from './CheckboxCustom'

import CheckboxReadme from './README.md'

const stories = storiesOf('CheckBox', module).addParameters({
  readme: {
    content: CheckboxReadme,
    sidebar: CheckboxReadme,
  },
})

stories.add('checkbox', () => {
  const [checked, setChecked] = useState(false)
  return (
    <CheckboxCustom
      id="checkbox"
      labelText="選択中"
      checked={checked}
      onChange={(value: boolean) => setChecked(value)}
      disabled={false}
      hideLabel={false}
    />
  )
})

stories.add('checkbox disabled', () => {
  const [checked, setChecked] = useState(false)
  return (
    <CheckboxCustom
      id="checkbox"
      labelText="選択中"
      checked={checked}
      onChange={(value: boolean) => setChecked(value)}
      disabled={true}
      hideLabel={false}
    />
  )
})

stories.add('checkbox hidden labl', () => {
  const [checked, setChecked] = useState(false)
  return (
    <CheckboxCustom
      id="checkbox"
      labelText="選択中"
      checked={checked}
      onChange={(value: boolean) => setChecked(value)}
      disabled={false}
      hideLabel={true}
    />
  )
})
