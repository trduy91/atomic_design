import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import images from '../../../themes/images'
import SelectBox from '../../atoms/Select/index'
import IconButton from '../IconButton/index'
import YakushokuSelect from './YakushokuSelect'

const DepartmentAndJobSelect = (props: any) => {
  const {
    label,
    bushoOptions,
    selectedBushoOption,
    onBushoChange,
    selectedYakushokuOption,
    onYakushokuChange,
    onBushoOpen,
    selectDisable,
    onDelete,
    deleteDisable,
  } = props

  const { t } = useTranslation('common')

  const handleBushoChange = (dataChange: any) => {
    onBushoChange(dataChange)
  }

  return (
    <div>
      <StyledRow>
        <StyledColNoPaddingRight>
          <StyledTitleContainer>
            <StyledRadioTitle>{label}</StyledRadioTitle>
          </StyledTitleContainer>
          <StyledRowNoMargin>
            <StyledColNoPaddingLeft>
              <SelectBox
                onMenuOpen={onBushoOpen}
                value={selectedBushoOption}
                onChange={handleBushoChange}
                options={bushoOptions}
                isClearable
                isSearchable
                placeholder=""
                isDisabled={selectDisable}
              />
            </StyledColNoPaddingLeft>
            <StyledColNoPaddingLeft>
              <YakushokuSelect
                selectedYakushokuOption={selectedYakushokuOption}
                onYakushokuChange={onYakushokuChange}
                isDisabled={selectDisable}
              />
            </StyledColNoPaddingLeft>
            <StyledColNoPaddingLeft xs="auto">
              <IconButton
                icon={images.icClear}
                variant="outline-danger"
                height={36}
                label={t('remove')}
                onClick={onDelete}
                disabled={deleteDisable || selectDisable}
              />
            </StyledColNoPaddingLeft>
          </StyledRowNoMargin>
        </StyledColNoPaddingRight>
      </StyledRow>
    </div>
  )
}

export default DepartmentAndJobSelect

const StyledRow = styled(Row)`
  justify-content: center;
  margin: 5px 0px;
  align-items: center;
`

const StyledRowNoMargin = styled(Row)`
  margin: 0px;
`

const StyledColNoPaddingRight = styled(Col)`
  padding-right: 0px;
`

const StyledColNoPaddingLeft = styled(Col)`
  padding-left: 0px;
`

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`

const StyledRadioTitle = styled.span`
  font-size: 14px;
`
