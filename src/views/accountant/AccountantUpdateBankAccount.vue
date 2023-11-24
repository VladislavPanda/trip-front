<template>
    <div class="wrapper">
      <Sidebar />
      <UpdateBankAccountComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import UpdateBankAccountComponent from "../../components/accountant/UpdateBankAccountComponent";

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