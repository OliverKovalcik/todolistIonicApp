<template>
    <base-layout pageTitle="ToDoList">
    <ion-list>
        <ion-item v-for="item in items" :key="item.id" :router-link="`/home/detail/${item.id}`">{{item.title}}</ion-item>
    </ion-list>
</base-layout>
</template>
<script lang="ts">
import {IonList, IonItem} from '@ionic/vue'
import { defineComponent } from 'vue';
export default  defineComponent ({
    name: 'ToDoList',
    components: {
        IonList,
        IonItem
    },
    computed: {
        items(){
            return this.$store.getters.items;
        }
    }
});
</script>