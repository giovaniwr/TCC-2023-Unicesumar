<template>
  <b-form class="mt-5">
    <h4 class="text-center">Atualize o Idade</h4>
    <b-row class="justify-content-center">

        <b-col cols="8">
          <p>Idade:</p>
            <b-form-input
                id="idade"
                type="text"
                required
                placeholder="Idade"
                v-model="idade.idade"
            ></b-form-input>
        </b-col>
      </b-row>

    <b-row class="mt-4 ">
      <b-col cols="5">
      </b-col>
      <b-col>
         <b-button variant="primary" class="px-5 mx-2" @click="updateIdade"
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
  name: "CreateIdadeModal",
  props: {
    idadeId: Number,
  },
  data() {
    return {
      idade: {},
    };
  },
  mounted() {
    this.getIdadeByID();
  },
  methods: {
    triggerClose() {
      this.$emit("closeEditModal");
    },
    getIdadeByID() {
      axios
          .get(`http://127.0.0.1:8000/api/idades/${this.idadeId}`)
          .then((response) => {
            this.idade = response.data.data;
          })
          .catch(() => {
          });
    },
    updateIdade() {
      axios
          .put(
              `http://127.0.0.1:8000/api/idades/${this.idadeId}`,
              this.idade
          )
          .then(() => {
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