<template>
  <div>
    <Table :items="tickets" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="mx-2" @click="onEditar(item)" slot.scope="{ item }">Editar</b-button>
        <b-button class="mx-2 btn btn-danger" @click="onEliminar(item)" slot.scope="{ item }">Eliminar</b-button>
        <b-button class="mx-2 btn btn-warning" @click="onEstatus(item)">Cambiar Estatus</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";
export default {
  name: "TablaTickets",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "id", label: "Id" },
        { key: "nombre" },
        {
          key: "descripcion",
          label: "Descripción",
          formatter: (value) => {
            return value || "-";
          },
        },
        {
          key: "prioridad",
        },
        {
          key: "reportero",
        },
        {
          key: "categoria",
        },
        {
          key: "estatus",formatter: (value) => {
            if(value === "ABT") return "Abierto";
            if(value === "ESP") return "En espera";
            if(value === "FIN") return "Finalizado";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["tickets", "loading"]),
  },
  methods: {
    ...mapActions(["obtenerTickets", "eliminarTickets"]),
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar el ticket",
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
            this.eliminarTickets({
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
    onEstatus(item){
     this.$router.push({
        name: "EditarEstatus",
        params: {
          id: item.item.id,
        },
      });
    },
    onEditar(item){
     this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.id,
        },
      });
    },
  },
  mounted() {
    this.obtenerTickets();
  },
};
</script>

<style>
</style>