<template>
        <ion-checkbox slot="start" v-model="checkboxModel"></ion-checkbox>
        <ion-label :class="task.isChecked ? 'item-checked' : ''"> {{task.title}}</ion-label>

        <ion-icon class="icon" @click="routeToEdit" :icon="pencil"  ></ion-icon>

        <ion-icon class="icon" :icon="trash" @click="onDelete"></ion-icon>
</template>

<script lang="ts">
import {useStore} from '../store'
import {computed} from 'vue'
import {trash, pencil} from 'ionicons/icons';
import {
    IonLabel,
    IonCheckbox,
    IonIcon,

    } from '@ionic/vue';
    import { useRouter } from 'vue-router'

    export default {
        components: {
            IonLabel,
            IonCheckbox,
            IonIcon,
        
        },
        props: {
               task: {type:Object, required: true}
        },
        setup(props) {
        const store = useStore();
        const router = useRouter();
        const checkboxModel = computed({
        get() {
            return props.task.isChecked;
        },
        set() {
            store.commit("HANDLE_CHECKBOX", props.task.id);
        },
        });
    const onDelete = () => store.commit("DELETE_ITEM", props.task.id);
    const routeToEdit = () => router.push(`/edit-todo/${props.task.id}`);
    return { checkboxModel,trash, onDelete, routeToEdit, pencil };
  },
        }
</script>

<style>
    .icon {
        z-index: 9999;
        color: #3880ff;
        fill: rgb(202 0 0);
  
    }
    .icon:first-of-type {
        margin-right: 5px;
    }
    .item-checked {
        text-decoration: line-through;
    }

</style>