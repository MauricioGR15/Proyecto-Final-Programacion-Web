<template>
  <div>
    <Table :items="personal" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="mx-2" @click="onEditar(item)" slot.scope="{ item }">Editar</b-button>
        <b-button class="mx-2 btn btn-danger" @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";

export default {
  name: "TablaPersonal",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "id", label: "Id" },
        { key: "nombre" },
        { key: "apellidos" },
        {
          key: "telefono",
          label: "Teléfono",
          formatter: (value) => {
            return value || "-";
          },
        },
        {
          key: "direccion",
          label: "Dirección",
          formatter: (value) => {
            return value || "-";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["personal", "loading"]),
  },
  methods: {
    ...mapActions(["obtenerPersonal", "eliminarPersonal"]),
    onEditar(item) {
      console.log("Editar", item.item.id);
      this.$router.push({
        name: "EditarPersonal",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar del Personal",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          footerClass: "p-2",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarPersonal({
              id: item.item.id,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonas(), 1000);
              },
            });
          }
        })
        .catch((err) => {// eslint-disable-line no-unused-vars
          // An error occurred
        });
    },
  },
  mounted() {
    this.obtenerPersonal();
  },
};
</script>

<style>
</style>