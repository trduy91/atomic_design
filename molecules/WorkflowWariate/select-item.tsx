/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Select } from '../../atoms'
import { colors } from '../../../themes'

type OptionIem = {
  label: string
  value: string
}

type ItemType = 'select' | string

export interface SearchBarItem {
  type: ItemType
  value?: any
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  placeholder?: string
  maxLength?: number
  onChange: (value: any) => void
  options?: OptionIem[]
  isAsync?: boolean
  defaultOptions?: any
  loadOptions?: any
  onMenuOpen?: () => void
  component?: any
  isAlphanumeric?: boolean
  styles?: any
}

type SearchBarProps = {
  items: SearchBarItem
}

const SelectItem: React.FC<SearchBarProps> = ({ items }) => {
  const { t } = useTranslation('layout')

  return (
    <Wrap>
      <Title>{t('workflowDetail.conditionTypes.10')}</Title>
      <ItemWrap>
        <SelectWrap>
          <Select
            isAsync={items.isAsync}
            defaultValue={items.value}
            defaultOptions={items.defaultOptions}
            loadOptions={items.loadOptions}
            value={items.isAsync ? items.value : formatLabelSelect(items.value)}
            onChange={items.onChange}
            isClearable={items.isClearable}
            isSearchable={items.isSearchable}
            isMulti={items.isMulti}
            options={items.options || []}
            placeholder={items.placeholder}
            onMenuOpen={items.onMenuOpen}
            component={items.component}
            styles={items.styles}
          />
        </SelectWrap>
      </ItemWrap>
    </Wrap>
  )
}

export default SelectItem

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

const Wrap = styled.div`
  background-color: ${colors.white};
  border-radius: 5px;
  width: 60%;
  margin-top: 30px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const ItemWrap = styled.div`
  display: flex;
`

const SelectWrap = styled.div`
  margin-top: 10px;
  width: 50%;
  span {
    font-weight: 500;
  }
`
