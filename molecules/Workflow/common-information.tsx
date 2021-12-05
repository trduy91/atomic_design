import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../themes'
import { Input } from '../../atoms'

const CommonInformation = (props: any) => {
  const {
    workflowName,
    hyojiJun,
    onChangeWorkflowName,
    onChangeHyojiJun,
    error,
  } = props
  const { t } = useTranslation('layout')

  return (
    <Wrap>
      <StyledRowNoMargin>
        <StyledColNoPaddingLeft xs={4}>
          <Input
            label={t('workflowDetail.workflowName')}
            isRequired
            maxLength={250}
            value={workflowName}
            onChange={onChangeWorkflowName}
            error={error['00_workflowName']}
            id="00_workflowName"
          />
        </StyledColNoPaddingLeft>
        <StyledColNoPaddingLeft xs={2}>
          <Input
            label={t('workflowDetail.hyojiJun')}
            type="number"
            min={0}
            max={9999}
            maxLength={4}
            value={hyojiJun}
            onChange={onChangeHyojiJun}
          />
        </StyledColNoPaddingLeft>
      </StyledRowNoMargin>
    </Wrap>
  )
}

export default CommonInformation

const Wrap = styled.div`
  background-color: ${colors.white};
  padding: 40px 30px 20px 30px;
  border-radius: 5px;
  margin-bottom: 70px;
`

const StyledRowNoMargin = styled(Row)`
  margin: 0px;
`

const StyledColNoPaddingLeft = styled(Col)`
  padding-left: 0px;
`
