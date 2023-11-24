<template>
    <div class="wrapper">
      <Sidebar />
      <UpdatePersonalInfoComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import UpdatePersonalInfoComponent from "../../components/worker/UpdatePersonalInfoComponent";

export default {
  name: 'RegisterUser',
  components: {
    Sidebar,
    UpdatePersonalInfoComponent
  }
}
</script>

<style>

</style>