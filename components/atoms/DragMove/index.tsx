import React, { useState } from 'react'

const DragMove = (props: any) => {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
  } = props

  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (e: any) => {
    setIsDragging(true)

    onPointerDown(e)
  }

  const handlePointerUp = (e: any) => {
    setIsDragging(false)

    onPointerUp(e)
  }

  const handlePointerMove = (e: any) => {
    if (isDragging) onDragMove(e)

    onPointerMove(e)
  }
  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={style}
      className={className}
    >
      {children}
    </div>
  )
}

export default DragMove
DragMove.defaultProps = {
  onPointerDown: () => {
    // do nothing
  },
  onPointerUp: () => {
    // do nothing
  },
  onPointerMove: () => {
    // do nothing
  },
}
