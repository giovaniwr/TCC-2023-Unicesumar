<template>
  <div class="container mt-5 mx-3 bg" >
    <b-col class="mt-5">
      <b-row class="justify-content-center">
        <b-col cols="8">
          <h4 class="my-3 font-weight-bold">Cadastro do Livro</h4> <br/>
          <b-form-group
              id="nome-livro"
              class="font-weight-bold"
              label="Nome do Livro: "
              label-for="Nome do Livro"
              :state="livro.idade ? true : false"
            >
            <b-form-input
                id="nome-livro"
                type="text"
                required
                placeholder="Digite o Nome do Livro"
                v-model="livro.nome"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group
              id="tipo"
              label="Tipo: "
              class=" font-weight-bold"
              label-for="tipo">
            <b-form-select
                id="tipo"
                required
                v-model="livro.tipo">
              <option value="Digital">Digital</option>
              <option value="Físico">Físico</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>


      <b-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group
              id="idade"
              label="Idade Recomendada: "
              class="font-weight-bold"
              label-for="idade">
            <b-form-select
                id="idade"
                required
                placeholder="Selecione"
                v-model="livro.idadeId">
              <option v-for="idade of idades" :key="idade.id" :value="idade.id">{{idade.idade}}</option>

            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group
              id="data-lancamento"
              label="Data de Lançamento:"
              class="font-weight-bold"
              label-for="data-lancamento">
            <b-form-input
                id="data-lancamento"
                required
                type="date"
                placeholder="dd/mm/aaaa"
                v-model="livro.datalancamento"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group
              id="autor"
              label="Autor(a): "
              class="font-weight-bold"
              label-for="autor">
            <b-form-input
                id="autor"
                required
                min="0"
                max="120"
                placeholder="Nome do Autor(a)"
                v-model="livro.autor"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group
              id="hobby"
              label="Descrição do Livro: "
              class="font-weight-bold"
              label-for="descricao">
            <b-form-input
                id="descricao"
                required
                placeholder="Uma Breve Descrição sobre Livro"
                v-model="livro.descricao"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">

          <b-col class="mt-5 p-3" cols="0">

            <b-button variant="primary" class="px-5" @click="addNewlivro"
            >Cadastrar
            </b-button
            >
          </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import axios from "axios";
import {mask} from 'vue-the-mask'

export default {
  name: "CreatelivroModal",

  data() {
    return {
      idades:[],
      success: false,
      livro: {},
      error: null,
    };
  },
  directives: {
        mask
    },
  created() {
    this.getIdades()
  },
  methods: {
    seeAlertSucesso(){
      this.$swal("Sucesso", "Livro Criado com Sucesso", "success")
    },
    seeAlertError(){
      this.$swal("Erro", "Algo de errado aconteceu ao criar o Livro", "error")
    },
    getIdades(){
      axios
          .get("http://127.0.0.1:8000/api/idades")
          .then((response) => {
            this.idades = response.data.data;
          })
    },

    addNewlivro() {
      if (!this.livro.nome) {
        this.error = "O campo Nome é obrigatório";
        return;
      }
      axios
          .post("http://127.0.0.1:8000/api/livro/livros/", this.livro)
          .then((response) => {
            console.log(response.data);
            this.$emit("reloadDataTable");
            this.$emit("showSuccessAlert");
            this.success = true;
            this.seeAlertSucesso();
            this.livro.nome = "";
            this.livro.tipo = "";
            this.livro.idadeId = "";
            this.livro.datalancamento = "";
            this.livro.autor = "";
            this.livro.descricao = "";

          })
          .catch((error) => {
            console.log(error);
            this.seeAlertError();
          });
    },
  },
};
</script>