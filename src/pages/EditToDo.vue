<template>
    <base-layout pageTitle="Edit To Do" pageDefaultBackLink="/">
    <ion-card>
        <ion-card-content>
    <ion-item>
        <ion-label position="floating">Edit ToDo</ion-label>
        <ion-input placeholder="Edit ToDo" v-model="title"></ion-input>
    </ion-item>
    <ion-button expand="block" @click="editToDo(title)">Edit Your ToDo</ion-button>
        </ion-card-content>
    </ion-card>
    </base-layout>
    </template>
    <script lang="ts">
    import {
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonCard,
        IonCardContent
        } from '@ionic/vue'
    import { useStore } from '../store';
    import { useRouter, useRoute } from 'vue-router'
    export default {
        components: {
            IonItem,
            IonLabel,
            IonInput,
            IonButton,
            IonCard,
            IonCardContent
        },
        setup () {
        const store = useStore();
        const title = '';
        const router = useRouter();
        const route = useRoute();

        const editToDo = (title:string) => {
             store.commit('EDIT_TO_DO', {title: title, id: Number(route.params.id)});
             router.push('/');
    
        }
        return {title, editToDo};
        },
    }
    </script>