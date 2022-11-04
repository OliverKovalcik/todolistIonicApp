<template>
    <base-layout pageTitle="Not Done" pageDefaultBackLink="/">
    <ion-list>
        <ion-item lines="full" v-for="item in items" :key="item.id">
            {{item.title}}
        </ion-item>
    </ion-list>
</base-layout>
</template>
<script lang="ts">
import {
    IonList,
    IonItem,
 
    } from '@ionic/vue'
import { computed } from 'vue';
import { useStore } from '../store';
export default   {
    name: 'ToDoList',
    components: {
        IonList,
        IonItem,
    },
 
    setup() {
    const store = useStore();
    const items = computed(()=>store.state.items.filter(item => item.isSoftDeleted === true));
    return {items}
    },
};
</script>