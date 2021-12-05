/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Accordion, Card } from 'react-bootstrap'
import { Input, Button, Select, DateSelect } from '../../atoms'
import { colors, images } from '../../../themes'
import RangeInput from '../RangeInput'
import CheckboxCustom from '../../atoms/CheckboxCustom/CheckboxCustom'

type OptionIem = {
  label: string
  value: string
}

type ItemType =
  | 'input'
  | 'email'
  | 'select'
  | 'range'
  | 'date'
  | 'checkbox '
  | string

export interface SearchBarItem {
  label: string
  type: ItemType
  value?: any
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  isDisabled?: boolean
  placeholder?: string
  maxLength?: number
  onChange: (value: any) => void
  options?: OptionIem[]
  isAsync?: boolean
  defaultOptions?: any
  loadOptions?: any
  component?: any
  isAlphanumeric?: boolean
  // for range input
  onChangeFrom?: (value: any) => void
  onChangeTo?: (value: any) => void
  fromValue?: number
  toValue?: number
  min?: number
  max?: number
  onMenuOpen?: () => void
  styles?: any
  error?: any
  isChecked?: boolean
}

type SearchBarProps = {
  title: string
  onClickSearch: () => void
  items: SearchBarItem[]
  showCancelButton?: boolean
  cancelAction?: () => void
  isPopup?: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  title,
  items,
  onClickSearch,
  showCancelButton = false,
  cancelAction,
  isPopup,
}) => {
  const { t } = useTranslation('common')
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onClickSearch()
    }
  }
  const [expand, setExpand] = useState(true)
  useEffect(() => {
    setExpand(Boolean(document.querySelector('.collapse.show')))
  }, [])

  return (
    <StyledAccordion defaultActiveKey="0">
      <Accordion.Toggle
        as={StyledAccordionToggle}
        eventKey="0"
        onClick={() => setExpand(!expand)}
      >
        <Title>{title}</Title>
        <Caret className={expand ? 'show' : ''}>&nbsp;</Caret>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Wrap>
          <ItemWrap itemLength={items.length}>
            {items.map((item, index) => {
              if (
                item.type === 'input' ||
                item.type === 'email' ||
                item.type === 'number'
              ) {
                return (
                  <InputWrap key={index}>
                    <Input
                      type={item.type}
                      onChange={item.onChange}
                      label={item.label}
                      value={item.value}
                      placeholder={item.placeholder}
                      onKeyDown={handleKeyDown}
                      maxLength={item.maxLength}
                      isAlphanumeric={item.isAlphanumeric}
                    />
                  </InputWrap>
                )
              }
              if (item.type === 'date') {
                return (
                  <InputWrap key={index}>
                    <DateSelect
                      onChange={item.onChange}
                      label={item.label}
                      value={item.value}
                      onKeyDown={handleKeyDown}
                      error={item.error}
                    />
                  </InputWrap>
                )
              }
              if (item.type === 'range') {
                return (
                  <RangeInputWrap key={index}>
                    <RangeInput
                      onChangeFrom={item.onChangeFrom}
                      onChangeTo={item.onChangeTo}
                      fromValue={item.fromValue}
                      toValue={item.toValue}
                      label={item.label}
                      min={item.min}
                      max={item.max}
                      maxLength={item.maxLength}
                    />
                  </RangeInputWrap>
                )
              }
              if (item.type === 'checkbox') {
                return (
                  <CheckboxWrap key={index}>
                    <CheckboxCustom
                      id="checkbox"
                      labelText={item.label}
                      checked={item.isChecked}
                      onChange={item.onChange}
                      disabled={false}
                      hideLabel={false}
                    />
                  </CheckboxWrap>
                )
              }
              return (
                <SelectWrap key={index}>
                  <Select
                    label={item.label}
                    isAsync={item.isAsync}
                    defaultValue={item.value}
                    defaultOptions={item.defaultOptions}
                    loadOptions={item.loadOptions}
                    value={
                      item.isAsync ? item.value : formatLabelSelect(item.value)
                    }
                    onChange={item.onChange}
                    isClearable={item.isClearable}
                    isSearchable={item.isSearchable}
                    isMulti={item.isMulti}
                    options={item.options || []}
                    placeholder={item.placeholder}
                    onMenuOpen={item.onMenuOpen}
                    component={item.component}
                    styles={item.styles}
                    isDisabled={item.isDisabled}
                  />
                </SelectWrap>
              )
            })}
          </ItemWrap>
          <Divide />
          <ButtonWrap>
            <SearchButton
              className={isPopup ? 'popup-button' : ''}
              onClick={onClickSearch}
            >
              {t('search')}
            </SearchButton>
            {showCancelButton && (
              <CancelButton variant="outline-gray" onClick={cancelAction}>
                {t('cancel')}
              </CancelButton>
            )}
          </ButtonWrap>
        </Wrap>
      </Accordion.Collapse>
    </StyledAccordion>
  )
}

export default SearchBar

// Functions
const formatLabelSelect = (valueSelect: any) => {
  let dataSelect = valueSelect
  if (valueSelect && valueSelect.length > 0) {
    const dataSelectTrim: any[] = []
    valueSelect.map((itemSelect: any) => {
      const label = itemSelect?.label.trim()
      const { value } = itemSelect
      dataSelectTrim.push({ label, value })
    })
    dataSelect = dataSelectTrim
  }
  return dataSelect
}

const StyledAccordion = styled(Accordion)`
  border-radius: 5px;
  &:before {
    background-color: inherit !important;
  }
  .card-header {
    background-color: ${colors.white};
  }
`
const Caret = styled.div`
  height: 20px;
  width: 20px;
  transition: transform 0.2s ease-in-out;
  background: url(${images.icCaretDown});
  &.show {
    background: url(${images.icCaretDown});
    transform: rotate(-180deg);
  }
`

const StyledAccordionToggle = styled(Card.Header)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
`

const Wrap = styled.div`
  background-color: ${colors.white};
  padding: 20px 30px 20px 30px;
  width: 100%;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const divideWidth = ({ itemLength }: any) => {
  return itemLength < 4
    ? ` flex-wrap: no-wrap;
     &>div{width: calc((100%) / ${itemLength});
     &:nth-child(${itemLength}n) {
      margin-right: 0px;
    }
    } `
    : `flex-wrap: wrap;
     &>div{width: calc((100% - 60px) / 4);
     &:nth-child(4n) {
     margin-right: 0px;
     }
    }
 `
}

const ItemWrap = styled.div<{ itemLength: number }>`
  display: flex;
  margin-top: 10px;
  ${divideWidth}
`

const InputWrap = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  span {
    font-weight: 500;
  }
`
const CheckboxWrap = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  span {
    font-weight: 500;
  }
  & > div {
    height: 38px;
    margin-top: 28px;
  }
`
const RangeInputWrap = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  span {
    font-weight: 500;
  }
`

const SelectWrap = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  span {
    font-weight: 500;
  }
`

const Divide = styled.div`
  width: 100%;
  height: 0.5px;
  margin-top: 30px;
  background-color: ${colors.line};
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const SearchButton = styled(Button)`
  min-width: ${(p) => (p.className === 'popup-button' ? '88' : '160')}px;
  font-size: 16px;
`

const CancelButton = styled(Button)`
  margin-left: 10px;
`
