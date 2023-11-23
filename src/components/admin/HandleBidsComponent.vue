<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Управление заявками</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a class="nav-link active" style="margin-right:10px" href="/admin/changePassword">Генерация документа</a>
              </li>
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
                            <span v-else-if="request.status === 'DECLINED'">Отклонена</span>
                            <span v-else-if="request.status === 'CLOSED'">Закрыта</span>
                            <span v-else>Создана</span>
                          </td>
                          <td>
                            <button @click="toggleAdditionalInfo(request.id)">
                              <i :class="showAdditionalInfo[request.id] ? 'fa fa-chevron-down' : 'fa fa-chevron-right'"></i>
                            </button>
                          </td>
                          <td :rowspan="showAdditionalInfo[request.id] ? 1 : 2">
                            <div v-if="showAdditionalInfo[request.id]">
                              Проживание: 200, транспорт: 50
                            </div>
                          </td>
                          <td>
                            <button type="button" class="btn btn-success btn-lg"
                              @click="accept(request.id)">
                              Принять
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-lg btn-danger"
                              @click="reject(request.id)">
                              Отклонить
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-lg btn-primary"
                              @click="close(request.id)">
                              Закрыть
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
                <!-- /.card-body -->
            </section>
            <!-- /.Left col -->
          </div>
          <!-- /.row (main row) -->
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>
  </template>

<style>
.arrow-button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
  
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        requests: [],
        showAdditionalInfo: {}
      };
    },
    mounted() {
      this.fetchRequests();
    },
    methods: {
      fetchRequests() {
        const token = localStorage.getItem('token')
   
        axios.get('http://localhost:8400/trip', {
          headers: {
              //'Accept': 'application/json',
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
      toggleAdditionalInfo(requestId) {
        // При клике на стрелку, переключаем значение флага для конкретной заявки
        if (this.showAdditionalInfo[requestId]) {
          this.showAdditionalInfo[requestId] = false;
        } else {
          this.showAdditionalInfo[requestId] = true;
        }
      },
      accept(requestId) {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8400/trip/' + requestId, {
            status: 'Принята',
            description: 'Ваша заявка была принята'
          }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
          }).then(() => {
            // Обновить страницу
            window.location.reload();
          }).catch(error => {
            // Обработка ошибок
            console.error(error);
          }
        );
      },
      reject(requestId) {
        const token = localStorage.getItem('token')

        axios.post('http://localhost:8400/trip/' + requestId, {
          status: 'Отклонена',
          description: 'Простите, но в данный момент мы не можем предоставить денежные средства для осуществления командировки'
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(() => {
            // Обновить страницу
            window.location.reload();
          }).catch(error => {
            // Обработка ошибок
            console.error(error);
          }
        )
      }, 
      close(requestId) {
        const token = localStorage.getItem('token')
        
        axios.post('http://localhost:8400/trip/' + requestId, {
          status: 'Закрыта',
          description: 'Заявка на командировку была закрыта'
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then(() => {
            // Обновить страницу
            window.location.reload();
          }).catch(error => {
            // Обработка ошибок
            console.error(error);
          }
        )
      },
      logout() {
        localStorage.clear(); // Очищаем localStorage

        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    }
  }
  </script>