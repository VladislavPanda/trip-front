<template>
    <div class="wrapper">
      <Sidebar />
      <AccountantsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import AccountantsComponent from "../../components/admin/AccountantsComponent";

export default {
  name: 'Accountans',
  components: {
    Sidebar,
    AccountantsComponent
  }
}

</script>

<style>

</style>