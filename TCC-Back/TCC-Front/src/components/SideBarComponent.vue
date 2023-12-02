<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logoA" v-if="is_expanded">
      <img :src="logoURL" alt="Vue" />
    </div>
    <div class="logoB" v-else>
      <img :src="logoURL" alt="Vue" />
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="fas fa-home"></span>
        <span class="text  mx-2"> Livros</span>
      </router-link>
      <router-link to="/idade" class="button">
        <span class="fas fa-home"></span>
        <span class="text  mx-2"> Idade</span>
      </router-link>
      <router-link to="/cadastros" class="button">
        <span class="fas fa-columns"></span>
        <span class="text mx-2">Cadastrar Livro </span>
      </router-link>
      <router-link to="/livros" class="button">
        <span class="fas fa-columns"></span>
        <span class="text mx-2">Cadastrar Idade </span>
      </router-link>
    </div>
    <div class="flex"></div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <i class="fa-solid fa-forward"></i>
      </button>
    </div>

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../assets/livro.png'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  width: calc(2rem + 28px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logoA {
    margin-bottom: 5rem;
    margin-left: 3rem;

    img {
      width: 10rem;

    }
  }
  .logoB {
    margin-bottom: 5rem;
    margin-left: 4rem;
    

    img {
      width:  8rem;

    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      color: var(--gazinBlueOrigem)
    }
  }

  h3, .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--gazin);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons, .text {
          color: var(--gazinBlueOrigem);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--light);
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: 0;

      .menu-toggle {
        transform: rotate(-180deg);
        color: var(--light)
      }
    }

    h3, .button .text {
      opacity: 1;
    }
    .footer {
      opacity: 0;
    }
  }

  @media (max-width: 1013px) {
    position: fixed;
    z-index: 99;
  }
}
</style>