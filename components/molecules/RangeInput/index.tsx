import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Input } from '../../atoms'
import { colors } from '../../../themes'

type RangeInputProps = {
  fromValue?: number
  toValue?: number
  min?: number
  max?: number
  tabIndex?: number
  maxLength?: number
  label?: string
  isRequired?: boolean
  onChangeFrom?: (value: any) => void
  onChangeTo?: (value: any) => void
  width?: string
}

const RangeInput: React.FC<RangeInputProps> = ({
  fromValue = '',
  maxLength = 999999999,
  min = 0,
  max = 999999999,
  toValue = '',
  label,
  isRequired,
  onChangeFrom = () => {
    // do nothing
  },
  onChangeTo = () => {
    // do nothing
  },
}) => {
  const { t } = useTranslation('common')
  return (
    <div>
      {label && (
        <StyledLabelContainer>
          <StyledFormLabel>{label}</StyledFormLabel>
          {isRequired && (
            <StyledRequiredLabel>{t('required')}</StyledRequiredLabel>
          )}
        </StyledLabelContainer>
      )}
      <RangeBody>
        <StyledInput>
          <Input
            isAlphanumeric
            type="number"
            value={fromValue}
            min={min}
            max={max}
            maxLength={maxLength}
            onChange={onChangeFrom}
          />
        </StyledInput>

        <div className="seperator">~</div>
        <StyledInput>
          <Input
            isAlphanumeric
            type="number"
            value={toValue}
            min={min}
            max={max}
            maxLength={maxLength}
            onChange={onChangeTo}
          />
        </StyledInput>
      </RangeBody>
    </div>
  )
}

export default RangeInput

const StyledLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`

const StyledFormLabel = styled.span`
  font-size: 14px;
  color: ${colors.text};
`
const StyledRequiredLabel = styled.span`
  font-size: 11px;
  color: ${colors.whiteText};
  background-color: ${colors.danger};
  padding: 0 3px;
  margin-left: 5px;
`
const RangeBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledInput = styled.div`
  width: 40%;
`
