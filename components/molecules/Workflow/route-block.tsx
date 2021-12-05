import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useShoninRoute } from '../../../hooks/useShoninRoute'
import { colors, images } from '../../../themes'
import { SORT_ASC } from '../../../utils/constants'
import { Select } from '../../atoms'
import IconButton from '../IconButton'
import RouteArrow from './route-arrow'

const RouteBlock = (props: any) => {
  const {
    isDefault,
    initBlock,
    bunkiJokenJun,
    shoninRouteId,
    onRouteChange,
    onDetail,
    error,
  } = props
  const { t } = useTranslation(['layout', 'common'])

  const { shoninRouteData, searchShoninRoute } = useShoninRoute()
  const [routeList, setRouteList] = useState([])

  const mapShoninRouteOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.shoninRouteId,
          label: record.shoninRouteName,
        }
      })
    )
  }

  const renderShoninRouteList = () => {
    if (_.isEmpty(shoninRouteData)) {
      const options = callApiShoninRouteList()
      setRouteList(options)
      if (!shoninRouteId) {
        onRouteChange(bunkiJokenJun, options[0]?.value, isDefault)
      }
    } else {
      const options = mapShoninRouteOpts(shoninRouteData?.list)
      setRouteList(options)
      if (!shoninRouteId) {
        onRouteChange(bunkiJokenJun, options[0]?.value, isDefault)
      }
    }
  }
  const callApiShoninRouteList = () => {
    let options: any = []
    searchShoninRoute(
      {
        page: 1,
        size: 99999999,
        sortParameters: [
          {
            sortField: 'hyojiJun',
            sortDirection: SORT_ASC,
          },
          {
            sortField: 'shoninRouteName',
            sortDirection: SORT_ASC,
          },
        ],
      },
      (response: any) => {
        options = mapShoninRouteOpts(response?.data?.list)
      },
      () => {
        // No data
      }
    )
    return options
  }

  useEffect(() => {
    renderShoninRouteList()
  }, [shoninRouteData])

  return (
    <Col {...props}>
      <RouteArrow initBlock={initBlock} isDefault={isDefault} />
      <StyledRow>
        <Col xs="8">
          <Select
            label={
              isDefault
                ? t('workflowDetail.defaultShoninRoute')
                : t('workflowDetail.shoninRoute')
            }
            isRequired
            options={routeList}
            value={
              routeList &&
              routeList.find((obj: any) => shoninRouteId === obj.value)
            }
            onChange={(option: any) =>
              onRouteChange(bunkiJokenJun, option?.value, isDefault)
            }
            onMenuOpen={() => {
              setRouteList(callApiShoninRouteList())
            }}
            isSearchable
            hideSelectedOptions
            placeholder=""
            error={error}
          />
        </Col>
        <ColPadBottom xs="auto">
          <IconButton
            icon={images.icDetail}
            variant="primary"
            label={t('workflowDetail.detailRoute')}
            onClick={() => onDetail(shoninRouteId)}
            disabled={!routeList || _.isEmpty(routeList) || !shoninRouteId}
          />
        </ColPadBottom>
      </StyledRow>
    </Col>
  )
}

export default RouteBlock

const StyledRow = styled(Row)`
  justify-content: center;
  padding: 30px 0;
  align-items: flex-end;
  background-color: ${colors.white};
  border-radius: 5px;
`

const ColPadBottom = styled(Col)`
  padding-bottom: 7px;
`
