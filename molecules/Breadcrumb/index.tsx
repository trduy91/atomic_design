/* eslint-disable react/no-array-index-key */
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { colors, images } from '../../../themes'
import { hexToRGBA } from '../../../themes/colors'
import { Icon } from '../../atoms'

type BreadcrumbItemType = {
  text: string
  href: string
}

type BreadcrumbProps = {
  items: BreadcrumbItemType[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Wrap>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <ItemWrap key={index}>
              <StyledText>{item.text}</StyledText>
            </ItemWrap>
          )
        }

        return (
          <ItemWrap key={index}>
            <Link href={item.href} passHref>
              <StyledA>{item.text}</StyledA>
            </Link>
            <StyledIcon src={images.icArrowRight} width="6" height="12" />
          </ItemWrap>
        )
      })}
    </Wrap>
  )
}

export default Breadcrumb

const Wrap = styled.div`
  display: flex;
`

const ItemWrap = styled.div`
  display: flex;
  align-items: center;
`

const StyledA = styled.a`
  color: ${colors.primaryText};
  font-size: 14px;
  &:hover {
    color: ${hexToRGBA(colors.primaryText, 0.7)};
  }
`

const StyledText = styled.div`
  font-size: 14px;
  color: ${colors.grayText};
`

const StyledIcon = styled(Icon)`
  margin: 0px 8px;
`
