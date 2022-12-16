/* eslint-disable */
<template>
    <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" />
    <transition name="fade">
        <span
            v-if="loading"
        >
            <i ></i>
        </span>
    </transition>
    <div>
        <div >
            <h1 >Productos</h1>
            <v-btn
                @click="$router.push('/')"
            >Atrás</v-btn>
        </div>
        <br>
        <br>

        <div >
            <div
                v-for="product in products"
                :key="product.id"
                :style="{'display': 'flex', 'justify-content': 'center', 'margin-bottom':'2rem'}"
            >
                <v-card elevation="6" :style="{'padding': '1rem'}">
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <v-img
                                max-height="243"
                                max-width="250"
                                v-bind:src="`${product.image}`"
                            />
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <div>
                                <h1 >{{ product.title }}</h1>
                                <p >{{ product.description }}</p>
                                <div :style="{'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-direction': 'column'}">
                                    <h1 >${{ product.price }}</h1>
                                    <star-rating v-model="calif" />
                                    <v-btn @click="calificar(product.title)">Calificar</v-btn>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>
    </div>
</template> 


<script>
import axios from 'axios';
import StarRating from 'vue-star-rating';
import { ref } from 'vue';

// import StarRating from 'vue-star-rating';
import Swal from 'sweetalert2'

// const wrapper = document.createElement('div');
// const estado = {
//   nota: 0,
// };
// const ComponenteEstrellas = Vue.$mount({
//   data() {
//     return { calif: 0 };
//   },
//   watch: {
//     calif(nuevoValor) { estado.nota = nuevoValor; },
//   },
//   template: `
//   <div class="rating">
//     ¿Cómo le pareció este producto?
//     <star-rating v-model="calif" :show-rating="false"></star-rating>
//   </div>`,
//   components: { 'star-rating': StarRating },
// });
// const componente = new ComponenteEstrellas().$mount(wrapper);
const calif = ref('')
//const productoNombre = ref('')

export default {
    data() {
        return {
            products: [],
            loading: true,
        }
    },
    async created() {
        try {
            const res = await axios.get(
                "https://fakestoreapi.com/products/category/men's%20clothing"
            )
            this.loading = false;
            this.products = res.data
    

        } catch (e) {
            console.error(e)
        }
    },

    components: { 'star-rating': StarRating, },
    
    methods: {
        async calificar(productoNombre) {
            try {
                return axios({
                    method: 'post',
                    data: {
                        calificacion: calif.value,
                    },
                    url: `/productos/calificar/${productoNombre}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } catch(err) {
                console.error(err)
                Swal.fire('Error', err.message, 'error');
            }
            Swal.fire('Exito', 'Gracias por calificar el producto', 'succes');
        },
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
