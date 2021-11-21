import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2'

import LoadData from '../../utils/LoadData'

export default function RenderChart(props) {
  const { baseCurrency, toCurrency } = props

  const [api, setApi] = useState()
  const [chartRawData, setChartRawData] = useState()
  const [labels, setLabels] = useState()
  const [data, setData] = useState()
  const [label, setLabel] = useState()

  let chartDisplay = <p>NO</p>

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
      ],
    },
  }

  // let chartRef = React.createRef();

  /**
   * sets api if base and to currencies are not empty
   */
  useEffect(() => {
    if (baseCurrency && toCurrency) {
      const endDate = new Date().toISOString().split('T')[0]
      const startDate = new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0]
      setApi(
        `https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${baseCurrency}&to=${toCurrency}`
      )
    }
  }, [baseCurrency, toCurrency])

  /**
   * contacts endpoint with appropriate API string
   */
  useEffect(() => {
    if (api) {
      LoadData(api, setChartRawData)
    }
  }, [api])

  /**
   * sets global chart data after retrieving
   */
  useEffect(() => {
    if (chartRawData) {
      setLabels(Object.keys(chartRawData.rates))
      // const dates = Object.keys(chartRawData.rates);
      const vals = Object.values(chartRawData.rates).map(
        (rate) => rate[toCurrency]
      )
      // let data = [];
      // for(let i = 0; i < vals.length; i++) {
      //   data.push([dates[i], vals[i]]);
      // }
      setData(vals)
      setLabel(`${baseCurrency}/${toCurrency}`)
    }
  }, [chartRawData])

  /**
   * getData returns canvas dataset to display
   * @param {canvas} canvas
   * @returns
   */
  const getData = (canvas) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 100, 0)
    return {
      backgroundColor: gradient,
      labels,
      datasets: [
        {
          label,
          data,
          borderWidth: 3,
          fill: false,
          borderColor: 'snow white',
        },
      ],
    }
  }

  if (data && labels && label) {
    chartDisplay = <Line data={getData} options={lineChartOptions} />
  }

  console.log(data)
  return <React.Fragment>{chartDisplay}</React.Fragment>
}
