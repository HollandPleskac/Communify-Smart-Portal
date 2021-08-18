import React from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'

// NOTE on sizing : In order for Chart.js to obey the custom size you need to set maintainAspectRatio to false
// set maintainAspectRatio to false

defaults.animation = false

const DoughnutChart: React.FC<{ cutout: string, dataList: number[] }> = (props) => {
  const data = {
    labels: [],
    datasets: [
      {
        // label: '# of Votes',
        data: props.dataList,
        backgroundColor: ['#17A9A8', '#006766'],
        borderColor: ['#17A9A8', '#006766'],
        borderWidth: 1,
        cutout: props.cutout,
      },
    ],
  }

  return (
    <>
      <Doughnut data={data} />
    </>
  )
}

export default DoughnutChart
