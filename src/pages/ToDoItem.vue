<template>
     
    <div :class="task.isChecked? 'card-bg succes' : 'card-bg'">
        <div class="card-bg--content">
          
            <ion-label :class="task.isChecked ? 'item-checked' : ''" @click="handleCheckbox">
                <h2>{{task.title}}</h2>
                <p>{{formatDate(task.date)}}</p>
            </ion-label>
            <div class="card-bg--content--btns">
                <span>Actions:</span>
                <img v-if="!task.isChecked"  @click="onDelete" src="../theme/svg/no.svg" alt="no"/>
                <img v-if="task.isChecked"  @click="onDone" src="../theme/svg/yes.svg" alt="yes"/>
                <img @click="routeToEdit" src="../theme/svg/edit.svg" alt="edit"/>
            </div>
        </div>
        <ion-reorder class="card-bg--order-btn" slot="end">
        </ion-reorder>  
    </div>
    
    

</template>

<script lang="ts">
import {useStore} from '../store'
import {menu} from 'ionicons/icons';
import {
    IonLabel,
    IonReorder
    } from '@ionic/vue';
import { useRouter } from 'vue-router'
import moment from 'moment';
    export default {
        components: {
            IonLabel,
            IonReorder
        },
        props: {
               task: {type:Object, required: true}
        },
        setup(props:any) {
        const store = useStore();
        const router = useRouter();
        //moznost potom to spravit ako vseobecnu function niekde
        const formatDate = (date:string) => {
            if(date.length === 0){
                return "no date"
            } else {
                return  moment(date).format("DD/MM/YYYY HH:mm")
            }
        }
        const handleCheckbox = () => {
            store.commit("HANDLE_CHECKBOX", props.task.id);
        };
        const onDelete = () => store.commit("DELETE_ITEM", props.task.id);
        const onDone = () => store.commit("DONE_ITEM", props.task.id);
        const routeToEdit = () => router.push(`/edit-todo/${props.task.id}`);
    return { menu, handleCheckbox, onDelete,onDone, routeToEdit,formatDate };
  },
        }
</script>

<style lang="scss">
  

</style>