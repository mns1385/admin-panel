<script setup lang="ts">
import { User, Edit, Shield, Menu, X} from 'lucide-vue-next'
import { useProfileStore } from '~/stores/profile';

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

const profileStore = useProfileStore()

const user = computed(() => profileStore.user || {email: '', name: ''})

const tabs = ref([
    {label: 'Information', component: '~/components/profile/info.vue', icon: User},
    {label: 'Edit', component: '~/components/profile/edit,.vue', icon: Edit},
    {label: 'security', component: '~/components/profile/security.vue', icon: Shield}
])

const activeTab = ref(tabs.value[0].component)

const switchTabs = (component: string) => {
    activeTab.value = component
}

const isOpenMenu = ref(false)
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div class="max-w-6xl mx-auto">

            <!--Header-->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-6 transition-all hover:shadow-xl">

                <!--information-->
                <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                
                    
                    <!--avatar-->
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg ring-4 ring-white">
                        {{ user.name.charAt(0) }}
                    </div>

                    <!--user name-->
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            {{ user.name }}
                        </h1>

                        <p class="text-sm md:text-base text-gray-500">
                            user personall information managment
                        </p>
                    </div>

                </div>

                <!--Tabs-->
                <div class="border-t border-gray-200 pt-6">

                    <!--Tabs header-->
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-semibold text-gray-600">
                            Tabs
                        </h2>

                        <div class="relative md:hidden">
                            <button @click="isOpenMenu = !isOpenMenu"
                            class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                                <component :is="isOpenMenu? X: Menu" class="w-5 h-5"/>
                            </button>

                            <div v-if="isOpenMenu" 
                            class="absolute max-w-36 right-0 top-full mt-2 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                                
                                <button v-for="tab in tabs" :key="tab.component" @click="switchTabs(tab.component)"
                                :class="['flex flex-1 mb-1 w-full gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all',
                                activeTab === tab.component? 'bg-white text-blue-600 shadow-md': 'text-gray-600 hover:text-gray-800 hover:bg-gray-50']">
                                    <component :is="tab.icon" class="w-4 h-4"/>
                                    <span>
                                        {{ tab.label }}
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>

                    <!--switch bitween tabs-->
                    <div class="hidden md:flex gap-2 bg-gray-100 p-1 rounded-xl whitespace-nowrap">
                        <button v-for="tab in tabs" :key="tab.component" @click="switchTabs(tab.component)"
                        :class="['flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all',
                        activeTab === tab.component? 'bg-white text-blue-600 shadow-md': 'text-gray-600 hover:text-gray-800 hover:bg-gray-50']">
                            <component :is="tab.icon" class="w-4 h-4"/>
                            <span>
                                {{ tab.label }}
                            </span>
                        </button>
                    </div>

                </div>

            </div>
        </div>

        <!--Components-->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 transition-all">
            <component/>
        </div>

    </div>
</template>