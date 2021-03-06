import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import RadioGroup from '.'

import RadioGroupReadme from './README.md'

const stories = storiesOf('RadioGroup', module).addParameters({
  readme: {
    content: RadioGroupReadme,
    sidebar: RadioGroupReadme,
  },
})

stories.add('RadioGroup', () => {
  const [value, setValue] = useState(0)
  return (
    <RadioGroup
      label="Status"
      items={[
        { value: 0, label: '็กใ', checked: value },
        { value: 1, label: 'ๆใ', checked: value },
      ]}
      value={value}
      onChange={(v: any) => {
        setValue(v)
      }}
    />
  )
})
