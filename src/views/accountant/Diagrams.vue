<template>
    <div class="wrapper">
      <Sidebar />
      <DiagramsComponent />
    </div>
</template>

<script>
import Sidebar from "../../components/accountant/Sidebar";
import DiagramsComponent from "../../components/accountant/DiagramsComponent";

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