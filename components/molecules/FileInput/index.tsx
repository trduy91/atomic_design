import React from 'react'
import styled from 'styled-components'
import { Button, Input } from '../../atoms'

type FileInputProps = {
  value: string
  placeholder: string
  tabIndex?: number
  onClickBrowse?: () => void
}

const FileInput: React.FC<FileInputProps> = ({
  value,
  placeholder,
  tabIndex,
  onClickBrowse = () => {
    // do something
  },
}) => {
  return (
    <Wrap>
      <InputWrapper>
        <StyledInput placeholder={placeholder} value={value} disabled />
      </InputWrapper>
      <StyledButton
        variant="outline-gray"
        onClick={onClickBrowse}
        tabIndex={tabIndex}
      >
        Browse
      </StyledButton>
    </Wrap>
  )
}

export default FileInput

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const InputWrapper = styled.div`
  flex: 1;
`

const StyledInput = styled(Input)`
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`
const StyledButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`
