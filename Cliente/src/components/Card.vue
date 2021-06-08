<template>
  <div>
    <b-card
      :title="nombre"
      style="width: 25rem; heigth: 30rem;"
      class="mb-2"
      v-bind:class="estatus"
    >
      <b-card-text> {{ descripcion }} </b-card-text>
      <p> {{ reportero }} </p> <p> {{ prioridad }} </p>
      <p> {{ categoria }} </p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    nombre: String,
    descripcion: String,
    prioridad: String,
    reportero: String,
    categoria: String,
    estatus: String,
  },
  data() {
    return {};
  },
  computed: {
    Color() {
      return this.color;
    },
  },
};
</script>

<style scoped>
    
</style>