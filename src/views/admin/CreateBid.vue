<template>
  <div class="wrapper">
    <Sidebar />
    <CreateBidComponent />
  </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import CreateBidComponent from "../../components/admin/CreateBidComponent";

export default {
name: 'CreateBid',
components: {
  Sidebar,
  CreateBidComponent
}
}

</script>

<style>

</style>