<template>
  <b-form class="mt-5">
    <h4 class="text-center">Atualize o Livro</h4>
    <b-row class="justify-content-center">
    
        <b-col cols="8">
          <p>Nome:</p>
            <b-form-input
                id="nome-livro"
                type="text"
                required
                placeholder="Nome do Livro"
                v-model="livro.nome"
            ></b-form-input>
        </b-col>
      </b-row>

    <b-row class="justify-content-center">
      <b-col cols="8">
        <p>Tipo:</p>
        <b-form-select
            id="tipo"
            required
            v-model="livro.tipo">
          <option value="Digital">Digital</option>
          <option value="Físico">Físico</option>
        </b-form-select>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="8">
        <p>Idade Recomendada: </p>
        <b-form-select
            id="autor"
            required
            placeholder="Selecione"
            v-model="livro.idadeId">
          <option v-for="idade of idades" :key="idade.id" :value="idade.id">{{idade.idade}}</option>

        </b-form-select>
      </b-col>
    </b-row>


      <b-row class="justify-content-center">
        <b-col cols="8">
          <p>Data:</p>
            <b-form-input
                id="data"
                required
                type="date"
                placeholder="dd/mm/aaaa"
                v-model="livro.datalancamento"
            ></b-form-input>
        </b-col>
      </b-row>


      <b-row class="justify-content-center mt-1">
        <b-col cols="8">
          <p>Autor(a):</p>
            <b-form-input
                id="autor"
                required
                placeholder="Nome do Autor(a)"
                v-model="livro.autor"
            ></b-form-input>
        </b-col>
      </b-row>


      <b-row class="justify-content-center">
        <b-col cols="8">
          <p>Descrição do Livro: </p>
            <b-form-input
                id="descricao"
                type="email"
                required
                placeholder="Uma Breve Descrição sobre Livro"
                v-model="livro.descricao"
            ></b-form-input>
        </b-col>
      </b-row>

    <b-row class="mt-4 ">
      <b-col cols="5">
      </b-col>
      <b-col>
         <b-button variant="primary" class="px-5 mx-2" @click="updatelivro"
        >Salvar</b-button
        >
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateLivrosModal",
  props: {
    livroId: Number,
  },
  data() {
    return {
      idades:[],
      livro: {},
    };
  },
  mounted() {
    this.getCusomterByID();
    this.getIdades();
  },
  methods: {
    getIdades(){
      axios
          .get("http://127.0.0.1:8000/api/idades")
          .then((response) => {
            this.idades = response.data.data;
          })
    },
    triggerClose() {
      this.$emit("closeEditModal");
    },
    getCusomterByID() {
      axios
          .get(`http://127.0.0.1:8000/api/livro/livros/${this.livroId}`)
          .then((response) => {
            this.livro = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    updatelivro() {
      axios
          .put(
              `http://127.0.0.1:8000/api/livro/livros/${this.livroId}`,
              this.livro
          )
          .then((response) => {
            console.log(response.data);
            this.$emit("closeEditModal");
            this.$emit("reloadDataTable");
            this.$emit("seeAlertSucesso");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>