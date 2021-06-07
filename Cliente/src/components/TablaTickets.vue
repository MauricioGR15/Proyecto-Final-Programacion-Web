<template>
  <div>
    <Table :items="tickets" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button class="mx-2" @click="onEditar(item)" slot.scope="{ item }">Editar</b-button>
        <b-button class="mx-2 btn btn-danger" @click="onEliminar(item)">Eliminar</b-button>
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
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["tickets", "loading"]),
  },
  methods: {
    ...mapActions(["obtenerTickets", "eliminarTickets"]),
  },
  mounted() {
    this.obtenerTickets();
  },
};
</script>

<style>
</style>