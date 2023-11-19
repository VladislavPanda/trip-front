<template>
    <div class="wrapper">
      <Sidebar />
      <HandleBidsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import HandleBidsComponent from "../../components/admin/HandleBidsComponent";

export default {
  name: 'HandleBids',
  components: {
    Sidebar,
    HandleBidsComponent
  }
}

</script>

<style>

</style>