<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Одобренные командировки</h1>
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
                      <td>{{ request.status }}</td>
                      <td>Проживание: 200, транспорт: 50</td>
                      <td>
                        <button type="button" class="btn btn-success btn-lg"
                                @click="take(request.id)">
                          Взять в обработку
                        </button>
                      </td>
                    </tr>
                    <button  @click="getFile()">Download file</button>

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

<script>
import axios from 'axios'

export default {

  data() {
    return {
      requests: [],
      file: ''
    };
  },
  mounted() {
    this.fetchRequests();
    this.getFile();
  },
  methods: {
    fetchRequests() {
      const token = localStorage.getItem('token')

      axios.get('http://localhost:8400/manager/accepted-requests', {
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
    take(requestId) {
      const token = localStorage.getItem('token')

      axios.put(
            'http://localhost:8400/manager/take-requests/' + requestId,
            null,
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
            .then(response => {
              this.requests = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      // this.$router.push({path: '/accountant/request/item/' + requestId});
    },
    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
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