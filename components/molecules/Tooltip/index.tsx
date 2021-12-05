import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Placement } from 'react-bootstrap/esm/Overlay'
import { OverlayTriggerRenderProps } from 'react-bootstrap/esm/OverlayTrigger'

type OverlayProps = {
  placement?: Placement
  content?: string
  children:
    | React.ReactElement
    | ((props: OverlayTriggerRenderProps) => React.ReactNode)
}

const ToolTip: React.FC<OverlayProps> = ({
  placement = 'top',
  content = '',
  children,
  ...props
}) => {
  const renderTooltip = (toolTopProps: any) => (
    <Tooltip {...toolTopProps}>
      {content && content.split('\n').map((msg: any) => <div>{msg}</div>)}
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 300 }}
      overlay={renderTooltip}
      {...props}
    >
      {children}
    </OverlayTrigger>
  )
}

export default ToolTip
