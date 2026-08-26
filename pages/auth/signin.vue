<script setup lang="ts">
import AppSigninForm from '~/components/auth/AppSigninForm.vue';

definePageMeta({
    layout: 'auth'
})

</script>

<template>
    <div class="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/30 p-8 shadow-2xl">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-white">
                Create a accunt
            </h1>

            <p class="mt-2 text-sm text-gray-400 mb-5">
                Sign in to your account
            </p>

            <AppSigninForm/>
        </div>

        <NuxtLink to="/auth/login">Login to your accunt</NuxtLink>
    </div>
</template>