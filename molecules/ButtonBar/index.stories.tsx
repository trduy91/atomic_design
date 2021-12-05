/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import React from 'react'
import ButtonBar from './index'
import ButtonBarReadme from './README.md'

const stories = storiesOf('ButtonBar', module).addParameters({
  readme: {
    content: ButtonBarReadme,
  },
})

stories.add('ButtonBar', () => (
  <div>
    <ButtonBar />
    <div style={{ marginTop: '10px' }} />
    <ButtonBar isShowExport={false} />
    <div style={{ marginTop: '10px' }} />
    <ButtonBar isShowExport={false} isShowImport={false} />
    <div style={{ marginTop: '10px' }} />
    <ButtonBar isShowExport isShowImport isShowAdd={false} />
  </div>
))
