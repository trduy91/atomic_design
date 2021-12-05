/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../themes'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder?: string
  value?: any
  readonly?: boolean
  maxLength?: number
  isRequired?: boolean
  disabled?: boolean
  error?: string
  align?: string
  tabIndex?: number
  className?: string
  onChange?: (value: any) => any
  onInput?: (value: any) => any
  onKeyDown?: (e: any) => void
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = '',
  value = '',
  readonly = false,
  isRequired = false,
  disabled = false,
  maxLength = 9999999999,
  error,
  className,
  onChange = () => {
    // do something
  },
  onInput = () => {
    // do something
  },
  onKeyDown,
  children,
  tabIndex = 0,
  ...props
}) => {
  const { t } = useTranslation('common')

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
      <StyledInputWrapper>
        <StyledTextArea
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          readOnly={readonly}
          maxLength={maxLength}
          onInput={onInput}
          onChange={(event: any) => {
            const targetValue = event.target.value
            if (targetValue.length > maxLength) {
              const sliceValue = targetValue.substr(0, Number(maxLength))
              onChange(sliceValue)
            } else {
              onChange(targetValue)
            }
          }}
          onKeyDown={onKeyDown}
          tabIndex={tabIndex}
          {...(error && { className: 'is-invalid' })}
          {...props}
        />
      </StyledInputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

export default TextArea

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

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 128px;
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
  &.is-invalid:focus {
    outline: none !important;
    color: ${colors.text};
    border-color: ${colors.danger};
    box-shadow: 0 0 3px ${colors.danger};
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
const StyledInputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
`

const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${colors.danger};
`
