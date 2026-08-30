<script setup lang="ts">
const codeLength = 5

const inputs = ref<HTMLInputElement[]>([])

const nextInput = (index: number) => {
    if (index < codeLength - 1) {
        inputs.value[index + 1]?.focus()
    }
}
</script>

<template>
    <form>
        <div class="flex justify-center gap-4 my-10">
            <input type="text" maxlength="1" inputmode="numeric"
            v-for="(_, index) in codeLength" :key="index"
            ref="el => inputs[index] = el as: HTMLInputElement"
            @input="nextInput(index)"
            class="w-8 h-14 text-center text-2xl rounded-lg font-bold border border-lg outline-none focus:ring-2">
        </div>

        <button type="submit" 
        class="w-full mt-6 py-3 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
            Verify code
        </button>
    </form>
</template>