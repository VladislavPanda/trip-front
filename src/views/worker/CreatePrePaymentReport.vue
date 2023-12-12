<template>
    <div class="wrapper">
      <Sidebar />
      <CreatePrePaymentReportComponent />
    </div>
  </template>
  
  <script>
  import Sidebar from "../../components/worker/Sidebar";
  import CreatePrePaymentReportComponent from "../../components/worker/CreatePrePaymentReportComponent";
  
  export default {
  name: 'CreateprePaymentReport',
  components: {
    Sidebar,
    CreatePrePaymentReportComponent
  }
  }
  
  </script>
  
  <style>
  
  </style>