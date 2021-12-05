import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Radio from '../../atoms/Radio'
import { colors } from '../../../themes'

type RadioProps = {
  id?: string
  label: string
  value: any
  checked: any
  tabIndex?: number | 0
  disabled?: boolean | false
  onChange?: (value: boolean) => void
  minWidth?: number | string
}

type RadioGroupProps = {
  items: Array<RadioProps>
  value?: any
  onChange: (value: any) => void
  isRequired?: boolean | false
  label?: string
  direction?: 'column' | 'row'
  error?: any
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  items,
  value,
  onChange,
  label,
  isRequired,
  error,
  direction,
  ...props
}) => {
  const { t } = useTranslation('common')
  return (
    <Container>
      {label && (
        <StyledLabelContainer>
          <StyledFormLabel>{label}</StyledFormLabel>
          {isRequired && (
            <StyledRequiredLabel>{t('required')}</StyledRequiredLabel>
          )}
        </StyledLabelContainer>
      )}
      <RadioGroupWrapper className={direction}>
        {items?.map((item: any) => {
          return (
            <StyledRadio
              id={`radio_${item.label}_${item.value}`}
              labelText={item.label}
              disabled={item.disabled}
              key={item.value}
              checked={item.checked}
              valueRadio={item.value}
              minWidth={item.minWidth}
              onChange={() => {
                if (item.value !== value) {
                  onChange(item.value)
                }
              }}
              tabIndex={item.tabIndex}
              direction={direction}
              {...props}
            />
          )
        })}
      </RadioGroupWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}

export default RadioGroup

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const RadioGroupWrapper = styled.div`
  @media screen and (max-width: 990px) {
    flex-direction: column;
  }
  display: ${(p) => (p.className === 'column' ? 'flex' : 'inline-flex')};
  flex-direction: ${(p) => (p.className === 'column' ? 'column' : 'row')};
`

const StyledRadio = styled(Radio)`
  &:not(:first-child) {
    margin-left: ${(p) => (p.direction === 'column' ? '0px' : '5px')};
    margin-top: ${(p) => (p.direction === 'column' ? '5px' : '0px')};
    @media screen and (max-width: 990px) {
      margin-left: 0px;
      margin-top: 5px;
    }
  }
`

const StyledLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`

const StyledFormLabel = styled.span`
  font-size: 14px;
  color: ${colors.text};
  white-space: pre-wrap;
`
const StyledRequiredLabel = styled.span`
  font-size: 11px;
  color: ${colors.whiteText};
  background-color: ${colors.danger};
  padding: 0 3px;
  margin-left: 5px;
`
const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${colors.danger};
`
