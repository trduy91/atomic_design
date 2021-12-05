import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button, Select } from '../../atoms'

const ChooseImageModal = (props: any) => {
  const { show, onClose, dataList, onSelect } = props
  const { t } = useTranslation('common')
  const [selectedValue, setSelectedValue] = useState<any>()
  const handleChange = (selected: any) => {
    setSelectedValue(selected)
  }
  const handleSelect = () => {
    onSelect(selectedValue?.value)
  }
  return (
    <Modal
      show={show}
      onHide={() => {
        onClose()
      }}
      backdrop="static"
      keyboard
      centered
    >
      <Content>
        <Title>{t('common:selectImageTitle')}</Title>

        <Wrapper>
          <Select
            options={dataList}
            value={selectedValue}
            onChange={handleChange}
            isClearable
          />
        </Wrapper>
        <ButtonWrap>
          <StyledButton onClick={handleSelect}>{t('select2')}</StyledButton>
          <StyledButton variant="outline-gray" onClick={onClose}>
            {t('cancel')}
          </StyledButton>
        </ButtonWrap>
      </Content>
    </Modal>
  )
}
const Content = styled.div`
  padding: 40px;
`
const Title = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`
const Wrapper = styled.div`
  margin-top: 20px;
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  column-gap: 10px;
`
const StyledButton = styled(Button)`
  min-width: 88px;
`

export default ChooseImageModal
