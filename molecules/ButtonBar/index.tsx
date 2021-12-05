import React from 'react'
import styled from 'styled-components'
import { colors, images } from '../../../themes'
import { Button } from '../../atoms'
import IconButton from '../IconButton'
import MultipleButton from '../../atoms/MultipleButton'

type ButtonBarProps = {
  deleteAllText?: string
  onClickDeleteAll?: () => void
  isShowDeleteAll?: boolean
  isDisableDeleteAll?: boolean
  addText?: string
  onClickAdd?: () => void
  isShowAdd?: boolean
  exportText?: string
  onClickExport?: () => void
  isShowExport?: boolean
  isDisableExport?: boolean
  importText?: string
  onClickImport?: () => void
  isShowImport?: boolean
  syncText?: string
  onClickSync?: () => void
  isShowSync?: boolean
  isShowCancel?: boolean
  cancelText?: string
  onClickCancel?: () => void
  isShowDropdownButton?: boolean
  dropdownButtonText?: string
  dropdownButtonOption?: any
  prefixCustomButton?: any
  suffixCustomButton?: any
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  deleteAllText = '選択したデータを削除',
  onClickDeleteAll,
  isShowDeleteAll = false,
  isDisableDeleteAll = false,
  addText = '従業員登録',
  onClickAdd,
  isShowAdd = true,
  exportText = 'CSVダウンロード',
  onClickExport,
  isShowExport = true,
  isDisableExport = false,
  importText = 'CSVインポートで一括登録',
  onClickImport,
  isShowImport = true,
  syncText = '勘定科目最新化',
  onClickSync,
  isShowSync = false,
  cancelText = '',
  onClickCancel,
  isShowCancel = false,
  isShowDropdownButton = false,
  dropdownButtonText = '',
  dropdownButtonOption,
  prefixCustomButton,
  suffixCustomButton,
}) => {
  return (
    <ButtonsBarContainer>
      <ContainerLeft>
        {isShowDeleteAll && (
          <StyledAddButton
            variant="danger"
            onClick={onClickDeleteAll}
            disabled={isDisableDeleteAll}
          >
            {deleteAllText}
          </StyledAddButton>
        )}
      </ContainerLeft>
      <ContainerRight>
        {prefixCustomButton}
        {isShowExport && (
          <StyledExportButton
            label={exportText}
            icon={images.icDownload}
            onClick={onClickExport}
            disabled={isDisableExport}
          />
        )}
        {isShowImport && (
          <StyledImportButton variant="outline-warning" onClick={onClickImport}>
            {importText}
          </StyledImportButton>
        )}
        {isShowAdd && (
          <StyledAddButton variant="warning" onClick={onClickAdd}>
            {addText}
          </StyledAddButton>
        )}
        {isShowSync && (
          <StyledSyncButton onClick={onClickSync}>{syncText}</StyledSyncButton>
        )}
        {isShowCancel && (
          <StyledCancelButton variant="secondary" onClick={onClickCancel}>
            {cancelText}
          </StyledCancelButton>
        )}
        {isShowDropdownButton && (
          <StyledMultipleButton
            variant="warning"
            label={dropdownButtonText}
            options={dropdownButtonOption}
          />
        )}
        {suffixCustomButton}
      </ContainerRight>
    </ButtonsBarContainer>
  )
}

export default ButtonBar

const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ContainerLeft = styled.div`
  display: flex;
`

const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const StyledCancelButton = styled(Button)`
  padding: 11px 34px;
  line-height: 1;
  margin-left: 10px;
`
const StyledSyncButton = styled(Button)`
  padding: 11px 34px;
  line-height: 1;
  margin-left: 10px;
`

const StyledAddButton = styled(Button)`
  padding: 11px 34px;
  line-height: 1;
`

const StyledImportButton = styled(Button)`
  margin-right: 10px;
  padding: 11px 15px;
  line-height: 1;
`

const getBgColor = (props: any) => {
  return props.disabled
    ? `${colors.grayBackgroundDisabled} !important`
    : colors.bgGray
}

const StyledExportButton = styled(IconButton)`
  height: 40px;
  border: 0;
  color: ${colors.warning};
  font-size: 14px;
  white-space: nowrap;
  background-color: ${getBgColor};
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    text-decoration: underline;
  }
`
const StyledMultipleButton = styled(MultipleButton)`
  button {
    font-size: 14px;
    font-weight: bold;
    height: 100%;
  }
`
