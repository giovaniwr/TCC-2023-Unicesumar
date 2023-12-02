<template cla>
  <div class="container mt-5 mx-3 bg" >
    <b-col class="mt-5">

      <b-row class="justify-content-center">
        <b-col cols="8">
          <h4 class="my-3 font-weight-bold">Cadastro de Idade Recomendada</h4> <br/>
          <b-form-group
              id="idade"
              class="font-weight-bold"
              label="Digite a idade"
              label-for="Idade"
              :state="idade.idade ? true : false"
          >
            <b-form-input
                id="idade"
                type="text"
                placeholder="Digite a idade recomendada para o cadastro"
                v-model="idade.idade"
            ></b-form-input>

          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center">
        <b-col class="mt-5 p-3" cols="0">
          <b-button variant="primary" class="px-5" @click="addNewIdade">
            Cadastrar
          </b-button>
        </b-col>
      </b-row>

    </b-col>
  </div>
</template>

<script>
import axios from "axios";
import {mask} from 'vue-the-mask'

export default {
  name: "CreateIdadeModal",
  data() {
    return {
      success: false,
      idade: {},
      error: null,
    };
  },
  directives: {
    mask
  },
  methods: {
    seeAlertSucesso(){
      this.$swal("Sucesso", "Idade Criado com Sucesso", "success")
    },
    seeAlertError(){
      this.$swal("Erro", "Algo de errado aconteceu ao criar a idade", "error")
    },
    addNewIdade() {
      if (!this.idade.idade) {
        this.error = "O campo Idade é obrigatório";
        return;
      }
      axios
          .post("http://127.0.0.1:8000/api/idades", this.idade)
          .then(() => {
            this.$emit("reloadDataTable");
            this.$emit("seeAlertSucesso");
            this.seeAlertSucesso();
            this.success = true
            this.idade.idade = "";
          })
          .catch(() => {
            this.seeAlertError()
          });
    },
  },
};
</script>
