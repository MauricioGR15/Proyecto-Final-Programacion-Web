<template>
  <div class="m-4">
    <h2>Catalogo de Tickets</h2>
        <b-tabs content-class="mt-3">
        <b-tab title="Catálogo" active><TablaTickets/></b-tab>     
        <b-tab title="Agregar"><AgregarTicket/></b-tab>       
    </b-tabs>
  </div>
</template>

<script>
import TablaTickets from '../components/TablaTickets'
import AgregarTicket from '../components/AgregarTicket'
export default {
  name: 'CatalogoTickets',
  components: {
    TablaTickets,
    AgregarTicket,
  }
};
</script>

<style>
</style>