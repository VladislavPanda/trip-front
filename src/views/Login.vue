<template>
  <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-4"></div>
          <div class="col-md-4" style="margin-top: 250px">
            <!-- jquery validation -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Система управления командировок</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form id="quickForm" @submit.prevent="submit">
                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Введите Email</label>
                    <input type="email" name="email" class="form-control" 
                        id="exampleInputEmail1" placeholder="Email"
                        v-model="data.email">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Введите пароль</label>
                    <input type="password" name="password" class="form-control"
                        id="exampleInputPassword1" placeholder="Пароль"
                        v-model="data.password">
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Войти</button>
                </div>
              </form>
              <div  class="alert alert-danger" v-if="data.error !== ''" >
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
              <!-- Блок ошибок -->    
                <span>{{data.error}}</span>
              </div>
            </div>
            <div class="col-md-4"></div>
          <!--/.col (left) -->
        </div>
        <!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
  </section>  
</template>

<script>

import {reactive} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

export default {
  name: "Login",
  setup () {
    const data = reactive ({
      email: '',
      password: '',
      error: ''
    });

    const router = useRouter();
    const formData = new FormData();

    const submit = async () => {
      // Очистка объекта formData перед добавлением новых значений
      formData.delete('email');
      formData.delete('password');
      
      // Добавляем значения полей формы в объект данных
      formData.append('email', data.email);
      formData.append('password', data.password);

      try {
        const response = await axios.post('http://localhost:8400/auth/authenticate', formData, {
          headers: {
            'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
          }
        });
        
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("accountResponse", JSON.stringify(response.data.accountResponse));

          switch (response.data.accountResponse.role) {
            case 'ADMIN': 
              await router.push('/admin');
              break;
            case 'MANAGER':
              await router.push('/accountant');
              break;
            case 'WORKER':
              await router.push('/worker');
              break;
          }
        } else {
          // Проверка на ошибку 403
          if (response.status === 403) {
            data.error = 'Ошибка авторизации: доступ запрещен';
          }
        }
      } catch (error) {
        // Обработка ошибок
        data.error = 'Произошла ошибка при выполнении запроса';
      }
    }

    return {
      data,
      submit
    }
  }
}  

</script>
