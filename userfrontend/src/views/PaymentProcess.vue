<template>
    <MainNavbar/>
    
    <Payment v-if="currentStep === 1" :paymentData="paymentData" @step1-complete="handleStep1Complete" />
    <PaymentPlatform v-if="currentStep === 2" :paymentData="paymentData" :status="status" @step2-complete="handleStep2Complete" />
    <SuccessfulPayment v-if="currentStep === 3" :paymentData="paymentData" :newPaymentData="newPaymentData" />

    <MainFooter/>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue';
import Payment from '@/views/Payment.vue'
import PaymentPlatform from '@/views/PaymentPlatform.vue'
import SuccessfulPayment from '@/views/SuccessfulPayment.vue'
import MainFooter from '@/components/MainFooter.vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import { onMounted, ref } from 'vue';

const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            MainNavbar,
            Payment,
            PaymentPlatform,
            SuccessfulPayment,
            MainFooter
        },

        setup () {

            const currentStep = ref(1);
            const paymentData = ref({});
            const newPaymentData = ref({});
            const route = useRoute()
            const router = useRouter()
            const roi = route.query.ROI

            // const status = ref({})
            const status = ref('')

            onMounted(async() => {
                try {
                    const headers = { 
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                    }
                   const checkStatus = await axios.get(`${apiUrl}/Orders/is-order-ready-for-payment/${roi}`, {headers: headers})
                    status.value = checkStatus.data
              
                } catch (error) {
                    console.log(error);     
                }

                if (status.value.successful === true && status.value.data.paymentStatus === 'Pending') {
                    currentStep.value = 2
                } else if (status.value.successful === true && status.value.data.paymentStatus !== 'Pending') {
                    currentStep.value = 3
                    // router.push({name: 'welcome'})
                } 
            })

            const handleStep1Complete = (paymentDataValue) => {
                paymentData.value = paymentDataValue;
               
                currentStep.value = 2;
            }

            const handleStep2Complete = (paymentDataValue) => {
                newPaymentData.value = paymentDataValue;
                currentStep.value = 3;
            }

            return {
                currentStep,
                paymentData,
                handleStep1Complete,
                handleStep2Complete,
                status,
                newPaymentData
            }
        },

    }
</script>
