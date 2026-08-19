<script setup lang="ts">
import AppLoginForm from '~/components/auth/AppLoginForm.vue';

definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <div class="flex justify-center items-center">
        <h1 class="text-white text-center font-bold text-4xl p-2 mb-8">
            Admin login page
        </h1>
        <AppLoginForm/>
    </div>
</template>