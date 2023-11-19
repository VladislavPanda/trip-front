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

      axios.post('http://localhost:8400/account/status', {
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
      const authResponseData = localStorage.getItem('authResponseData')
      const token = localStorage.getItem('token')
      const authResponseDataArr = JSON.parse(authResponseData)

      axios.post('http://localhost:8400/account/status', {
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
          user.role = user.role == 'WORKER' ? 'MANAGER' : 'WORKER'
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