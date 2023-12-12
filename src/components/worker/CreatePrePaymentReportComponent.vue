<template>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Создать авансовый отчёт</h1>
            </div><!-- /.col -->
            <ul class="nav nav-pills ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
              </li>
            </ul>
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>

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
                    <label>Авансовый отчёт от:</label>
                    <div class="input-group date" id="reservationdate" data-target-input="nearest">
                        <input type="text" v-model="date"  class="form-control datetimepicker-input" data-target="#reservationdate">
                        <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputCity">Наименование организации</label>
                      <input type="text" class="form-control" id="inputCity"
                        placeholder="Наименование организации" v-model="organization" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputOrganization">Бухгалтер</label>
                      <select class="form-control" name="accountant" v-model="accountant">
                        <option v-for="user in managerUsers" :value="user.id">{{ user.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputCity">Назначение аванса</label>
                      <input type="text" class="form-control" id="inputCity"
                        placeholder="Назначение аванса" v-model="prePaymentReportGoal" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label for="inputCity">Полученный аванс</label>
                      <input type="text" class="form-control" id="inputCity"
                        placeholder="Полученный аванс" v-model="prePaymentSum" required>
                    </div>
                  </div>
                </div>

                <div>
                    <a href="#" @click.prevent="addNewExpenseField" style="margin-right: 300px;">
                      <i class="fa fa-plus fa-2x"></i>
                    </a>
                    <a href="#" @click.prevent="removeExpenseField">
                        <i class="fa fa-times fa-2x"></i>
                    </a>
                  </div>

                <div v-for="(expense, index) in expensesRequestList" :key="index">
                    <input type="text" class="form-control" v-model="expense.date"
                      placeholder="Дата">
                    <input type="number" class="form-control" v-model="expense.number"
                      placeholder="Номер" min="1">
                      <input type="text" class="form-control" v-model="expense.name"
                      placeholder="Наименование документа (расхода)">
                      <input type="number" class="form-control" v-model="expense.sum"
                      placeholder="Сумма" min="1">
                    <br>
                    <br>
                    
                  </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>

              <div v-if="success != ''" class="alert alert-success alert-dismissible">
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5><i class="icon fas fa-check"></i>Авансовый отчёт был успешно добавлен</h5>
              </div>
            </div>
            </div>
            <div class="col-md-4">

            </div>
          </div>
          <!-- /.row (main row) -->
        </div><!-- /.container-fluid -->
      </section>
    </div>
</template>

<script>
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

  export default {
    data() {
      return {
        date: '',
        organization: '',
        admin: '',
        accountant: '',
        prePaymentReportGoal: '',
        prePaymentSum: '',
        expensesRequestList: [
          { date: '', number: '', name: '', sum: null }
        ],
        showAdditionalFields: false,
        success: '',
        users: []
      };
    },
    methods: {
      addNewExpenseField() {
        this.expensesRequestList.push({ date: '', number: '', name: '', sum: null });
      },
      removeExpenseField() {
        this.expensesRequestList.pop();
      },
      submitForm() {
        // Создаем объект данных формы
        const data = {
          date: this.date,
          organization: this.organization,
          admin: this.admin,
          accountant: this.accountant,
          prePaymentReportGoal: this.prePaymentReportGoal,
          prePaymentSum: this.prePaymentSum,
          expensesRequestList: this.expensesRequestList,
        };

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
            this.date = ''
            this.organization = ''
            this.admin = ''
            this.accountant = ''
            this.prePaymentReportGoal = ''
            this.prePaymentSum = ''
            this.expensesRequestList = []
            this.success = 'Авансовый отчёт был успешно добавлен'
          })
          .catch(error => {
            console.error(error);
          });
      },
      
      logout() {
        localStorage.clear(); // Очищаем localStorage

        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      },
      findAdminUsername() {
        const adminUser = this.users.find(user => user.role === 'admin');
        return adminUser ? adminUser.username : '';
      }
    },
    mounted() {
      const storedData = localStorage.getItem('accountResponse');
      const token = localStorage.getItem('token');

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
    },
    computed: {
      managerUsers() {
        console.log(this.users)
        return this.users.filter(user => user.role === 'MANAGER');
      }
    }
  }
</script>

<style>

</style>