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
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">Выбрать даты </h3>
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
          <div v-if="showChart" class="col-md-6" style="margin-left: 200px;">
            <div style="width: 600px; height: 450px;">
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
  import { Pie } from 'vue-chartjs'
  import axios from 'axios'
  
  import {Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  ChartJS.register(ArcElement);
  
  export default {
    name: 'PieChart',
    components: { Pie },
    data() {
      return {
        showChart: false,
        startDate: '',
        endDate: '',
        chartData1: {
          labels: [],
          datasets: [ 
            { 
              data: [],
              label: 'Data One',
              backgroundColor: '#458ABF',
            } 
          ]
        },
        chartOptions1: {
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
        const token = localStorage.getItem('token')

        const formData = new FormData();
        formData.append('from', this.startDate)
        formData.append('to', this.endDate)

        axios.post('http://localhost:8400/diagram', formData,
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

          this.showChart = true;
        }).catch(error => {
            console.error(error);
          }
        );
  
        this.showChart = true;
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