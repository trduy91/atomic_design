import _ from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import validator from 'validator'
import { useBushokaisoptn } from '../../../hooks/useBushokaisoptn'
import { useHojoKamoku } from '../../../hooks/useHojoKamoku'
import { useJugyoin } from '../../../hooks/useJugyoin'
import { useKanjoKamoku } from '../../../hooks/useKanjoKamoku'
import { useKeihiKamoku } from '../../../hooks/useKeihiKamoku'
import { useProject } from '../../../hooks/useProject'
import { useShinseiForm } from '../../../hooks/useShinseiForm'
import { useUser } from '../../../hooks/useUser'
import { useYakushoku } from '../../../hooks/useYakushoku'
import { images } from '../../../themes'
import { SORT_ASC } from '../../../utils/constants'
import { addTabToString } from '../../../utils/format'
import { SUPER_ADMIN } from '../../../utils/permission'
import { convertNumber } from '../../../utils/validation'
import { Input, Select } from '../../atoms'
import IconButton from '../IconButton'
import { getDataFromTree, getTreeFromData } from '../../../utils/tree-functions'

const ConditionRow = (props: any) => {
  const {
    setErrorMessage,
    branchCondition,
    typeOptions,
    onDelete,
    onBranchChange,
    isDeleteDisable,
    error,
  } = props
  const { t } = useTranslation(['layout', 'common'])
  const [conditionValueOptions, setConditionValueOptions] = useState<any>([])
  const [isInput, setIsInput] = useState(false)

  const { keihiKamokuData, searchKeihiKamoku } = useKeihiKamoku()
  const { kanjoKamokuData, fetchKanjoKamoku } = useKanjoKamoku()
  const { hojoKamokuData, fetchHojoKamoku } = useHojoKamoku()
  const { projectData, fetchProjectList } = useProject()
  const { yakushokuData, fetchYakushokuListNoAuthen } = useYakushoku()
  const { jugyoinData, searchJugyoin } = useJugyoin()
  const { shinseiFormData, searchShinseiForm } = useShinseiForm()
  const { fetchBushokaisoptnDetailNoAuthen } = useBushokaisoptn()
  const { userData } = useUser()

  useEffect(() => {
    fetchValueOption(branchCondition?.bunkiJokenShubetsu)
  }, [
    branchCondition,
    keihiKamokuData,
    kanjoKamokuData,
    hojoKamokuData,
    projectData,
    yakushokuData,
    jugyoinData,
  ])

  const mapKeihiKamokuOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.id,
          label: record.keihiKamokuName,
        }
      })
    )
  }

  const renderKeihiKamokuList = () => {
    if (_.isEmpty(keihiKamokuData)) {
      searchKeihiKamoku(
        {
          page: 1,
          size: 99999999,
          sortParameters: [
            {
              sortField: 'hyojiJun',
              sortDirection: SORT_ASC,
            },
            {
              sortField: 'keihiKamokuName',
              sortDirection: SORT_ASC,
            },
          ],
        },
        (response: any) => {
          const options = mapKeihiKamokuOpts(response?.data?.list)
          setConditionValueOptions(options)
        },
        () => {
          // No data
        }
      )
    } else {
      const options = mapKeihiKamokuOpts(keihiKamokuData?.list)
      setConditionValueOptions(options)
    }
  }

  const mapKanjoKamokuOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.kanjoKamokuId,
          label: record.kanjoKamokuName,
        }
      })
    )
  }

  const renderKanjoKamokuList = () => {
    if (_.isEmpty(kanjoKamokuData)) {
      fetchKanjoKamoku(
        (response: any) => {
          const options = mapKanjoKamokuOpts(response?.data)
          setConditionValueOptions(options)
        },
        () => {
          // No data
        }
      )
    } else {
      const options = mapKanjoKamokuOpts(Object.values(kanjoKamokuData))
      setConditionValueOptions(options)
    }
  }

  const mapHojoKamokuOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.hojoKamokuId,
          label: addTabToString(1, record.hojoKamokuName),
          kanjoId: record.kanjoKamokuId,
        }
      })
    )
  }

  const renderHojoKamokuList = () => {
    let kanjos: any = []
    // Get kanjo information
    if (_.isEmpty(kanjoKamokuData)) {
      fetchKanjoKamoku(
        (response: any) => {
          kanjos = [...response?.data]
        },
        () => {
          // No data
        }
      )
    } else {
      kanjos = _.values(kanjoKamokuData)
    }
    // Get hojo options
    let hojoOptions: any = []
    if (_.isEmpty(hojoKamokuData)) {
      fetchHojoKamoku(
        (response: any) => {
          const hojoKamokuoptions = mapHojoKamokuOpts(response?.data)
          hojoOptions = _.groupBy(hojoKamokuoptions, 'kanjoId')
        },
        () => {
          // No data
        }
      )
    } else {
      const hojoKamokuptions = mapHojoKamokuOpts(Object.values(hojoKamokuData))
      hojoOptions = _.groupBy(hojoKamokuptions, 'kanjoId')
    }

    // process options to groups of options
    const options = _.values(hojoOptions)
      .map((hojo: any) => {
        const opt = { options: [...hojo] }
        const kanjo = kanjos.find(
          (k: any) => k.kanjoKamokuId === hojo[0].kanjoId
        )
        return kanjo ? { ...opt, ...{ label: kanjo?.kanjoKamokuName } } : {}
      })
      .filter((opt) => {
        return !_.isEmpty(opt)
      })
    setConditionValueOptions(options)
  }

  const handleFetchBushokaisoPtnSuccess = (data: any) => {
    const tantobushotemp: any = []
    const tempData = mapBushoWithTab(data)
    tempData.forEach((d: any) => {
      tantobushotemp.push({
        label: d.bushoMei,
        value: d.bushoId,
      })
    })
    return tantobushotemp
  }

  const mapBushoWithTab = (bushos: any) => {
    if (bushos.length === 0) return []
    const root = bushos[0]
    return bushos.map((b: any) => {
      if (b.kaisoBango > root.kaisoBango) {
        return {
          ...b,
          bushoMei: addTabToString(b.kaisoBango - root.kaisoBango, b.bushoMei),
        }
      }
      return b
    })
  }

  const fetchBushoList = () => {
    let tantobushotemp: any = []
    fetchBushokaisoptnDetailNoAuthen(
      userData.bushokaisoPtnId,
      (data: any) => {
        const userBusho = userData?.jugyoinTantoBushos.map((userTanto: any) => {
          const pattenItem: any = data.find(
            (patten: any) => userTanto.tantoBushoId === patten.bushoId
          )
          if (_.isEmpty(pattenItem)) return []
          const tree = getTreeFromData(data, pattenItem.shinbushoId)
          const userTree = tree.filter(
            (itemUserTree: any) =>
              itemUserTree.bushoId === userTanto.tantoBushoId
          )
          return getDataFromTree(userTree)
        })
        if (userData?.kengenCode === SUPER_ADMIN) {
          const tempTree = getTreeFromData(data, '')
          tantobushotemp = getDataFromTree(tempTree)
          setConditionValueOptions(
            handleFetchBushokaisoPtnSuccess(tantobushotemp)
          )
        } else if (userBusho.length > 0) {
          let tempList: any = []
          userBusho.forEach((b: any) => {
            tempList = [...tempList, ...b]
          })

          setConditionValueOptions(handleFetchBushokaisoPtnSuccess(tempList))
        } else {
          setConditionValueOptions([])
        }
      },
      () => {
        setConditionValueOptions([])
        // No data
      }
    )
  }

  const mapShinseiFormOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.shinseiFormId,
          label: record.shinseiFormName,
        }
      })
    )
  }

  const renderShinseiFormList = () => {
    if (_.isEmpty(shinseiFormData)) {
      searchShinseiForm(
        {
          page: 1,
          size: 99999999,
          sortParameters: [
            {
              sortField: 'hyojiJun',
              sortDirection: SORT_ASC,
            },
            {
              sortField: 'shinseiFormName',
              sortDirection: SORT_ASC,
            },
          ],
        },
        (response: any) => {
          const options = mapShinseiFormOpts(response?.list)
          setConditionValueOptions(options)
        },
        () => {
          // No data
        }
      )
    } else {
      const options = mapShinseiFormOpts(shinseiFormData?.list)
      setConditionValueOptions(options)
    }
  }

  const mapProjectOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.projectId,
          label: record.projectName,
        }
      })
    )
  }

  const fetchProjects = () => {
    if (_.isEmpty(projectData)) {
      fetchProjectList(
        {
          page: 1,
          size: 99999999,
          sortParameters: [
            {
              sortField: 'hyojiJun',
              sortDirection: SORT_ASC,
            },
            {
              sortField: 'projectCode',
              sortDirection: SORT_ASC,
            },
          ],
        },
        (response: any) => {
          const options = mapProjectOpts(response?.list)
          setConditionValueOptions(options)
        },
        () => {
          // No data
        }
      )
    } else {
      const options = mapProjectOpts(projectData?.list)
      setConditionValueOptions(options)
    }
  }

  const mapYakushokuOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.yakushokuId,
          label: record.yakushokuName,
        }
      })
    )
  }

  const fetchYakushokus = () => {
    if (_.isEmpty(yakushokuData)) {
      fetchYakushokuListNoAuthen(
        {
          page: 1,
          size: 99999999,
          sortParameters: [
            {
              sortField: 'hyojiJun',
              sortDirection: SORT_ASC,
            },
            {
              sortField: 'yakushokuName',
              sortDirection: SORT_ASC,
            },
          ],
        },
        (response: any) => {
          const options = mapYakushokuOpts(response?.list)
          setConditionValueOptions(options)
        },
        () => {
          // No data
        }
      )
    } else {
      const options = mapYakushokuOpts(yakushokuData?.list)
      setConditionValueOptions(options)
    }
  }

  const mapJugyoinOpts = (data: any) => {
    return (
      data &&
      data.map((record: any) => {
        return {
          value: record.jugyoinId,
          label: `${record.shimei}(${record.jugyoinBango}:${record.email})`,
        }
      })
    )
  }

  const fetchJugyoinList = () => {
    if (_.isEmpty(jugyoinData)) {
      searchJugyoin(
        {
          page: 1,
          size: 99999999,
          sortParameters: [
            {
              sortField: 'hyojiJun',
              sortDirection: SORT_ASC,
            },
            {
              sortField: 'jugyoinBango',
              sortDirection: SORT_ASC,
            },
          ],
        },
        (response: any) => {
          const options = mapJugyoinOpts(response?.data?.list)
          setConditionValueOptions(options)
        },
        () => {
          // No data
        }
      )
    } else {
      const options = mapJugyoinOpts(jugyoinData?.list)
      setConditionValueOptions(options)
    }
  }

  const fetchValueOption = (typeId: any) => {
    switch (typeId) {
      case '01': // 経費科目含む
        renderKeihiKamokuList()
        setIsInput(false)
        break
      case '02': // 借方勘定科目含む
      case '04': // 貸方勘定科目含む
        renderKanjoKamokuList()
        setIsInput(false)
        break
      case '03': // 借方補助勘定科目含む
      case '05': // 貸方補助勘定科目含む
        renderHojoKamokuList()
        setIsInput(false)
        break
      case '10': // 申請種類
        renderShinseiFormList()
        setIsInput(false)
        break
      case '11': // 費用負担部署
      case '13': // 所属部署
        fetchBushoList()
        setIsInput(false)
        break
      case '12': // プロジェクト
        fetchProjects()
        setIsInput(false)
        break
      case '14': // 役職
        fetchYakushokus()
        setIsInput(false)
        break
      case '15': // 申請者（従業員）
        fetchJugyoinList()
        setIsInput(false)
        break
      default:
        setConditionValueOptions([])
        setIsInput(true)
        break
    }
  }

  const handleOnBranchChange = (typeId: any, value: any) => {
    onBranchChange(
      branchCondition?.uniqueId,
      branchCondition?.bunkiJokenJun,
      typeId,
      value
    )
  }

  const filterOptions = (options: any) => {
    if (
      branchCondition?.bunkiJokenShubetsu === '03' ||
      branchCondition?.bunkiJokenShubetsu === '05'
    )
      return _.flatten(options.map((o: any) => o.options))
    return options
  }

  return (
    <StyledRow>
      <StyledColNoPadding xs="8">
        <StyledRowNoMargin>
          <StyledColNoPadding xs="5">
            <StyledSelect
              options={typeOptions}
              value={
                typeOptions &&
                typeOptions.find(
                  (obj: any) =>
                    branchCondition?.bunkiJokenShubetsu === obj.value
                )
              }
              onChange={(option: any) => {
                handleOnBranchChange(option?.value, null)
                setErrorMessage({
                  ...error,
                  [`${branchCondition.uniqueId}_bunkiJokenShubetsu`]: '',
                })
              }}
              isClearable
              isSearchable
              placeholder=""
              hideSelectedOptions
              error={error[`${branchCondition.uniqueId}_bunkiJokenShubetsu`]}
              inputId={`${branchCondition.uniqueId}_bunkiJokenShubetsu`}
            />
          </StyledColNoPadding>
          <StyledColNoPadding xs="5">
            {!isInput ? (
              <StyledSelect
                value={
                  conditionValueOptions &&
                  branchCondition?.bunkiJokenShosaiChi &&
                  filterOptions(conditionValueOptions).filter((obj: any) =>
                    branchCondition?.bunkiJokenShosaiChi.includes(obj.value)
                  )
                }
                onChange={(option: any) => {
                  setErrorMessage({
                    ...error,
                    [`${branchCondition.uniqueId}_bunkiJokenShosaiChi`]: '',
                  })
                  handleOnBranchChange(
                    branchCondition?.bunkiJokenShubetsu,
                    option.map((o: any) => o.value).toString()
                  )
                }}
                options={conditionValueOptions}
                isMulti
                isClearable
                isSearchable
                placeholder=""
                hideSelectedOptions
                error={error[`${branchCondition.uniqueId}_bunkiJokenShosaiChi`]}
                inputId={`${branchCondition.uniqueId}_bunkiJokenShosaiChi`}
              />
            ) : (
              <Input
                type="text"
                min={0}
                maxLength={10}
                value={
                  (branchCondition?.bunkiJokenShubetsu &&
                    !validator.isEmpty(branchCondition?.bunkiJokenShubetsu) &&
                    convertNumber(
                      branchCondition?.bunkiJokenShosaiChi,
                      0,
                      8
                    )) ||
                  ''
                }
                onChange={(value: any) => {
                  let tempValue = value.replace(/\s*,\s*|\s+,/g, '')
                  if (tempValue.length > 8) {
                    tempValue = null
                  }
                  if (!Number(tempValue)) {
                    tempValue = null
                  }
                  if (!!Number(tempValue) && Number(tempValue) < 0) {
                    tempValue = null
                  }
                  handleOnBranchChange(
                    branchCondition?.bunkiJokenShubetsu,
                    tempValue
                  )
                }}
                disabled={
                  branchCondition?.bunkiJokenShubetsu === undefined ||
                  validator.isEmpty(branchCondition?.bunkiJokenShubetsu)
                }
                id={`${branchCondition.uniqueId}_bunkiJokenShosaiChi`}
              />
            )}
          </StyledColNoPadding>
          <StyledColNoPadding xs="auto">
            <StyledIconButton
              icon={images.icTrash}
              variant="danger"
              label={t('common:remove')}
              onClick={() => onDelete(branchCondition?.uniqueId)}
              disabled={isDeleteDisable}
            />
          </StyledColNoPadding>
        </StyledRowNoMargin>
      </StyledColNoPadding>
    </StyledRow>
  )
}

export default memo(ConditionRow)

const StyledRow = styled(Row)`
  justify-content: center;
  margin: 20px 0 0 0;
  align-items: center;
`

const StyledRowNoMargin = styled(Row)`
  margin: 0px;
  justify-content: center;
`

const StyledColNoPadding = styled(Col)`
  padding: 0px;
  &:not(:first-child) {
    margin-left: 15px;
  }
`

const StyledSelect = styled(Select)`
  .select: {
    height: 40px;
  }
`

const StyledIconButton = styled(IconButton)`
  margin-top: 6px;
`
