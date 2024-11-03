<template>
    <Form2 v-if="currentStep === 1 && token" :personalData="personalData" :filesData="filesData" @step4-complete="handleStep4Complete" />
    <Form3 v-if="currentStep === 2 && token" :personalData="personalData" :filesData="filesData" @prev-step="handlePrevStep5"  />

    <MainFooter/>
</template>

<script>
import Form2 from './Form2.vue'
import Form3 from './Form3.vue'
import MainFooter from '@/components/MainFooter.vue';
import { useRouter, useRoute } from 'vue-router';

import { ref, onMounted } from 'vue';

    export default {
        components: {
            Form2,
            Form3,
            MainFooter
        },

        setup () {
            const token = sessionStorage.getItem('token')

            const route = useRoute()
            // const queryType = ref('')
            // const router = useRouter()
            const currentStep = ref(1);
           
            const personalData = ref({});
            const filesData = ref({});
            onMounted(() => {
                window.scrollTo(0, 0)
                
                if (route.query.type) {
                    // queryType.value = route.query.type  
                    currentStep.value = 2
                }
            })
            

            const handleStep4Complete = (personalDataValue) => {
                personalData.value = personalDataValue;
                currentStep.value = 2;
            }

            const handlePrevStep5 = (data) => {
                filesData.value = data.filesData;
                currentStep.value = 1; 
            };

            return {
                currentStep,
                token,
                personalData,
                filesData,
                handleStep4Complete,
                handlePrevStep5
            }
        },

    }
</script>
