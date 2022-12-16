/* eslint-disable */
<template>
  <div>
    <v-btn
    @click="$router.push('/')"
    >Atrás</v-btn>
  </div>
  <h1 class="h1-titulo"> Este es el componente para las pruebas</h1>

  <label :for="id + '_button'" :class="{'activo': estaActivo}" class="toggle__button">
    <span v-if="estaActivo" class="toggle__label">Encendido</span>
    <span v-if="!estaActivo" class="toggle__label">Apagado</span>

    <input type="checkbox" :id="id + '_button'" v-model="valorObtenido">
    <span class="toggle__switch"></span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      estadoActual: false
    }
  },

  computed: {
    estaActivo() {
      return this.estadoActual;
    },

    valorObtenido: {
      get() {
        return this.estadoActual;
      },

      set(nuevoValor) {
        this.estadoActual = nuevoValor;
      }
    }
  }
}
</script>
