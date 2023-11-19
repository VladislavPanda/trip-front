<template>
    <div class="wrapper">
      <Sidebar />
      <HandleUserBidsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import HandleUserBidsComponent from "../../components/admin/HandleUserBidsComponent";

export default {
  name: 'HandleUserBids',
  components: {
    Sidebar,
    HandleUserBidsComponent
  }
}

</script>

<style>

</style>