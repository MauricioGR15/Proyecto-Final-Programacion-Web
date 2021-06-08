<template>
  <div>
    <h2 class="my-3"> Editar Personal ✍ </h2>
    <b-form @submit.prevent="guardarPersonal()" v-if="persona">
      <Input
        v-model="persona.data[0].nombre"
        id="nombre"
        titulo="Nombre:"
        placeholder="Ingresa el Nombre"
        :maxlength="50"
        :error="erroresValidacion && !validarNombre"
        mensajeError="El nombre es obligatorio"
        class="mb-2"
      />
      <Input
        v-model="persona.data[0].apellidos"
        id="apellidos"
        titulo="Apellidos:"
        placeholder="Ingresa los apellidos"
        :maxlength="80"
        :error="erroresValidacion && !validarApellidos"
        mensajeError="El Apellidos es obligatorio"
        class="mb-2"
      />
      <Input
        v-model="persona.data[0].telefono"
        id="telefono"
        titulo="Teléfono:"
        placeholder="Ingresa el telefono"
        :maxlength="10"
        class="mb-2"
      />
      <Input
        v-model="persona.data[0].direccion"
        id="direccion"
        titulo="Dirección:"
        placeholder="Ingresa la dirección"
        :maxlength="150"
        class="mb-2"
      />
      <b-button class="mx-2 btn- btn-danger" to="/personal">Cancelar</b-button>
      <b-button type="submit" class="m-4">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import Input from "../components/Input";
import { mapActions, mapState } from "vuex";

export default {
  name: "EditarPersonal",
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
    ...mapState([ 'persona' ]),
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
    ...mapActions(["obtenerUnPersonal", "editarPersonal"]),
    guardarPersonal() {
      if (this.validarNombre && this.validarApellidos) {
        this.erroresValidacion = false;
        //Guardar
         this.editarPersonal({
          id: this.$route.params.id,
          params: this.personal,
          onComplete: (response) => {
           console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                path: '/personal'   
            })
            
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          }, 
        }); 
      } else {
        this.erroresValidacion = true;
      }
    }
  },
  created() {
    this.obtenerUnPersonal({
      id: this.$route.params.id,
      onComplete: (response) => {
        Vue.set(this, "persona", response.data);
      },
    });
  },
}; //Me falta hacer que los inputs tengan el value de persona
</script>

<style>
</style>