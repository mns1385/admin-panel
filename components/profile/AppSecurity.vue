<script setup lang="ts">
import { Shield, XCircle, CheckCircle2, Eye, EyeOff, Save, Loader2 } from 'lucide-vue-next'
import { useProfileStore } from '~/stores/profile'
import { useApi } from '~/composables/useApi'
import auth from '~/middleware/auth'

const profileStore = useProfileStore()
const data = useApi()

const user = computed(() => profileStore.user || {password: '', id: ''})

const messageError = ref('')
const messageSuccess = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const classPassword = ref(false)
const classNew = ref(false)
const classConfirm = ref(false)

const showPassword = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const isSavePassword = ref(false)

const savePassword = async () => {
    messageError.value = ''
    messageSuccess.value = ''
    classPassword.value = false
    classNew.value = false
    classConfirm.value = false

    if (!currentPassword.value) {
        messageError.value = 'Current Password is required!'
        classPassword.value = true
        return
    }

    if (!newPassword.value) {
        messageError.value = 'New Password is required!'
        classNew.value = true
        return
    } else if (newPassword.value.length < 8) {
        messageError.value = 'The length of the new password must be more than 8 digits!'
    }

    if (!confirmPassword.value) {
        messageError.value = 'Confirm Password is required!'
        classConfirm.value = true
        return
    }

    if (user.value.password !== currentPassword.value) {
        messageError.value = 'Current Password is Invalid!'
        currentPassword.value = ''
        classPassword.value = true
        return
    }

    if (newPassword.value !== confirmPassword.value) {
        newPassword.value = ''
        confirmPassword.value = ''
        classConfirm.value = true
        classNew.value = true
        messageError.value = 'New Password not confirm!'
        return
    }

    if (currentPassword.value === newPassword.value) {
        currentPassword.value = ''
        newPassword.value = ''
        classPassword.value = true
        classNew.value = true
        messageError.value = 'The new password is the same as the current password!'
        return
    }

    user.value.password = newPassword

    isSavePassword.value = true

    try {
        await data.updateUser(user.value.id, user.value)

        messageSuccess.value = 'New Password be changed!'
    } catch (error: any) {
        messageError.value = `${error.statusCode} : ${error.statusMessage}`
    }

    isSavePassword.value = false
}
</script>

<template>
    <div class="space-y-6">

        <!--Change password-->
        <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            
            <!--Section Header-->
            <div class="flex items-center gap-3 pb-4 border-b border-gray-200">
                <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield class="w-5 h-5 text-blue-600"/>
                </div>

                <div>
                    <h3 class="text-lg font-semibold text-gray-800">
                        Change Password
                    </h3>
                    <p class="text-sm text-gray-500">
                        Update your password security
                    </p>
                </div>
            </div>

            <!--Success Message-->
            <div v-if="messageSuccess"
            class="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <CheckCircle2 class="w-4 h-4 text-green-600 flex-shrink-0"/>
                <p class="text-sm font-medium text-green-800">
                    {{ messageSuccess }}
                </p>
            </div>

            <!--Error Message-->
            <div v-if="messageError"
            class="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <XCircle class="w-4 h-4 text-red-600 flex-shrink-0"/>
                <p class="text-sm font-medium text-red-800">
                    {{ messageError }}
                </p>
            </div>

            <form @submit.prevent="savePassword">

                <!--Current Password-->
                <div>
                    <label class="block text-sm font-medium text-gray-700 my-2">
                        Current Password
                    </label>
                    <div class="relative max-w-sm">
                        <input v-model="currentPassword" :type="showPassword? 'text': 'password'" placeholder="Enter your current password"
                        class="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-red-500 text-sm font-medium outline-none rounded-lg"
                        :class="{'ring-2 ring-red-500': classPassword}">
                        <button @click="showPassword = !showPassword" type="button"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <Eye v-if="showPassword" class="w-5 h-5"/>
                            <EyeOff v-else class="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <!--New Password-->
                <div class="mt-10">
                    <label class="block text-sm font-medium text-gray-700 my-2">
                        New Password
                    </label>
                    <div class="relative max-w-sm">
                        <input v-model="newPassword" :type="showNew? 'text': 'password'" placeholder="Enter your new password"
                        class="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-red-500 text-sm font-medium outline-none rounded-lg"
                        :class="{'ring-2 ring-red-500': classNew}">
                        <button @click="showNew = !showNew" type="button"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <Eye v-if="showNew" class="w-5 h-5"/>
                            <EyeOff v-else class="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <!--Confirm Password-->
                <div>
                    <label class="block text-sm font-medium text-gray-700 my-2">
                        Confirm Password
                    </label>
                    <div class="relative max-w-sm">
                        <input v-model="confirmPassword" :type="showConfirm? 'text': 'password'" placeholder="Enter your confirm password"
                        class="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-red-500 text-sm font-medium outline-none rounded-lg"
                        :class="{'ring-2 ring-red-500': classConfirm}">
                        <button @click="showConfirm = !showConfirm" type="button"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <Eye v-if="showConfirm" class="w-5 h-5"/>
                            <EyeOff v-else class="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <button type="submit" class="flex gap-2 items-center justify-center my-4 w-auto py-2 px-4 text-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg">
                    <Save v-if="!isSavePassword" class="w-4 h-4"/>
                    <Loader2 v-else class="w-4 h-4 animate-spin"/>
                    <span>
                        {{ isSavePassword? 'Saving': 'Save' }}
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>