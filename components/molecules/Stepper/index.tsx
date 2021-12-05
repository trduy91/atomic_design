import React from 'react'
import styled from 'styled-components'
import { colors, images } from '../../../themes'
import Icon from '../../atoms/Icon'

type StepperProps = {
  items: StepProps[]
}

type StepProps = {
  label?: string
  onClick?: () => void
  active?: boolean
  done?: boolean
}

const Stepper: React.FC<StepperProps> = ({ items, ...props }) => (
  <StepperContainer {...props}>
    {items.map((item, index) => {
      return (
        <StepContainer>
          <StepLabel {...item}>{item.label}</StepLabel>
          <StepCircleWrapper className="circle-wrapper">
            <StepCircle {...item}>
              {item?.done ? (
                <Icon src={images.icCheck} width="auto" height="7px" />
              ) : (
                index + 1
              )}
            </StepCircle>
          </StepCircleWrapper>
        </StepContainer>
      )
    })}
  </StepperContainer>
)

export default Stepper

const StepperContainer = styled.div`
  margin: auto;
  width: 645px;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:after {
    content: '';
    position: absolute;
    bottom: 16px;
    left: 0;
    border-top: 2px solid ${colors.grayLine};
    background: ${colors.grayLine};
    width: 100%;
    transform: translateY(-50%);
  }
`

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:first-child .circle-wrapper {
    background: linear-gradient(
      to right,
      ${colors.grayBackground} 0%,
      ${colors.grayBackground} 50%,
      transparent 50%,
      transparent 100%
    );
  }
  &:last-child .circle-wrapper {
    background: linear-gradient(
      to right,
      transparent 0%,
      transparent 50%,
      ${colors.grayBackground} 50%,
      ${colors.grayBackground} 100%
    );
  }
`

const StepLabel = styled.span`
  font-size: 14px;
  ${(props: any) => props.active && 'font-weight: bold'};
  padding-bottom: 7px;
  color: ${(props: any) =>
    props.active ? colors.primaryText : colors.lightGrayText};
  line-height: unset;
`

const StepCircleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
`

const StepCircle = styled.div`
  width: 34px;
  height: 34px;
  border: 2px solid
    ${(props: any) => (props.active ? colors.primary : colors.borderGray)};
  background-color: ${(props: any) =>
    props.active ? colors.primary : colors.grayBackground};
  color: ${(props: any) =>
    props.active ? colors.whiteText : colors.lightGrayText};
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
