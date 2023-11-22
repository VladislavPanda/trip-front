<template>
  <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- left column -->
          <div class="col-md-3"></div>
          <div class="col-md-6">
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
              <div>
              <!-- Блок ошибок -->    
              <div v-if="data.errors.length > 0" class="alert alert-danger">
                <ul>
                  <li v-for="error in data.errors" :key="error">{{ error }}</li>
                </ul>
                </div>
              </div>
            </div>
            <div class="col-md-2"></div>
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
      errors: []
    });

    const router = useRouter();
    const formData = new FormData();

    const submit = async () => {
      
        // Добавляем значения полей формы в объект данных
      formData.append('email', data.email);
      formData.append('password', data.password);
      const response = await axios.post(
        'http://localhost:8400/auth/authenticate',
        formData,
        {
          // withCredentials: true,
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json' //'application/x-www-form-urlencoded'
          },
        }, 
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("accountResponse", JSON.stringify(response.data.accountResponse))

        switch (response.data.accountResponse.role)
        {
          case 'ADMIN': 
            await router.push('/admin')
            break;
          case 'MANAGER':
            await router.push('/accountant')
            break;
          case 'WORKER':
            await router.push('/worker')
            break;
        }
      }

      if (response.data.errors) {
        data.errors = response.data.errors
      }
    }

    return {
      data,
      submit
    }
  }
}  

</script>
