<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'
import { User, Mail, Save, Loader2, CheckCircle2, XCircle, Lock} from 'lucide-vue-next'
import { useApi } from '~/composables/useApi'

const profileStore = useProfileStore()
const data = useApi()

const user = computed(() => profileStore.user || {email: 'Not set', name: 'Not set'})

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
    </div>
</template>