<template>
    <div class="wrapper">
      <Sidebar />
      <ChangePasswordComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import ChangePasswordComponent from "../../components/worker/ChangePasswordComponent";

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