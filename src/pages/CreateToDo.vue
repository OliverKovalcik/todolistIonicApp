<template>
<base-layout pageTitle="Create ToDo" pageDefaultBackLink="/">
<ion-card>
    <ion-card-content>
<ion-item>
    <ion-label position="floating">Enter title</ion-label>
    <ion-input placeholder="Enter title" v-model="state.title" required></ion-input>
    <ion-note v-if="v$.title.$error" color="danger" slot="helper">{{v$.title.$errors[0].$message}}</ion-note> 
</ion-item>
<ion-item>
    <ion-label position="floating">Enter description</ion-label>
    <ion-textarea placeholder="Enter description" :auto-grow="true" v-model="state.description">
    </ion-textarea>
    <ion-note v-if="v$.description.$error" color="danger" slot="helper">{{v$.description.$errors[0].$message}}</ion-note> 
</ion-item>
<ion-item>
        <ion-checkbox slot="start" :value="isGoalDateSet" @click="isGoalDateSet = !isGoalDateSet"></ion-checkbox>
        <ion-label>Set goal date:</ion-label>
    </ion-item>
<ion-datetime v-if="isGoalDateSet"  max="2100-05-31T23:59:59" v-model="date"></ion-datetime>
<ion-button expand="block" @click="saveToDo(state.title, state.description, date)">Save Your ToDo</ion-button>
    </ion-card-content>
</ion-card>
</base-layout>
</template>
<script>
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
import { useStore } from '../store';
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity';
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
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
    data() {
        return {
            store: useStore(),
            router: useRouter(),
            isGoalDateSet: false 
        }
    },
    setup () {
    //Validation
    const state = reactive({
        title: '',
        description: ''
    })
    const rules = computed(()=>{ 
        return {
            title: {required},
            description: {required}
        }
    })
    const v$ = useVuelidate(rules, state);
    const date = ref('');
    const settingDate= ref(Object);
    return { date, settingDate,  state, v$};
    },
    methods: {
        saveToDo(title, description, date) {
            this.v$.$validate()
            if(!this.v$.$error){
                let newToDo = {id: this.generateId(), title: title, isChecked: false, isSoftDone: false, isSoftDeleted: false, date: this.isGoalDateSet? date: "", description: description};
                this.store.commit('CREATE_TO_DO', newToDo);
                this.router.push('/');
            }
        },
        generateId() {
        let values = this.store.state.items;
        let maxValue= 0;
            values.forEach((item) =>  {
            if(maxValue < item.id){
                maxValue = item.id; 
            }
            });
        return maxValue+1;
         }
    },
}
</script>