import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

type NoDataProps = {}

const NoData: React.FC<NoDataProps> = () => {
  const { t } = useTranslation(['common'])
  return <Text>{t('common:noData')}</Text>
}

export default NoData

const Text = styled.div`
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`
