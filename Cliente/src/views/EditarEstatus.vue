<template>
  <div>
    <b-form @submit.prevent="guardarTicket()" v-if="ticket">
      <h3 class="my-3">Editar estatus del ticket 🤖</h3>
      <h4>Nombre: {{ ticket.data[0].nombre }}</h4>
      <p>{{ ticket.data[0].descripcion }}</p>
      <label> Estatus: </label>
      <b-form-select
        v-model="ticket.estatus"
        :options="opt"
        class="mt-3 mx-4"
      ></b-form-select>
      <b-button class="mx-2 btn- btn-danger" to="/tickets">Cancelar</b-button>
      <b-button type="submit" class="m-4 btn btn-success">Editar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Vue from "vue";

export default {
  name: "EditarEstatus",
  components: {},
  data() {
    return {
      opt: [
        { value: "ABT", text: "Abierto" },
        { value: "ESP", text: "En espera" },
        { value: "FIN", text: "Finalizado" },
      ],
      campos: [
        { key: "id", label: "Id" },
        { key: "nombre" },
        { key: "Descripcion", label: "Eliminar" },
      ],
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["ticket"]),
  },
  methods: {
    ...mapActions(["obtenerUnTicket", "actualizarEstatus"]),
    guardarTicket() {
      this.actualizarEstatus({
        id: this.$route.params.id,
        params: this.ticket,
        onComplete: (response) => {
          console.log(response.data);
          this.$notify({
            type: "success",
            title: "Se realiza el cambio con éxito",
          });
          this.$router.push({
            path: "/tickets",
          });
        },
        onError: (error) => {
          console.log(error.response.data.mensaje);
          this.$notify({
            type: "error",
            title: error.response.data.mensaje,
          });
        },
      });
    },
  },
  created() {
    this.obtenerUnTicket({
      id: this.$route.params.id,
      onComplete: (response) => {
        const t = response.data[0];
        Vue.set(this, "ticket", t);
      },
    });
  },
};
</script>

<style>
</style>