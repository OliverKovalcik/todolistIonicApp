<template>
    <base-layout pageTitle="ToDoList">
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button :router-link="`/create-todo`">
                    <ion-icon :icon="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
    <ion-list>
        <ion-item lines="full" v-for="item in items" :key="item.id">
            <ToDoItem :task="item"></ToDoItem>
        </ion-item>
    </ion-list>
</base-layout>
</template>
<script lang="ts">
import {
    IonList,
    IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    } from '@ionic/vue'
import { defineComponent, computed } from 'vue';
import { add } from 'ionicons/icons';
import { useStore } from '../store';
import ToDoItem from './ToDoItem.vue'
export default  defineComponent ({
    name: 'ToDoList',
    components: {
        IonList,
        IonItem,
        IonFab,
        IonFabButton,
        IonIcon,
        ToDoItem
    },
 
    setup() {
    const store = useStore();
    const handleCheckbox = (id: number) => store.commit("HANDLE_CHECKBOX", id);
    const items = computed(()=>store.state.items)
    return {add,items, handleCheckbox}
    },

    // computed: {
    //     items(){
    //         const store = useStore();
            
    //     }
    // },


});
</script>