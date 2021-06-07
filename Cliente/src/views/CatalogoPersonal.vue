<template>
  <div class="m-4">
    <h2>Catalogo de Personal</h2>
    <b-tabs content-class="mt-3">
        <b-tab title="Catálogo" active><TablaPersonal/></b-tab>     
        <b-tab title="Agregar"><AgregarPersonal/></b-tab>       
    </b-tabs>
  </div>
</template>

<script>
import TablaPersonal from '../components/TablaPersonal'
import AgregarPersonal from '../components/AgregarPersonal'

export default {
    name: 'CatalogoPersonal',
    components: {
        TablaPersonal,
        AgregarPersonal,
    }
};
</script>

<style>
</style>