<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Зарегистрировать пользователя</h1>
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
                    <label for="inputName">Имя</label>
                    <input type="text" class="form-control" id="inputName"
                      placeholder="Введите имя" v-model="name" required>
                  </div>
                  <div class="form-group">
                    <label for="inputSurname">Фамилия</label>
                    <input type="text" class="form-control" id="inputSurname" 
                      placeholder="Введите фамилию" v-model="surname" required>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" 
                      placeholder="Введите Email" v-model="email" required>
                  </div>
                  <div class="form-group">
                    <label for="inputPhone">Телефон</label>
                    <input type="phone" class="form-control" id="inputPhone"
                      placeholder="Введите телефон" v-model="phone" required>
                  </div>
                  <div class="form-group">
                    <label for="inputPosition">Должность</label>
                    <input type="phone" class="form-control" id="inputPosition"
                      placeholder="Введите должность" v-model="position" required>
                  </div>
                  <div class="form-group">
                    <label for="exampleSelectRounded0">Роль</label>
                    <select class="custom-select rounded-0" id="inputRole" v-model="role">
                        <option value="Сотрудник">Сотрудник</option>
                        <option value="Бухгалтер">Бухгалтер</option>
                    </select>
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
                  <h5><i class="icon fas fa-check"></i> Пользователь был успешно зарегистрирован</h5>
            </div>
            <!-- Блок ошибок -->    
            <div v-if="errors.length > 0" class="alert alert-danger">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
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
    data() {
      return {
        name: '',
        surname: '',
        email: '',
        phone: '',
        role: 'Сотрудник',
        success: '',
        errors: []
      };
    },
    methods: {
      submitForm() {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('surname', this.surname)
        formData.append('email', this.email)
        formData.append('phone', this.phone)
        formData.append('position', this.position)  

        let role = this.role == 'Сотрудник' ? 'worker' : 'accountant'
        const token = localStorage.getItem('token')

        formData.append('role', role)

        axios.post('http://localhost:8400/auth/register', formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.success = 'Пользователь был успешно добавлен'
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.errors = error.response.data.errors
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