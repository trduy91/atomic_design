# Select :

Application Select.

```js
import SelectBox from 'components/Atoms/Select/Select'
```

<!-- Brief summary of what the component is, and what it's for. -->

<!-- STORY -->

#### Story Source

<!-- SOURCE -->

<!-- STORY HIDE START -->

The content here won't be shown in stories.

<!-- STORY HIDE END -->

#### Select Sample

```js
import SelectBox from 'components/Atoms/Select/Select'

type ValueSelect = {
  value: string,
  label: string,
}
const [valueSelect, setValueSelect] = useState<ValueSelect>()
render() {
  return (
    <SelectBox
      isMulti={false}
      isClearable={false}
      isSearchable={false}
      defaultValue={null}
      isDisabled={false}
      options={flavourOptions}
      name={'select-default'}
      onChange={(value: any) => setValueSelect(value)}
    />
  )}
}
```

#### Select types
- isMulti: Change to multi Select
- isClearable: show button clear
- isSearchable: can search on select
- defaultValue: set default value
- isDisabled: disable chosen select
- options: list data (array object)
- name: define name to select
- placeholder: set placeholder to select
- onChange: function change
