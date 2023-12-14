<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Количество денежных средств, потраченных в командировке за период</h1>
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
                  <div>
                    <label for="datepicker">Выберите начальную дату:</label>
                    <input type="date" v-model="startDate" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="datepicker">Выберите конечную дату:</label>
                    <input type="date" v-model="endDate" class="form-control">
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
        <div v-if="showChart" class="col-md-6">
          <h4>Сумма средств, затраченных в командировке: {{ sum }}</h4>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {Pie} from 'vue-chartjs'
import axios from 'axios'

import {Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'PieChart',
  components: {Pie},
  data() {
    return {
      showChart: false,
      startDate: '',
      endDate: '',
      sum: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Data One',
            backgroundColor: ['#458ABF', '#FF5733', '#66CDAA', '#DAA520', '#8A2BE2'],
          }
        ]
      },
      chartOptions: {
        responsive: true
      },
    }
  },
  methods: {
    isEndDateAfterStartDate() {
      return new Date(this.endDate) > new Date(this.startDate);
    },
    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
    },
    submitDatesForm() {
      this.showChart = false;
      if (this.isEndDateAfterStartDate()) {
        const token = localStorage.getItem('token')
        let data = '';
        const formData = new FormData();
        formData.append('from', this.startDate)
        formData.append('to', this.endDate)

        axios.post('http://localhost:8400/diagram', formData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }).then(response =>  {
          data = response.data;
          console.log(response.data)
          console.log(data)
          this.chartData.datasets[0].data = [];
          this.chartData.labels = [];
          this.chartData.labels = Object.keys(response.data);

          for (let key in response.data) {
            this.chartData.datasets[0].data.push(response.data[key]);
            this.sum += response.data[key]
          }
          this.showChart = true;

        }).catch(error => {
        });
        console.log(data)

      } else {
        // Выведите сообщение об ошибке или выполните другие действия, если проверка не пройдена
        alert('Конечная дата должна быть позже начальной даты');
        this.showChart = true;
      }


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