import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../themes'

type ToogleButtonProps = {
  toggle: boolean
  leftLabel?: string
  rightLabel?: string
  onClick: () => void
}

const ToggleButton: React.FC<ToogleButtonProps> = ({
  toggle = false,
  leftLabel = '',
  rightLabel = '',
  onClick,
  ...props
}) => {
  return (
    <Wrapper onClick={onClick} onKeyDown={onClick} tabIndex={0} {...props}>
      {!toggle && <OnButton>{leftLabel}</OnButton>}
      {!toggle && <OffButton>{rightLabel}</OffButton>}
      {toggle && <OffButton>{leftLabel}</OffButton>}
      {toggle && <OnButton>{rightLabel}</OnButton>}
    </Wrapper>
  )
}

export default ToggleButton

const OnButton = styled.div`
  color: ${colors.whiteText};
  background-color: ${colors.primary};
  min-width: 95px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OffButton = styled.div`
  color: ${colors.primaryText};
  background-color: ${colors.white};
  min-width: 95px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px;
  border: 1px solid ${colors.primary};
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
