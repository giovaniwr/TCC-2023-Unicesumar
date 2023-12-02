<template>
  <div class="app imagem">
    <SideBarComponent />
    <router-view />
  </div>
</template>

<script setup>
import SideBarComponent from '@/components/SideBarComponent.vue'

</script>

<style lang="scss">
:root {
  --primary: #3548c5;
  --primary-alt: #22c55e;
  --gazinBlue: #008DCF;
  --gazinBlueOrigem: #008DCF;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}
body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
 .imagem {
   background-position: 30% 45%;
   -webkit-background-size: cover;
   -moz-background-size: cover;
   background-size: cover;
   -o-background-size: cover;
   z-index: 3;
 }
</style>