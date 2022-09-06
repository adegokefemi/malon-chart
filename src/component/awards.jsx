import React,{useEffect, useState} from 'react';
import axios  from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const chartData = (arr) => {
  const obj = {};
  const a = []
  arr?.map(r => {
    obj[r.year] = obj[r.year] + 1 || 1;
    return obj;
  });
  
  for (let k in obj) {
    a.push({ year: k, count: obj[k], name: k})
  }
  return a
}

function Chart() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://imdb8.p.rapidapi.com/actors/get-awards', {
      params: { nconst: 'nm0001667' },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_KEY
      }
    }).then(u => setData(chartData(u.data.resource.awards)))
    .catch(e => console.log(e))
  }, []);

  return (
    <div className='chart'>
    <BarChart
      width={900}
      height={600}
      data={data}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
    </div>
  );
  
}

export default Chart;