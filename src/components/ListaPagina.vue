/* eslint-disable */
<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
    <transition name="fade">
        <span
            v-if="loading"
            class="text-red-500 opacity-75 fixed top-1/3 left-1/2 my-0 mx-auto block w-0 h-0"
        >
            <i class="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
    </transition>
    <div class="m-6 space-y-3.5">
        <div>
            <div class="!flex justify-between">
                <h1 class="font-extrabold text-red-500 text-3xl">Lista de pendientes</h1>
                <v-btn
                    @click="$router.push('/')"
                >Atrás</v-btn>
            </div>
            <br>
            <br>
            <div :style="{'display': 'flex'}">
                <v-text-field
                    v-model="description"
                    type="text"
                    placeholder="New todo"
                    :style="{'width': '60%'}"
                />
                <v-btn
                    @click="addItem"
                    :disabled="!description"
                >Agregar</v-btn>
            </div>
        </div>

        <div >
            <div
                v-for="(todo, i) in todos"
                :key="todo._id"
                :style="{'display': 'flex', 'justify-content': 'center', 'margin-bottom': '2rem'}"
            >
                <v-card elevation="7" :style="{'width':'50%', 'padding': '1.5rem', 'background-color': '#fff89c'}">
                    <v-row>
                        <v-col
                            cols="12"
                            sm="1"
                            md="1"
                        >
                            <span >{{ i + 1 }}</span>
                            <span >{{ ' • ' }}</span>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="8"
                            md="8"
                        >
                            <v-text-field
                                v-if="isSelected(todo)"
                                v-model="editedDescription"
                            ></v-text-field>
                            <span v-else>{{ todo.description }}</span>
                        </v-col>
                        

                        <v-col
                            cols="12"
                            sm="3"
                            md="3"
                        >
                            <v-btn icon
                                class="mx-2"
                                fab
                                dark
                                color="primary"
                                @click="isSelected(todo) ? editItem(todo, i) : select(todo)"
                                >
                                <v-icon v-if="!isSelected(todo)" dark>
                                    mdi-pencil
                                </v-icon>
                                <v-icon v-else dark>
                                    mdi-content-save
                                </v-icon>
                            </v-btn>
                            <v-btn icon
                                class="mx-2"
                                fab
                                dark
                                color="pink"
                                @click="isSelected(todo) ? unselect() : removeItem(todo, i)"
                                >
                                <v-icon v-if="!isSelected(todo)" dark>
                                    mdi-delete
                                </v-icon>
                                <v-icon v-else dark>
                                    mdi-cancel
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </div>
    </div>
</template> 


<script>


import axios from 'axios'

let ruta = 'http://localhost:3000';

export default {
    data() {
        return {
            todos: [],
            loading: true,
            description: "",
            editedDescription: "",
            selected: {},
        }
    },
    async created() {
        try {
            const res = await axios.get(
                ruta + '/api/todoListItems/'
            )
            this.loading = false;
            this.todos = res.data


        } catch (e) {
            console.error(e)
        }
    },
    methods: {
        async addItem() {
            const res = await axios.post(
                ruta + '/api/todoListItems/', { description: this.description }
            )
            this.todos.push(res.data);
            this.description = "";
        },
        async removeItem(todo, i) {
            await axios.delete(ruta + '/api/todoListItems/' + todo._id);
            this.todos.splice(i, 1);
        },
        async editItem(todo, i) {
            const res = await axios.put(ruta + '/api/todoListItems/' + todo._id, { description: this.editedDescription });
            this.todos[i] = res.data;
            this.unselect();
        },
        select(todo) {
            this.selected = todo;
            this.editedDescription = todo.description;
        },
        unselect() {
            this.selected = {};
            this.editedDescription = {};
        },
        isSelected(todo) {
            return this.selected._id == todo._id
        }
    }
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