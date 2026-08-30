<script setup lang="ts">
import AppLoginForm from '~/components/auth/AppLoginForm.vue';

definePageMeta({
    layout: 'auth',
    middleware: 'guest'
})

</script>

<template>
    <div class="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/30 backdrop-blur-md p-8 shadow-2xl">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-white">
                Welcome Back
            </h1>

            <p class="mt-2 text-sm text-gray-400 mb-5">
                login in to your account
            </p>

            <AppLoginForm/>
        </div>

        <NuxtLink to="/auth/signup">Sign up to accunt</NuxtLink>
    </div>
</template>