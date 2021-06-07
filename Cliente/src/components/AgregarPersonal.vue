<template>
  <div>
    <b-form @submit.prevent="guardarPersonal()">
      <Input
        v-model="personal.nombre"
        id="nombre"
        titulo="Nombre:"
        placeholder="Ingresa el Nombre"
        :maxlength="50"
        :error="erroresValidacion && !validarNombre"
        mensajeError="El nombre es obligatorio"
        class="mb-2"
      />
      <Input
        v-model="personal.apellidos"
        id="apellidos"
        titulo="Apellidos:"
        placeholder="Ingresa los apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validarApellidos"
        mensajeError="El Apellidos es obligatorio"
        class="mb-2"
      />
      <Input
        v-model="personal.telefono"
        id="telefono"
        titulo="Teléfono:"
        placeholder="Ingresa el telefono"
        :maxlength="10"
        class="mb-2"
      />
      <Input
        v-model="personal.direccion"
        id="direccion"
        titulo="Dirección:"
        placeholder="Ingresa la dirección"
        :maxlength="150"
        class="mb-2"
      />
      <b-button type="submit" class="m-4">Agregar</b-button>
    </b-form>
  </div>
</template>

<script>
import Input from "../components/Input";
import { mapActions } from "vuex";

export default {
  name: "AgregarPersonal",
  components: {
    Input,
  },
  data() {
    return {
      personal: {
        nombre: "",
        apellidos: "",
        direccion: "",
        telefono: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validarNombre() {
      return (
        this.personal.nombre !== undefined && this.personal.nombre.trim() !== ""
      );
    },
    validarApellidos() {
      return (
        this.personal.apellidos !== undefined &&
        this.personal.apellidos.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearPersonal"]),
    guardarPersonal() {
      if (this.validarNombre && this.validarApellidos) {
        this.erroresValidacion = false;
        //Guardar
        this.crearPersonal({
          params: this.personal,
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
};
</script>

<style>
</style>