import React from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'

// NOTE on sizing : In order for Chart.js to obey the custom size you need to set maintainAspectRatio to false
// set maintainAspectRatio to false

defaults.animation = false

const data = {
  labels: [],
  datasets: [
    {
      // label: '# of Votes',
      data: [12, 19],
      backgroundColor: ['#17A9A8', '#006766'],
      borderColor: ['#17A9A8', '#006766'],
      borderWidth: 1,
      cutout: '76%',
    },
  ],
}

const DoughnutChart = () => <Doughnut data={data} />

export default DoughnutChart
