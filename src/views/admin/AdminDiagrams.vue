<template>
    <div class="wrapper">
      <Sidebar />
      <DiagramsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar";
import DiagramsComponent from "../../components/admin/DiagramsComponent";

export default {
  name: 'Diagrams',
  components: {
    Sidebar,
    DiagramsComponent
  }
}
</script>

<style>

</style>