<template>
  <div class="wrapper">
    <Sidebar />
    <UpdatePersonalInfoComponent />
  </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import UpdatePersonalInfoComponent from "../../components/accountant/UpdatePersonalInfoComponent";

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