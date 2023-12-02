<template>
  <b-container class="card">
    <b-row>
      <b-col class="mt-3">
        <b-form-group label="Nome do Livro" label-for="nome" label-class="h4 font-weight-bold" class="mb-4">
          <b-input-group class="rounded-pill">
            <b-form-input
                id="nome"
                v-model="form.searchLiv"
                placeholder="Pesquisar o Livro"
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
        :sort-desc.sync="form.sortDesc"
        class="text-center"
    >
      <template #cell(contact_name)="data">
        {{ `${data.item.contact_firstname} ` }}
      </template>
      <template #cell(livro_status)="data">
        <b-icon-bookmark-check-fill
            variant="success"
            v-if="data.item.livro_status === 'active'"
        ></b-icon-bookmark-check-fill>
        <b-icon-bookmark-x-fill
            variant="danger"
            v-else
        ></b-icon-bookmark-x-fill>
      </template>
      <template #cell(actions)="data">
        <b-row class="justify-content-center">
          <b-col cols="1">
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
        ref="edit-livro-modal"
        size="xl"
        hide-footer
    >
      <edit-livro-form
          @closeEditModal="closeEditModal"
          @reloadDataTable="getlivroData"
          @seeAlertSucesso="seeAlertSucesso"
          :livroId="livroId"
      ></edit-livro-form>
    </b-modal>

  </b-container>
</template>

<script>
import axios from "axios";
import EditLivroForm from "@/components/EditLivroForm.vue";

export default {
  components: {
    EditLivroForm,

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
          key: "nome",
          label: "Nome do Livro",
          sortable: true,
        },
        {
          key: "idade.idade",
          label: "Idade Recomendada",
          sortable: false,
        },
        {
          key: "tipo",
          label: "Tipo",
          sortable: false,
        },
        {
          key: "datalancamento",
          label: "Data de Lançamento",
          sortable: false,
        },
        {
          key: "autor",
          label: "Autor(a)",
          sortable: false,
        },
        {
          key: "descricao",
          label: "Descrição do Livro",
          sortable: false,
        },
        "actions",
      ],
      form: {
        sortBy: 'nome',
        sortDesc: false,
        page: 1,
        nome: null,
        searchLiv: '',
      },
      items: [],
      livroId: 0,

    };
  },
  mounted() {
    this.getlivroData();
  },
  methods: {
    getlivroData() {
      axios
          .get("http://127.0.0.1:8000/api/livro/livros/")
          .then((response) => {
            this.items = response.data;
            console.log(this.items)
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getRowData(id) {
      this.$refs["edit-livro-modal"].show();
      this.livroId = id;
    },
    closeEditModal() {
      this.$refs["edit-livro-modal"].hide();
    },
    searchData() {
      const searchLiv = this.form.searchLiv.toLowerCase();
      this.items = this.items.filter(item => {
        return item.nome.toLowerCase().includes(searchLiv);
      });
    },
    seeAlertSucesso() {
      this.$swal("Sucesso", "Livro Atualizado com Sucesso", "success")
    },
    seeAlertDeleted() {
      this.$swal("Sucesso", "Idade Deletado com Sucesso", "success")
    },
    seeAlertError() {
      this.$swal("Erro", "Algo de errado aconteceu ao atualizar o Livro", "error")
    },
    cleanFild(){
      this.form.searchLiv = '';
      this.getlivroData();
    },
    deleteCadastro(id) {
      return this.$swal({
        text: 'Deseja deletar o Livro',
        icon: 'warning',
        showCancelButton: true,
      }).then((value) => {
        if (value.isConfirmed) {
          axios
              .delete(`http://127.0.0.1:8000/api/livro/livros/${[id]}`)
              .then((response) => {
                console.log(response.data);
                this.getlivroData()
                this.seeAlertDeleted()
              })
              .catch((error) => {
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

.alert {
  width: 100%;
  text-align: center;
}
</style>