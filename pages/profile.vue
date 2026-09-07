<script setup lang="ts">
import {} from 'lucide-vue-next'
import { useProfileStore } from '~/stores/profile';

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

const profileStore = useProfileStore()

const user = computed(() => profileStore.user || {email: '', name: ''})

onMounted(async () => {
    await profileStore.onLoad()
})

const tabs = ref([
    {label: 'User information', component: '~/components/profile/info.vue', icon: ''},
    {label: 'Edit information', component: '~/components/profile/edit,.vue', icon: ''},
    {label: 'security', component: '~/components/profile/security.vue', icon: ''}
])

const activeTab = ref(tabs.value[0].component)

const switchTabs = (component: string) => {
    activeTab.value = component
}
</script>

<template>
    <div>

        <!--Header-->
        <div>

            <!--information-->
            <div>
                
                <div>
                    <!--avatar-->
                    <div>
                        {{ user.name.charAt(0) }}
                    </div>

                    <!--user name-->
                    <h1>
                        {{ user.name }}
                    </h1>
                </div>

                <p>
                    user personall information managment
                </p>
            </div>

            <!--Tabs-->
            <div>

                <div>
                    <h2>
                        Tabs
                    </h2>
                </div>

                <!--switch bitween tabs-->
                <div>
                    <button v-for="tab in tabs" @click="switchTabs(tab.component)">
                        <span>
                            {{ tab.icon }}
                        </span>
                        <span>
                            {{ tab.label }}
                        </span>
                    </button>
                </div>

            </div>

        </div>

        <!--Components-->
        <div>

        </div>

    </div>
</template>