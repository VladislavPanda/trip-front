<template>
    <div class="wrapper">
      <Sidebar />
      <UpdateBankAccountComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import UpdateBankAccountComponent from "../../components/admin/UpdateBankAccountComponent";

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