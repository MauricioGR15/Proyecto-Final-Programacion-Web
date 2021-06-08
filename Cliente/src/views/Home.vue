<template>
  <div>
    <img
      class="mt-2"
      alt="Imagen de bienvenida"
      src="../assets/CatsWelcome.svg"
      width="200"
    />
    <div class="contenedor">
      <Card
        v-for="ticket in tickets"
        :key="ticket.id"
        :nombre="ticket.nombre"
        :descripcion="ticket.descripcion"
        :reportero="ticket.reportero"
        :categoria="ticket.categoria"
        :estatus="obtenerEstatus(ticket.estatus)"
        :prioridad="obtenerPrioridad(ticket.prioridad)"
      />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    Card,
  },
  
  computed: {
    ...mapState(["tickets", "categorias"]),
  },
  methods: {
    ...mapActions(["obtenerTickets", "obtenerCategorias"]),
    obtenerEstatus(estatus) {
      if (estatus === "ABT") return "border-danger";
      if (estatus === "ESP") return "border-success";
      if (estatus === "FIN") return "border-secondary";
    },
    obtenerPrioridad(prioridad) {
      if (prioridad === "1") return "Baja";
      if (prioridad === "2") return "Media";
      if (prioridad === "3") return "Alta";
    },
  },
  created() {
    this.obtenerTickets();
    this.obtenerCategorias();
  },
};
</script>

<style>
.contenedor {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: start;
  gap: 1rem;
  padding: 4rem;
}
</style>
