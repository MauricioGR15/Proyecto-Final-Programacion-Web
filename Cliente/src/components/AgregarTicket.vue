<template>
  <div>
    <b-form @submit.prevent="guardarTicket()">
      <Input
        v-model="tickets.nombre"
        id="nombre"
        titulo="Nombre:"
        placeholder="Ingresa el Nombre"
        :maxlength="50"
        :error="erroresValidacion && !validarNombre"
        mensajeError="El nombre es obligatorio"
        class="mb-2"
      />
      <Input
        v-model="tickets.descripcion"
        id="descripcion"
        titulo="Descripción:"
        placeholder="Ingresa la descripcion"
        :maxlength="100"
        class="mb-2"
      />

      <label class="form-label"> Prioridad: </label>
      <b-form-select
        v-model="tickets.prioridad"
        :options="pri"
        size="sm"
        class="mt-3 mx-4"
      ></b-form-select>

      <b-button type="submit" class="m-4 btn btn-success">Agregar</b-button>
    </b-form>
  </div>
</template>

<script>
import Input from "../components/Input";
import { mapActions, mapState } from "vuex";
export default {
  name: "AgregarTickets",
  components: {
    Input,
  },
  data() {
    return {
      tickets: {
        nombre: "",
        descripcion: "",
        prioridad: "1",
        reportero: "1",
        categoria: "9",
        estatus: "ABT",
      },
      pri: [
        { value: "1" , text: "Baja" },
        { value: "2", text: "Media" },
        { value: "3", text: "Alta" },
      ],
      erroresValidacion: false,
    };
  },
  computed: {
      ...mapState(["personal", "categorias" ,"loading"]),
      validarNombre() {
      return (
        this.tickets.nombre !== undefined && this.tickets.nombre.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearTickets", "obtenerPersonal", "obtenerCategorias"]),
    guardarTicket() {
      if (this.validarNombre) {
        this.erroresValidacion = false;
        //Guardar
        this.crearTickets({
          params: this.tickets,
          onComplete: (response) => {
            console.log(response.data);
            this.$notify({
              type: "success",
              title: response.data.mensaje,
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
      } else {
        this.erroresValidacion = true;
      }
    },
  },
  mounted() {
    this.obtenerPersonal();
    this.obtenerCategorias();
  },
};
</script>

<style>
</style>