<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Редактировать банковский счёт</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
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
        <div class="container-fluid">
          <!-- /.row -->
          <!-- Main row -->
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-4">
              <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title"></h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="submitBankAccount">
              <div class="card-body">
                <div class="form-group">
                  <label for="inputName">Банковский счёт</label>
                  <input type="text" class="form-control" id="inputName" 
                    placeholder="Банковский счёт" v-model="bankAccount" required>
                </div>
              </div>

              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Сохранить</button>
              </div>

            </form>
                <div v-if="result != ''" class="alert alert-success alert-dismissible">
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5><i class="icon fas fa-check"></i> Данные были успешно отредактированы</h5>
                </div>
                <div v-if="error !== ''" class="alert alert-danger">
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5><i class="icon fas fa-check"></i> {{error}}</h5>
                </div>
            </div>
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
    data() {
      return {
        bankAccount: '',
        result: '',
        error: ''
      };
    },
    methods: {
      submitBankAccount () {
          const token = localStorage.getItem('token')
          
          // Создаем объект данных формы
          const formData = new FormData();

          // Добавляем значения полей формы в объект данных
          formData.append('bankAccount', this.bankAccount);
          
          axios.post('http://localhost:8400/account/card', formData,
          {
            headers: {
              //'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })
            .then(response => {
              if (response.data.message) {
                this.error = response.data.message; // Заменяем текущий массив сообщений новым сообщением
                this.result = ''; // Очищаем успешное сообщение
              } else {
                // localStorage.setItem('accountResponse', JSON.stringify(response.data))
                this.result = 'Данные были успешно отредактированы'
                this.error = ''
                this.bankAccount = ''
              }
            })
            .catch(error => {
              if (error.response.status === 400) {
                this.error = error.response.data.message; // Заменяем текущий массив ошибок новым массивом ошибок
                this.result = ''; // Очищаем успешное сообщение
              }
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