<template>
    <div class="wrapper">
      <Sidebar />
      <ChangePasswordComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import ChangePasswordComponent from "../../components/admin/ChangePasswordComponent";

export default {
  name: 'ChangePassword',
  components: {
    Sidebar,
    ChangePasswordComponent
  }
}

</script>

<style>

</style>