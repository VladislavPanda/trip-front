<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Диаграммы</h1>
          </div><!-- /.col -->
          <ul class="nav nav-pills ml-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
            </li>
          </ul>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
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
  },
  methods: {
    logout() {
        localStorage.clear(); // Очищаем localStorage

        // Делаем редирект на определенный маршрут
        this.$router.push('/');
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