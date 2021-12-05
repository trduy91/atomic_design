import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import DragMove from './index'
import DragMoveReadme from './README.md'
import { colors } from '../../../themes'

const stories = storiesOf('DragMove', module).addParameters({
  readme: {
    content: DragMoveReadme,
    sidebar: DragMoveReadme,
  },
})

stories.add('DragMove', () => {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  })
  const handleDragMove = (e: any) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    })
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
      <DragMove onDragMove={handleDragMove}>
        <div
          style={{
            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: colors.danger,
              width: '100px',
              height: '100px',
            }}
          />
        </div>
      </DragMove>
    </div>
  )
})
