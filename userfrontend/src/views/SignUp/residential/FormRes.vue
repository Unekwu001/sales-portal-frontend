<template>

    <Form11 v-if="currentStep === 1" :resData="resData" @step1-complete="handleStep1Complete" />
    <!-- pass resData props to subsequent components where required to get their data passed on -->
    <Location v-if="currentStep === 2" :searchData="searchData" :resData="resData" @step2-complete="handleStep2Complete" @step2-incomplete="handleStep2InComplete" />
    <LocationFound v-if="currentStep === 3" :searchData="searchData" :resData="resData" :currentStep="currentStep" @prev-step="handlePrevStep3" @step3-complete="handleStep3Complete" />
    <LocationNotFound v-if="currentStep === 4" :searchData="searchData" :currentStep="currentStep" @prev-step="handlePrevStep3" />

    <MainFooter/>
</template>

<script>
import Form11 from './Form1.1.vue';
import Location from './Location.vue';
import LocationFound from './LocationFound.vue'
import LocationNotFound from '../LocationNotFound.vue'
import MainFooter from '@/components/MainFooter.vue';


import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

    export default {
        components: {
            Form11,
            Location,
            LocationFound,
            LocationNotFound,
            // Form2,
            // Form3,
            MainFooter
        },

        setup () {

            const currentStep = ref(1);
            // const smeData = ref({});
            const resData = ref({});
            const searchData = ref({});
            const personalData = ref({});
            const filesData = ref({});

            // const currentPath = ref('')
            // const route = useRoute()
            // const router = useRouter()
           
            onMounted(() => {
                // currentPath.value = route.path || router.currentRoute.value.fullPath
                // sessionStorage.setItem('path', currentPath.value)
                // console.log(currentPath.value);
                // currentPath.value = route.path || router.currentRoute.value.fullPath
                const token = sessionStorage.getItem('token')

                if (token) {
                    currentStep.value = 2
                }

                // prevent enter key from submitting form
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                    event.preventDefault(); 
                    }
                });
            })

            const handleStep1Complete = (resDataValue) => {
                resData.value = resDataValue;

                currentStep.value = 2;

                
            }

            const handleStep2Complete = (searchDataValue) => {
                searchData.value = searchDataValue;
                currentStep.value = 3;
            }
            const handleStep2InComplete = (searchDataValue) => {
                searchData.value = searchDataValue;
                currentStep.value = 4;
            }

            const handlePrevStep3 = (data) => {
                searchData.value = data.searchData;
                currentStep.value = 2; 
            };
            
            return {
                currentStep,
                // token,
                resData,
                searchData,
                personalData,
                filesData,
                handleStep1Complete,
                handleStep2Complete,
                handleStep2InComplete,
                handlePrevStep3,
            }
        },

    }
</script>
