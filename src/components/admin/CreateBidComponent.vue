<template>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Назначить командировку</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
              </li>
            </ul>
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>

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
                    <div class="form-group">
                      <label for="inputOrganization">Сотрудник</label>
                      <select class="form-control" name="accountant" v-model="userId" required>
                        <option disabled>Выберите сотрудника</option>
                        <option v-for="user in workerUsers" :value="user.id">{{ user.name }} {{ user.surname }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputCountry">Страна</label>
                      <input type="text" class="form-control" id="inputCountry" 
                        placeholder="Страна командировки" v-model="country" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputCity">Город</label>
                      <input type="text" class="form-control" id="inputCity" 
                        placeholder="Город командировки" v-model="city" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputOrganization">Организация</label>
                      <input type="text" class="form-control" id="inputOrganization" 
                        placeholder="Организация" v-model="organisation" required>
                    </div>
                  </div>
                  <!--<div class="form-group">
                    <label>Начало командировки:</label>
                    <div class="input-group date" id="reservationdateStart" data-target-input="nearest">
                      <input type="text" class="form-control datetimepicker-input" id="datetimepicker" data-toggle="datetimepicker" data-target="#datetimepicker" />
                      <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                  </div>-->
                  <div class="form-group">
                    <label>Начало командировки:</label>
                    <div class="input-group date" id="reservationdateStart" data-target-input="nearest">
                      <input type="text" class="form-control datetimepicker-input" data-target="#reservationdateStart">
                      <div class="input-group-append" data-target="#reservationdateStart" data-toggle="datetimepicker">
                        <Calendar v-model="startDate" inline showWeek />
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Окончание командировки:</label>
                    <div class="input-group date" id="reservationdateEnd" data-target-input="nearest">
                      <input type="text" v-model="endDate" class="form-control datetimepicker-input" data-target="#reservationdateEnd">
                      <div class="input-group-append" data-target="#reservationdateEnd" data-toggle="datetimepicker">
                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputPosition">Цель</label>
                    <input type="position" v-model="goal" class="form-control" id="inputPosition" 
                      placeholder="Цель командировки" required>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>
              <div class="alert alert-danger" v-if="error !== ''">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <!-- Блок ошибок -->
                <span>{{ error }}</span>
              </div>
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
//import Calendar from 'primevue/calendar';

  export default {
    data() {
      return {
        country: '',
        startDate: '',
        endDate: '',
        city: '',
        organisation: '',
        goal: '',
        error: '',
        userId: 'Выберите сотрудника',
        date: new Date(),
        options: {
          format: "DD/MM/YYYY h:m:s a",
          useCurrent: false,
          icons: {
            time: "far fa-clock",
            date: "far fa-calendar",
            up: "fas fa-arrow-up",
            down: "fas fa-arrow-down",
            previous: "fas fa-chevron-left",
            next: "fas fa-chevron-right",
            today: "fas fa-calendar-check",
            clear: "far fa-trash-alt",
            close: "far fa-times-circle",
          },
        },
        users: []
      };
    },
    methods: {
      submitForm() {
        // Создаем объект данных формы
        const data = {
          country: this.country,
          city: this.city,
          organization: this.organization,
          startDate: this.startDate,
          endDate: this.endDate,
          goal: this.goal,
          expensesRequestList: this.expensesRequestList,
          userId: this.userId
        };

        const token = localStorage.getItem('token')
        
        // Отправляем данные формы на сервер
        axios.post('http://localhost:8400/trip', data,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.country = ''
            this.city = ''
            this.organization = ''
            this.startDate = ''
            this.endDate = ''
            this.goal = ''
            this.userId = ''
            this.expensesRequestList = []
            this.success = 'Заявка была успешно добавлена'
          })
          .catch(error => {
            if (error.response.status === 400) {
              data.error = error.response.message
            }
          });
      },
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    },
    mounted() {
      const token = localStorage.getItem('token');
      const storedData = localStorage.getItem('accountResponse');
      const users = [];
      
      axios.get('http://localhost:8400/account/getAllUsers', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          this.users = response.data;
          this.admin = this.findAdminUsername();
        })
        .catch(error => {
          console.error(error);
        });

      if (storedData) {
        const data = JSON.parse(storedData)
        this.email = data.email,
        this.token = data.token,
        this.phone = data.phone,
        this.position = data.position,
        this.bank_account = data.bank_account,
        this.address = data.address,
        this.avatar = data.avatar
      }
    },
    computed: {
      workerUsers() {
        return this.users.filter(user => user.role === 'WORKER');
      }
    }
  }
</script>

<style>

</style>