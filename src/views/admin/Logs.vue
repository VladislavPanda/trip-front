<template>
    <div class="wrapper">
      <Sidebar />
      <LogComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import LogComponent from "../../components/admin/LogComponent";

export default {
  name: 'PersonalInfo',
  components: {
    Sidebar,
    LogComponent
  }
}

</script>

<style>

</style>