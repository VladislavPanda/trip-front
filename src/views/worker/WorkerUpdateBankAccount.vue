<template>
    <div class="wrapper">
      <Sidebar />
      <UpdateBankAccountComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import UpdateBankAccountComponent from "../../components/worker/UpdateBankAccountComponent";

export default {
  name: 'RegisterUser',
  components: {
    Sidebar,
    UpdateBankAccountComponent
  }
}
</script>

<style>

</style>