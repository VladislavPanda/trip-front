<template>
    <div class="wrapper">
      <Sidebar />
      <ManagerRequestsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import ManagerRequestsComponent from "../../components/admin/ManagerRequestsComponent";

export default {
  name: 'ManagerRequests',
  components: {
    Sidebar,
    ManagerRequestsComponent
  }
}

</script>

<style>

</style>