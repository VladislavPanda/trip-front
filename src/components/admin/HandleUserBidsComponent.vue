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
                        <tr>
                          <td>Беларусь</td>
                          <td>Минск</td>
                          <td>Epam Systems</td>
                          <td>2022-05-13</td>
                          <td>2022-08-18</td>
                          <td>Заключение договора о поставках</td>
                          <td>Отклонена</td>
                          <td>Проживание: 200, транспорт: 50</td>
                          <td>
                            <button type="button" class="btn btn-success btn-lg">
                              Принять
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-lg btn-danger">
                              Отклонить
                            </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-lg btn-danger">
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
        const token = localStorage.getItem('token')
        //accountResponse = localStorage.getItem('accountResponse')
        axios.get('http://localhost/getUsers.php', { // http://localhost:8400/account/getAllUsers
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
      ban (userId) {
        const token = localStorage.getItem('token')
        //const authResponseDataArr = JSON.parse(authResponseData)
  
        axios.post('http://localhost/ban.php', { // http://localhost:8400/account/status
          id: userId,
          isActive: false
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        },
        )
        .then(response => {
          // Обработка успешного ответа от сервера
          const user = this.users.find(u => u.id === userId)
          if (user) {
            user.isActive = false
          }
        })
        .catch(error => {
          // Обработка ошибок при запросе
          console.error(error);
        });
      },
      unBan (userId) {
        const token = localStorage.getItem('token')
  
        axios.post('http://localhost/unBan.php', { // http://localhost:8400/account/status
          id: userId,
          isActive: true
        },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        )
        .then(response => {
          const user = this.users.find(u => u.id === userId)
          if (user) {
            user.isActive = true
          }
        })
        .catch(error => {
          // Обработка ошибок при запросе
          console.error(error)
        });
      },
      changeRole(userId, currentRole) {
        const token = localStorage.getItem('token')
        axios.put('http://localhost/changeRole.php', { // http://localhost:8400/account/role
          id: userId,
          role: currentRole
        }, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        },
        )
        .then(response => {
          // Обработка успешного ответа от сервера
          const user = this.users.find(u => u.id === userId)
          if (user) {
            user.role = user.role == 'worker' ? 'accountant' : 'worker'
          }
        })
        .catch(error => {
          // Обработка ошибок при запросе
          console.error(error);
        });
      },
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    }
  }
  </script>