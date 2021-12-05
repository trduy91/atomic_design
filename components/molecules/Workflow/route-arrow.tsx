import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../themes'

const RouteArrow = (props: any) => {
  const { isDefault, initBlock } = props
  const { t } = useTranslation('layout')
  return (
    <StyledArrowContainer {...props}>
      <StyledCircle {...props} />
      <StyledSpan {...props}>
        {initBlock || (!initBlock && !isDefault)
          ? t('workflowDetail.satisfy')
          : t('workflowDetail.notSatisfy')}
      </StyledSpan>
      <StyledTriangle {...props} />
    </StyledArrowContainer>
  )
}

export default RouteArrow

const getColor = (props: any) => {
  return props.initBlock || (!props.initBlock! && !props.isDefault)
    ? colors.primary
    : colors.danger
}

const getArrowHeight = (props: any) => {
  return props.height ? `${props.height}px` : '68px'
}

const StyledSpan = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  background-color: ${getColor};
  padding: 5px 15px;
  border-radius: 60px;
`

const StyledArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: ${getArrowHeight};
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 50%;
    border-left: 2px solid ${getColor}};
  }
`

const StyledCircle = styled.div`
  width: 8px;
  height: 8px;
  background: ${getColor};
  border: none;
  border-radius: 50%;
  margin-top: -4px;
  margin-left: ${(props: any) =>
    props.initBlock || (!props.initBlock! && !props.isDefault) ? '1px' : '2px'};
`

const StyledTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid ${getColor};
  margin-left: ${(props: any) =>
    props.initBlock || (!props.initBlock! && !props.isDefault) ? '1px' : '2px'};
`
