<template>
    <Transition name="slide-fade">
        <div v-if="isMenuOpen" class="menu">
            <div>
                <h1>Menu</h1>
                <br>
                <div @click="$emit(`toggleMenu`);goToPage(`about-app`);">
                    <h4>About app</h4>
                </div>
            </div>
        </div>
    </Transition>
    <Transition name="slide-fade">
    <div v-if="isMenuOpen" @click="$emit('toggleMenu')" class="menu-end">
     </div>
     </Transition>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';

export default {
    emits: ["toggleMenu"],
    props: {
        isMenuOpen: Boolean
    },
    setup(){
        const router = useRouter();
        const goToPage = (page:string) => {

            router.push("/" + page);
        }
        return {goToPage, router}
    }
}
</script>