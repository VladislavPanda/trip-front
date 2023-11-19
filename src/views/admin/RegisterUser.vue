<template>
    <div class="wrapper">
      <Sidebar />
      <RegisterUserComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import RegisterUserComponent from "../../components/admin/RegisterUserComponent";

export default {
  name: 'RegisterUser',
  components: {
    Sidebar,
    RegisterUserComponent
  }
}
</script>

<style>

</style>