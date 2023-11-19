<template>
    <div class="wrapper">
      <Sidebar />
      <BidsTakenComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import BidsTakenComponent from "../../components/admin/BidsTakenComponent";

export default {
  name: 'HandleBids',
  components: {
    Sidebar,
    BidsTakenComponent
  }
}

</script>

<style>

</style>