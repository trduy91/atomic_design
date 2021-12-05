import React from 'react'
import styled from 'styled-components'
import { images } from '../../../themes'

type LogoProps = {
  onClick: () => void
}

const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <StyledImage src={images.logo} width="140" height="40" onClick={onClick} />
)

export default Logo

const StyledImage = styled.img`
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`
