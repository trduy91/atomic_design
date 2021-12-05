import React from 'react'
import { storiesOf } from '@storybook/react'
import Breadcrumb from './index'
import BreadcrumbReadme from './README.md'

const stories = storiesOf('Breadcrumb', module).addParameters({
  readme: {
    content: BreadcrumbReadme,
  },
})

stories.add('Breadcrumb', () => (
  <div style={{ padding: '24px' }}>
    <Breadcrumb
      items={[
        { text: 'ホーム', href: 'https://www.w3schools.com/' },
        { text: 'ワークフロー設定', href: 'https://www.w3schools.com/' },
        { text: 'ワークフロー詳細', href: 'https://www.w3schools.com/' },
      ]}
    />
  </div>
))
