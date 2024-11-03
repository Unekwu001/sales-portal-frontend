<template>
        <Form2Sme v-if="currentStep === 1 && token" :personalData="personalData" :filesData="filesData" @step4-complete="handleStep1Complete" />
        <Form3Sme v-if="currentStep === 2 && token" :personalData="personalData" :filesData="filesData" @prev-step="handlePrevStep2"  />
    
        <MainFooter/>
    </template>
    
    <script>
    import Form2Sme from './Form2Sme.vue'
    import Form3Sme from './Form3Sme.vue'
    import MainFooter from '@/components/MainFooter.vue';
    import { useRouter, useRoute } from 'vue-router';
    
    import { ref, onMounted } from 'vue';
    
        export default {
            components: {
                Form2Sme,
                Form3Sme,
                MainFooter
            },
    
            setup () {
                const token = sessionStorage.getItem('token')
                    const route = useRoute()
                    const router = useRouter()
                    const currentStep = ref(1);
                    const personalData = ref({});
                    const filesData = ref({});

                onMounted(() => {
                    window.scrollTo(0, 0)
                    if (route.query.type) {
                        currentStep.value = 2
                    }
                    
                })
    
    
                const handleStep1Complete = (personalDataValue) => {
                    personalData.value = personalDataValue;
                    currentStep.value = 2;
                }
    
                const handlePrevStep2 = (data) => {
                    filesData.value = data.filesData;
                    currentStep.value = 1; 
                };

                // const handlePrevStep2 = (filesDataValue) => {
                //     filesData.value = filesDataValue;
                //     currentStep.value = 1; 
                // };
      
                return {
                    currentStep,
                    personalData,
                    filesData,
                    token,
                    handleStep1Complete,
                    handlePrevStep2
                }
            },
    
        }
    </script>
    
    <style scoped>
    
    </style>