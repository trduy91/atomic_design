import React from 'react'
import { storiesOf } from '@storybook/react'
import SortCaretReadme from './README.md'
import SortCaret from './index'

const stories = storiesOf('SortCaret', module).addParameters({
  readme: {
    content: SortCaretReadme,
  },
})

stories.add('SortCaret', () => {
  const title = 'Header Text'
  return (
    <span>
      <SortCaret
        dataField={['yakushokuCode']}
        searchParam={{}}
        setSearchParam={() => {
          // do something
        }}
        onSearch={() => {
          // do something
        }}
      >
        {title}
      </SortCaret>
    </span>
  )
})
