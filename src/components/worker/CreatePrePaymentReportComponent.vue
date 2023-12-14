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
          <!--<div class="col-md-4">

          </div>-->
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title"></h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form @submit.prevent="submitForm" enctype="multipart/form-data">
  <div class="card-body">
    <div class="form-row">
      <div class="form-group">
        <label for="datepicker">Авансовый отчёт от:</label>
        <input type="date" v-model="date" class="form-control">
      </div>

      <div class="form-group">
        <label for="inputCity">Наименование организации</label>
        <input type="text" class="form-control" id="inputCity" placeholder="Наименование организации" v-model="organization" required>
      </div>

      <div class="form-group">
        <label for="inputOrganization">Бухгалтер</label>
        <select class="form-control" name="accountant" v-model="accountantId">
          <option v-for="user in managerUsers" :value="user.id">{{ user.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="inputCity">Назначение аванса</label>
        <input type="text" class="form-control" id="inputCity" placeholder="Назначение аванса" v-model="prePaymentReportGoal" required>
      </div>

      <div class="form-group">
        <label for="inputCity">Полученный аванс</label>
        <input type="number" min="1" class="form-control" id="inputCity" placeholder="Полученный аванс" v-model="prePaymentSum" required>
      </div>
    </div>

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
      <div class="form-row">
        <div class="form-group">
          <input type="date" class="form-control" v-model="expense.date" placeholder="Дата">
        </div>

        <div class="form-group">
          <input type="text" class="form-control" v-model="expense.name" placeholder="Наименование документа (расхода)">
        </div>

        <div class="form-group">
          <input type="number" class="form-control" v-model="expense.sum" placeholder="Сумма" min="1">
        </div>

        <div class="form-group file-input">
          <label class="file-input-label">
            <span class="file-input-text">Выберите файл</span>
            <input type="file" @change="handleFileChange($event, expense)">
          </label>
        </div>
      </div>
      <br>
    </div>
  </div>
  <!-- /.card-body -->
  <div class="card-footer">
    <button type="submit" class="btn btn-primary">Сохранить</button>
  </div>
  </form>
              <!--<form @submit.prevent="submitForm" enctype="multipart/form-data">
                <div class="card-body">
                  <div class="form-group">
                    <div>
                      <label for="datepicker">Авансовый отчёт от:</label>
                      <input type="date" v-model="date" class="form-control">
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
                      <select class="form-control" name="accountant" v-model="accountantId">
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
                      <input type="number" min="1" class="form-control" id="inputCity"
                             placeholder="Полученный аванс" v-model="prePaymentSum" required>
                    </div>
                  </div>
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
                    <input type="date" class="form-control" v-model="expense.date"
                           placeholder="Дата">
                    <input type="number" class="form-control" v-model="expense.number"
                           placeholder="Номер" min="1">
                    <input type="text" class="form-control" v-model="expense.name"
                           placeholder="Наименование документа (расхода)">
                    <input type="number" class="form-control" v-model="expense.sum"
                           placeholder="Сумма" min="1">
                    <input type="file" class="form-control" @change="handleFileChange($event, expense)"
                           placeholder="Выберите файл" min="1">
                    <br>
                  </div>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>-->

              <div v-if="success != ''" class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h5><i class="icon fas fa-check"></i>Авансовый отчёт был успешно создан</h5>
              </div>
              <div class="alert alert-danger" v-if="error !== ''">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <!-- Блок ошибок -->
                <span>{{ error }}</span>
              </div>
            </div>
          </div>
          <!--<div class="col-md-4">

          </div>-->
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
      adminId: '',
      accountantId: '',
      prePaymentReportGoal: '',
      prePaymentSum: '',
      expensesRequestList: [
        {localDate: '', nameOfExpense: '', sum: null}
      ],
      showAdditionalFields: false,
      success: '',
      error: '',
      users: [],
      formData: {
        name: '',
        files: []
      }
    };
  },
  methods: {
    handleFileChange(event, expense) {
      this.formData.files = event.target.files;
      // expense.cheque = file;
    },
    addNewExpenseField() {
      this.expensesRequestList.push({date: '', number: '', name: '', sum: null});
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
      const id = 1;

      const formData = new FormData();
      // const arr = ["first", "second"]
      const jsonFiles = new Blob([JSON.stringify(["first", "second"])], {
        type: 'application/json'
      });
      // formData.append('fileNames', JSON.stringify(["first", "second"]));
      for (let file of this.formData.files) {
        formData.append('files', file);
      }
      formData.append('fileNames', jsonFiles);
      const body = {
        managerId: this.accountantId, // Замените на реальное значение
        companyName: this.organization, // Замените на реальное значение
        goalOfReport: this.prePaymentReportGoal, // Замените на реальное значение
        amountOfMoney: this.prePaymentSum, // Замените на реальное значение
        infoList: this.expensesRequestList
      }
      const json = new Blob([JSON.stringify(body)], {
        type: 'application/json'
      });
      formData.append("body", json);
      console.log(formData)
      axios.post('http://localhost:8400/expense-report/1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        // Обработка успешного ответа
      }).catch(error => {
        // Обработка ошибки
      });


      // Отправляем данные формы на сервер
      // axios.post('http://localhost:8400/trip', data,
      // {
      //   headers: {
      //     'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`
      // }
      // })
      //   .then(response => {
      //     if (response.data.message) {
      //       this.error = response.data.message; // Заменяем текущий массив сообщений новым сообщением
      //       this.success = ''; // Очищаем успешное сообщение
      //     } else {
      //       this.date = ''
      //       this.organization = ''
      //       this.admin = ''
      //       this.accountant = ''
      //       this.prePaymentReportGoal = ''
      //       this.prePaymentSum = ''
      //       this.expensesRequestList = []
      //       this.success = 'Авансовый отчёт был успешно добавлен'
      //     }
      //   })
      //   .catch(error => {
      //     if (error.response.status === 400) {
      //       this.error = error.response.data.message; // Заменяем текущий массив ошибок новым массивом ошибок
      //       this.success = ''; // Очищаем успешное сообщение
      //     }
      //   });
    },

    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
    },
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
.form-row {
  display: flex;
  flex-wrap: wrap;
}

.form-row > .form-group {
  flex: 1;
  margin-right: 10px;
}

.file-input {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.file-input input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-input-label {
  display: inline-block;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.file-input-label:hover {
  background-color: #0056b3;
}

.file-input-text {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  vertical-align: middle;
}
</style>