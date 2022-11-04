<template>
     <ion-page>
        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start" v-if="pageDefaultBackLink">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title>{{pageTitle}}</ion-title>
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
 
} from '@ionic/vue'


export default {
    props: {
        pageTitle: {
            type: String,
            required: true
        },
        pageDefaultBackLink: {
            type: String,
        }
    },
    components: {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonToolbar,
        IonBackButton,
        IonButtons,
    },
  
  }

</script>