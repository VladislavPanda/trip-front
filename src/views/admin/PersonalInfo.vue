<template>
    <div class="wrapper">
      <Sidebar />
      <PersonalInfoComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import PersonalInfoComponent from "../../components/admin/PersonalInfoComponent";

export default {
  name: 'PersonalInfo',
  components: {
    Sidebar,
    PersonalInfoComponent
  }
}

</script>

<style>

</style>