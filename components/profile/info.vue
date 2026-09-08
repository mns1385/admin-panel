<script setup lang="ts">
import { useProfileStore } from '~/stores/profile';
import { Mail, User, Shield, IdCard } from 'lucide-vue-next'
import { P } from 'vue-router/dist/index-BN0B0y8a.js';

const profileStore = useProfileStore()

const user = computed(() => profileStore.user || {})
</script>

<template>
    <div class="space-y-6">

        <!--Section Header-->
        <div>
            <div>
                <User/>
            </div>

            <div>
                <h3>
                    Personal information
                </h3>
                <p>
                    View your account details
                </p>
            </div>
        </div>

        <!--info Cards Grid-->
        <div>

            <!--New Card-->
            <div>
                <div>
                    <div>
                        <User/>
                    </div>

                    <div>
                        <p>
                            Full Name
                        </p>
                        <p>
                            {{ user.name || 'Not set' }}
                        </p>
                    </div>
                </div>
            </div>

            <!--Email Card-->
            <div>
                <div>
                    <div>
                        <Mail/>
                    </div>

                    <div>
                        <p>
                            Email Address
                        </p>
                        <p>
                            {{ user.email || 'Not set' }}
                        </p>
                    </div>
                </div>
            </div>

            <!--Role Card-->
            <div>
                <div>
                    <div>
                        <Shield/>
                    </div>
                    <div>
                        <p>
                            Role
                        </p>
                        <span>
                            {{ user.role === 'admin'? 'Administrator': 'User' }}
                        </span>
                    </div>
                </div>
            </div>

            <!--ID Card-->
            <div>
                <div>
                    <div>
                        <IdCard/>
                    </div>
                    <div>
                        <p>
                            User ID
                        </p>
                        <p>
                            #{{ user.id || 'N/A' }}
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <!--Account Status-->
        <div>
            <div>
                <div></div>
                <p>
                    Account Active
                </p>
                <p>
                    Your account is verified and in good standing
                </p>
            </div>
        </div>
    </div>
</template>