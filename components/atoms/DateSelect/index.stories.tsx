import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import DateSelect from './index'
import DateSelectReadme from './README.md'

const stories = storiesOf('DateSelect', module).addParameters({
  readme: {
    content: DateSelectReadme,
    sidebar: DateSelectReadme,
  },
})

stories.add('DateSelect', () => {
  const [value, setValue] = useState(null)
  const [dateValid, setDateValid] = useState(true)
  const [result, setResult] = useState('')
  const checkValidate = () => {
    if (!value && dateValid) {
      setResult('date is null')
      return
    }
    setResult('')
  }
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Yu Gothic',
      }}
    >
      <DateSelect
        label="Date Picker"
        value={value}
        onChange={(v: any) => setValue(v)}
        format="yyyy/MM/dd"
        setValid={setDateValid}
        error={result}
      />
      <div style={{ marginTop: '20px' }} />
      <DateSelect
        label="Date Picker disabled"
        value={value}
        onChange={(v: any) => setValue(v)}
        format="yyyy/MM/dd"
        disabled
      />
      <div>
        <button type="button" onClick={() => checkValidate()}>
          check validate
        </button>
      </div>
    </div>
  )
})
