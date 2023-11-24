<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Личная информация</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a class="nav-link active" style="margin-right:10px" href="/accountant/updatePersonalInfo">Редактировать личную информацию</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" style="margin-right:10px" href="/accountant/updateBankAccount">Редактировать банковский счёт</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" style="margin-right:10px" href="/accountant/changePassword">Сменить пароль</a>
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
        <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <dl>
                  <dt>Имя: </dt>
                  <dd>{{ name }}</dd>
                  <dt>Фамилия: </dt>
                  <dd>{{ surname }}</dd>
                  <dt>Телефон: </dt>
                  <dd>{{ phone }}</dd>
                  <dt>Должность: </dt>
                  <dd>{{ position }}</dd>
                  <dt>Банковский счёт: </dt>
                  <dd>{{ bankAccount }}</dd>
                </dl>
              </div>
              
              <!-- /.card-body -->
        </div>
      </section>
      <!-- /.content -->
    </div>
  </template>
  
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        name: '',
        surname: '',
        token: '',
        phone: '',
        position: '',
        bankAccount: ''
      };
    },
    methods: {
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    },
    mounted() {
      const storedData = localStorage.getItem('accountResponse')
      const token = localStorage.getItem('token')

      if (storedData) {
        const data = JSON.parse(storedData);

        axios.get('http://localhost:8400/manager/card/' + data['id'], {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response.data)
            this.bankAccount = response.data.bankAccount;
          })
          .catch(error => {
            console.error(error);
          });

        this.name = data.name
        this.surname = data.surname
        this.email = data.email
        this.phone = data.phone
        this.position = data.position
        this.bankAccount = data.bankAccount
      }
    }
  }
</script>