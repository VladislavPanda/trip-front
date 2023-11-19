<template>
    <div class="wrapper">
      <Sidebar />
      <Main />
    </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import Main from "../../components/worker/Main";

export default {
  name: 'WorkerHome',
  components: {
    Sidebar,
    Main
  }
}
</script>

<style>

</style>