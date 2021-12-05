import React, { forwardRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, images } from '../../../themes'
import IconButton from '../IconButton'
import ConditionRow from './condition-row'
import RouteArrow from './route-arrow'
import RouteBlock from './route-block'

const ConditionBlock = (props: any, ref: any) => {
  const {
    setErrorMessage,
    initBlock,
    condition,
    handleAddCondition,
    handleDeleteCondition,
    branchConditions,
    handleAddBranch,
    handleDeleteBranch,
    handleBranchChange,
    handleRouteChange,
    handleRouteDetail,
    defaultShoninRouteId,
    isContainDefault,
    error,
  } = props
  const { t } = useTranslation(['layout', 'common'])

  const typeOptions = [
    {
      value: '01',
      label: t('workflowDetail.conditionTypes.01'),
    },
    {
      value: '02',
      label: t('workflowDetail.conditionTypes.02'),
    },
    {
      value: '03',
      label: t('workflowDetail.conditionTypes.03'),
    },
    {
      value: '04',
      label: t('workflowDetail.conditionTypes.04'),
    },
    {
      value: '05',
      label: t('workflowDetail.conditionTypes.05'),
    },
    {
      value: '06',
      label: t('workflowDetail.conditionTypes.06'),
    },
    {
      value: '07',
      label: t('workflowDetail.conditionTypes.07'),
    },
    {
      value: '08',
      label: t('workflowDetail.conditionTypes.08'),
    },
    {
      value: '09',
      label: t('workflowDetail.conditionTypes.09'),
    },
    {
      value: '10',
      label: t('workflowDetail.conditionTypes.10'),
    },
    {
      value: '11',
      label: t('workflowDetail.conditionTypes.11'),
    },
    {
      value: '12',
      label: t('workflowDetail.conditionTypes.12'),
    },
    {
      value: '13',
      label: t('workflowDetail.conditionTypes.13'),
    },
    {
      value: '14',
      label: t('workflowDetail.conditionTypes.14'),
    },
    {
      value: '15',
      label: t('workflowDetail.conditionTypes.15'),
    },
  ]

  return (
    <div ref={ref}>
      <Header>
        <span>
          {!initBlock ? condition?.bunkiJokenJun : '1'}
          {t('workflowDetail.conditionTitle')}
          {initBlock && t('workflowDetail.noCondition')}
        </span>
        {!initBlock && (
          <ButtonContainer>
            <IconButton
              icon={images.icTrash}
              variant="danger"
              label={t('workflowDetail.deleteConditionBlock')}
              onClick={() => handleDeleteCondition(condition?.uniqueId)}
            />
          </ButtonContainer>
        )}
      </Header>
      <Content>
        {branchConditions &&
          branchConditions
            .filter((b: any) => b.bunkiJokenJun === condition?.bunkiJokenJun)
            .map((b: any, idx: any) => {
              return (
                <ConditionRow
                  setErrorMessage={setErrorMessage}
                  key={b.uniqueId}
                  index={idx}
                  typeOptions={typeOptions.filter(
                    (type: any) =>
                      !branchConditions
                        .filter(
                          (branch: any) =>
                            branch.bunkiJokenJun === condition?.bunkiJokenJun &&
                            type.value !== b.bunkiJokenShubetsu
                        )
                        .map((branch: any) => branch.bunkiJokenShubetsu)
                        .includes(type.value)
                  )}
                  branchCondition={b}
                  onDelete={handleDeleteBranch}
                  onBranchChange={handleBranchChange}
                  isDeleteDisable={
                    branchConditions.filter(
                      (br: any) => br.bunkiJokenJun === condition?.bunkiJokenJun
                    ).length <= 1
                  }
                  error={error}
                />
              )
            })}
        <StyledRow>
          <Col xs="auto">
            <IconButton
              icon={images.icCirclePlusGreen}
              variant="outline-primary"
              width={158}
              height={38}
              label={t('workflowDetail.addCondition')}
              onClick={() =>
                !initBlock
                  ? handleAddBranch(condition?.bunkiJokenJun)
                  : handleAddCondition()
              }
            />
          </Col>
        </StyledRow>
      </Content>
      <RouteContainer>
        {!initBlock ? (
          <RouteBlock
            bunkiJokenJun={condition?.bunkiJokenJun}
            shoninRouteId={condition?.shoninRouteId}
            onRouteChange={handleRouteChange}
            onDetail={handleRouteDetail}
            isDefault={false}
            initBlock={initBlock}
            error={error[`${condition.uniqueId}_shoninRoute`]}
          />
        ) : (
          <RouteBlock
            shoninRouteId={defaultShoninRouteId}
            onRouteChange={handleRouteChange}
            onDetail={handleRouteDetail}
            isDefault
            initBlock={initBlock}
            error={error.defaultShoninRoute}
          />
        )}
        <RouteSeparator xs="auto" />
        {!initBlock && isContainDefault && (
          <RouteBlock
            shoninRouteId={defaultShoninRouteId}
            onRouteChange={handleRouteChange}
            onDetail={handleRouteDetail}
            isDefault
            initBlock={initBlock}
            error={error.defaultShoninRoute}
          />
        )}
        {!initBlock && !isContainDefault && (
          <Col>
            <RouteArrow isDefault height={270} />
          </Col>
        )}
        {initBlock && <Col />}
      </RouteContainer>
    </div>
  )
}

export default forwardRef(ConditionBlock)

const Header = styled.div`
  background-color: ${colors.primary};
  color: ${colors.whiteText};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 68px;
  font-size: 18px;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const Content = styled.div`
  padding: 20px;
  background-color: ${colors.white};
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 45px;
`

const StyledRow = styled(Row)`
  justify-content: center;
  margin: 20px 0 0 0;
  align-items: center;
`

const RouteContainer = styled(Row)`
  justify-content: flex-start;
  margin: 0 0 0 0;
  align-items: flex-start;
`

const RouteSeparator = styled(Col)`
  width: 16px;
  padding-left: 0px;
  padding-right: 0px;
`
