<template>
  <div>
    <b-form @submit.prevent="guardarTicket()">
      <Input
        v-model="ticket.data[0].descripcion"
        id="descripcion"
        titulo="Descripción:"
        placeholder="Ingresa la descripcion"
        :maxlength="100"
        class="my-3"
      />
      <label class="form-label">Categoría: </label>
      <b-form-select
        v-model="ticket.data[0].categoria"
        :options="categorias"
        text-field="nombre"
        value-field="id"
      ></b-form-select>
      <label class="form-label">Reportero: </label>
      <b-form-select
        v-model="ticket.data[0].reportero"
        :options="personal"
        text-field="nombre"
        value-field="id"
      ></b-form-select>
      <label class="form-label">Prioridad: </label>
      <b-form-select
        v-model="ticket.data[0].prioridad"
        :options="pri"
        size="sm"
        class="mt-3 mx-4"
      ></b-form-select>
      <b-button class="mx-2 btn- btn-danger" to="/tickets">Cancelar</b-button>
      <b-button type="submit" class="m-4 btn btn-success">Editar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import Input from "../components/Input";
import { mapActions, mapState } from "vuex";

export default {
  name: "EditarTicket",
  components: {
    Input,
  },
  data() {
    return {
      pri: [
        { value: "1", text: "Baja" },
        { value: "2", text: "Media" },
        { value: "3", text: "Alta" },
      ],
    };
  },
  computed: {
    ...mapState(["ticket", "personal", "categorias"]),
  },
  methods: {
    ...mapActions([
      "obtenerUnTicket",
      "obtenerCategorias",
      "obtenerPersonal",
      "editarTickets",
    ]),
    guardarTicket() {
      this.editarTickets({
        id: this.$route.params.id,
        params: this.ticket.data[0],
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
    this.obtenerPersonal();
    this.obtenerCategorias();
    this.obtenerUnTicket({
      id: this.$route.params.id,
      onComplete: (response) => {
        const t = response.data[0];
        console.log(t);
        Vue.set(this, "ticket", t);
      },
    });
  },
};
</script>

<style>
</style>