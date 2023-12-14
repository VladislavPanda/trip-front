<template>
    <div class="wrapper">
      <Sidebar />
      <HistoryComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import HistoryComponent from "../../components/worker/HistoryComponent";

export default {
  name: 'History',
  components: {
    Sidebar,
    HistoryComponent
  }
}

</script>

<style>

</style>