import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../themes'
import SelectItem from './select-item'

const CommonInformation = (props: any) => {
  const { jugyoinData, shozokuBushos, items } = props
  const { t } = useTranslation('layout')

  const renderJugyoinContent = (title: string, content: any) => {
    return (
      <StyledRowNoMargin className="no-top-border">
        <TitleCol xs={3}>{title}</TitleCol>
        <Col>
          {Array.isArray(content) ? (
            content?.map((item: any) => {
              return <ContentSpan>{item}</ContentSpan>
            })
          ) : (
            <ContentSpan>{content}</ContentSpan>
          )}
        </Col>
      </StyledRowNoMargin>
    )
  }

  return (
    <Wrap>
      <RowWrapper>
        <ColWrapper>
          <Title>{t('wakufuroDetail.content.title')}</Title>
        </ColWrapper>
      </RowWrapper>
      <RowWrapper>
        <ColWrapper>
          <TableWrapper>
            {renderJugyoinContent(
              t('layout:jugyoin.bango'),
              jugyoinData.jugyoinBango
            )}
            {renderJugyoinContent(t('layout:jugyoin.name'), jugyoinData.shimei)}
            {renderJugyoinContent(t('layout:jugyoin.busho'), shozokuBushos)}
            {renderJugyoinContent(
              t('layout:jugyoin.kengen.searchBar'),
              t(`layout:${jugyoinData.kengen}`)
            )}
          </TableWrapper>
        </ColWrapper>
      </RowWrapper>
      <SelectItem items={items} />
    </Wrap>
  )
}

export default CommonInformation

const Wrap = styled.div`
  background-color: ${colors.white};
  width: 100%;
  padding: 30px;
  border-radius: 5px;
`

const Title = styled(Col)`
  color: ${colors.text};
  font-size: 18px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 15px;
  margin-left: -15px;
`

const TableWrapper = styled.div`
  border: 1px solid ${colors.line};
  width: 100%;
`

const TitleCol = styled(Col)`
  font-weight: bold;
`

const ContentSpan = styled.div`
  padding-left: 11px;
  display: block;
`

const RowWrapper = styled(Row)`
  margin: 0px;
  width: 60%;
`

const ColWrapper = styled(Col)`
  margin: 0px;
  padding: 0px;
`

const StyledRowNoMargin = styled(Row)`
  margin: 0px;
  min-height: 48px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-top: 1px solid ${colors.line};
  display: flex;
  flex-direction: row;
  align-items: center;
  &.no-top-border {
    border-top: none;
  }
`
