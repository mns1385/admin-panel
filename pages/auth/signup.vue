<script setup lang="ts">
import AppSignupForm from '~/components/auth/AppSignupForm.vue';
import AppVerifyForm from '~/components/auth/AppVerifyForm.vue';
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore()

definePageMeta({
    layout: 'auth'
})

</script>

<template>
    <div class="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/10 bachdrop-blur-md p-8 shadow-2xl">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-white">
                Create a accunt
            </h1>

            <p class="mt-2 text-sm text-gray-400 mb-5">
                {{ authStore.sendCode? 'Verify your Email': 'Sign up your accunt' }}
            </p>

            <component :is="authStore.sendCode? AppVerifyForm: AppSignupForm"/>
        </div>

        <NuxtLink to="/auth/login" class="text-gray-400">Login to your accunt</NuxtLink>
    </div>
</template>