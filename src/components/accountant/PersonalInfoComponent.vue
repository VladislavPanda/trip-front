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
                      placeholder="Ваше имя" v-bind:value="name" required>
                  </div>
                  <div class="form-group">
                    <label for="inputSurname">Фамилия</label>
                    <input type="text" class="form-control" id="inputSurname" 
                      placeholder="Ваша фамилия" v-bind:value="surname" required>
                  </div>
                  <div class="form-group">
                    <label for="inputPhone">Телефон</label>
                    <input type="phone" class="form-control" id="inputPhone" 
                      placeholder="Ваш телефон" v-bind:value="phone" required>
                  </div>
                  <div class="form-group">
                    <label for="inputPosition">Должность</label>
                    <input type="position" class="form-control" id="inputPosition" 
                      placeholder="Ваша должность" v-bind:value="position" required>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>
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
        token: '',
        phone: '-',
        position: '-',
      };
    },
    methods: {
      submitForm() {
        const accountResponse = JSON.parse(localStorage.getItem('accountResponse'))
        const role = accountResponse['role'].toLowerCase()

        // Создаем объект данных формы
        const formData = new FormData();

        // Добавляем значения полей формы в объект данных
        formData.append('name', this.name);
        formData.append('surname', this.surname);
        formData.append('phone', this.phone);
        formData.append('position', this.position);
        formData.append('role', role);
        
        const token = localStorage.getItem('token')

        // Отправляем данные формы на сервер
        axios.put('http://localhost:8400/account', formData,
        {
          headers: {
            //'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
          .then(response => {
            console.log(response)            
          })
          .catch(error => {
            console.error(error);
          });
      },
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    },
    mounted() {
      const storedData = localStorage.getItem('accountResponse');

      if (storedData) {
        const data = JSON.parse(storedData);
        this.name = data.name
        this.surname = data.surname
        this.email = data.email,
        this.token = data.token,
        this.phone = data.phone,
        this.position = data.position,
        this.bank_account = data.bank_account,
        this.address = data.address,
        this.avatar = data.avatar
      }
    }
  }
</script>