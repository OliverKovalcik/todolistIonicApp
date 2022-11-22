<template>
<base-layout pageTitle="To-Do">
   
    <div class="extend-header-bar">
    <div class="box left" @click="() => router.push(`/successful-todo`)">  {{statistic.successfulTasks}} </div>
    <div class="box right" @click="() => router.push(`/unsuccessful-todo`)">  {{statistic.unsuccessfulTasks}}</div>
   
</div>
<div class="bottom-border" :style="`grid-template-columns: ${ratio(statistic.successfulTasks,statistic.unsuccessfulTasks)} 1fr`">
    <div class="left"></div>
    <div class="right"></div>
</div>
    <ion-list >
    <ion-reorder-group class="item-todo" :disabled="false" @ionItemReorder="handleReorder($event)">
        <ToDoItem  v-for="item in items" :key="item.id" :task="item"></ToDoItem>
    </ion-reorder-group>
    </ion-list>

</base-layout>

</template>
<script lang="ts">
import {
    IonList,
    IonReorderGroup
    } from '@ionic/vue'
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';
import ToDoItem from './ToDoItem.vue'

export default  defineComponent ({
    name: 'ToDoList',
    components: {
        ToDoItem,
        IonList,
        IonReorderGroup
        
    },
    setup() {
        const router = useRouter();
        const handleReorder = (event: CustomEvent) => {
          
        let fromItemId = items.value[event.detail.from].id;
        let toItemId = items.value[event.detail.to].id;
        store.commit("REORDER_ITEMS", {fromId: Number(fromItemId), toId: Number(toItemId)});

        event.detail.complete();
      }
    
    const store = useStore();
    const handleCheckbox = (id: number) => store.commit("HANDLE_CHECKBOX", id);
    const statistic = computed(()=> store.state.statistics);
    const ratio = (value1:number, value2:number) => {
     if(value1 === 0 && value2 === 0){
        return '1fr'
     } else {
         return `${(value1/(value1 + value2))*100}%` ;
     }
    }    
    const items = computed(()=>store.state.items.filter(item => item.isSoftDeleted === false && item.isSoftDone === false));
    return {router,items, handleCheckbox,close, statistic,handleReorder, ratio}
    },
});
</script>