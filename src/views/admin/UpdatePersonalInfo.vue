<template>
    <div class="wrapper">
      <Sidebar />
      <UpdatePersonalInfoComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import UpdatePersonalInfoComponent from "../../components/admin/UpdatePersonalInfoComponent";

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