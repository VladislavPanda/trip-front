<template>
  <div class="wrapper">
    <Sidebar />
    <CreateBidComponent />
  </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import CreateBidComponent from "../../components/worker/CreateBidComponent";

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