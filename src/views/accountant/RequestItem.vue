<template>
    <div class="wrapper">
      <Sidebar />
      <RequestItemComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import RequestItemComponent from "../../components/accountant/RequestItemComponent";

export default {
  name: 'RequestItem',
  components: {
    Sidebar,
    RequestItemComponent
  }
}
</script>

<style>

</style>