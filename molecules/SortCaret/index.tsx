import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { SORT_ASC, SORT_DESC } from '../../../utils/constants'

const SortCaret = (props: any) => {
  const {
    dataField = [],
    searchParam,
    setSearchParam,
    onSearch,
    children,
  } = props
  let paramSearchDESC: any = null
  let paramSearchASC: any = null
  let searchPattern: any = null
  paramSearchDESC = {
    sortParameters: [],
  }
  paramSearchASC = {
    sortParameters: [],
  }
  if (dataField.length > 0) {
    dataField.forEach((item: any) => {
      paramSearchDESC.sortParameters.push({
        sortField: item,
        sortDirection: SORT_DESC,
      })
      paramSearchASC.sortParameters.push({
        sortField: item,
        sortDirection: SORT_ASC,
      })
    })
    searchPattern = searchParam?.sortParameters?.filter((item: any) => {
      return item.sortField === dataField[0]
    })
  }

  const searchDESC = () => {
    setSearchParam({
      ...searchParam,
      ...paramSearchDESC,
    })
    onSearch({ ...searchParam, ...paramSearchDESC })
  }
  const searchASC = () => {
    setSearchParam({
      ...searchParam,
      ...paramSearchASC,
    })
    onSearch({ ...searchParam, ...paramSearchASC })
  }

  if (searchPattern && !_.isEmpty(searchPattern)) {
    return (
      <React.Fragment>
        {searchPattern[0].sortDirection === SORT_DESC && (
          <StyledCaret
            aria-hidden
            onClick={() => {
              searchASC()
            }}
          >
            {children}
            <span className="order dropdown">
              <span aria-hidden className="caret" />
            </span>
          </StyledCaret>
        )}
        {searchPattern[0].sortDirection === SORT_ASC && (
          <StyledCaret
            aria-hidden
            onClick={() => {
              searchDESC()
            }}
          >
            {children}
            <span className="order dropup">
              <span aria-hidden className="caret" />
            </span>
          </StyledCaret>
        )}
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <StyledCaret>
        <span
          aria-hidden
          onClick={() => {
            searchDESC()
          }}
        >
          {children}
        </span>

        <span className="order">
          <span className="dropup">
            <span
              aria-hidden
              onClick={() => {
                searchASC()
              }}
              className="caret"
            />
          </span>
          <span className="dropdown">
            <span
              aria-hidden
              onClick={() => {
                searchDESC()
              }}
              className="caret"
            />
          </span>
        </span>
      </StyledCaret>
    </React.Fragment>
  )
}

export default SortCaret

const StyledCaret = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  .order {
    display: inline-flex;
    flex-direction: column;
    .dropup,
    .dropdown {
      padding: 0;
      margin: 0;
      line-height: 0;
    }
    & > .dropup > .caret {
      margin: 0 0 2px 5px !important;
    }
    & > .dropdown > .caret {
      margin: 2px 0 0 5px !important;
    }
  }
`
