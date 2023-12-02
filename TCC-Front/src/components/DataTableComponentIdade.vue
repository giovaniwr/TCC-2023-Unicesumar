<template>
  <b-container class="card">
    <b-row>
      <b-col class="mt-3">
        <b-form-group label="Idade Recomendada" label-for="idade" label-class="h4 font-weight-bold" class="mb-4 ">
          <b-input-group class="rounded-pill">
            <b-form-input
                id="idade"
                v-model="form.searchIdade"
                placeholder="Pesquisar Idade"
                class=" col-6"
            ></b-form-input>
            <b-col cols="auto">
              <div class="form-group">
                <b-button variant="primary" @click='searchData'>
                  <i class="fas fa-search"></i>
                  <span>Filtrar</span>
                </b-button>
                <b-button type="reset" variant="danger" @click="cleanFild">
                  <i class="fas fa-times"></i>
                  <span>Limpar</span>
                </b-button>
              </div>
            </b-col>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
        striped
        hover
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :sort-by.sync="form.sortBy"
        class="text-center"
    >
      <template #cell(contact_name)="data">
        {{ `${data.item.contact_firstname} ` }}
      </template>
      <template #cell(idade_status)="data">
        <b-icon-bookmark-check-fill
            variant="success"
            v-if="data.item.idade_status === 'active'"
        ></b-icon-bookmark-check-fill>
        <b-icon-bookmark-x-fill
            variant="danger"
            v-else
        ></b-icon-bookmark-x-fill>
      </template>
      <template #cell(actions)="data" >
        <b-row class="justify-content-center">
          <b-col cols="1" class="align-items-end">
            <b-icon-pencil-square
                class="action-item"
                variant="primary"
                @click="getRowData(data.item.id)"
            ></b-icon-pencil-square>
          </b-col>
          <b-col cols="1">
            <b-icon-trash-fill
                class="action-item"
                variant="danger"
                @click="deleteCadastro(data.item.id)"
            ></b-icon-trash-fill>
          </b-col>
        </b-row>
      </template>
    </b-table>

    <div class="overflow-auto">
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
      ></b-pagination>
    </div>

    <b-modal
        ref="edit-idade-modal"
        size="xl"
        hide-footer
    >
      <edit-idade-form
          @closeEditModal="closeEditModal"
          @reloadDataTable="getidadeData"
          @seeAlertSucesso="seeAlertSucesso"
          :idadeId="idadeId"
      ></edit-idade-form>
    </b-modal>

  </b-container>
</template>

<script>
import axios from "axios";
import EditIdadeForm from "@/components/EditIdadeForm.vue";

export default {
  components: {
    EditIdadeForm,

  },
  data() {
    return {
      perPage: 7,
      currentPage: 7,
      fields: [
        {
          key: "id",
          label: "",
        },
        {
          key: "idade",
          label: "Idade",
          sortable: true,
        },
        {
          key: "totalDev",
          label: "Livros cadastrados",
          sortable: false,
        },
        "actions",
      ],
      items: [],
      form: {
        sortBy: 'idade',
        sortDesc: false,
        page: 1,
        idade: null,
        searchIdade: ''
      },
      idadeId: 0,

    };
  },
  mounted() {
    this.getidadeData();
  },
  methods: {
    getidadeData() {
      axios
          .get("http://127.0.0.1:8000/api/idades")
          .then((response) => {
            this.items = response.data.data;
            console.log(this.items)
          })

          .catch((error) => {
            alert("Não foi possivel buscar os idade")
            console.log(error);
          });
    },
    getRowData(id) {
      this.$refs["edit-idade-modal"].show();
      this.idadeId = id;
    },
    closeEditModal() {
      this.$refs["edit-idade-modal"].hide();
    },
    searchData() {
      const  searchIdade = this.form.searchIdade.toLowerCase();
      this.items = this.items.filter(item => {
        return item.idade.toLowerCase().includes(searchIdade);
      });
    },
    seeAlertSucesso() {
      this.$swal("Sucesso", "Livro Atualizado com Sucesso", "success")
    },
    seeAlertDeleted() {
      this.$swal("Sucesso", "Livro Deletado com Sucesso", "success")
    },
    seeAlertIdadecreated() {
      this.$swal("Erro", "Não foi possivel deletar, o idade está cadastrado em um Livro", "error")
    },
    seeAlertError() {
      this.$swal("Erro", "Algo de errado aconteceu ao atualizar o Livro", "error")
    },
    cleanFild(){
      this.form.searchIdade = '';
      this.getidadeData();
    },

    deleteCadastro(id) {
      return this.$swal({
        text: 'Deseja deletar o Idade',
        icon: 'warning',
        showCancelButton: true,
      }).then((value) => {
        if (value.isConfirmed) {
          axios
              .delete(`http://127.0.0.1:8000/api/idades/${[id]}`)
              .then((response) => {
                console.log(response.data);
                this.getidadeData()
                this.seeAlertDeleted()
              })
              .catch((error) => {
                if (error.response.status === 400) {
                  this.seeAlertIdadecreated()
                  // alert(error.response.data.error)
                }
                console.log(error);
              });
        }
      })
    },
  },
  computed: {
    rows() {
      return this.items.length
    }
  }
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}

</style>