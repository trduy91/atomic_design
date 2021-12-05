/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import React from 'react'
import { images } from '../../../themes'
import { Button, Icon } from '../../atoms'
import IconButton from '../IconButton'
import ToolTip from './index'
import Readme from './README.md'

const stories = storiesOf('ToolTip', module).addParameters({
  readme: {
    content: Readme,
  },
})

stories.add('ToolTip', () => (
  <div
    style={{
      display: 'flex',
      padding: '24px',
      fontFamily: 'Yu Gothic',
      columnGap: '10px',
      alignItems: 'center',
    }}
  >
    <ToolTip content="Sample tooltip icon button" placement="top">
      <IconButton icon={images.icCancel} variant="secondary" label="取消" />
    </ToolTip>
    <ToolTip content="Sample tooltip button" placement="top">
      <Button>Primary</Button>
    </ToolTip>
    <ToolTip content="Sample tooltip icon" placement="top">
      <Icon src="/static/images/ic_clear.svg" width="24" height="24" />
    </ToolTip>
  </div>
))
