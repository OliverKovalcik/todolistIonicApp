<template>
     <ion-page>
        <MenuComponent :isMenuOpen="isMenuOpen" @toggle-menu="isMenuOpen=false"></MenuComponent>
        <ion-header>  
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button :router-link="pageDefaultBackLink">
                        <ion-icon v-if="pageDefaultBackLink" :icon="arrowBack"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>{{pageTitle}}</ion-title>
                <ion-buttons slot="end">
                    <ion-button>
                        <ion-icon ></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content> 
        <ion-card>
            <div class="footer">
            <div class="footer--box"  @click="toggleMenu">    
                <ion-icon :icon="menu"></ion-icon>
                <div>Menu</div>  
            </div>

            <ion-fab-button shape="circle" class="footer--box" :router-link="`/create-todo`">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        
            <div class="footer--box" @click="()=> router.push('/statistics')">    
                <ion-icon :icon="statsChart"></ion-icon>
                <div>Statistics</div>  
            </div>
    
        </div>
        </ion-card>
   
    </ion-page>
</template>
<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonFabButton,
    IonCard    
} from '@ionic/vue'
import { arrowBack, menu, add, statsChart} from 'ionicons/icons';
import { ref } from 'vue';
import MenuComponent from './MenuComponent.vue'
import { useRouter } from 'vue-router';

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
        IonIcon,
        IonButtons,
        IonButton,
        MenuComponent,
        IonFabButton,
        IonCard
      
    },
    setup(){
        const router = useRouter();
        let isMenuOpen = ref(false);
        const toggleMenu = ():boolean => isMenuOpen.value = !isMenuOpen.value;
        return {
    arrowBack, menu, isMenuOpen, toggleMenu, add,statsChart, router            
        }
    }
  }

</script>