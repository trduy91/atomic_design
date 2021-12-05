import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import styled from '@emotion/styled-base'
import { colors } from '../../../themes'

type TabItemProps = {
  value: string
  label: string
}
type TabListProps = {
  onChange: (e: any, value: any) => void
  items: TabItemProps[]
  value: string
}
const TabBar: React.FC<TabListProps> = ({ onChange, value, items }) => {
  return (
    <StyledTabs
      id="controlled-tab-example"
      activeKey={value}
      onSelect={onChange}
      className="mb-3"
    >
      {items.map((item) => (
        <Tab key={item.value} eventKey={item.value} title={item.label} />
      ))}
    </StyledTabs>
  )
}

export default TabBar

const StyledTabs = styled(Tabs)`
  border: none;
  fon-size: 18px;
  justify-content: center;
  & .nav-link {
    background-color: ${colors.white};
    color: ${colors.text};
    border: none;
    &:first-child {
      border-radius: 3px 0 0 3px;
    }
    &:last-child {
      border-radius: 0 3px 3px 0;
    }
    &.active {
      color: ${colors.white};
      background-color: ${colors.primary};
    }
  }
`
