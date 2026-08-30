<script setup lang="ts">
const codeLength = 5

const nextInput = (event: Event) => {
    const input = event.target as HTMLInputElement

    const next = input.nextElementSibling as HTMLIFrameElement | null

    next?.focus()
}
</script>

<template>
    <form>
        <div class="flex justify-center gap-4 my-10">
            <input v-for="(_, index) in codeLength" :key="index"
            @input="nextInput"
            type="text" maxlength="1" inputmode="numeric"
            class="w-8 h-14 text-center text-2xl rounded-lg font-bold border border-lg outline-none focus:ring-2">
        </div>

        <button type="submit" 
        class="w-full mt-6 py-3 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
            Verify code
        </button>
    </form>
</template>