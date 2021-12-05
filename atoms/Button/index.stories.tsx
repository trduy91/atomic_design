import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './index'
import ButtonReadme from './README.md'

const stories = storiesOf('Button', module).addParameters({
  readme: {
    content: ButtonReadme,
    sidebar: ButtonReadme,
  },
})

stories.add('Button', () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '10px',
      fontSize: '14px',
    }}
  >
    <div style={{ padding: '8px 24px', display: 'flex', columnGap: '10px' }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
    </div>
    <div style={{ padding: '8px 24px', display: 'flex', columnGap: '10px' }}>
      <Button variant="outline-primary">Outline Primary</Button>
      <Button variant="outline-secondary">Outline Secondary</Button>
      <Button variant="outline-warning">Outline Warning</Button>
      <Button variant="outline-danger">Outline Danger</Button>
      <Button variant="outline-danger" disabled>
        Disable
      </Button>
    </div>
    <div
      style={{
        padding: '8px 24px',
        display: 'flex',
        columnGap: '10px',
        backgroundColor: '#1F2F4E',
      }}
    >
      <Button variant="light"> Light Button </Button>
    </div>
  </div>
))
