import React from 'react'
import * as Icon from 'react-icons/fi'
import Checkbox from 'react-custom-checkbox'
import styled from 'styled-components'
import colors from '../../../themes/colors'

const Container = styled.div`
  min-width: 120px;
  height: 40px;
  background: ${(p) => p.className};
  border: 1px solid ${(p) => p.id};
  border-radius: 3px;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  margin-top: 6px;
  margin-left: 10px;
  margin-right: 10px;
`

type IconProps = {
  id: string
  labelText: string
  onChange: (value: boolean) => void
  checked?: boolean | false
  hideLabel: boolean | false
  title?: string
  disabled: boolean | false
}

const CheckboxCustom: React.FC<IconProps> = ({
  id,
  labelText,
  onChange,
  checked,
  hideLabel,
  disabled,
}) => {
  const borderColorSet = checked ? colors.primary : colors.darkgray
  const backgroundColorSetEnabled = checked ? colors.primary : colors.white
  const backgroundColorSet = disabled
    ? colors.grayDisable
    : backgroundColorSetEnabled
  const backgroundContainerColorSetEnabled = checked
    ? colors.greenGray
    : colors.white
  const backgroundContainerColorSet = disabled
    ? colors.grayDisable
    : backgroundContainerColorSetEnabled
  const borderColorContainer = checked ? colors.primary : colors.lightGrayText
  const iconColor = disabled ? colors.grayDisable : colors.white
  const labelStyle = {
    marginLeft: 5,
    userSelect: 'none',
    fontWeight: 'bold',
    fontSize: 14,
  }
  const styleInputCheckbox = {
    cursor: 'pointer',
    background: backgroundColorSet,
  }

  const eventChangeCheckbox = (event: any) => {
    if (event.keyCode === 32 || event.keyCode === 13) {
      onChange(!checked)
    }
  }
  return (
    <Container
      className={backgroundContainerColorSet}
      id={borderColorContainer}
      tabIndex={0}
      onKeyDown={eventChangeCheckbox}
    >
      <Content>
        <Checkbox
          icon={<Icon.FiCheck color={iconColor} size={15} />}
          name={id}
          checked={checked}
          onChange={(value: boolean) => onChange(value)}
          borderColor={borderColorSet}
          borderRadius={0}
          style={styleInputCheckbox}
          labelStyle={labelStyle}
          size={15}
          label={!hideLabel ? labelText : ''}
          disabled={disabled}
        />
      </Content>
    </Container>
  )
}

export default CheckboxCustom
