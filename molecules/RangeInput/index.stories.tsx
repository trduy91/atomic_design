import React from 'react'
import { storiesOf } from '@storybook/react'
import RangeInputReadme from './README.md'
import RangeInput from './index'

const stories = storiesOf('RangeInput', module).addParameters({
  readme: {
    content: RangeInputReadme,
  },
})

stories.add('RangeInput', () => (
  <div style={{ padding: '24px' }}>
    <RangeInput
      fromValue={0}
      toValue={1000}
      min={0}
      max={9999}
      maxLength={4}
      label="range from 0 to 1000"
      isRequired
      onChangeFrom={() => {
        // do nothing
      }}
      onChangeTo={() => {
        // do nothing
      }}
    />
  </div>
))
