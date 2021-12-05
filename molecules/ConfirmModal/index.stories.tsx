import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import ConfirmModal from './index'
import ConfirmModalReadme from './README.md'

const stories = storiesOf('ConfirmModal', module).addParameters({
  readme: {
    content: ConfirmModalReadme,
    sidebar: ConfirmModalReadme,
  },
})

stories.add('ConfirmEditModal', () => {
  const [show, setShow] = useState(false)
  return (
    <div style={{ padding: '24px' }}>
      <button type="submit" onClick={() => setShow(true)}>
        Show modal
      </button>
      <ConfirmModal
        show={show}
        title="選択した申請を下書き保存します。"
        message="よろしいですか？"
        okText="下書き保存する"
        onClose={() => setShow(false)}
        onOk={() => setShow(false)}
      />
    </div>
  )
})

stories.add('ConfirmDeleteModal', () => {
  const [show, setShow] = useState(false)
  return (
    <div style={{ padding: '24px' }}>
      <button type="submit" onClick={() => setShow(true)}>
        Show modal
      </button>
      <ConfirmModal
        show={show}
        title="選択した申請を下書き保存します。"
        message="よろしいですか？"
        note="※「利用中」の従業員が含む場合、該当な従業員がパスワードをリセットする必要です。"
        noteBlack="※「利用中」の従業員が含む場合、該当な従業員がパスワードをリセットする必要です。"
        okText="削除する"
        okVariant="danger"
        onClose={() => setShow(false)}
        onOk={() => setShow(false)}
      />
    </div>
  )
})
