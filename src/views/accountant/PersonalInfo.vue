<template>
    <div class="wrapper">
      <Sidebar />
      <PersonalInfoComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import PersonalInfoComponent from "../../components/accountant/PersonalInfoComponent";

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