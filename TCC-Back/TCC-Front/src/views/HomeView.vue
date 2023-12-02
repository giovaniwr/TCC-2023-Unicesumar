<template>
  <main id="Home-page">
    <div class="container name">
      <h3>Livros</h3>
    </div>
    <div class="container">

      <DataTableComponentLivro/>
    </div>
  </main>

</template>
<script>
import DataTableComponentLivro from "@/components/DataTableComponentLivro";

export default {
  components: {DataTableComponentLivro}
}
</script>
<style scoped>
.name {
  text-align: center;
}
</style>
