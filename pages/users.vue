<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import { Users, Plus, Loader2, Shield, UserIcon, Edit, Trash2, Search, X, Filter } from 'lucide-vue-next'
import { useProfileStore } from '~/stores/profile';
import AddUserModal from '~/components/users/AddUserModal.vue';
import EditUserModal from '~/components/users/EditUserModal.vue';
import DeleteUserModal from '~/components/users/DeleteUserModal.vue';

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

const data = useApi()

const profileStore = useProfileStore()
const userLogin = computed(() => profileStore.user || {id: ''})


const allUsers = ref<any[]>([])
const loading = ref(false)

const searchQuery = ref('')
const roleFilter = ref<'all' | 'admin' | 'user'>('all')

const users = computed(() => {
    return allUsers.value.filter((u: any) => {

        const matchesSearch = u.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value

        return matchesSearch && matchesRole
    })
})

const fetchUsers = async () => {
    loading.value = true

    try {
        const fetchedUsers = await <any> data.getUsers()

        allUsers.value = fetchedUsers.filter((u: any) => u.id !== userLogin.value.id)
    } catch (error) {
        throw error
    }

    loading.value = false
}

onMounted(() => {
    fetchUsers()
})

const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectUser = ref<any>(null)

const openEditModal = (user: any) => {
    selectUser.value = user
    isEditModalOpen.value = true
}

const openDeleteModal = (user: any) => {
    selectUser.value = user
    isDeleteModalOpen.value = true
}
</script>

<template>

    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">

            <!--Header-->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 class="flex gap-2 items-center text-2xl md:text-3xl font-bold text-gray-800 ">
                            <Users class="w-7 h-7 text-blue-600"/>
                            Users Management
                        </h1>
                        <p class="text-sm text-gray-600 mt-1">
                            Manage all reqistered users in the system
                        </p>
                    </div>

                    <button @click="isAddModalOpen = true"
                    class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2">        
                        <Plus class="w-4 h-4"/>
                        <span>
                            Add User
                        </span>
                    </button>
                </div>
            </div>

            <!--Search & Filter-->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-4">

                    <!--Search Input-->
                    <div class="flex-1 relative">
                        <Search class="absolute right-4 top-2.5 w-5 h-5 text-gray-400"/>
                        <input type="text" v-model="searchQuery" placeholder="Search by name or email..."
                        class="w-full pr-10 pl-12 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                        <button v-if="searchQuery" @click="searchQuery = ''"
                        class="absolute left-4 top-2.5 p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X class="w-4 h-4 text-gray-500"/>
                        </button>
                    </div>

                    <!--Role Filter-->
                    <div class="relative md:w-48">
                        <Filter class="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"/>
                        <select v-model="roleFilter"
                        class="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white appearance-none cursor-pointer">
                            <option value="all">All Roles</option>
                            <option value="admin">Admin Only</option>
                            <option value="user">User Only</option>
                        </select>
                    </div>
                </div>
            </div>

            <!--Filter Status-->
            <div v-if="roleFilter !== 'all'"
            class="py-2 border-t border-gray-200">
                <p class="text-sm text-center text-gray-600">
                    Showing
                    <span class="font-semibold text-blue-600">{{ users.length }}</span>
                    of
                    <span class="font-semibold">{{ allUsers.length }}</span>
                    users
                </p>
            </div>

            <!--Users Table-->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                <!--Loading State-->
                <div v-if="loading" class="p-12 text-center">
                    <Loader2 class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3"/>
                    <p class="text-gray-500">
                        Loading Users...
                    </p>
                </div>

                <!--Empty State-->
                <div v-else-if="users.length === 0" class="p-12 text-center">
                    <Users class="w-16 h-16 text-gray-300 mx-auto mb-3"/>
                    <p class="text-gray-500">
                        No users found
                    </p>
                </div>

                <!--Desktop Table-->
                <div v-else>
                    <div class="hidden md:block overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        #
                                    </th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        User
                                    </th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Email
                                    </th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Role
                                    </th>
                                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="(user, index) in users" :key="user.id"
                                class="hover:bg-gray-100 transition-colors">
                                    <td class="px-6 py-4 text-sm font-bold text-gray-500">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {{ user.name.charAt(0)?.toUpperCase() }}
                                            </div>
                                            <span class="font-medium text-gray-800">
                                                {{ user.name }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-semibold text-gray-600">
                                        {{ user.email }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <span :class="['inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold'
                                            ,user.role === 'admin'? 'bg-purple-100 text-purple-700': 'bg-blue-100 text-blue-700'
                                        ]">
                                            <component :is="user.role === 'admin'? Shield: UserIcon"/>
                                            {{ user.role === 'admin'? 'Admin': 'User' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-2">
                                            <button @click="openEditModal(user)" 
                                            class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors ">
                                                <Edit class="w-5 h-5"/>
                                            </button>

                                            <button @click="openDeleteModal(user)" 
                                            class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                                                <Trash2 class="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="md:hidden divile-y divile-gray-200">
                        <div v-for="user in users" :key="user.id" class="p-4">
                            <div class="flex items-center gap-4 mb-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                        {{ user.name.charAt(0).toUpperCase() }}
                                    </div>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-800">
                                        {{ user.name }}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        {{ user.email }}
                                    </p>
                                </div>
                            </div>
                            <span :class="[
                                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
                                user.role === 'admin'? 'bg-purple-100 text-purple-700': 'bg-blue-100 text-blue-700'
                            ]">
                                {{ user.id === 'admin'? 'Admin': 'User' }}
                            </span>

                            <div class="flex items-center gap-2 justify-end">
                                <button @click="openEditModal(user)" class="px-3 py-1.5 text-blue-600 font-semibold hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1">
                                    <Edit class="w-3 h-3"/>
                                    Edit
                                </button>
                                <button @click="openDeleteModal(user)" class="px-3 py-1.5 text-red-600 font-semibold hover:bg-red-100 rounded-lg transition-colors flex items-center gap-1">
                                    <Trash2 class="w-3 h-3"/>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <AddUserModal v-model="isAddModalOpen" @success="fetchUsers"/>
        <EditUserModal v-model="isEditModalOpen" @success="fetchUsers" :user="selectUser"/>
        <DeleteUserModal v-model="isDeleteModalOpen" @success="fetchUsers" :user="selectUser"/>
    </div>
</template>