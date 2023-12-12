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
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Выбрать месяц командировки</h3>
              </div>
              <form @submit.prevent="submitMonthsForm">
                <div class="card-body">
                  <select class="form-control">
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
          <div class="col-md-6">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Выбрать даты </h3>
              </div>
              <form @submit.prevent="submitDatesForm">
                <div class="card-body">
                  <div class="form-group">
                      <label>Стартовая дата:</label>
                      <div class="input-group date" id="reservationdate" data-target-input="nearest">
                          <input type="text" v-model="date"  class="form-control datetimepicker-input" data-target="#reservationdate">
                          <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Конечная дата:</label>
                      <div class="input-group date" id="reservationdate" data-target-input="nearest">
                          <input type="text" v-model="date"  class="form-control datetimepicker-input" data-target="#reservationdate">
                          <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                      </div>
                    </div>
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
        <div v-if="showChart2" class="col-md-6" style="margin-left: 200px;">
          <div >
            <Pie
              id="my-chart-id1"
              :options="chartOptions1"
              :data="chartData1"
            />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import axios from 'axios'

import {ArcElement, Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ArcElement);

export default {
  name: 'BarChart',
  components: { Bar, Pie },
  data() {
    return {
      showChart1: false,
      showChart2: false,
      chartData: {
        labels: [],
        datasets: [ 
          { 
            data: [],
            label: 'Количество командировок за выбранный месяц',
            backgroundColor: '#458ABF',
          } 
        ]
      },
      chartData1: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ 
          { 
            data: [15, 5, 10],
            label: 'Data One',
            backgroundColor: '#458ABF',
          } 
        ]
      },
      chartOptions: {
        responsive: true
      },
      chartOptions1: {
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
      let obj = {
        "ключ1": 10,
        "ключ2": 20,
        "ключ3": 30
      };

      this.chartData.datasets[0].data = [];
      this.chartData.labels = Object.keys(obj);

      for (let key in obj) {
        this.chartData.datasets[0].data.push(obj[key]);
      }

      this.showChart1 = true;
    },
    submitDatesForm() {

      this.showChart2 = true;
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