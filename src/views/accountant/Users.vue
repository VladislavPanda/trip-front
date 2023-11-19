<template>
    <div class="wrapper">
      <Sidebar />
      <Main />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import Main from "../../components/accountant/Main";

export default {
  name: 'Users',
  components: {
    Sidebar,
    Main
  }
}

</script>

<style>

</style>