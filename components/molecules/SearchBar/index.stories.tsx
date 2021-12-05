import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import SearchBar from './index'
import SearchBarReadme from './README.md'

const stories = storiesOf('SearchBar', module).addParameters({
  readme: {
    content: SearchBarReadme,
  },
})

stories.add('SearchBar', () => {
  const [jugyoinBango, setJugyoinBango] = useState('')
  const [name, setName] = useState('')
  const [busho, setBusho] = useState('')
  const [yakushoku, setYakushoku] = useState('')
  const [kengen, setKengen] = useState('')
  const [status, setStatus] = useState('')
  const [range, setRange] = useState({
    fromValue: 0,
    toValue: 9999,
  })
  const items = [
    {
      label: '従業員番号',
      type: 'input',
      value: jugyoinBango,
      onChange: (e: any) => setJugyoinBango(e.target.value),
    },
    {
      label: '氏名',
      type: 'input',
      value: name,
      onChange: (e: any) => setName(e.target.value),
    },
    {
      label: '部署名',
      type: 'select',
      options: [
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'salted-caramel', label: 'Salted Caramel' },
      ],
      value: busho,
      onChange: (value: any) => setBusho(value),
    },
    {
      label: '役職',
      type: 'select',
      options: [
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'salted-caramel', label: 'Salted Caramel' },
      ],
      value: yakushoku,
      onChange: (value: any) => setYakushoku(value),
    },
    {
      label: '利用権限',
      type: 'select',
      options: [
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'salted-caramel', label: 'Salted Caramel' },
      ],
      value: kengen,
      onChange: (value: any) => setKengen(value),
    },
    {
      label: '利用招待状況',
      type: 'select',
      options: [
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'salted-caramel', label: 'Salted Caramel' },
      ],
      value: status,
      onChange: (value: any) => setStatus(value),
    },
    {
      label: '金額',
      type: 'range',
      fromValue: range.fromValue,
      toValue: range.toValue,
      min: 0,
      max: 9999,
      maxLength: 4,
      onChangeFrom: (value: any) => setRange({ ...range, fromValue: value }),
      onChangeTo: (value: any) => setRange({ ...range, toValue: value }),
      onChange: () => {
        // do nothing
      },
    },
  ]

  return (
    <div style={{ backgroundColor: '#f2f2f2', padding: '8px' }}>
      <SearchBar
        title="検索条件"
        items={items}
        onClickSearch={() => {
          // do something
        }}
      />
    </div>
  )
})
