import React from 'react'
import { storiesOf } from '@storybook/react'
import MultipleButton from './index'
import MultipleButtonReadme from './README.md'

const stories = storiesOf('MultipleButton', module).addParameters({
  readme: {
    content: MultipleButtonReadme,
    sidebar: MultipleButtonReadme,
  },
})

stories.add('MultipleButton', () => {
  const options = [
    {
      label: 'Option 1',
      onClick: () => {
        console.log('click option 1')
      },
    },
    {
      label: 'Option 2',
      onClick: () => {
        console.log('click option 2')
      },
    },
    {
      label: 'Option 3',
      onClick: () => {
        console.log('click option 3')
      },
    },
  ]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        fontSize: '14px',
      }}
    >
      <div style={{ padding: '8px 24px', display: 'flex', columnGap: '10px' }}>
        <MultipleButton label="Primary" options={options} />
        <MultipleButton
          label="Secondary"
          variant="secondary"
          options={options}
        />
        <MultipleButton label="Warning" variant="warning" options={options} />
        <MultipleButton label="Danger" variant="danger" options={options} />
      </div>
      <div style={{ padding: '8px 24px', display: 'flex', columnGap: '10px' }}>
        <MultipleButton
          label="Outline Primary"
          variant="outline-primary"
          options={options}
        />
        <MultipleButton
          label="Outline secondary"
          variant="outline-secondary"
          options={options}
        />
        <MultipleButton
          label="Outline warning"
          variant="outline-warning"
          options={options}
        />
        <MultipleButton
          label="Outline danger"
          variant="outline-danger"
          options={options}
        />
      </div>
    </div>
  )
})
