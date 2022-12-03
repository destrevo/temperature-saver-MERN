import React, { useContext } from 'react'
import { Idate } from '../Interfaces/Interfaces'
import { DataContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type Props = {
    currentDate: Idate
}

export default function DataCreator({ currentDate }: Props): JSX.Element {
    const navigate = useNavigate();
    const { data, setData, setDateToShow } = useContext(DataContext)
    const [selectedTemperaure, setSelectedTemperature] = React.useState<number>(0)
    const temperatures: number[] = Array.from({ length: 161 }, (_, i) => i - 80)
    const userCredentials = !!sessionStorage.getItem("user") && JSON.parse(sessionStorage.getItem("user") as string)
    const [pending, setPending] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>("")

    const updateData = async () => {
        setPending(true)
        axios.post('http://localhost:5000/update', {
            data: data,
        }, {
            headers: { Authorization: `Bearer ${userCredentials?.token}` }
        }).then((res) => {
            localStorage.setItem('data', JSON.stringify(data))
            setTimeout(() => {
                setPending(false)
            }, 1500);
        }
        ).catch((err) => {
            setPending(false)
            setError("Something went wrong")
            console.log(err)
        })
    }


    return (
        <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
            <h2>{`year:${currentDate.year} month:${currentDate.month} day: ${currentDate.day}`}</h2>
            <span className='line' />
            <select
                onChange={(e) => {
                    setSelectedTemperature(parseInt(e.target.value))
                }}
                defaultValue={temperatures[temperatures.findIndex((item) => item === 0)]}
            >
                {temperatures.map((item, index) => {
                    return <option key={index} value={item}>{item} °C</option>
                })}
            </select>

            <button onClick={() => {
                const exist = data.find((item) => item.year === currentDate.year && item.month === currentDate.month && item.day === currentDate.day)
                !!exist ?
                    setData(data.map((item) => {
                        if (item.year === currentDate.year && item.month === currentDate.month && item.day === currentDate.day) {
                            return {
                                ...item,
                                key: selectedTemperaure
                            }
                        }
                        return item
                    })) : setData([...data, {
                        year: currentDate.year,
                        month: currentDate.month,
                        day: currentDate.day,
                        key: selectedTemperaure
                    }].sort((a, b) => {
                        return a.year - b.year || a.month - b.month || a.day - b.day
                    }))
            }}>Add</button>

            <span className='line' />
            <div >
                {data.map((item, index) => {
                    const { year, month } = item
                    if (year === currentDate.year && month === currentDate.month) {
                        return <div
                            className='show_datas'
                            key={index}>
                            {`year:${item.year} month:${item.month} day: ${item.day} °C: ${item.key}`}
                            <button
                                onClick={() => {
                                    setData(data.filter((_, i) => i !== index))
                                }}
                            >Delete</button>
                        </div>
                    }else{
                        return null
                    }
                })}
            </div>
            <span className='line' />
            {pending ? <div className='pending'>Pending...</div> : null}
            {error ? <div className='error'>{error}</div> : null}
            <button
                onClick={() => {
                    updateData()
                }}
            >
                SAVE
            </button>
            <span className='line' />
            <button
                style={{ marginBottom: '20px' }}
                onClick={() => {
                    setDateToShow({
                        year: currentDate.year,
                        month: currentDate.month
                    })
                    navigate('/graph')
                }}>
                {`Check ${currentDate.year} month ${currentDate.month} in the graph`}
            </button>

        </div>

    )
}
