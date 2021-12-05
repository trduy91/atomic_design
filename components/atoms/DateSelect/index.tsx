import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import Validator from 'validator'
import moment from 'moment'
import { colors, images } from '../../../themes'
import Icon from '../Icon'
import Input from '../Input'
import { IconButton } from '../../molecules'
import {
  formatDate,
  formatDateFromDB,
  formatString,
} from '../../../utils/format'
import { validateDate } from '../../../utils/validation'

type DatePickerProp = {
  label?: string
  tabIndex?: number
  value?: any
  disabled?: boolean
  isRequired?: boolean
  onChange?: (value: any) => any
  onKeyDown?: (e: any) => void
  error?: any
  format?: string
  minDate?: any
  setValid?: (valid: boolean) => any
  ref?: any
  id?: any
  hideLabel?: boolean
}

const DateSelect: React.FC<DatePickerProp> = forwardRef(
  (
    {
      id,
      label = '',
      hideLabel = false,
      value = '',
      isRequired = false,
      disabled = false,
      error,
      format = 'yyyy/MM/dd',
      onChange = () => {
        // do something
      },
      onKeyDown,
      setValid = () => {
        // do nothing
      },
      ...props
    },
    ref: any
  ) => {
    const [openCalendar, isOpenCalendar] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [inputError, setInputError] = useState('')
    const { t } = useTranslation(['layout', 'message'])

    useImperativeHandle(ref, () => ({
      validate: () => {
        if (!inputValue) {
          const message = formatString(t('message:E005'), label)
          if (message !== inputError) {
            setInputError(message)
          }
          return false
        }
        const dateArray = inputValue.split('/')
        if (dateArray.length !== 3) {
          if (!validateWithoutSlash(inputValue)) {
            const message = formatString(t('message:E006'), label)
            if (message !== inputError) {
              setInputError(message)
            }
            return false
          }
          return true
        }
        if (!validateWithSlash(dateArray)) {
          const message = formatString(t('message:E006'), label)
          if (message !== inputError) {
            setInputError(message)
          }
          return false
        }
        return true
      },
    }))

    const handleChange = (input: any) => {
      setInputError('')
      setInputValue(input)
    }

    const handleBlur = () => {
      isOpenCalendar(false)
      if (!inputValue) {
        onChange(null)
        setValid(true)
        return
      }
      const dateArray = inputValue.split('/')
      if (dateArray.length !== 3) {
        if (!validateWithoutSlash(inputValue)) {
          setInputError(formatString(t('message:E006'), label || ''))
          setValid(false)
          return
        }
        onChange(formatDateFromDB(inputValue))
        setValid(true)
      } else if (!validateWithSlash(dateArray)) {
        setInputError(formatString(t('message:E006'), label || ''))
        setValid(false)
        return
      }

      onChange(formatDateFromDB(inputValue, 'YYYY/MM/DD'))
      setValid(true)
    }

    const handleSelectDate = (date: any) => {
      if (validateDate(date) === 0) {
        onChange(date)
        setInputError('')
        setInputValue(formatDate(date.toString()))
        setValid(true)
      } else {
        setInputError(formatString(t('message:E006'), label || ''))
        setValid(false)
      }
      isOpenCalendar(false)
    }

    useEffect(() => {
      if (value) {
        setInputValue(formatDate(value.toString()))
      }
    }, [value])

    useEffect(() => {
      setInputError(error)
    }, [error])

    return (
      <StyledDatePickerWrapper>
        <div className="inputWrapper">
          <Input
            className="inputDate"
            label={!hideLabel ? label : ''}
            value={inputValue}
            error={inputError}
            maxLength={10}
            onChange={handleChange}
            isRequired={isRequired}
            onBlur={handleBlur}
            disabled={disabled}
            id={id}
          />
          <div className="buttonGroup">
            {inputValue && !disabled && (
              <IconButton
                className="buttonClear"
                onClick={() => {
                  onChange(null)
                  setInputValue('')
                  setInputError('')
                  setValid(true)
                }}
                icon={images.icCross}
                isTransparent
              />
            )}
            <IconButton
              isTransparent
              className="buttonCalendar"
              onClick={() => {
                if (!disabled) {
                  isOpenCalendar(!openCalendar)
                }
              }}
              icon={images.icCalendar}
              width={20}
              height={26}
            />
          </div>
        </div>
        <DatePicker
          className="hide"
          calendarIcon={<Icon src={images.icCalendar} width="20" height="15" />}
          clearIcon={
            value &&
            !disabled && <Icon src={images.icCross} width="20" height="15" />
          }
          isOpen={openCalendar}
          maxDate={new Date(9999, 12, 31)}
          value={value}
          onChange={(selected: any) => {
            handleSelectDate(selected)
          }}
          defaultValue={new Date()}
          format={format}
          disabled={disabled}
          locale="ja-JP"
          formatDay={(_locale: any, date: any) => {
            return moment(date).format('D')
          }}
          {...props}
        />
      </StyledDatePickerWrapper>
    )
  }
)

// Validate functions
const validateDateYear = (
  item: string,
  length: number,
  min: number = 0,
  max: number = 99999
) => {
  return (
    Validator.isNumeric(item) &&
    item.length === length &&
    Number(item) >= min &&
    Number(item) <= max
  )
}

const validateWithSlash = (dateArray: any) => {
  const year = dateArray[0]
  const month = dateArray[1]
  const day = dateArray[2]
  // moment check
  const mm = moment(`${year}-${month}-${day}`)
  if (!mm.isValid()) {
    return false
  }
  return (
    validateDateYear(year, 4, 1, 9999) &&
    validateDateYear(month, 2, 1, 12) &&
    validateDateYear(day, 2, 1, 31)
  )
}

const validateWithoutSlash = (dateString: string) => {
  if (dateString.length !== 8) {
    return false
  }
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)
  // moment check
  const mm = moment(`${year}-${month}-${day}`)
  if (!mm.isValid()) {
    return false
  }
  return (
    validateDateYear(year, 4, 1, 9999) &&
    validateDateYear(month, 2, 1, 12) &&
    validateDateYear(day, 2, 1, 31)
  )
}

const StyledDatePickerWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
  .inputWrapper {
    width: 100%;
  }
  .inputDate {
    width: 100%;
  }
  .react-date-picker {
    .react-calendar {
      margin-top: 5px;
      border-radius: 5px;
      border-color: ${colors.borderGray};
      abbr[data-original-title],
      abbr[title] {
        text-decoration: none;
      }
    }
  }
  .hide .react-date-picker__wrapper {
    display: none;
  }
  .buttonGroup {
    position: absolute;
    right: 10px;
    top: 35px;
    & > div {
      display: inline-block;
    }
  }
`

export default DateSelect
