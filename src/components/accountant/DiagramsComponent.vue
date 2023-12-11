<template>
  <div class="container">
    <div class="col-md-3">

    </div>
    <div class="col-md-8" style="margin-top: 200px; margin-left: 200px;">
      <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ 
          { 
            data: [40, 20, 12],
            label: 'Data One',
            backgroundColor: '#458ABF',
          } 
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>

<style>
  .chart-container {
    width: 800px; 
    height: 600px; 
  }
</style>