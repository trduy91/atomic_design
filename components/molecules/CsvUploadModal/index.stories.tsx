import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import CsvUploadModal from './index'
import CsvUploadModalReadme from './README.md'

const stories = storiesOf('CsvUploadModal', module).addParameters({
  readme: {
    content: CsvUploadModalReadme,
  },
})

stories.add('CsvUploadModal', () => {
  const [show, setShow] = useState(false)

  return (
    <div style={{ padding: '24px' }}>
      <button type="submit" onClick={() => setShow(true)}>
        Show modal
      </button>
      <CsvUploadModal
        show={show}
        title="CSV取込"
        onCancel={() => setShow(false)}
        onSubmit={() => setShow(false)}
      />
    </div>
  )
})
