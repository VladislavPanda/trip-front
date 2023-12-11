<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/admin" class="brand-link">
      <img src="../../assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Система управления</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
<!--          <img v-bind:src="avatar" class="img-circle elevation-2" alt="User Image">-->
          <img src="../../assets/profile.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="/admin/personalInfo" class="d-block">{{ name }} {{ surname }}</a>
        </div>
      </div>
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="/admin/bid/create" class="nav-link">
              <i class="nav-icon far fa-plus-square"></i>
              <p>
                Создать заявку на командировку
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin/bids/handle" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Обработать заявки на командировки
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin/registerUser" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Зарегистрировать пользователя
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Управление пользователями
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin/diagrams" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              <p>
                Диаграммы
              </p>
            </a>
          </li>
<!--          <li class="nav-item">-->
<!--            <a href="#" class="nav-link">-->
<!--              <i class="nav-icon fas fa-book"></i>-->
<!--              <p>-->
<!--                Изменения статусов заявок-->
<!--              </p>-->
<!--            </a>-->
<!--          </li>-->
          <li class="nav-item">
            <a href="/admin/accountants" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Взятые бухгалтерами заявки
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin/logs" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Логи приложения
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Отчёты и документы
              </p>
            </a>
          </li>
        </ul>
    </nav>
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
      name: '',
      surname: '',
      avatar: ''
    };
  },
  mounted() {
    const storedData = localStorage.getItem('accountResponse');

    if (storedData) {
      const data = JSON.parse(storedData);
      this.name = data.name
      this.surname = data.surname
      this.avatar = data.avatar
    }
  }
}
</script>