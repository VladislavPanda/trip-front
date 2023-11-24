<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Логи приложения</h1>
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
                      <th>Действие</th>
                      <th>Дата и время</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(log, index) in paginatedLogs" :key="index">
                      <td>{{ log.action }}</td>
                      <td>{{ log.localDateTime }}</td>
                    </tr>
                    </tbody>
                  </table>
                  <div style="margin-top: 20px">
                    <button @click="prevPage" :disabled="currentPage === 1">Предыдущая страница</button>
                    <button @click="nextPage" :disabled="currentPage * pageSize >= logs.length">Следующая страница
                    </button>
                  </div>
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
import Paginate from 'vuejs-paginate'

export default {
  data() {
    return {
      logs: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    paginatedLogs() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.logs.slice(start, end);
    }
  },
  mounted() {
    this.fetchLogs();
  },
  methods: {
    fetchLogs() {
      const token = localStorage.getItem('token');

      axios.get('http://localhost:8400/admin/records', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.logs = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.logs.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
    }
  }
}
</script>