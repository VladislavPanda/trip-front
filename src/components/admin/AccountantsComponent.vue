<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Список бухгалтеров</h1>
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
                          <th>Имя</th>
                          <th>Фамилия</th>
                          <th>Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="user in users" :key="user.id">
                          <td v-if="user.role === 'MANAGER'">{{ user.name }}</td>
                          <td v-if="user.role === 'MANAGER'">{{ user.surname }}</td>
                          <td v-if="user.role === 'MANAGER'">{{ user.email }}</td>
                          <td v-if="user.role === 'MANAGER'">
                            <button type="button" 
                              class="btn btn-lg btn-primary" 
                              :id="'change-role-button-' + user.id" 
                              @click="getTakenBids(user.id)">
                              <span>Взятые заявки</span>
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
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        users: []
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        const authResponseData = localStorage.getItem('authResponseData')
        const token = localStorage.getItem('token')
  
        axios.get('http://localhost:8400/account/getAllUsers', {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getTakenBids (userId) {

      },
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    }
  }
  </script>