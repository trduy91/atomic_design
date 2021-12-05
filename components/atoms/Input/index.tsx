/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Validator from 'validator'
import { colors } from '../../../themes'
import { KEY_E } from '../../../utils/constants'

type InputProp = {
  height?: number
  label?: string
  type?: string
  placeholder?: string
  value?: any
  readonly?: boolean
  maxLength?: number
  max?: number
  min?: number
  isAlphanumeric?: boolean
  isRequired?: boolean
  disabled?: boolean
  error?: string
  align?: string
  suffix?: string
  tabIndex?: number
  className?: string
  onChange?: (value: any, e: any) => any
  onInput?: (value: any, e: any) => any
  onKeyDown?: (e: any) => void
  defaultValue?: number
  onBlur?: () => any
  onClick?: () => any
  absoluteError?: boolean
  id?: string
}

const Input: React.FC<InputProp> = ({
  height = 38,
  label,
  absoluteError = false,
  type,
  placeholder = '',
  value = '',
  maxLength = 99999999999,
  readonly = false,
  max = 999999999999999999n,
  min = 0,
  isRequired = false,
  disabled = false,
  isAlphanumeric = false,
  error,
  suffix,
  className,
  onChange = () => {
    // do something
  },
  onInput = () => {
    // do something
  },
  onKeyDown = () => {
    // do nothing
  },
  children,
  tabIndex = 0,
  ...props
}) => {
  const { t } = useTranslation('common')

  const checkAlphanumberic = (text: any, e: any) => {
    if (isAlphanumeric) {
      if (Validator.isAlphanumeric(text) || Validator.isEmpty(text)) {
        onChange(text, e)
      }
    } else {
      onChange(text, e)
    }
  }

  const checkEmail = (text: any, e: any) => {
    if (
      Validator.isEmpty(text) ||
      Validator.matches(text, new RegExp('[.@a-zA-Z0-9]$'))
    ) {
      onChange(text, e)
    }
  }

  return (
    <div className={className}>
      {label && (
        <StyledLabelContainer>
          <StyledFormLabel> {label} </StyledFormLabel>
          {isRequired && (
            <StyledRequiredLabel>{t('required')}</StyledRequiredLabel>
          )}
        </StyledLabelContainer>
      )}
      <StyledInputWrapper theme={{ absoluteError }}>
        <StyledFormInput
          setHeight={height}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          readOnly={readonly}
          onInput={onInput}
          max={max}
          min={min}
          onChange={(e: any) => {
            const targetValue = e.target.value
            if (type !== 'email') {
              if (targetValue.length > maxLength) {
                const sliceValue = targetValue.substr(0, Number(maxLength))
                checkAlphanumberic(sliceValue, e)
                return
              }
              checkAlphanumberic(targetValue, e)
            } else {
              if (targetValue.length > maxLength) {
                const sliceValue = targetValue.substr(0, Number(maxLength))
                checkEmail(sliceValue, e)
                return
              }
              checkEmail(targetValue, e)
            }
          }}
          onKeyDown={(e: any) => {
            if (type === 'number') {
              if (e.keyCode === KEY_E) e.preventDefault()
            }
            onKeyDown(e)
          }}
          isInvalid={!!error}
          tabIndex={tabIndex}
          {...props}
        />
        {suffix && <StyledSuffix>{suffix}</StyledSuffix>}
      </StyledInputWrapper>
      {error && <ErrorText theme={{ absoluteError }}>{error}</ErrorText>}
    </div>
  )
}

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

const getAlign = (props: InputProp) => {
  return props.align && `text-align: ${props.align};`
}

const styleHeight = ({ setHeight }: any) => {
  return `height: ${setHeight}px;`
}
const StyledFormInput = styled(Form.Control)`
  ${getAlign};
  ${styleHeight};
  resize: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.text};
  padding: 11px 10px;
  border-color: ${colors.borderGray};
  &.is-invalid {
    border-color: ${colors.danger};
    padding: 11px 10px;
    background-image: none;
  }
  &:focus {
    outline: none !important;
    color: ${colors.text};
    border-color: ${colors.borderFocusBlue};
    box-shadow: 0 0 3px ${colors.borderFocusBlue};
  }
  &:disabled {
    color: ${colors.disabledGrayText};
    background-color: ${colors.disabledBackGround};
  }
  &::placeholder {
    color: ${colors.disabledGrayText};
    font-size: 14px;
  }
`
const isAbsoluteInput = (props: any) => {
  return props.theme.absoluteError ? 'relative' : 'static'
}
const StyledInputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: ${isAbsoluteInput};
  width: 100%;
`

const StyledSuffix = styled.span`
  margin-left: 10px;
`

const isAbsoluteErrorText = (props: any) => {
  return props.theme.absoluteError ? 'bottom: -22px; position: absolute;' : ''
}

const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${colors.danger};
  ${isAbsoluteErrorText}
`

export default Input
