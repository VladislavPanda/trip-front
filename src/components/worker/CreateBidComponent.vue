<template>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Создать заявку</h1>
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
                  <div class="form-group">
                    <label>Начало командировки:</label>
                    <div class="input-group date" id="reservationdate" data-target-input="nearest">
                        <input type="text" v-model="startDate"  class="form-control datetimepicker-input" data-target="#reservationdate">
                        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Окончание командировки:</label>
                    <div class="input-group date" id="reservationdate" data-target-input="nearest">
                        <input type="text" v-model="endDate" class="form-control datetimepicker-input" data-target="#reservationdate">
                        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputPosition">Цель</label>
                    <input type="position" class="form-control" id="inputPosition"
                      placeholder="Цель командировки" v-model="goal" required>
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

                  <!-- Поля для дополнительных расходов -->
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
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

  export default {
    data() {
      return {
        country: '',
        city: '',
        organization: '',
        startDate: '',
        endDate: '',
        goal: '',
        expensesRequestList: [
          { name: '', price: null }
        ],
        showAdditionalFields: false
      };
    },
    methods: {
      addNewExpenseField() {
        this.expensesRequestList.push({ name: '', price: null });
      },
      removeExpenseField() {
        this.expensesRequestList.pop();
      },
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
        };

        console.log(this.expensesRequestList)

        const token = localStorage.getItem('token')

        // Отправляем данные формы на сервер
        axios.post('http://localhost:8400/trip', data,
        {
          headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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

<style>

</style>