<template>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Вторая диаграмма</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
              </li>
            </ul>
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
    
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Выбрать месяц командировки</h3>
            </div>
            <form @submit.prevent="submitDatesForm">
                  <div class="card-body">
                    <div class="form-group">
                        <label>Стартовая дата:</label>
                        <div class="input-group date" id="reservationdate">
                            <input type="text" v-model="startDate" class="form-control" >
                            <div class="input-group-append">
                                <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                            </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label>Конечная дата:</label>
                        <div class="input-group date" id="reservationdate">
                            <input type="text" v-model="endDate"  class="form-control" >
                            <div class="input-group-append">
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
        <div v-if="showChart" class="col-md-6">
          <Pie
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
  import { Pie } from 'vue-chartjs'
  import axios from 'axios'
  
  import {Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'PieChart',
    components: { Pie },
    data() {
      return {
        showChart: false,
        startDate: '',
        endDate: '',
        chartData: {
          labels: [],
          datasets: [ 
            { 
              data: [],
              label: 'Data One',
              backgroundColor: '#458ABF',
            } 
          ]
        },
        chartOptions: {
          responsive: true
        },
      }
    },
    methods: {
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      },
      submitDatesForm() {
        this.showChart = false;

        /*const data1 = {"value": 123, "value1": 456}
          this.chartData.datasets[0].data = [];
          this.chartData.labels = [];
          this.chartData.labels = Object.keys(data1);

          for (let key in data1) {
            this.chartData.datasets[0].data.push(data1[key]);
          }

          this.showChart = true;*/
        const token = localStorage.getItem('token')

        const formData = new FormData();
        formData.append('from', this.startDate)
        formData.append('to', this.endDate)

        axios.post('http://localhost:8400/diagram', formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(response => {
          
        }).catch(error => {
          }
        );
  
        this.showChart = true;
      }
    },
  }
  </script>
  
  <style>
    /*#my-chart-id1 {
      width: 500px; 
      height: 200px; 
    }*/
  </style>