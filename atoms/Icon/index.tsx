import React from 'react'

type IconProps = {
  width: string
  height: string
  src: string
}

const Icon: React.FC<IconProps> = ({ width, height, src, ...props }) => (
  <img {...props} src={src} alt="icon" width={width} height={height} />
)

export default Icon
