<template>

    <Form12 v-if="currentStep === 1" :smeData="smeData" @step1-complete="handleStep1Complete" />
    <Location v-if="currentStep === 2" :smeData="smeData" :searchData="searchData" @step2-complete="handleStep2Complete" @step2-incomplete="handleStep2InComplete"/>
    <LocationFound v-if="currentStep === 3" :searchData="searchData" :currentStep="currentStep" :smeData="smeData" @prev-step="handlePrevStep3" @step3-complete="handleStep3Complete" />
    <LocationNotFound v-if="currentStep === 4" :searchData="searchData" :currentStep="currentStep"  @prev-step="handlePrevStep3" />

    <MainFooter/>
</template>

<script>
import Form12 from './Form1.2.vue';
import Location from './Location.vue';
import LocationFound from './LocationFound.vue'
import LocationNotFound from '../LocationNotFound.vue'
import MainFooter from '@/components/MainFooter.vue';

import { ref, onMounted } from 'vue';
    export default {
        components: {
            Form12,
            Location,
            LocationFound,
            LocationNotFound,
            MainFooter
        },

        setup () {

            const currentStep = ref(1);
            const smeData = ref({});
            // const resData = ref({});
            const searchData = ref({});
            const personalData = ref({});
            const filesData = ref({});

            onMounted(() => {
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

            const handleStep1Complete = (smeDataValue) => {
                smeData.value = smeDataValue;
                // console.log(smeData.contactPersonEmail.value);
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

            const handleStep3Complete = (data) => {
                searchData.value = data;
                currentStep.value = 5;
            }

            const handleStep4Complete = () => {
                currentStep.value = 5;
            }

            const handlePrevStep3 = (data) => {
                searchData.value = data.searchData;
                currentStep.value = 2; 
            };

            return {
                currentStep,
                smeData,
                searchData,
                personalData,
                filesData,
                handleStep1Complete,
                handleStep2Complete,
                handleStep2InComplete,
                handlePrevStep3,
                handleStep3Complete,
                handleStep4Complete
                // currentPath
            }
        },

    }
</script>
