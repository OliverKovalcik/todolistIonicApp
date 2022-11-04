<template>
<base-layout pageTitle="Create ToDo" pageDefaultBackLink="/">
<ion-card>
    <ion-card-content>
<ion-item>
    <ion-label position="floating">Enter ToDo</ion-label>
    <ion-input placeholder="Enter ToDo" v-model="title"></ion-input>
</ion-item>
<ion-button expand="block" @click="saveToDo(title)">Save Your ToDo</ion-button>
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
import { useStore, StateItem } from '../store';
import { useRouter } from 'vue-router'
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
    const generateId = ():number => {
        let values = store.state.items;
        let maxValue= 0;
        values.forEach(function(item: StateItem)  {
           if(maxValue < item.id){
               maxValue = item.id; 
           }
        });
        return maxValue+1;
    }; 
    const saveToDo = (title:string) => {
        let newToDo: StateItem = {id: generateId(), title: title, isChecked: false, isSoftDone: false, isSoftDeleted: false};
        store.commit('CREATE_TO_DO', newToDo);
        router.push('/');

    }
    return {title, saveToDo};
    },
}
</script>