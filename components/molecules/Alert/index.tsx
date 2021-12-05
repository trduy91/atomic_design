import React, { useEffect } from 'react'
import styled from 'styled-components'
import { colors, images } from '../../../themes'
import { Icon } from '../../atoms'

export type VariantType = 'primary' | 'warning' | 'danger'

type AlertProps = {
  variant?: VariantType
  show?: boolean
  text: string
  dismissible?: boolean
  onDismiss?: () => void
}

const getIconSrc = (variant: VariantType) => {
  let src = images.icCheckCircle
  switch (variant) {
    case 'primary':
      src = images.icCheckCircle
      break
    case 'warning':
      src = images.icWarning
      break
    case 'danger':
      src = images.icClear
      break
    default:
      break
  }
  return src
}

const Alert: React.FC<AlertProps> = ({
  show = false,
  text,
  variant = 'primary',
  dismissible = false,
  onDismiss = () => {
    // do something
  },
}) => {
  useEffect(() => {
    if (dismissible && show) {
      setTimeout(() => {
        onDismiss()
      }, 10000)
    }
  }, [show])

  if (!show || !text) return null

  return (
    <Container variant={variant}>
      <StyledIcon src={getIconSrc(variant)} width="14" height="14" />
      <Text variant={variant}>{text}</Text>
    </Container>
  )
}

export default Alert

const borderColor = ({ variant }: { variant: VariantType }) => {
  return `2px solid ${colors[variant]}`
}

const Container = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  border: ${borderColor};
`

const StyledIcon = styled(Icon)`
  margin-right: 10px;
`

const Text = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 14px;
  color: ${({ variant }: { variant: VariantType }) => colors[variant]};
`
