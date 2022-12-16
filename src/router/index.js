/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";

import Home from '/src/components/PrincipalPagina.vue'
// import About from '/src/components/About.vue'
// import Products from '/src/components/Products.vue'
// import Todos from '/src/components/Todos.vue'

const routes = [
    {
        path: '/',
        name: 'Principal',
        component: Home,
    },
    {
        path: '/productos',
        name: 'Productos',
        component: () => import('/src/components/ProductosPagina.vue'), //lazy loaded
    },
    {
        path: '/lista',
        name: 'Lista',
        component: () => import('/src/components/ListaPagina.vue'),
    },
    {
        path: '/pruebas',
        name: 'Pruebas',
        component: () => import('/src/components/Pruebas.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router