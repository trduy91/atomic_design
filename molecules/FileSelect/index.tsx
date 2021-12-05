import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import IconButton from '../IconButton'
import { colors, images } from '../../../themes'
import { defaultMaxFileSize } from '../../../utils/constants'
import { formatString } from '../../../utils/format'

const getRandomText = () => {
  const { crypto } = window
  const array = new Uint32Array(1)
  return crypto.getRandomValues(array).toString()
}

const FileSelect = (props: any) => {
  const {
    file,
    setFile,
    accept = null,
    error,
    label = null,
    isRequired = false,
    maxFileSize = defaultMaxFileSize,
  } = props
  const [inputKey, setInputKey] = useState(getRandomText())

  const { t } = useTranslation('common')

  const inputRef = useRef<any>()

  const [customError, setCustomError] = useState('')

  const [uploadedFile, setUploadedFile] = useState({
    name: t('noFileChosen'),
    file: null,
  })
  const onChange = (e: any) => {
    const targetFileSize = e.target.files[0].size
    const ext = e.target.files[0].name.match(/\.([^.]+)$/)[1]
    if (targetFileSize > maxFileSize) {
      setCustomError(
        formatString(t('message:E010'), targetFileSize, maxFileSize)
      )
      return
    }
    let limitType = []
    if (accept) {
      limitType = accept?.split(',').map((type: any) => type.replace('.', ''))
    }
    if (limitType.length > 0 && !limitType.includes(ext.toLowerCase())) {
      setCustomError(t('message:E011'))
      return
    }
    setCustomError('')
    setUploadedFile({
      name: e.target.files[0].name,
      file: e.target.files[0],
    })
    setFile(e.target.files[0])
  }
  const handleRemoveFile = () => {
    setUploadedFile({
      name: t('noFileChosen'),
      file: null,
    })
    setFile('')
    setInputKey(getRandomText())
  }
  useEffect(() => {
    if (!file && uploadedFile.file) {
      setUploadedFile({
        name: t('noFileChosen'),
        file: null,
      })
      setInputKey(getRandomText())
    }
  }, [file])

  return (
    <Wrap>
      {label && (
        <StyledLabelContainer>
          <StyledFormLabel>{label}</StyledFormLabel>
          {isRequired && (
            <StyledRequiredLabel>{t('required')}</StyledRequiredLabel>
          )}
        </StyledLabelContainer>
      )}
      <InputField>
        <StyledLabel
          onClick={() => {
            inputRef.current.click()
          }}
        >
          {t('selectFile')}
        </StyledLabel>
        <span>{uploadedFile.name}</span>
        {uploadedFile.file && (
          <IconButton
            isTransparent
            icon={images.icCross}
            onClick={handleRemoveFile}
          />
        )}

        <input
          ref={inputRef}
          placeholder={t('noFileChosen')}
          type="file"
          className="form-control-file"
          key={inputKey}
          id="upload-button"
          onChange={onChange}
          accept={accept}
        />
      </InputField>
      {error && <ErrorText>{error}</ErrorText>}
      {customError && <ErrorText>{customError}</ErrorText>}
    </Wrap>
  )
}

export default FileSelect

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`
const InputField = styled.div`
  display: inline-flex;
  align-items: center;
  padding-bottom: 20px;
  input[type='file'] {
    display: none;
  }
`
const StyledLabel = styled.button`
  padding: 11px 16px;
  background-color: ${colors.bgGray};
  margin-bottom: 0;
  margin-right: 15px;
  cursor: pointer;
  font-weight: bold;
  border: 0;
  color: inherit;
`
const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${colors.danger};
`
const StyledLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`

const StyledFormLabel = styled.span`
  font-size: 14px;
  color: ${colors.text};
`
const StyledRequiredLabel = styled.span`
  font-size: 11px;
  color: ${colors.whiteText};
  background-color: ${colors.danger};
  padding: 0 3px;
  margin-left: 5px;
`
