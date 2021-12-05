import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../themes'
import { hexToRGBA } from '../../../themes/colors'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'light'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-warning'
    | 'outline-danger'
    | 'outline-gray'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      onClick={onClick}
      className={[variant, className].filter((v) => v).join(' ')}
    >
      {children}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button`
  height: 38px;
  border-radius: 3px;
  border: 0;
  font-size: 14px;
  font-weight: bold;
  padding: 0px 8px 0px 8px;
  color: ${colors.white};
  &.primary {
    background-color: ${colors.primary};
    border: 1px solid ${colors.primary};
    &:hover {
      background-color: ${colors.white};
      color: ${colors.primary};
    }
    &:disabled:hover {
      color: ${colors.white};
    }
    &:active {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.primary, 0.8)};
      outline: none;
    }
  }
  &.secondary {
    background-color: ${colors.secondary};
    border: 1px solid ${colors.secondary};
    &:hover {
      background-color: ${colors.white};
      color: ${colors.secondary};
    }
    &:active {
      background-color: ${colors.secondary};
      color: ${colors.white};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.secondary, 0.8)};
      outline: none;
    }
  }
  &.warning {
    background-color: ${colors.warning};
    border: 1px solid ${colors.warning};
    &:hover {
      background-color: ${colors.white};
      color: ${colors.warning};
    }
    &:active {
      background-color: ${colors.warning};
      color: ${colors.white};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)};
      outline: none;
    }
  }
  &.danger {
    background-color: ${colors.danger};
    border: 1px solid ${colors.danger};
    color: ${colors.white};
    &:hover {
      background-color: ${colors.white};
      color: ${colors.danger};
    }
    &:active {
      background-color: ${colors.danger};
      color: ${colors.white};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.danger, 0.8)};
      outline: none;
    }
  }
  &.light {
    background-color: transparent;
    border: 1px solid ${colors.white};
    color: ${colors.white};
    &:hover {
      background-color: ${colors.white};
      color: ${colors.warning};
    }
    &:active {
      background-color: ${colors.warning};
      color: ${colors.white};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)};
      outline: none;
    }
  }
  &.outline-primary {
    background-color: ${colors.white};
    border: 1px solid ${colors.primary};
    color: ${colors.primary};
    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
    &:active {
      background-color: ${colors.white};
      color: ${colors.primary};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.primary, 0.8)};
      outline: none;
    }
  }
  &.outline-secondary {
    background-color: ${colors.white};
    border: 1px solid ${colors.secondary};
    color: ${colors.secondary};
    &:hover {
      background-color: ${colors.secondary};
      color: ${colors.white};
    }
    &:active {
      background-color: ${colors.white};
      color: ${colors.secondary};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.secondary, 0.8)};
      outline: none;
    }
  }
  &.outline-warning {
    background-color: ${colors.white};
    border: 1px solid ${colors.warning};
    color: ${colors.warning};
    &:hover {
      background-color: ${colors.warning};
      color: ${colors.white};
    }
    &:active {
      background-color: ${colors.white};
      color: ${colors.warning};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.warning, 0.8)};
      outline: none;
    }
  }
  &.outline-danger {
    background-color: ${colors.white};
    border: 1px solid ${colors.danger};
    color: ${colors.danger};
    &:hover {
      background-color: ${colors.danger};
      color: ${colors.white};
    }
    &:active {
      background-color: ${colors.white};
      color: ${colors.danger};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.danger, 0.8)};
      outline: none;
    }
  }
  &.outline-gray {
    background-color: ${colors.white};
    border: 1px solid ${colors.borderGray};
    color: ${colors.text};
    &:hover {
      background-color: ${colors.borderGray};
      color: ${colors.white};
    }
    &:active {
      background-color: ${colors.white};
      color: ${colors.borderGray};
    }
    &:focus {
      box-shadow: 0 1px 5px 0 ${hexToRGBA(colors.borderGray, 0.8)};
      outline: none;
    }
  }
  &[disabled] {
    color: ${colors.white};
    background-color: ${colors.borderGray};
    border-style: none;
    cursor: no-drop;
    &:hover {
      background-color: ${colors.borderGray};
    }
  }
`
