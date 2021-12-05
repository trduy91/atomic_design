/* eslint-disable import/named */
import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { usePagination } from '@material-ui/lab/Pagination'
import { Icon } from '../../atoms'
import { colors, images } from '../../../themes'

const useStyles = makeStyles(() => ({
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  },
}))

type PaginationProp = {
  countPage: number | 1
  setPageActive: (page: number, sizePerPage: number) => void
  pageActive: number | 1
}

const Pagination: React.FC<PaginationProp> = ({
  countPage,
  pageActive,
  setPageActive,
}) => {
  const classes = useStyles()
  const { items } = usePagination({
    count: countPage,
    page: pageActive,
  })

  const setFirstPage = () => {
    if (pageActive > 1) {
      setPageActive(1, countPage)
    }
  }

  const setBeforePage = () => {
    if (pageActive > 1) {
      setPageActive(pageActive - 1, countPage)
    }
  }

  const setNextPage = () => {
    if (pageActive < countPage) {
      setPageActive(pageActive + 1, countPage)
    }
  }

  const setLastPage = () => {
    if (pageActive < countPage) {
      setPageActive(countPage, countPage)
    }
  }

  return (
    <nav>
      <ul className={classes.ul}>
        {items.map(
          (
            { page, type, selected, ...item }: any,
            index: React.Key | null | undefined
          ) => {
            let children = null
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = <Icon src={images.icEllipsis} width="14" height="18" />
            } else if (type === 'page') {
              children = (
                <ButtonPage
                  className={selected ? 'active' : ''}
                  tabIndex={0}
                  {...item}
                  onClick={() => setPageActive(page, countPage)}
                  onKeyPress={() => setPageActive(page, countPage)}
                >
                  {page}
                </ButtonPage>
              )
            }
            if (type === 'previous') {
              children = (
                <ListButtonPreviousNext>
                  <ButtonPreviousNext
                    {...item}
                    tabIndex={0}
                    onClick={setFirstPage}
                    onKeyPress={setFirstPage}
                  >
                    <Icon src={images.icPreviousFirst} width="25" height="25" />
                  </ButtonPreviousNext>
                  <ButtonPreviousNext
                    {...item}
                    tabIndex={0}
                    onClick={setBeforePage}
                    onKeyPress={setBeforePage}
                  >
                    <Icon src={images.icPrevious} width="25" height="25" />
                  </ButtonPreviousNext>
                </ListButtonPreviousNext>
              )
            }
            if (type === 'next') {
              children = (
                <ListButtonPreviousNext>
                  <ButtonPreviousNext
                    {...item}
                    tabIndex={0}
                    onClick={setNextPage}
                    onKeyPress={setNextPage}
                  >
                    <Icon src={images.icNext} width="25" height="25" />
                  </ButtonPreviousNext>
                  <ButtonPreviousNext
                    {...item}
                    tabIndex={0}
                    onClick={setLastPage}
                    onKeyPress={setLastPage}
                  >
                    <Icon src={images.icNextLast} width="25" height="25" />
                  </ButtonPreviousNext>
                </ListButtonPreviousNext>
              )
            }
            // eslint-disable-next-line react/no-array-index-key
            return <ItemPagination key={index}>{children}</ItemPagination>
          }
        )}
      </ul>
    </nav>
  )
}

export default Pagination

const ListButtonPreviousNext = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 0;
`

const ButtonPreviousNext = styled.div`
  background-color: ${(props: any) =>
    props.disabled ? colors.grayDisable : 'none'};
  height: 25px;
  width: 25px;
  cursor: pointer;
  &:first-child {
    margin-right: 7px;
  }
`

const ButtonPage = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid
    ${(props: any) => (props.className ? colors.primaryText : colors.white)};
  color: ${(props: any) => (props.className ? colors.white : colors.grayText)};
  background-color: ${(props: any) =>
    props.className ? colors.primaryText : colors.white};
  &:hover {
    border: 1px solid ${colors.primaryText};
    line-height: 24px;
    color: ${(props: any) =>
      props.className ? colors.white : colors.primaryText};
  }
`

const ItemPagination = styled.li`
  margin-right: 7px;
`
