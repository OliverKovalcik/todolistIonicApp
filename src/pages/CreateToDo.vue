<template>
<base-layout pageTitle="Create ToDo" pageDefaultBackLink="/">
<ion-card>
    <ion-card-content>
<ion-item>
    <ion-label position="floating">Enter title</ion-label>
    <ion-input placeholder="Enter title" v-model="title"></ion-input>
</ion-item>
<ion-item>
    <ion-textarea placeholder="Enter description" :auto-grow="true" v-model="description">
    </ion-textarea>
</ion-item>
<ion-item>
        <ion-checkbox slot="start" :value="isGoalDateSet" @click="isGoalDateSet = !isGoalDateSet"></ion-checkbox>
        <ion-label>Set goal date:</ion-label>
    </ion-item>
<ion-datetime v-if="isGoalDateSet"  max="2100-05-31T23:59:59" v-model="date"></ion-datetime>
<ion-button expand="block" @click="saveToDo(title, date, description)">Save Your ToDo</ion-button>
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
    IonCardContent,
    IonCheckbox,
    IonDatetime,
    IonTextarea
    } from '@ionic/vue'
import { useStore, StateItem } from '../store';
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity';
export default {
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonCard,
        IonCardContent,
        IonCheckbox,
        IonDatetime,
        IonTextarea
    },
    setup () {
    const store = useStore();
    const title = '';
    const description = '';
    const router = useRouter();
    const date = ref('');
    const settingDate= ref(Object);
    const isGoalDateSet = ref(false);
    const generateId = ():number => {
        let values = store.state.items;
        let maxValue= 0;
        values.forEach((item) =>  {
           if(maxValue < item.id){
               maxValue = item.id; 
           }
        });
        return maxValue+1;
    }; 
    const saveToDo = (title:string, date:string, description: string) => {
        let newToDo: StateItem = {id: generateId(), title: title, isChecked: false, isSoftDone: false, isSoftDeleted: false, date: isGoalDateSet.value? date: "", description: description};
        store.commit('CREATE_TO_DO', newToDo);
        router.push('/');
    }
    return {title, saveToDo, isGoalDateSet, date, settingDate, description};
    },
}
</script>