import { storiesOf } from '@storybook/react'
import React from 'react'
import { images } from '../../../themes'
import IconButton from './index'
import IconButtonReadme from './README.md'

const stories = storiesOf('IconButton', module).addParameters({
  readme: {
    content: IconButtonReadme,
  },
})

stories.add('Icon Button', () => (
  <div
    style={{
      display: 'flex',
      padding: '24px',
      fontFamily: 'Yu Gothic',
      columnGap: '10px',
    }}
  >
    <IconButton
      icon={images.icMail}
      label="未送信"
      isTransparent
      iconLocation="right"
    />
    <IconButton icon={images.icDuplicate} variant="linkBlue" label="複製" />
    <IconButton icon={images.icPaperclip} isTransparent />
    <IconButton icon={images.icCancel} variant="secondary" label="取消" />
    <IconButton icon={images.icTrash} variant="danger" label="削除" />
    <IconButton icon={images.icEdit} variant="primary" label="編集" />
    <IconButton icon={images.icSetting} variant="warning" label="編集" />
    <IconButton icon={images.icEdit} variant="primary" label="編集" disabled />
  </div>
))

stories.add('Outline Icon Button', () => (
  <div
    style={{
      display: 'flex',
      padding: '24px',
      fontFamily: 'Yu Gothic',
      columnGap: '10px',
    }}
  >
    <IconButton
      icon={images.icCirclePlusGreen}
      variant="outline-primary"
      height={38}
      width={100}
      label="条件追加"
    />
    <IconButton
      icon={images.icCancel}
      variant="outline-secondary"
      height={38}
      width={100}
      label="条件追加"
    />
    <IconButton
      icon={images.icTrash}
      variant="outline-danger"
      height={38}
      width={100}
      label="条件追加"
    />
    <IconButton
      icon={images.icSetting}
      variant="outline-warning"
      height={38}
      width={100}
      label="条件追加"
    />
    <IconButton
      icon={images.icTrash}
      variant="outline-danger"
      height={38}
      width={100}
      disabled
      label="条件追加"
    />
  </div>
))

stories.add('Solid Icon Button', () => (
  <div
    style={{
      display: 'flex',
      padding: '24px',
      fontFamily: 'Yu Gothic',
      columnGap: '10px',
    }}
  >
    <IconButton
      icon={images.icCirclePlusGreen}
      variant="primary"
      height={38}
      width={100}
      isSolid
      label="条件追加"
    />
    <IconButton
      icon={images.icCancel}
      variant="secondary"
      height={38}
      width={100}
      isSolid
      label="条件追加"
    />
    <IconButton
      icon={images.icTrash}
      variant="danger"
      height={38}
      width={100}
      isSolid
      label="条件追加"
    />
    <IconButton
      icon={images.icSetting}
      variant="warning"
      height={38}
      width={100}
      isSolid
      label="条件追加"
    />
    <IconButton
      icon={images.icTrash}
      variant="danger"
      height={38}
      width={100}
      disabled
      isSolid
      label="条件追加"
    />
  </div>
))

stories.add('Footer Icon Button', () => (
  <div
    style={{
      display: 'flex',
      padding: '24px',
      backgroundColor: '#1F2F4E',
      fontFamily: 'Yu Gothic',
      columnGap: '10px',
    }}
  >
    <IconButton
      icon={images.icPlusCircle}
      label="拡大"
      variant="light"
      isTransparent
    />
    <IconButton
      icon={images.icMinusCircle}
      label="縮小"
      variant="light"
      isTransparent
    />
    <IconButton
      icon={images.icRefresh}
      label="回転"
      variant="light"
      isTransparent
    />
    <IconButton
      icon={images.icDownloadWhite}
      label="保存"
      variant="light"
      isTransparent
    />
    <IconButton
      icon={images.icTrashWhite}
      label="削除"
      variant="light"
      isTransparent
    />
    <IconButton
      icon={images.icTrashWhite}
      label="削除"
      variant="light"
      isTransparent
      disabled
    />
  </div>
))
