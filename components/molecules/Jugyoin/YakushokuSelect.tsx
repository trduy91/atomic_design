import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import debounce from 'debounce-promise'
import { isString } from 'lodash'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useYakushoku } from '../../../hooks/useYakushoku'
import { SORT_ASC, TotalItemDropDown } from '../../../utils/constants'
import { colors } from '../../../themes'

type StateOption = { value: string; label: string }[]

const YakushokuSelect = (props: any) => {
  const {
    selectedYakushokuOption,
    onYakushokuChange,
    isDisabled,
    selectedYakushokuId,
    tabIndex,
    error,
  } = props

  const { t } = useTranslation('common')

  // yakushoku
  const { fetchYakushokuListNoAuthen } = useYakushoku()
  const [defaultYakusoku, setDefaultYakushoku] = useState<any>()

  // map yakushoku options
  const mapYakushokuOptions = (originalData: any): any => {
    return originalData.map((item: any) => {
      return {
        value: item.yakushokuId,
        label: item.yakushokuName,
      }
    })
  }

  const handleYakushokuChange = (dataChange: any) => {
    onYakushokuChange(dataChange)
  }

  const filterJobs = (inputValue: string) => {
    const parrams = {
      page: 1,
      size: TotalItemDropDown,
      isTransparent: true,
      yakushokuCode: '',
      yakushokuName: inputValue,
      sortParameters: [
        {
          sortField: 'hyojiJun',
          sortDirection: SORT_ASC,
        },
      ],
    }
    if (isDisabled) {
      return []
    }
    return new Promise<StateOption>((resolve) => {
      fetchYakushokuListNoAuthen(
        parrams,
        (response: any) => {
          const options = mapYakushokuOptions(response?.list || [])
          if (isString(selectedYakushokuId)) {
            setDefaultYakushoku(
              options.filter((o: any) => o.value === selectedYakushokuId)
            )
          } else {
            setDefaultYakushoku(null)
          }

          resolve(options)
        },
        () => {
          // do something
        }
      )
    })
  }

  const loadOptions = debounce(
    (inputValue: string) => {
      return Promise.resolve(filterJobs(inputValue))
    },
    1000,
    { leading: true }
  )

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        value={
          isString(selectedYakushokuId)
            ? defaultYakusoku
            : selectedYakushokuOption
        }
        defaultOptions
        isClearable
        onChange={handleYakushokuChange}
        placeholder=""
        isDisabled={isDisabled}
        noOptionsMessage={() => {
          return t('noOption')
        }}
        loadingMessage={() => {
          return t('loading')
        }}
        components={{
          IndicatorSeparator: () => null,
        }}
        tabIndex={tabIndex || 0}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

export default YakushokuSelect

const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${colors.danger};
`
