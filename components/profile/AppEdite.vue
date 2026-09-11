<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'
import { User, Mail, Save, Loader2, CheckCircle2, XCircle, Verified, Backpack, Send} from 'lucide-vue-next'
import { useApi } from '~/composables/useApi'

const profileStore = useProfileStore()
const data = useApi()

const user = computed(() => profileStore.user || {email: 'Not set', name: 'Not set'})

/*Change Name*/

const nameSuccess = ref('')
const emailSuccess = ref('')
const nameLoading = ref(false)
const nameError = ref('')
const emailError = ref('')

const fullName = ref(user.value.name)

const nameUpdate = () => {
    nameSuccess.value = ''
    nameError.value = ''
    nameLoading.value = false

    if (!fullName.value) {
        nameError.value = 'Name is required!'
        return
    }

    user.value.name = fullName

    nameLoading.value = true

    try {
        data.updateUser(user.value.id, user.value)

        nameSuccess.value = 'User updated!'
    } catch (error: any) {
        if (error.statusCode === 400) {
            nameError.value = error.statusMessage
        } else if (error.statusCode === 404) {
            nameError.value = error.statusMessage
        }
    }

    nameLoading.value = false
}


/*Change Email*/

const isEditeEmail = ref(false)
const stepChangeEmail = ref(1)
const newEmail = ref('')
const isSendCode = ref(false)

const cancleForm = () => {
    isEditeEmail.value = false
    stepChangeEmail.value = 1
    newEmail.value = ''
    emailSuccess.value = ''
    emailError.value = ''
}

const sendCode = async () => {
    emailSuccess.value = ''
    emailError.value = ''
    
    if (!newEmail.value) {
        emailError.value = 'Email is required!'
        return
    }

    isSendCode.value = true

    try {
        const responce = await $fetch('/api/change-email/send-code', {
            method: 'POST',
            body: {
                userId: user.value.id,
                newEmail: newEmail.value
            }
        })

        if (responce.success) {
            emailSuccess.value = responce.message
            stepChangeEmail.value = 2
            timer
        }
    } catch (error: any) {
        emailError.value = error.statusMessage
    }

    isSendCode.value = false
}

const verifyCode = ref('')
const isVerifyCode = ref(false)

const backForm = () => {
    stepChangeEmail.value = 1
    emailError.value = ''
    emailSuccess.value = ''
}

const verifySuccess = ref('')
const verifyError = ref('')
const timeOut = ref(120)

const timer = setInterval(() => {
    timeOut.value--
    if (timeOut.value === 0) {
        stepChangeEmail.value = 1
        timeOut.value = 120
        verifyCode.value = '12345'
        verifyEmail()
        timer.close()
    }
}, 1000)

const verifyEmail = async () => {
    verifySuccess.value = ''
    verifyError.value = ''
    emailError.value = ''
    emailSuccess.value = ''
    isVerifyCode.value = false

    if (!verifyCode.value) {
        emailError.value = 'Verify Code is required!'
        return
    }

    isVerifyCode.value = true

    try {
        const responce = await $fetch('/api/change-email/verify-code', {
            method: 'POST',
            body: {
                userId: user.value.id,
                code: verifyCode.value
            }
        })

        if (responce.success) {
            verifySuccess.value = responce.message

            setTimeout(() => {
                isEditeEmail.value = false
                verifyCode.value = ''
                stepChangeEmail.value = 1
            }, 2000)
        }
    } catch (error: any) {
        if (error.statusCode === 400) {
            emailError.value = error.statusMessage
        } else if (error.statusCode === 410) {
            verifyError.value = error.statusMessage
            stepChangeEmail.value = 1
        } else if (error.statusCode === 409) {
            emailError.value = error.statusCode
            verifyCode.value = ''
        } else if (error.statusCode === 404) {
            verifyError.value = error.statusMessage
            isEditeEmail.value = false
        } else if (error.statusCode === 500) {
            verifyError.value = error.statusMessage
            isEditeEmail.value = false
        }
    }

    isVerifyCode.value = false
}
</script>

