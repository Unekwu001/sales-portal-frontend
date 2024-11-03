<template>
    <div class="main-container">
            <Spinner :loading="isLoading" />
            <div class="checkout-container">
                <div class="checkout-heading">
                    Select a Payment method
                </div>
                <div class="btn-row" @click="paystackPayment()">
                     <img src="../assets/icons/paystack.png" alt="paystack logo" width="50%">
                </div>
                <!-- <div class="btn-row">
                     <img src="../assets/icons/interswitch.png" alt="interswitch logo" width="50%">
                </div> -->
            </div>
        
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components:{
          Spinner
      },
        name: 'PaymentPlatform',
        props: ['paymentData', 'status', 'newPaymentData'],
        setup(props, {emit}){
            const router = useRouter()
            const route = useRoute()
            const planId = route.query.planId
            const planTypeId = route.query.planTypeId
            const roi = route.query.ROI
            const user = ref(false)
            const refId = ref('')
            const total_amount = ref('')
            const discount = ref('')
            const planName = ref('')
            const planType = ref('')
            const planPrice = ref('')
            const isLoading = ref(false)
            const orderDetails = ref('')

            const month = ref('')
            

            onMounted(async() => {
                window.scrollTo(0, top);

                if (Object.keys(props.paymentData).length === 0) {
                    month.value = props.status.data.numberOfMonthsPaidFor
                    total_amount.value = props.status.data.totalPaymentExpected * 100
                    discount.value = props.status.data.discount
                    planName.value = props.status.data.planName
                    planPrice.value = props.status.data.costOfPlanType
                }else {
                    month.value = props.paymentData.month
                    total_amount.value = props.paymentData.amountValue
                    discount.value = props.paymentData.discount
                    planName.value = props.paymentData.planName
                    planPrice.value = props.paymentData.planPrice

                }
                
           

                
                const headers = { 
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                    }

                try {
                    isLoading.value = true  
                    const userResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})
                    user.value = userResponse.data

                    const orderDetailsResponse = await axios.get(`${apiUrl}/Orders/view-my-order/${roi}`, {headers: headers})

                    orderDetails.value = orderDetailsResponse.data

                }catch(error){
                    console.log(error);
                    
                }finally{
                    setTimeout(() => {
                        isLoading.value = false
                    }, 1000);
                }
            });

            const paystackPayment = () => {

                var handler = PaystackPop.setup({
                    key: 'pk_test_af0a474902311c5ddb610085a79b2fcdcf14e037', // Replace with your public key
                    email:user.value.email,
                    amount: total_amount.value,
                    ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
                    onClose: function(){
                    
                    },
                    callback: function(response){
                    let message = 'Payment complete! Reference: ' + response.reference;
                    refId.value = response.reference

                    isLoading.value = true

                    fetch(`${apiUrl}/Orders/paystack-payment-verification/${roi}/${refId.value}`, {
                        
                        method: 'GET',
                        headers: {
                            'Authorization': `${sessionStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        // console.log('Success:', data);
                        
                        const date = data.date
                        const time = data.time
                        const status = data.status

                     
                                setTimeout( () => emit('step2-complete', {
                                    roi: roi,
                                    planId: planId,
                                    planTypeId: planTypeId,
                                    reference: refId.value,
                                    date: date,
                                    time: time,
                                    status: status,
                                    amount: total_amount.value / 100,
                                    discount: discount.value,
                                    planName: planName.value,
                                    planPrice: planPrice.value,
                                    month: month.value
                                    // discount: discount.value

                                }), 500);

                                // router.push({name: 'SuccessfulPayment', query: {roi, planId, planTypeId, reference, date, time, status} } )
                            // }
                        // alert(data.message);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('An error occurred while verifying and confirming payment');
                    })

                    // alert(message);
                    
                    }
                });

                handler.openIframe();
            }

            return { paystackPayment, isLoading }
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

.checkout-container {
    margin: 50px auto;
    text-align: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 8px;
    width: 500px;
    font-family: 'IBM Plex Sans';
    padding: 20px;
}
.checkout-heading {
    font-size: 20px;
    font-weight: 600;
    /* margin-top: 20px !important;
    padding-top: 20px !important; */
}
.checkout-container .btn-row {
    padding: 0;
    margin: 0;
}

.checkout-container .btn-row img {
    padding: 0;
    margin: 10px 0;
    height: 100%;
    cursor: pointer;
    /* border: 1px solid #000; */
}
@media (min-width: 767px) and (max-width:992px) {
    .checkout-container {
        width: 350px;
    }
}
@media (max-width:768px) {
  
}

@media (max-width: 480px) {
    .checkout-container {
        width: 300px;
        padding: 15px 8px;
    }
    .checkout-heading {
        font-size: 16px;
    }
}
</style>