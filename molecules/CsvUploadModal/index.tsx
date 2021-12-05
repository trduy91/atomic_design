/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../themes'
import { Button, Radio } from '../../atoms'
import Alert from '../Alert'
import FileInput from '../FileInput'
import { formatString } from '../../../utils/format'
import { defaultMaxFileSize } from '../../../utils/constants'

type CsvUploadModalModalProps = {
  show?: boolean
  title: string
  mail?: boolean
  onCancel?: () => void
  onSubmit?: (acceptedFiles: File[]) => void
  onDownloadSample?: () => void
  onSubmitAndSendMail?: (acceptedFiles: File[], sendMail: number) => void
}

const CsvUploadModal: React.FC<CsvUploadModalModalProps> = ({
  show = false,
  title,
  mail = false,
  onCancel = () => {
    // do something
  },
  onSubmit = () => {
    // do something
  },
  onDownloadSample = () => {
    // do something
  },
  onSubmitAndSendMail = () => {
    // do something
  },
}) => {
  const { t } = useTranslation(['layout', 'message'])
  const [alert, setAlert] = useState({ show: false, content: '' })
  const [sendMail, setSendMail] = useState(1)
  const { acceptedFiles, open, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    noClick: true,
    maxSize: defaultMaxFileSize,
    onDropRejected: (fileRejected: any) => {
      const errorCode = fileRejected[0]?.errors[0].code
      if (errorCode === 'file-invalid-type') {
        setAlert({
          show: true,
          content: t('message:E011'),
        })
      }
      if (errorCode === 'file-too-large') {
        setAlert({
          show: true,
          content: formatString(
            t('message:E010'),
            fileRejected[0].file?.size,
            defaultMaxFileSize.toString()
          ),
        })
      }
    },
    accept: '.csv',
  })

  return (
    <Modal
      show={show}
      onHide={onCancel}
      backdrop="static"
      autoFocus
      keyboard
      centered
    >
      <Content>
        <Title>{title}</Title>
        <StyledFileInput
          value={acceptedFiles.length > 0 ? (acceptedFiles[0] as any).path : ''}
          placeholder={t('csv.fileBrowser.placeholder')}
          onClickBrowse={open}
          tabIndex={1}
        />
        <FileDropZone {...getRootProps({ className: 'dropzone' })} tabIndex={2}>
          <input {...getInputProps()} />
          <DropZoneDescription>
            {t('csv.fileBrowser.fileDrop')}
          </DropZoneDescription>
        </FileDropZone>
        {mail && (
          <SendMailRadiosWrap>
            <StyledRadio
              id="send-mail-checkbox"
              labelText={t('csv.radioSendMail')}
              checked={sendMail}
              valueRadio={1}
              onChange={() => setSendMail(1)}
              disabled={false}
              tabIndex={3}
            />
            <StyledRadio
              id="no-send-mail-checkbox"
              labelText={t('csv.radioNotSend')}
              checked={sendMail}
              valueRadio={0}
              onChange={() => setSendMail(0)}
              disabled={false}
              tabIndex={4}
            />
          </SendMailRadiosWrap>
        )}
        <NoteTitle>注意：</NoteTitle>
        <ul>
          <NoteItem>
            <SampleDownload onClick={onDownloadSample} tabIndex={5}>
              {t('csv.downloadSample')}
            </SampleDownload>
          </NoteItem>
          <NoteItem>{t('csv.noteFormat')}</NoteItem>
          <NoteItem>{t('csv.noteFileSize')}</NoteItem>
        </ul>
        <Alert
          show={alert.show}
          onDismiss={() => setAlert({ ...alert, show: false })}
          variant="danger"
          text={alert.content}
          dismissible
        />
        <ActionWrap>
          <CloseButton
            variant="outline-gray"
            onClick={() => {
              onCancel()
            }}
            tabIndex={6}
          >
            {t('back')}
          </CloseButton>
          <OkButton
            variant="warning"
            tabIndex={7}
            onClick={() => {
              if (acceptedFiles && acceptedFiles.length > 0) {
                if (!mail) {
                  onSubmit(acceptedFiles)
                } else {
                  onSubmitAndSendMail(acceptedFiles, sendMail)
                }
              } else {
                setAlert({
                  show: true,
                  content: t('csv.message.csvRequired'),
                })
              }
            }}
          >
            {t('csv.importCSVBtn')}
          </OkButton>
        </ActionWrap>
      </Content>
    </Modal>
  )
}

export default CsvUploadModal

const Content = styled.div`
  padding: 40px;
`
const Title = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 24px;
`

const StyledFileInput = styled(FileInput)`
  width: 100%;
`

const FileDropZone = styled.div`
  width: 100%;
  min-height: 200px;
  margin: 10px 0 10px 0;
  border: 1px solid ${colors.borderGray};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`

const DropZoneDescription = styled.div`
  font-size: 14px;
`

const SendMailRadiosWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0 10px 0;
  font-size: 14px;
`

const StyledRadio = styled(Radio)`
  &:not(:first-child) {
    margin-left: 20px;
  }
`

const NoteTitle = styled.div`
  font-size: 14px;
`

const NoteItem = styled.li`
  font-size: 14px;
`

const SampleDownload = styled.span`
  color: ${colors.linkBlue};
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
`

const ActionWrap = styled.div`
  margin-top: 40px;
  justify-content: center;
  display: flex;
`

const CloseButton = styled(Button)`
  min-width: 120px;
  margin-right: 10px;
`
const OkButton = styled(Button)`
  min-width: 120px;
  margin-left: 10px;
`
