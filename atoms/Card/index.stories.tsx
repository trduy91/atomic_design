import React from 'react'
import { storiesOf } from '@storybook/react'
import Card from './index'
import CardReadme from './README.md'

const stories = storiesOf('Card', module).addParameters({
  readme: {
    content: CardReadme,
  },
})

stories.add('Card', () => <Card title="基本情報">Content</Card>)
