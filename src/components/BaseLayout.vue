<template>
     <ion-page>
        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start" v-if="pageDefaultBackLink">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title>{{pageTitle}}</ion-title>
                <ion-button color="success" slot="end" :router-link="`/successful-todo`">
                    {{statistic.successfulTasks}}
                    <ion-icon slot="start" :icon="checkmark"></ion-icon>
                </ion-button>
                <ion-button color="danger" slot="end" :router-link="`/unsuccessful-todo`">
                    {{statistic.unsuccessfulTasks}}
                    <ion-icon slot="start" :icon="close"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
    
</template>
<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonIcon,
    
} from '@ionic/vue'
import {close, checkmark} from 'ionicons/icons';
import { computed } from 'vue';
import { useStore } from '../store';

export default {
    props: {
        pageTitle: {
            type: String,
            required: true
        },
        pageDefaultBackLink: {
            type: String,
        },
        statistics: {
            type: Object
        }
    },
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonToolbar,
        IonBackButton,
        IonIcon,
        IonButtons,
        IonButton
        
    },
    setup(){
        const store = useStore();
        const statistic = computed(()=>store.state.statistics);
        return {
    close, checkmark,statistic            
        }
    }
  
  }

</script>