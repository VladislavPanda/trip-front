<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Сменить пароль</h1>
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
            <div class="col-md-4">

            </div>
            <div class="col-md-4">
              <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title"></h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="submitForm">
                <div class="card-body">
                  <div class="form-group">
                    <label for="oldPassword">Старый пароль</label>
                    <input type="password" class="form-control" id="oldPassword" 
                      placeholder="Введите старый пароль" v-model="oldPassword" required>
                  </div>
                  <div class="form-group">
                    <label for="newPassword">Новый пароль</label>
                    <input type="password" class="form-control" id="newPassword" 
                      placeholder="Введите новый пароль" v-model="newPassword" required>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>
            </div>
            <div v-if="success != ''" class="alert alert-success alert-dismissible">
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5><i class="icon fas fa-check"></i> Пароль был успешно изменён</h5>
            </div>
            <!-- Блок ошибок -->    
            <div class="alert alert-danger" v-if="error !== ''">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <!-- Блок ошибок -->
                <span>{{ error }}</span>
            </div>
            </div>
            <div class="col-md-4">

            </div>
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
    data () {
      return {
        oldPassword: '',
        newPassword: '',
        success: '',
        error: ''
      }
    },
    methods: {
      submitForm () {
        const formData = new FormData();
        formData.append('oldPassword', this.oldPassword);
        formData.append('newPassword', this.newPassword);

        const token = localStorage.getItem('token')
        // Отправь данные формы на сервер с помощью AJAX запроса
        axios.put('http://localhost:8400/account/changePassword', formData, 
        {
          headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            if (response.data.message) {
              this.error = ''; // Заменяем текущий массив сообщений новым сообщением
              this.success = ''; // Очищаем успешное сообщение
            } else {
              this.success = 'Пароль был успешно изменён';
              this.error = ''; // Очищаем массив ошибок, так как операция прошла успешно
            }
          }
        )
          .catch(error => {
            if (error.response.status === 400) {
              this.error = error.response.data.message; // Заменяем текущий массив ошибок новым массивом ошибок
              this.success = ''; // Очищаем успешное сообщение
            }
          })
      },

      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    }
  }
</script>