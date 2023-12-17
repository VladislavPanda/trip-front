<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Взятые заявки</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
              </li>
            </ul>
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
  
      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <!-- /.row -->
          <!-- Main row -->
          <div class="row">
            <!-- Left col -->
            <section class="col-lg-12 connectedSortable">
              <!-- /.card-header -->
              <div class="card">
                <div class="card-header">
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                      <thead>
                      <tr>
                        <th>Страна</th>
                        <th>Город</th>
                        <th>Организация</th>
                        <th>Начальная дата</th>
                        <th>Конечная дата</th>
                        <th>Цель</th>
                        <th>Статус</th>
                        <th>Затраты</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="request in requests" :key="request.id">
                        <td>{{ request.country }}</td>
                        <td>{{ request.city }}</td>
                        <td>{{ request.organization }}</td>
                        <td>{{ request.startDate }}</td>
                        <td>{{ request.endDate }}</td>
                        <td>{{ request.goal }}</td>
                        <td>
                          <span v-if="request.status === 'ACCEPTED'">Принята</span>
                          <span v-else-if="request.status === 'REJECTED'">Отклонена</span>
                          <span v-else-if="request.status === 'CLOSED'">Закрыта</span>
                          <span v-else>Создана</span>
                        </td>
                        <tr>
                          <td :colspan="2">
                            <div>
                                <span @click="showAdditionalInfo[request.id] = !showAdditionalInfo[request.id]">
                                  <i :class="showAdditionalInfo[request.id] ? 'fa fa-chevron-down' : 'fa fa-chevron-right'"></i>
                                </span>
                            </div>
                            <div v-show="showAdditionalInfo[request.id]"
                                 v-for="expenseList in request.expensesList">
                              <span>{{ expenseList.name }}: {{ expenseList.price }}</span><br>
                            </div>
                          </td>
                        </tr>
                        <td>
                          <button type="button" class="btn btn-success btn-lg"
                                  @click="take(request.id)">
                            Подробнее
                          </button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
  
    data() {
      return {
        requests: [],
        file: '',
        showAdditionalInfo: {}
      };
    },
    mounted() {
      this.fetchRequests();
      // this.getFile();
    },
    methods: {
      toggleAdditionalInfo(requestId) {
        // При клике на стрелку, переключаем значение флага для конкретной заявки
        if (this.showAdditionalInfo[requestId]) {
          this.showAdditionalInfo[requestId] = false;
        } else {
          this.showAdditionalInfo[requestId] = true;
        }
      },
      fetchRequests() {
        const token = localStorage.getItem('token')
        const storedData = JSON.parse(localStorage.getItem('accountResponse'))
          axios.get('http://localhost:8400/manager/trips/' + storedData["id"], {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
            .then(response => {
              this.requests = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      },
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      },
      take(requestId) {
        this.$router.push({path: '/accountant/request/item/' + requestId});
      },
      //TODO:
      getFile() {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8400/file', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
            .then(response => {
              const blob = new Blob([response.data], {type: 'application/html'})
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = "filename.html"
              link.click()
              URL.revokeObjectURL(link.href)
            })
            .catch(error => {
              console.error(error);
            });
      }
    }
  }
  </script>