<template>
    <div class="space-y-6">

        <!--Section Header-->
        <div class="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User class="w-5 h-5 text-blue-600"/>
            </div>

            <div>
                <h3 class="text-lg font-semibold text-gray-800">
                    Edite Profile
                </h3>
                <p class="text-sm text-gray-500">
                    Update your personal information
                </p>
            </div>
        </div>

        <!--====Change Name Section===-->
        <div class="bg-gradient-to-br from-blue-100 to-white rounded-xl p-6 border border-blue-100">
            <div class="flex items-center gap-2 mb-4">
                <User class="w-5 h-5 text-blue-600"/>
                <h4 class="text-base font-semibold text-gray-800">
                    Change Name
                </h4>
            </div>

            <!--Success Message-->
            <div v-if="nameSuccess"
            class="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <CheckCircle2 class="w-4 h-4 text-green-600 flex-shrink-0"/>
                <p class="text-sm font-medium text-green-800">
                    {{ nameSuccess }}
                </p>
            </div>

            <!--Error Message-->
            <div v-if="nameError"
            class="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <XCircle class="w-4 h-4 text-red-600 flex-shrink-0"/>
                <p class="text-sm font-medium text-red-800">
                    {{ nameError }}
                </p>
            </div>

            <!--Name Form-->
            <form @submit.prevent="nameUpdate" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input v-model="fullName" type="text" placeholder="Enter your full name" :disabled="nameLoading"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                </div>

                <button type="submit" :disabled="nameLoading"
                class="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                    <Loader2 v-if="nameLoading" class="w-4 h-4 animate-spin"/>
                    <Save v-else class="w-4 h-4"/>
                    <span>
                        {{ nameLoading? 'Saving...': 'Update Name' }}
                    </span>
                </button>
            </form>
        </div>

        <!--===Change Email Section===-->
        <div class="bg-gradient-to-br from-purple-100 to-white rounded-xl p-6 border border-purple-100">
            <div class="flex items-center gap-2 mb-4">
                <Mail class="w-5 h-5 text-purple-600"/>
                <h4 class="font-sm text-gray-800">
                    Change Email
                </h4>
            </div>

            <!--Success Message-->
            <div v-if="verifySuccess"
            class="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                <CheckCircle2 class="w-4 h-4 text-green-600 flex-shrink-0"/>
                <p class="text-sm font-medium text-green-800">
                    {{ verifySuccess }}
                </p>
            </div>

            <!--Error Message-->
            <div v-if="verifyError"
            class="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <XCircle class="w-4 h-4 text-red-600 flex-shrink-0"/>
                <p class="text-sm font-medium text-red-800">
                    {{ verifyError }}
                </p>
            </div>

            <div v-if="!isEditeEmail">
                <p class="text-sm text-gray-500 mb-1">
                    Current Email
                </p>
                <p class="text-base font-medium text-gray-800 mb-4 break-all">
                    {{ user.email }}
                </p>
                <button @click="isEditeEmail = !isEditeEmail" type="button"
                class="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg flex items-center gap-2">
                    <Mail class="w-4 h-4"/>
                    <span>
                        Change Email
                    </span>
                </button>
            </div>

            <div v-if="isEditeEmail">
                <!--Success Message-->
                <div v-if="emailSuccess"
                class="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <CheckCircle2 class="w-4 h-4 text-green-600 flex-shrink-0"/>
                    <p class="text-sm font-medium text-green-800">
                        {{ emailSuccess }}
                    </p>
                </div>

                <!--Error Message-->
                <div v-if="emailError"
                class="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <XCircle class="w-4 h-4 text-red-600 flex-shrink-0"/>
                    <p class="text-sm font-medium text-red-800">
                        {{ emailError }}
                    </p>
                </div>

                <!--Step 1-->
                <div v-if="stepChangeEmail === 1" class="space-y-4">
                    <input type="email" v-model="newEmail" placeholder="Enter new email address" :disabled="isSendCode"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">

                    <div class="flex justify-between">
                        <button @click="cancleForm" type="button" :disabled="isSendCode"
                        class="py-2.5 px-4 w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg">
                            Cancle
                        </button>

                        <button @click="sendCode" type="button" :disabled="isSendCode"
                        class="flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg">
                            <Send v-if="!isSendCode" class="w-4 h-4"/>
                            <Loader2 v-else class="animate-spin w-4 h-4"/>
                            <span>
                                {{ isSendCode? 'Sending': 'Send Code'}}
                            </span>
                        </button>
                    </div>
                </div>

                <!--step 2-->
                <div v-if="stepChangeEmail === 2" class="space-y-4">
                    <p class="text-sm text-gray-600">
                        We sent a 5-digit code to <strong class="text-purple-700">{{ newEmail }}</strong>
                    </p>
                    <input v-model="verifyCode" type="text" maxlength="5" placeholder="code" :disabled="isVerifyCode">

                    <div class="flex justify-between gap-3">
                        <button @click="backForm" :disabled="isVerifyCode" type="button"
                        class="flex gap-2 py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg">
                            <Backpack class="w-4 h-4 text-gray-700"/>
                            <span>
                                Back
                            </span>
                        </button>
                        <button @click="verifyEmail" :disabled="isVerifyCode" type="button"
                        class="flex gap-2 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg items-center justify-center">
                            <Verified v-if="!isVerifyCode" class="h-4 w-4"/>
                            <Loader2 v-else class="w-4 h-4 animate-spin"/>
                            <span>
                                {{ isVerifyCode? 'Verifing': 'Verify & Save' }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>