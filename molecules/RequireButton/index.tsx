import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../themes'

type RequireButtonProps = {
  label?: string
}

const RequireButton: React.FC<RequireButtonProps> = ({ label = '' }) => {
  return <Container>{label}</Container>
}

export default RequireButton

const Container = styled.div`
  min-width: 50px;
  color: white;
  background-color: ${colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 3px;
`
