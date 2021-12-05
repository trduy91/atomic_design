import React from 'react'
import styled from 'styled-components'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap'
import { colors } from '../../../themes'
import { hexToRGBA } from '../../../themes/colors'

interface DropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-warning'
    | 'outline-danger'
    | 'outline-gray'
  onClick?: () => void
  options?: any
  label?: any
}

const MultipleButton: React.FC<DropdownButtonProps> = ({
  variant = 'primary',
  className,
  label,
  options,
  ...props
}) => {
  return (
    <StyledDropdownButton
      {...props}
      className={[variant, className].filter((v) => v).join(' ')}
      title={label}
    >
      {options?.map((item: any) => {
        return (
          <div
            className={[`outline-${variant}`, className]
              .filter((v) => v)
              .join(' ')}
          >
            <Dropdown.Item
              as="button"
              key={`button-${item.label}`}
              onClick={item.onClick}
            >
              {item.label}
            </Dropdown.Item>
          </div>
        )
      })}
    </StyledDropdownButton>
  )
}

export default MultipleButton

const StyledDropdownButton = styled(DropdownButton)`
  height: 38px;
  border-radius: 3px;
  border: 0;
  font-size: 14px;
  font-weight: bold;
  padding: 0px 8px 0px 8px;
  color: ${colors.white};
  & .dropdown-menu {
    min-width: unset;
    padding: 0;
    & .primary {
      & .dropdown-item {
        background-color: ${colors.primary};
        color: ${colors.white};
      }
      & .dropdown-item:hover {
        background-color: ${colors.white};
        color: ${colors.primary};
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.primary};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.primary, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.primary};
      }
    }
    & .secondary {
      & .dropdown-item {
        background-color: ${colors.secondary};
        color: ${colors.white};
      }
      & .dropdown-item:hover {
        background-color: ${colors.white};
        color: ${colors.secondary};
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.secondary};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.secondary, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.secondary};
      }
    }
    & .warning {
      & .dropdown-item {
        background-color: ${colors.warning};
        color: ${colors.white};
      }
      & .dropdown-item:hover {
        background-color: ${colors.white};
        color: ${colors.warning};
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.warning};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.warning};
      }
    }
    & .danger {
      & .dropdown-item {
        background-color: ${colors.danger};
        color: ${colors.white};
      }
      & .dropdown-item:hover {
        background-color: ${colors.white};
        color: ${colors.danger};
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.danger};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.danger, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.danger};
      }
    }
    & .outline-primary {
      & .dropdown-item {
        background-color: ${colors.white};
        color: ${colors.primary};
      }
      & .dropdown-item:hover {
        background-color: ${colors.primary};
        color: ${colors.white};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.primary, 0.8)};
        outline: none;
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.primary} !important;
        color: ${colors.white};
      }
    }
    & .outline-secondary {
      & .dropdown-item {
        background-color: ${colors.white};
        color: ${colors.secondary};
      }
      & .dropdown-item:hover {
        background-color: ${colors.secondary};
        color: ${colors.white};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.secondary, 0.8)};
        outline: none;
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.secondary} !important;
        color: ${colors.white};
      }
    }
    & .outline-warning {
      & .dropdown-item {
        background-color: ${colors.white};
        color: ${colors.warning};
      }
      & .dropdown-item:hover {
        background-color: ${colors.warning};
        color: ${colors.white};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)};
        outline: none;
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.warning} !important;
        color: ${colors.white};
      }
    }
    & .outline-danger {
      & .dropdown-item {
        background-color: ${colors.white};
        color: ${colors.danger};
      }
      & .dropdown-item:hover {
        background-color: ${colors.danger};
        color: ${colors.white};
      }
      & .dropdown-item:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.danger, 0.8)};
        outline: none;
      }
      & .dropdown-item:active:hover {
        background-color: ${colors.danger} !important;
        color: ${colors.white};
      }
    }
  }
  &.primary {
    & > button {
      background-color: ${colors.primary};
      border: 1px solid ${colors.primary};
      &:hover {
        background-color: ${colors.white};
        color: ${colors.primary};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active,
      &:active:hover {
        background-color: ${colors.primary} !important;
        color: ${colors.white};
        border: 1px solid ${colors.primary} !important;
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.primary, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.primary};
      }
    }
    &.show > button {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  }
  &.secondary {
    & > button {
      background-color: ${colors.secondary};
      border: 1px solid ${colors.secondary};
      &:hover {
        background-color: ${colors.white};
        color: ${colors.secondary};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active,
      &:active:hover {
        background-color: ${colors.secondary} !important;
        color: ${colors.white};
        border: 1px solid ${colors.secondary} !important;
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.secondary, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.secondary};
      }
    }
    &.show > button {
      background-color: ${colors.secondary};
      color: ${colors.white};
    }
  }
  &.warning {
    & > button {
      background-color: ${colors.warning};
      border: 1px solid ${colors.warning};
      &:hover {
        background-color: ${colors.white};
        color: ${colors.warning};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active,
      &:active:hover {
        background-color: ${colors.warning} !important;
        color: ${colors.white};
        border: 1px solid ${colors.warning} !important;
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.warning};
      }
    }
    &.show > button {
      background-color: ${colors.warning};
      color: ${colors.white};
    }
  }
  &.danger {
    & > button {
      background-color: ${colors.danger};
      border: 1px solid ${colors.danger};
      &:hover {
        background-color: ${colors.white};
        color: ${colors.danger};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active,
      &:active:hover {
        background-color: ${colors.danger} !important;
        color: ${colors.white};
        border: 1px solid ${colors.danger} !important;
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.danger, 0.8)} !important;
        outline: none;
        background-color: ${colors.white};
        color: ${colors.danger};
      }
    }
    &.show > button {
      background-color: ${colors.danger};
      color: ${colors.white};
    }
  }
  &.outline-primary {
    & > button {
      background-color: ${colors.white};
      border: 1px solid ${colors.primary};
      color: ${colors.primary};
      &:hover {
        background-color: ${colors.primary};
        color: ${colors.white};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active {
        background-color: ${colors.white} !important;
        color: ${colors.primary};
      }
      &:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.primary};
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.primary, 0.8)};
        outline: none;
      }
    }
    &.show > button {
      background-color: ${colors.white};
      color: ${colors.primary};
    }
  }
  &.outline-secondary {
    & > button {
      background-color: ${colors.white};
      border: 1px solid ${colors.secondary};
      color: ${colors.secondary};
      &:hover {
        background-color: ${colors.secondary};
        color: ${colors.white};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active {
        background-color: ${colors.white} !important;
        color: ${colors.secondary};
      }
      &:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.secondary};
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.secondary, 0.8)};
        outline: none;
      }
    }
    &.show > button {
      background-color: ${colors.white};
      color: ${colors.secondary};
    }
  }
  &.outline-warning {
    & > button {
      background-color: ${colors.white};
      border: 1px solid ${colors.warning};
      color: ${colors.warning};
      &:hover {
        background-color: ${colors.warning};
        color: ${colors.white};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active {
        background-color: ${colors.white} !important;
        color: ${colors.warning};
      }
      &:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.warning};
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)};
        outline: none;
      }
    }
    &.show > button {
      background-color: ${colors.white};
      color: ${colors.warning};
    }
  }
  &.outline-danger {
    & > button {
      background-color: ${colors.white};
      border: 1px solid ${colors.danger};
      color: ${colors.danger};
      &:hover {
        background-color: ${colors.danger};
        color: ${colors.white};
      }
      &:disabled:hover {
        color: ${colors.white};
      }
      &:active {
        background-color: ${colors.white} !important;
        color: ${colors.danger};
      }
      &:active:hover {
        background-color: ${colors.white} !important;
        color: ${colors.danger};
      }
      &:focus {
        box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.danger, 0.8)};
        outline: none;
      }
    }
    &.show > button {
      background-color: ${colors.white};
      color: ${colors.danger};
    }
  }
`
