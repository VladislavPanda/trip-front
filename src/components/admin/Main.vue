<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Управление пользователями</h1>
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
                        <th>Роль</th>
                        <th>Email</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.surname }}</td>
                        <td>
                          <span v-if="user.role === 'admin'">Руководитель</span>
                          <span v-else-if="user.role === 'worker'">Сотрудник</span>
                          <span v-else-if="user.role === 'manager'">Бухгалтер</span>
                          <span v-else>{{ user.role }}</span>
                        </td>
                        <td>{{ user.email }}</td>
                        <td>
                          <button v-if="user.active == false" type="button"
                            class="btn btn-success btn-lg" 
                            :id="'unBan-button-' + user.id" @click="unBan(user.id)">Разбан
                          </button>
                          <button v-if="user.active == true" type="button"
                            class="btn btn-lg btn-danger" 
                            :id="'ban-button-' + user.id" @click="ban(user.id)">Бан
                          </button>
                        </td>
                        <td>
                          <button type="button" 
                            class="btn btn-lg btn-primary" 
                            :id="'change-role-button-' + user.id" 
                            @click="changeRole(user.id, user.role)">
                            <span v-if="user.role === 'worker'">Сменить роль (на бухгалтера)</span>
                            <span v-if="user.role === 'accountant'">Сменить роль (на сотрудника)</span>
                          </button>
                        </td>
                        <td>
                          <button type="button" 
                            class="btn btn-lg btn-primary" 
                            :id="'change-role-button-' + user.id" 
                            @click="bids(user.id)">
                            <span>Список заявок</span>
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
    ban (userId) {
      const authResponseData = localStorage.getItem('authResponseData')
      const token = localStorage.getItem('token')
      const authResponseDataArr = JSON.parse(authResponseData)

      axios.put('http://localhost:8400/account/status', {
        id: userId,
        active: false
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
          user.active = false
        }
      })
      .catch(error => {
        // Обработка ошибок при запросе
        console.error(error);
      });
    },
    unBan (userId) {
      const authResponseData = localStorage.getItem('authResponseData')
      const token = localStorage.getItem('token')
      const authResponseDataArr = JSON.parse(authResponseData)

      axios.put('http://localhost:8400/account/status', {
        id: userId,
        active: true
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
          user.active = true
        }
      })
      .catch(error => {
        // Обработка ошибок при запросе
        console.error(error)
      });
    },
    changeRole(userId, currentRole) {
      const token = localStorage.getItem('token')

      axios.put('http://localhost:8400/account/role', {
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