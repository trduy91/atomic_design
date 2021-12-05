import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../themes'

type BadgeProps = {
  number: number
  size?: string
}

const Badge: React.FC<BadgeProps> = ({ number, size }) => {
  const style = { width: size, height: size }
  return <StyledBadge style={style}>{number > 99 ? 99 : number}</StyledBadge>
}

export default Badge

const StyledBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13px;
  border-radius: 50%;
  width: 13px;
  text-align: center;
  background-color: ${colors.danger};
  font-style: bold;
  font-size: 10px;
  color: ${colors.whiteText};
`
