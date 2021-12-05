import { Container } from 'next/app'
import React from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button } from '../../atoms'

type AddBasicModalProps = {
  show: boolean
  title: string
  onCancel?: () => void
  onSave?: () => void
}

const AddBasicModal: React.FC<AddBasicModalProps> = ({
  show,
  title,
  children,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation('common')

  return (
    <Modal show={show} onHide={onCancel} backdrop="static" keyboard centered>
      <br />
      <Modal.Body>
        <Container>
          <Title>{title}</Title>
          <br />
          {children}
          <StyledRow>
            <Col xs="auto">
              <StyledButton variant="outline-gray" onClick={onCancel}>
                {t('common:cancel')}
              </StyledButton>
            </Col>
            <Col xs="auto">
              <StyledButton variant="primary" onClick={onSave}>
                {t('common:save')}
              </StyledButton>
            </Col>
          </StyledRow>
          <br />
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default AddBasicModal

const Title = styled.h5`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
`

const StyledRow = styled(Row)`
  justify-content: center;
  margin: 15px 0px;
`

const StyledButton = styled(Button)`
  min-width: 100px;
  color: white;
`
