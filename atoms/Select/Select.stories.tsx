import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import SelectBox from '.'

import SelectReadme from './README.md'

export interface FlavourOption {
  readonly value: string
  readonly label: string
}

export const flavourOptions: FlavourOption[] = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
]

const stories = storiesOf('Select', module).addParameters({
  readme: {
    content: SelectReadme,
    sidebar: SelectReadme,
  },
})

type ValueSelect = {
  value: string
  label: string
}

stories.add('select', () => {
  const [valueSelect, setValueSelect] = useState<ValueSelect>()
  return (
    <div>
      <div className="mb-3">
        <p className="text-info">{`Value: ${valueSelect?.value}`}</p>
        <SelectBox
          isMulti={false}
          isClearable={false}
          isSearchable={false}
          defaultValue={null}
          isDisabled={false}
          placeholder=""
          options={flavourOptions}
          name="select-default"
          onChange={(value: any) => setValueSelect(value)}
        />
      </div>
      <div className="mb-3">
        <p className="text-info">{`Value: ${valueSelect?.value}`}</p>
        <SelectBox
          label="Select with label"
          isRequired
          isMulti={false}
          isClearable={false}
          isSearchable={false}
          defaultValue={null}
          isDisabled={false}
          placeholder=""
          options={flavourOptions}
          name="select-default"
          onChange={(value: any) => setValueSelect(value)}
        />
      </div>
    </div>
  )
})
