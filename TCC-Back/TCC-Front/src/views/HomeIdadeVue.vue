<template>
  <main id="Home-page">
    <div class="container name">
      <h3>Idade Recomendada
      </h3>
    </div>
    <div class="container">

      <DataTableComponentIdade/>
    </div>
  </main>

</template>
<script>
import DataTableComponentIdade from "@/components/DataTableComponentIdade";

export default {
  components: {DataTableComponentIdade}
}
</script>
<style scoped>
.name {
  text-align: center;
}
</style>
