<template>
    <base-layout pageTitle="Edit To Do" pageDefaultBackLink="/">
    <ion-card>
        <ion-card-content>
    <ion-item>
        <ion-textarea placeholder="Edit ToDo description" v-model="description"></ion-textarea>
    </ion-item>
    <ion-button expand="block" @click="editToDo(description)">Edit Your ToDo</ion-button>
        </ion-card-content>
    </ion-card>
    </base-layout>
    </template>
    <script lang="ts">
    import {
        IonItem,
        IonTextarea,
        IonButton,
        IonCard,
        IonCardContent,
        } from '@ionic/vue'
    import { useStore } from '../store';
    import { useRouter, useRoute } from 'vue-router'
import { ref } from '@vue/reactivity';
    export default {
        components: {
            IonItem,
            IonTextarea,
            IonButton,
            IonCard,
            IonCardContent,    
        },
        setup () {
        const store = useStore();
        const route = useRoute();
        let currentItem = store.state.items.find(item=> item.id === Number(route.params.id));
        const description = currentItem? currentItem.description : '';
        const router = useRouter();
        const date = ref('');
        const editToDo = (description:string) => {
             store.commit('EDIT_TO_DO', {description: description, id: Number(route.params.id)});
             router.push('/');
        }
        return {description, editToDo, date};
        },
    }
    </script>