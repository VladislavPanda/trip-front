<template>
    <div class="wrapper">
      <Sidebar />
      <PrePaymentReportsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import PrePaymentReportsComponent from "../../components/accountant/PrePaymentReportsComponent";

export default {
  name: 'PrePaymentReports',
  components: {
    Sidebar,
    PrePaymentReportsComponent
  }
}

</script>

<style>

</style>