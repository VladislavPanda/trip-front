<template>
    <div class="wrapper">
      <Sidebar />
      <BidsTaken />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import BidsTaken from "../../components/accountant/BidsTaken";

export default {
  name: 'Users',
  components: {
    Sidebar,
    BidsTaken
  }
}

</script>

<style>

</style>