<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Первая диаграмма</h1>
          </div><!-- /.col -->
          <ul class="nav nav-pills ml-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
            </li>
          </ul>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Выбрать месяц командировки</h3>
            </div>
            <form @submit.prevent="submitMonthsForm">
              <div class="card-body">
                <select class="form-control" v-model="month">
                  <option value="JANUARY">Январь</option>
                  <option value="FEBRUARY">Февраль</option>
                  <option value="MARCH">Март</option>
                  <option value="APRIL">Апрель</option>
                  <option value="MAY">Май</option>
                  <option value="JUNE">Июнь</option>
                  <option value="JULY">Июль</option>
                  <option value="AUGUST">Август</option>
                  <option value="SEPTEMBER">Сентябрь</option>
                  <option value="OCTOBER">Октябрь</option>
                  <option value="NOVEMBER">Ноябрь</option>
                  <option value="DECEMBER">Декабрь</option>
                </select>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сгенерировать диаграмму</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="row">
        <div v-if="showChart1" class="col-md-6" style="margin-left: 200px; margin-bottom: 70px;">
          <Bar
              id="my-chart-id"
              :options="chartOptions"
              :data="chartData"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import axios from 'axios'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {Bar},
  data() {
    return {
      showChart1: false,
      showChart2: false,
      month: 'JANUARY',
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Количество дней проведенных в командировке сотрудником за выбранный месяц',
            backgroundColor: '#458ABF',
          }
        ]
      },
      chartOptions: {
        responsive: true
      },
      reservationMonths: []
    }
  },
  methods: {
    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
    },
    submitMonthsForm() {
      this.showChart1 = false;
      const token = localStorage.getItem('token')

      axios.post('http://localhost:8400/diagram/' + this.month,
          {
            headers: {
              //'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then(response => {
        this.chartData.datasets[0].data = [];
        this.chartData.labels = [];
        this.chartData.labels = Object.keys(response.data);

        for (let key in response.data) {
          this.chartData.datasets[0].data.push(response.data[key]);
        }

        this.showChart1 = true;
      }).catch(error => {console.error(error);});
    }
  },
}
</script>

<style>
#my-chart-id1 {
  width: 500px;
  height: 200px;
}
</style>