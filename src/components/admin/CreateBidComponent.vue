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
                             placeholder="Организация" v-model="organization" required>
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
                    <div>
                      <label for="datepicker">Выберите стартовую дату:</label>
                      <input type="date" v-model="startDate" class="form-control">
                    </div>
                  </div>
                  <div class="form-group">
                    <div>
                      <label for="datepicker">Выберите конечную дату:</label>
                      <input type="date" v-model="endDate" class="form-control">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputPosition">Цель</label>
                    <input type="text" v-model="goal" class="form-control" id="inputPosition"
                           placeholder="Цель командировки" required>
                  </div>

                  <!-- Иконка "стрелка вниз" для добавления новой пары полей -->
                  <h5>Расходы на командировку</h5>
                  <div>
                    <a href="#" @click.prevent="addNewExpenseField" style="margin-right: 300px;">
                      <i class="fa fa-plus fa-2x"></i>
                    </a>
                    <a href="#" @click.prevent="removeExpenseField">
                      <i class="fa fa-times fa-2x"></i>
                    </a>
                  </div>
                  <div v-for="(expense, index) in expensesRequestList" :key="index">
                    <input type="text" class="form-control" v-model="expense.name"
                           placeholder="Название траты" min="1">
                    <input type="number" class="form-control" v-model="expense.price"
                           placeholder="Сумма" min="1">
                    <br>
                    <br>

                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>
              <div v-if="success !== ''" class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-check"></i>Заявка была успешно добавлена</h5>
              </div>
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
import Calendar from 'primevue/calendar';

export default {
  components: {
    Calendar
  },
  data() {
    return {
      success: '',
      country: '',
      startDate: '',
      endDate: '',
      city: '',
      organization: '',
      goal: '',
      error: '',
      userId: 'Выберите сотрудника',
      expensesRequestList: [
        {name: '', price: null}
      ],
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
    isEndDateAfterStartDate() {
      return new Date(this.endDate) > new Date(this.startDate);
    },
    submitForm() {
      if (this.isEndDateAfterStartDate()) {
      } else {
        // Выведите сообщение об ошибке или выполните другие действия, если проверка не пройдена
        alert('Конечная дата должна быть позже начальной даты');
      }

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
      axios.post('http://localhost:8400/trip/set/' + this.userId, data,
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            if (response.data.message) {
              this.error = response.data.message; // Заменяем текущий массив сообщений новым сообщением
              this.success = ''; // Очищаем успешное сообщение
            } else {
              this.country = ''
              this.city = ''
              this.organization = ''
              this.startDate = ''
              this.endDate = ''
              this.goal = ''
              this.userId = ''
              this.expensesRequestList = []
              this.success = 'Заявка была успешно добавлена'
            }
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.error = error.response.data.message; // Заменяем текущий массив ошибок новым массивом ошибок
              this.success = ''; // Очищаем успешное сообщение
            }
          });
    },
    addNewExpenseField() {
      this.expensesRequestList.push({name: '', price: null});
    },
    removeExpenseField() {
      this.expensesRequestList.pop();
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