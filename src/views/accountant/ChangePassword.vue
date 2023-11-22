<template>
    <div class="wrapper">
      <Sidebar />
      <ChangePasswordComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import ChangePasswordComponent from "../../components/accountant/ChangePasswordComponent";

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