import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../themes'
import { Icon } from '../../atoms'

type IconButtonProp = {
  label?: string
  icon?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'light'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-danger'
    | 'outline-warning'
    | 'linkBlue'
  disabled?: boolean
  isTransparent?: boolean
  isSolid?: boolean
  iconLocation?: 'left' | 'right'
  height?: number
  width?: number
  tabIndex?: number
  className?: string
  onClick?: () => void
  iconSize?: number
}

const IconButton: React.FC<IconButtonProp> = ({
  label,
  icon,
  disabled = false,
  isTransparent = false,
  isSolid = false,
  variant,
  iconLocation = 'left',
  height = 26,
  width,
  className,
  tabIndex = 0,
  onClick,
  iconSize,
  ...props
}) => {
  let iconHeight = iconSize?.toString() || ''
  if (!iconSize) {
    iconHeight = isTransparent ? '13' : '12'
  }
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <ButtonWrap
      onClick={handleClick}
      onKeyPress={handleClick}
      variant={variant}
      disabled={disabled}
      isTransparent={isTransparent}
      isSolid={isSolid}
      iconLocation={iconLocation}
      height={height}
      width={width}
      tabIndex={tabIndex}
      className={className}
      {...props}
    >
      {icon && <Icon src={icon} width="auto" height={iconHeight} />}
      {icon && label && <ButtonDivider variant={variant} />}
      {label && <ButtonText>{label}</ButtonText>}
    </ButtonWrap>
  )
}

const getButtonHeight = (props: any) => {
  return `${props.height}px`
}

const getButtonWidth = (props: any) => {
  return props.width ? `${props.width}px` : 'fit-content'
}

const getTransparentProperty = (props: any) => {
  return (
    props.isTransparent &&
    `
      font-size: 14px;
      background-color: transparent;
    `
  )
}

const getLightVariantProperty = (props: any) => {
  return (
    props.variant === 'light' &&
    `
      font-size: 14px;
      color: ${colors.whiteText};
      background-color: transparent;
      &:hover {
          opacity: 0.8;
        }
      `
  )
}

const getColorByVariant = (variant: string) => {
  let color: any = ''
  let background: any = ''
  switch (variant) {
    case 'primary':
    case 'outline-primary':
      color = colors.primary
      background = colors.bgLightGreen
      break
    case 'secondary':
    case 'outline-secondary':
      color = colors.secondary
      background = colors.bgLightBlue
      break
    case 'danger':
    case 'outline-danger':
      color = colors.danger
      background = colors.bgLightRed
      break
    case 'linkBlue':
      color = colors.linkBlue
      background = colors.bgLightBlue
      break
    case 'warning':
    case 'outline-warning':
      color = colors.warning
      background = colors.bgLightWarning
      break
    default:
      break
  }
  return { color, background }
}

const getVariantCssProperty = (props: any) => {
  const { color, background } = getColorByVariant(props.variant)
  return (
    color &&
    background &&
    !props.isSolid &&
    `&:hover {
        color: ${color};
        background-color: ${background};
      }
    `
  )
}

const getVariantSolidCssProperty = (props: any) => {
  const { color } = getColorByVariant(props.variant)
  return (
    color &&
    props.isSolid &&
    `
      font-size: 14px;
      background-color: ${color};
      color: ${colors.white};
      & img {
        filter: brightness(0) invert(1);
      }
      &:hover {
        border: 1px solid ${color}; 
        color: ${color};
        background-color: ${colors.white};
        & img {
          filter: none;
        }
      }
    `
  )
}

const getVariantOutlineCssProperty = (props: any) => {
  const { color, background } = getColorByVariant(props.variant)
  return (
    color &&
    background &&
    props.variant?.includes('outline') &&
    `
      font-size: 14px;
      color: ${color};
      border: 1px solid ${color};
      background-color: transparent;
        &:hover {
          background-color: ${background};
        }
    `
  )
}

const getDisableProperty = (props: any) => {
  return (
    props.disabled &&
    `
      color: ${colors.white} !important;
      background-color: ${colors.borderGray} !important;
      border-style: none !important;
      cursor: no-drop !important;
      &:hover {
        background-color: ${colors.borderGray} !important;
        opacity: 1;
        & img {
          filter: brightness(0) invert(1);
        }
      }
      & img {
        filter: brightness(0) invert(1);
      }
    `
  )
}

const ButtonWrap = styled.div`
  display: flex;
  ${(props: IconButtonProp) =>
    props.iconLocation === 'right' && 'flex-direction:row-reverse'};
  align-items: center;
  justify-content: center;
  height: ${getButtonHeight};
  min-width: ${getButtonWidth};
  padding: 0 8px;
  border-radius: 3px;
  font-size: 13px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: ${colors.bgGray};
  color: ${colors.text};
  &:hover {
    cursor: pointer;
  }
  ${getTransparentProperty};
  ${getLightVariantProperty};
  ${getVariantCssProperty};
  ${getVariantSolidCssProperty}
  ${getVariantOutlineCssProperty};
  ${getDisableProperty};
`

const ButtonDivider = styled.div`
  width: ${(props: IconButtonProp) =>
    props.variant === 'light' ? '7px' : '5px'};
`

const ButtonText = styled.span`
  font-weight: bold;
`

export default IconButton
