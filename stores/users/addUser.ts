import { defineStore } from "pinia";

export const useAddUserStore = defineStore('addUser', () => {
    const forms = ref<'addUser' | 'verify'>('addUser')
    const openForm = ref(false)

    return {
        openForm,
        forms
    }
})