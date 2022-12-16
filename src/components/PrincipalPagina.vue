/* eslint-disable */
<template>
    <div class="m-6 space-y-3.5">
        <h1 >Principal</h1>
        <p >Bienvenido : {{ name }}</p>
        <div :style="{'display': 'flex'}">
            <v-text-field
            v-model="newName"
            label="Tu Nombre"
            :rules="rules"
            hide-details="auto"
            :style="{'width': '60%'}"
            ></v-text-field>
            <v-btn class="boton" color="accent" elevation="2" outlined @click="saveName">Guardar Nombre</v-btn>
        </div>
        <v-btn block
            class="boton"
            @click="$router.push('/productos')"
            label="Productos"
            color="primary"
        >Productos</v-btn>
        <v-btn block
            class="boton"
            @click="$router.push('/lista')"
            label="Lista de pendientes"
            color="secondary"
        >Lista de pendientes</v-btn>
        <v-btn block
            class="boton"
            @click="$router.push('/pruebas')"
            label="Pruebas"
            color="secondary"
        >Pruebas</v-btn>
    </div>
</template> 

<script setup>
import { computed, ref } from 'vue'

import { useStore } from 'vuex'

import Swal from 'sweetalert2'


const store = useStore()

const name = computed(() => {
    return store.state.user.name
})

const newName = ref('')

function saveName() {
    if (newName.value != '') {
        store.dispatch('saveName', newName.value)
        newName.value = ''
        Swal.fire('Listo', 'Nombre guardado exitosamente', 'success');
    } else
        Swal.fire('Error', 'información faltante, favor de checar', 'error');
}

</script>