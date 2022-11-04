<template>
        <ion-checkbox slot="start" v-model="checkboxModel"></ion-checkbox>
        <ion-label :class="task.isChecked ? 'item-checked' : ''"> {{task.title}}</ion-label>
        <ion-button  color="primary" @click="routeToEdit">
            <ion-icon slot="icon-only" :icon="pencil"  ></ion-icon>
        </ion-button>
        <ion-button  v-if="!task.isChecked" color="danger" @click="onDelete">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
        </ion-button>
        <ion-button  v-if="task.isChecked" color="success" @click="onDone">
            <ion-icon  slot="icon-only" :icon="checkmark"></ion-icon>
        </ion-button>
</template>

<script lang="ts">
import {useStore} from '../store'
import {computed} from 'vue'
import {trash, pencil,checkmark} from 'ionicons/icons';
import {
    IonLabel,
    IonCheckbox,
    IonIcon,
    IonButton
    } from '@ionic/vue';
    import { useRouter } from 'vue-router'

    export default {
        components: {
            IonLabel,
            IonCheckbox,
            IonIcon,
            IonButton
        
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
    const onDone = () => store.commit("DONE_ITEM", props.task.id);
    const routeToEdit = () => router.push(`/edit-todo/${props.task.id}`);
    return { checkboxModel,trash, onDelete,onDone, routeToEdit, pencil,checkmark };
  },
        }
</script>

<style>


    .item-checked {
        text-decoration: line-through;
    }

</style>