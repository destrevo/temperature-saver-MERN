import React, { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { Idate } from '../Interfaces/Interfaces'

type Props = {
  callback: (value: Idate) => void
}

export default function TimePicker({ callback }: Props): JSX.Element {
  const [value, onChange] = useState<Date>(new Date());
  let choosedDate = value.toLocaleDateString('HU-hu').split('.').map((item) => item.length && parseInt(item)).slice(0, -1)

  useEffect(() => {
    callback({
      year: choosedDate[0],
      month: choosedDate[1],
      day: choosedDate[2]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}
