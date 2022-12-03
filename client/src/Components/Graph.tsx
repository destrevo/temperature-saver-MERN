import React, { useContext } from 'react'
import { DataContext } from '../Context/Context'
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

export default function Graph(): JSX.Element {
  const { data, dateToShow } = useContext(DataContext)
  const navigate = useNavigate();
  
  const filteredData = data.filter((item) => item.year === dateToShow.year && item.month === dateToShow.month)
  let dataToShow = filteredData.map((item) => {
    return {
      name: `${item.month}-${item.day}`,
      celsius: item.key
    }
  })


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <LineChart
          width={800}
          height={500}
          data={dataToShow}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="celsius" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>

      </div>
      <div style={{display:'flex',justifyContent:'center', marginTop:'50px'}}>
      <button onClick={() => {
        navigate('/customize')
      }} >Go to Customize</button>
      </div>
    </>

  )
}
