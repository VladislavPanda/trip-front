<template>
    <div class="wrapper">
      <Sidebar />
      <PersonalInfoComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/worker/Sidebar";
import PersonalInfoComponent from "../../components/worker/PersonalInfoComponent";

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