import React, { useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
import Pagination from '.'

// eslint-disable-next-line import/no-unresolved
import PaginationReadme from './README.md'

const stories = storiesOf('pagination', module).addParameters({
  readme: {
    content: PaginationReadme,
    sidebar: PaginationReadme,
  },
})

stories.add('pagination', () => {
  const [page, setPage] = useState(1)
  return (
    <div className="mb-3">
      <Pagination
        countPage={10}
        pageActive={page}
        setPageActive={(pageActive: number) => setPage(pageActive)}
      />
    </div>
  )
})
