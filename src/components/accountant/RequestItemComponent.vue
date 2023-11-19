<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Страница командировки</h1>
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
        <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <dl>
                  <dt>Страна: </dt>
                  <dd>{{ request.country }}</dd>
                  <dt>Город: </dt>
                  <dd>{{ request.city }}</dd>
                  <dt>Организация: </dt>
                  <dd>{{ request.organization }}</dd>
                  <dt>Дата начала: </dt>
                  <dd>{{ request.startDate }}</dd>
                  <dt>Дата окончания: </dt>
                  <dd>{{ request.endDate }}</dd>
                  <dt>Цель командировки: </dt>
                  <dd>{{ request.goal }}</dd>
                  <dt>Затраты: </dt>
                  <dd v-for="expense in request.expensesList" :key="expense.id">
                      {{ expense.name }}: ${{ expense.price }}
                  </dd>
                </dl>
                <button type="button" class="btn btn-success btn-lg"
                              @click="getBankAccount(request.id)">
                              Получить банковский счет
                </button>

              <div class="container-fluid" style="margin-left: -30px;">
                <div class="row">
                  <div class="col-md-5">
                    <form id="quickForm" @submit.prevent="submit">
                      <div class="card-body">
                        <div class="form-group">
                          <label for="exampleInputSum">Введите сумму</label>
                          <input type="text" name="sum" class="form-control" 
                              id="exampleInputSum" placeholder="Введите сумму"
                              v-bind:value="sum">
                        </div>
                      </div>
                      <!-- /.card-body -->
                      <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Отправить</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
        request: {},
        bankAccount: '',
        sum: ''
      };
    },
    mounted() {
      this.created();
      // this.takeRequest();
      this.fetchRequestItem();
    },
    methods: {
      takeRequest() {
        const token = localStorage.getItem('token');
        const id = this.$route.params.id;

        //console.log(token)
        axios.put(`http://localhost:8400/manager/take-requests/${id}`, null, {
          headers: {
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.request = response.data;
            localStorage.setItem('request', JSON.stringify(this.request));
          })
          .catch(error => {
            console.error(error);
          });
      },   
      fetchRequestItem() {
        const token = localStorage.getItem('token')
        const id = this.$route.params.id;
   
        axios.get('http://localhost:8400/trip/' + id, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.request = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      getBankAccount(requestId) { 
        const token = localStorage.getItem('token')

        axios.get('http://localhost:8400/manager/card/' + requestId, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            this.bankAccount = response.data.bankAccount;
          })
          .catch(error => {
            console.error(error);
          });
      },
      created() {
        const requestJSON = localStorage.getItem('request');

        if (requestJSON) {
          this.request = JSON.parse(requestJSON);
        } else {
          this.fetchRequestItem()
        }
      },
      topUp() {

      },
      logout() {
        localStorage.clear(); // Очищаем localStorage
  
        // Делаем редирект на определенный маршрут
        this.$router.push('/');
      }
    }
  }
  </script>