/* eslint-disable no-unused-expressions */
import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Button } from '../../atoms'
import { colors } from '../../../themes'

type ConfirmModalProps = {
  show: boolean
  title: string
  message: string
  note?: string
  noteBlack?: string
  noteStyle?: string
  okText: string
  okVariant?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'light'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-warning'
    | 'outline-danger'
    | 'outline-gray'
  onOk: () => void
  onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title,
  message,
  note,
  noteBlack,
  okText,
  onOk,
  okVariant,
  onClose,
  ...props
}) => {
  const { t } = useTranslation('common')
  return (
    <StyledModal
      show={show}
      onHide={() => {
        onClose()
      }}
      backdrop="static"
      keyboard
      centered
    >
      <Content>
        <Title>{title}</Title>
        <Message>{message}</Message>
        {noteBlack && noteBlack !== '' && (
          <NoteBlack {...props}>{noteBlack}</NoteBlack>
        )}
        {note && note !== '' && <Note {...props}>{note}</Note>}
        <ActionWrap>
          <CloseButton
            variant="outline-gray"
            onClick={() => {
              onClose()
            }}
          >
            {t('back')}
          </CloseButton>
          <OkButton
            variant={okVariant}
            onClick={() => {
              onOk()
            }}
          >
            {okText}
          </OkButton>
        </ActionWrap>
      </Content>
    </StyledModal>
  )
}

export default ConfirmModal

const StyledModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.1);
`
const Content = styled.div`
  padding: 40px;
`
const Title = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`

const Message = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`

const getStyle = (props: any) => {
  return props.noteStyle && props.noteStyle !== '' && `${props.noteStyle};`
}

const Note = styled.div`
  font-size: 14px;
  color: ${colors.danger};
  text-align: center;
  margin-top: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  ${getStyle}
`
const NoteBlack = styled.div`
  font-size: 14px;
  color: ${colors.text};
  text-align: center;
  margin-top: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  ${getStyle}
`
const ActionWrap = styled.div`
  margin-top: 40px;
  justify-content: center;
  display: flex;
`

const CloseButton = styled(Button)`
  min-width: 120px;
  margin-right: 10px;
`
const OkButton = styled(Button)`
  min-width: 120px;
  margin-left: 10px;
`
