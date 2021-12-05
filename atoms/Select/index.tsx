import React from 'react'
import { useTranslation } from 'react-i18next'
import Select, { components, createFilter } from 'react-select'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async'
import { colors } from '../../../themes'

type OptionsType = Array<any>

type SelectProp = {
  isMulti?: boolean | false
  isClearable?: boolean | false
  isAsync?: boolean | false
  isSearchable?: boolean | false
  isDisabled?: boolean | false
  isRequired?: boolean | false
  defaultValue?: any
  name?: string | 'select'
  placeholder?: string | 'select...'
  options?: OptionsType
  defaultOptions?: OptionsType | boolean
  label?: string
  value?: any
  onChange: (value: string) => void
  onKeyDown?: (e: any) => void
  onMenuOpen?: () => void
  loadOptions?: any
  component?: any
  tabIndex?: any
  hideSelectedOptions?: boolean | false
  menuPlacement?: 'auto' | 'top' | 'bottom'
  error?: any
  styles?: any
  absoluteError?: boolean
  inputId?: string
  className?: string
}

const SelectBox: React.FC<SelectProp> = ({
  isMulti,
  absoluteError = false,
  isClearable,
  isSearchable,
  isRequired,
  defaultValue,
  isDisabled,
  options,
  defaultOptions,
  name,
  placeholder = '',
  onChange,
  onKeyDown,
  onMenuOpen,
  label,
  value,
  component,
  isAsync = false,
  loadOptions,
  tabIndex = 0,
  hideSelectedOptions = false,
  menuPlacement = 'auto',
  error,
  styles,
  ...props
}) => {
  const { t } = useTranslation('common')
  // Make sure no component can display over dropdown menu
  const colourStyles = {
    menu: (provider: any) => ({ ...provider, zIndex: 99 }),
    placeholder: (provider: any) => ({
      ...provider,
      color: colors.text,
    }),
  }

  const MultiValue = (multivalueProps: any) => {
    const { children } = multivalueProps
    const content = children?.replaceAll('\u00a0', '').replaceAll('&nbsp;', '')
    return (
      <components.MultiValue {...multivalueProps}>
        {content}
      </components.MultiValue>
    )
  }

  const SingleValue = (singlevalueProps: any) => {
    const { children } = singlevalueProps
    const content = children?.replaceAll('\u00a0', '').replaceAll('&nbsp;', '')
    return (
      <components.SingleValue {...singlevalueProps}>
        {content}
      </components.SingleValue>
    )
  }

  const formatGroupLabel = (data: any) => (
    <GroupContainer>
      <span>{data.label}</span>
    </GroupContainer>
  )

  return (
    <SelectWrapper theme={{ absoluteError }}>
      {label && (
        <StyledLabelContainer>
          <StyledFormLabel>{label}</StyledFormLabel>
          {isRequired && (
            <StyledRequiredLabel>{t('required')}</StyledRequiredLabel>
          )}
        </StyledLabelContainer>
      )}
      {!isAsync && (
        <Select
          filterOption={createFilter({
            matchFrom: 'any',
            stringify: (option) => `${option.label}`,
            ignoreAccents: false,
            ignoreCase: true,
          })}
          classNamePrefix={error && 'is-invalid'}
          defaultValue={defaultValue}
          defaultOptions
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          name={name}
          value={value}
          placeholder={placeholder}
          options={options}
          isMulti={isMulti}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onMenuOpen={onMenuOpen}
          noOptionsMessage={() => {
            return t('noOption')
          }}
          loadingMessage={() => {
            return t('loading')
          }}
          components={{
            IndicatorSeparator: () => null,
            ...component,
            ...(isMulti ? { MultiValue } : { SingleValue }),
          }}
          tabIndex={tabIndex}
          styles={{ ...colourStyles, ...styles }}
          hideSelectedOptions={hideSelectedOptions}
          menuPlacement={menuPlacement}
          formatGroupLabel={formatGroupLabel}
          {...props}
        />
      )}
      {isAsync && (
        <AsyncSelect
          classNamePrefix={error && 'is-invalid'}
          cacheOptions
          defaultValue={defaultValue}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          value={value}
          isClearable={isClearable}
          onChange={onChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isMulti={isMulti}
          noOptionsMessage={() => {
            return t('noOption')
          }}
          loadingMessage={() => {
            return t('loading')
          }}
          components={{
            IndicatorSeparator: () => null,
            ...component,
            ...(isMulti ? { MultiValue } : { SingleValue }),
          }}
          tabIndex={tabIndex}
          styles={{ ...colourStyles, ...styles }}
          hideSelectedOptions={hideSelectedOptions}
          menuPlacement={menuPlacement}
          onMenuOpen={onMenuOpen}
          formatGroupLabel={formatGroupLabel}
          {...props}
        />
      )}
      {error && <ErrorText theme={{ absoluteError }}>{error}</ErrorText>}
    </SelectWrapper>
  )
}

export default SelectBox

const isAbsoluteInput = (props: any) => {
  return props.theme.absoluteError ? 'relative' : 'static'
}
const SelectWrapper = styled.div`
  position: ${isAbsoluteInput};
  & .is-invalid__control {
    border-color: ${colors.danger};
    box-shadow: none;
  }
  & .is-invalid__control:hover {
    outline: none !important;
    color: ${colors.text};
    border-color: ${colors.danger};
    box-shadow: 0 0 3px ${colors.danger};
  }
  & .is-invalid__control:focus {
    outline: none !important;
    color: ${colors.text};
    border-color: ${colors.danger};
    box-shadow: 0 0 3px ${colors.danger};
  }
  & .is-invalid__indicator,
  & .is-invalid__indicator:hover {
    color: ${colors.danger};
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
`

const StyledRequiredLabel = styled.span`
  font-size: 11px;
  color: ${colors.whiteText};
  background-color: ${colors.danger};
  padding: 0 3px;
  margin-left: 5px;
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

const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.text};
`
