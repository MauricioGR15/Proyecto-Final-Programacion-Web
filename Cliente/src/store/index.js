import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        personal: [],
        persona:{},
        categorias: [],
        tickets: [],
        ticket:{},
    },

    mutations: {
        SET_PERSONAL(state, personal) {
            state.personal = personal;
        },
        SET_PERSONA(state, persona){
            state.persona = persona;
        },
        SET_CATEGORIAS(state, categorias) {
            state.categorias = categorias;
        },
        SET_TICKETS(state, tickets) {
            state.tickets = tickets;
        },
        SET_TICKET(state, ticket){
            state.ticket = ticket;
        }
    },

    actions: {
        //Categorias
        crearCategoria({commit}, {params,onComplete,onError}) { // eslint-disable-line no-unused-vars
            axios.post('http://localhost:3000/categorias', params)
                .then(onComplete)
                .catch(onError)
        },
        obtenerCategorias({commit}) {
            commit("SET_LOADING", true)
            axios.get('http://localhost:3000/categorias')
                .then(response =>commit("SET_CATEGORIAS", response.data))
                .finally(() => commit("SET_LOADING", true))
        },
        eliminarCategoria({commit}, {id, onComplete, onError}){ // eslint-disable-line no-unused-vars
            axios.delete(`http://localhost:3000/categorias/${id}`)
            .then(onComplete)
            .catch(onError)
        },
        //Personal
        crearPersonal({commit}, {params,onComplete,onError}) { // eslint-disable-line no-unused-vars
            axios.post('http://localhost:3000/personas', params)
                .then(onComplete)
                .catch(onError)
        },
        obtenerPersonal({commit}) {
            commit("SET_LOADING", true)
            axios.get('http://localhost:3000/personas')
                .then(response =>commit("SET_PERSONAL", response.data))
                .finally(() => commit("SET_LOADING", true))
        },
        obtenerUnPersonal({commit}, {id} ) {
            commit("SET_LOADING", true)
            axios.get(`http://localhost:3000/personas/${id}`)
                .then(response =>commit("SET_PERSONA", response.data))
                .finally(() => commit("SET_LOADING", true))
        },
        editarPersonal({commit}, {id, params , onComplete, onError}){ // eslint-disable-line no-unused-vars
            axios.put(`http://localhost:3000/personas/${id}`, params)
            .then(onComplete)
            .catch(onError)
        },
        eliminarPersonal({commit}, {id, onComplete, onError}){ // eslint-disable-line no-unused-vars
            axios.delete(`http://localhost:3000/personas/${id}`)
            .then(onComplete)
            .catch(onError)
        },
        //Tickets
        crearTickets({commit}, {params,onComplete,onError}) { // eslint-disable-line no-unused-vars
            axios.post('http://localhost:3000/tickets', params)
                .then(onComplete)
                .catch(onError)
        },
        obtenerTickets({commit}) {
            commit("SET_LOADING", true)
            axios.get('http://localhost:3000/tickets')
                .then(response =>commit("SET_TICKETS", response.data))
                .finally(() => commit("SET_LOADING", true))
        },
        obtenerUnTicket({commit}, {id} ) {
            commit("SET_LOADING", true)
            axios.get(`http://localhost:3000/tickets/${id}`)
                .then(response =>commit("SET_TICKET", response.data))
                .finally(() => commit("SET_LOADING", true))
        },
        editarTickets({commit}, {id, params , onComplete, onError}){ // eslint-disable-line no-unused-vars
            axios.put(`http://localhost:3000/tickets/${id}`, params)
            .then(onComplete)
            .catch(onError)
        },
        //Falta el de editar status
        eliminarTickets({commit}, {id, onComplete, onError}){ // eslint-disable-line no-unused-vars
            axios.delete(`http://localhost:3000/tickets/${id}`)
            .then(onComplete)
            .catch(onError)
        }
    }
})