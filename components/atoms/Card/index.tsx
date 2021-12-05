import React, { memo } from 'react'
import styled from 'styled-components'
import { colors } from '../../../themes'

type CardProps = {
  title?: string
  children?: any
  className?: any
}

const Card: React.FC<CardProps> = (props: any) => {
  const { title, children } = props
  return (
    <StyledCard {...props}>
      <span className="label">{title}</span>
      <div className="body">{children}</div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  border: 1px solid ${colors.borderGray};
  border-radius: 10px;
  position: relative;
  .label {
    border: 1px solid ${colors.borderGray};
    border-radius: 10px;
    position: absolute;
    top: -15px;
    left: 10px;
    background-color: ${colors.white};
    padding: 5px;
    font-weight: bold;
  }
  .body {
    padding: 25px 20px;
  }
`

export default memo(Card)
