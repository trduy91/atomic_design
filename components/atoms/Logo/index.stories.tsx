import React from 'react'
import { storiesOf } from '@storybook/react'
import Logo from './index'
import LogoReadme from './README.md'

const stories = storiesOf('Logo', module).addParameters({
  readme: {
    content: LogoReadme,
  },
})

stories.add('Logo', () => (
  <div style={{ padding: '24px', display: 'flex', backgroundColor: '#69CA6D' }}>
    <Logo
      onClick={() => {
        // do something
      }}
    />
  </div>
))
