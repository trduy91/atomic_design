/* eslint-disable no-nested-ternary */
import React from 'react'
import styled from 'styled-components'
import colors from '../../../themes/colors'
import images from '../../../themes/images'
import Icon from '../Icon'

type RadioComponentProps = {
  id: string
  labelText: string
  onChange: (value: any) => void
  checked: any
  valueRadio: any
  className?: any
  direction?: 'column' | 'row'
  width?: string
  disabled: boolean | false
  tabIndex?: number
  minWidth?: string
}

const Radio: React.FC<RadioComponentProps> = ({
  id,
  labelText,
  onChange,
  checked,
  valueRadio,
  direction,
  disabled,
  className,
  minWidth,
  tabIndex = 0,
}) => {
  let backgroundContainerColorSet = colors.white
  let borderColorContainer = colors.lightGrayText
  let hoverStyle = 'pointer'
  let minWidthRadio = minWidth || '120px'
  let marginButtonRadio = '0px'
  let iconCheck = (
    <Icon src={images.icRadioUncheck} width="auto" height="auto" />
  )
  if (checked === valueRadio && !disabled) {
    iconCheck = <Icon src={images.icRadioChecked} width="auto" height="auto" />
    borderColorContainer = colors.primary
    backgroundContainerColorSet = colors.greenGray
  } else if (disabled) {
    if (checked !== valueRadio) {
      iconCheck = (
        <Icon src={images.icRadioDisabled} width="auto" height="auto" />
      )
      hoverStyle = 'default'
    } else if (checked === valueRadio) {
      iconCheck = (
        <Icon src={images.icRadioChecked} width="auto" height="auto" />
      )
    }
    backgroundContainerColorSet = colors.disabledBackGround
  }
  if (direction === 'column') {
    minWidthRadio = '200px'
    marginButtonRadio = '5px'
  }

  const onchangeRadio = () => {
    if (!disabled) {
      onChange(valueRadio)
    }
  }

  const eventChangeRadio = (event: any) => {
    if (event.keyCode === 32 || event.keyCode === 13) {
      onchangeRadio()
    }
  }

  return (
    <Container
      className={[backgroundContainerColorSet, className]
        .filter((v) => v)
        .join(' ')}
      id={borderColorContainer}
      style={{ cursor: hoverStyle, marginBottom: marginButtonRadio }}
      tabIndex={tabIndex}
      onKeyDown={eventChangeRadio}
    >
      <Content
        onClick={onchangeRadio}
        id={id}
        style={{ minWidth: minWidthRadio }}
      >
        <IconStyle>{iconCheck}</IconStyle>
        <TextStyle>{labelText}</TextStyle>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: fit-content;
  height: 38px;
  background: ${(p) => p.className};
  border: 1px solid ${(p) => p.id};
  border-radius: 3px;
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: 1px solid ${colors.borderFocusBlue};
    border-radius: 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-description: row;
  align-items: center;
`

const IconStyle = styled.div`
  padding: 0 5px 2px 10px;
`

const TextStyle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
`

export default Radio
