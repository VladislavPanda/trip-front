<template>
    <div class="wrapper">
      <Sidebar />
      <Main />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import Main from "../../components/admin/Main";

export default {
  name: 'AdminHome',
  components: {
    Sidebar,
    Main
  }
}

</script>

<style>

</style>