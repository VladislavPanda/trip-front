<template>
    <div class="wrapper">
      <Sidebar />
      <SecondDiagram />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import SecondDiagram from "../../components/admin/SecondDiagram";

export default {
  name: 'Diagrams',
  components: {
    Sidebar,
    SecondDiagram
  }
}
</script>

<style>

</style>