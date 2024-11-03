<template>
    <div class="main-container">
     
        <!-- Modal
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="receipt-container" id="element-to-convert">
                    <div class="container">
                        <div class="row main-row">
                            <div class="logo"><img src="../assets/images/ipNX_Logo.png" alt=""></div>
                            <p class="heading">RECEIPT</p>
                            <div class="col-lg-12 receipt-details">
                                    <div class="col-lg-12 date-time">Date & Time</div>
                             
                                <div class="row row-detail">
                                    <div class="col-lg-8">Plan Type</div>
                                    <div class="col-lg-4">Bronze</div>
                                </div>
                                <div class="row row-detail">
                                    <div class="col-lg-8">Price</div>
                                    <div class="col-lg-4">N50,000</div>
                                </div>
                                <div class="row row-detail">
                                    <div class="col-lg-8">Modem & Installation</div>
                                    <div class="col-lg-4">N45,150</div>
                                </div>
                                <div class="row row-detail">
                                    <div class="col-lg-8">Total</div>
                                    <div class="col-lg-4">N95,150</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            <div class="modal-btn">
                <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close" @click="generateToken, exportPDF()">
                    download
                </button>
                
            </div>
            </div>
        </div>
        </div> -->


        <div class="row main-row">
            <div class="col-lg-5 col-md-6 col-sm-12 column1">
               <p class="main-heading">Congratulations, Order Placed!</p>
               <p class="sub-heading">Payment Successful! Your order has been placed successfully. 
                Would you like to proceed to book a slot for your installation now?</p>

                <div class="price-details">
                    <p class="price-details-heading">Price details</p>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row details">
                                <span class="col-lg-8 label-details">Plan price</span>
                                <span class="col-lg-4 details-label-amount" ><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(planPrice * month) }}</span>
                                <!-- <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format(packagePriceValue) }}</span> -->
                            </div>
                            <div class="row details">
                                <span class="col-lg-8 label-details">Modem & Installation</span>
                                <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packageSetUpChargeValue) }}</span>
                            </div>
                            <div class="row details" v-if="hasDiscount">
                                <span class="col-lg-8 label-details">Discount ({{ discount }} % Off)</span>
                                <span class="col-lg-4 details-label-amount" ><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packageSetUpChargeValue * (discount / 100)) }}</span>
                                <!-- <span class="col-lg-4 details-label-amount" ><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( (packageSetUpChargeValue * (discount / 100)) + (packagePriceValue * numberOfMonth)) }}</span> -->
                                <!-- <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( (packageSetUpChargeValue + packagePriceValue) * (discount / 100))}}</span> -->
                            
                            </div>
                            <div class="row details" v-if="hasDiscount">
                                <span class="col-lg-8 label-details">Total Amount</span>
                                <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ ((packagePriceValue * 2) + packageSetUpChargeValue).toLocaleString("en-US") }}</span> -->
                                <!-- <span class="col-lg-4 details-label-amount" ><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( (packageSetUpChargeValue + (packagePriceValue * numberOfMonth)) + (packageSetUpChargeValue - (packageSetUpChargeValue * (discount / 100)) ) )}}</span> -->
                                <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(((packageSetUpChargeValue) - (packageSetUpChargeValue * (discount / 100)) + (packagePriceValue * numberOfMonth) )  )}}</span> -->
                                <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( total_amount )}}</span>
                            </div>
                            <div class="row details" v-else>
                                <span class="col-lg-8 label-details">Total Amount</span>
                                <!-- <span class="col-lg-4 details-label-amount" ><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( packageSetUpChargeValue + (packagePriceValue * numberOfMonth))}}</span> -->
                                <span class="col-lg-4 details-label-amount" ><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( total_amount)}}</span>
                
                                <!-- <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( packageSetUpChargeValue + packagePriceValue)}}</span> -->
                            </div>
                        </div>
                
                        <div class="buttons">
                            <button type="button" class="btn download-btn" @click="downloadReceipt">
                                Download Receipt
                            </button>
                        
                            <button type="button" class="btn schedule-btn" @click.prevent="schedule">
                                Schedule Installation
                            </button>

                        </div> 
                    </div>
                </div>
               
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12 column2">   
                <img src="../assets/images/vector.png" alt="vector" class="vector-image">  
            </div>
        </div>

    </div>
   
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

import Logo from '../assets/images/ipNX_Logo.png'

const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            Logo
        },
        props: ['paymentData', 'newPaymentData'],
        setup(props, {emit}) {
        const swal = inject('$swal')

            const router = useRouter()
            const route = useRoute()

            const user = ref(null)
            const userEmail = ref(null)
            // const imageUrl = ref('../assets/images/ipNX_Logo.png')

            const plan = ref(null)
            const packageType = ref(null)
            const packageName = ref(null)
            const packageNameValue = ref(null)
            const packagePrice = ref(null)
            const packagePriceValue = ref(null)
            const packageSpeed = ref(null)
            const packageSpeedValue = ref(null)
            const packageSetUpCharge = ref(null)
            const packageSetUpChargeValue = ref(null)

            const total_amount = props.newPaymentData.amount
            const discount = props.newPaymentData.discount
            const month = parseInt(props.newPaymentData.month, 10)
            const planName = props.newPaymentData.planName
            const planPrice = parseInt(props.newPaymentData.planPrice, 10)
            const refId = props.newPaymentData.reference
            const planId = props.newPaymentData.planId
            const planTypeId = props.newPaymentData.planTypeId
            const orderId = props.newPaymentData.roi
            const orderDetails = ref('')
            const ResOrSme = ref('')

            const numberOfMonth = ref('')
            if (props.newPaymentData) {
                numberOfMonth.value = props.newPaymentData.month
            } else {
                numberOfMonth.value = 1
           
            }
            // const discount = props.paymentData.discount
            const hasDiscount = ref('')

                // on mounted get selected plan
        onMounted(async() => {
            window.scrollTo(0, top);

            // console.log(planName);
            

            if (discount === null || discount === 'null' || discount === 0) {
                hasDiscount.value = false
            }else{
                hasDiscount.value = true
            }

            // const planId = route.query.planId
            // const planTypeId = route.query.planTypeId
          
            const headers = { 
                'Content-Type': 'application/json' ,
                'Authorization': `${sessionStorage.getItem('token')}`,
                'accept': '*/*'
            }
            try {
                // get user details 
                const userResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                user.value = userResponse.data

             
                const orderDetailsResponse = await axios.get(`${apiUrl}/Orders/view-my-order/${orderId}`, {headers: headers})
                orderDetails.value = orderDetailsResponse.data
            
               
                if(user.value.email !== null){
                    userEmail.value = user.value.email
                }else if(user.value.contactPersonEmail !== null){
                    userEmail.value = user.value.contactPersonEmail
                }

                const planResponse = await axios.get(`${apiUrl}/Plans/view-all-plans`, {headers: headers})
                const plans = planResponse.data
       
                const filteredPlanId = JSON.stringify(plans.filter(plan => plan.id === planId), null, 2)

                // ResOrSme.value = JSON.parse(filteredPlanId). map(plan => plan.planName)
                ResOrSme.value = JSON.parse(filteredPlanId).map(plan => plan.planName)[0]

                // console.log('resorsme', ResOrSme.value);
                

                // get details of plan purchase
                const response = await axios.get(`${apiUrl}/Plans/view-active-plan-types/${planId}`, {headers: headers})
                plan.value = response.data

                packageType.value = JSON.stringify(plan.value.filter(item => item.id === planTypeId), null, 2)
   
                packageName.value = JSON.parse(packageType.value). map(item => item.planTypeName)
                // console.log(packageName.value[0]);
                packagePrice.value = JSON.parse(packageType.value). map(item => item.price)
                // console.log(typeof(parseInt(packagePrice.value)));
                packageSpeed.value = JSON.parse(packageType.value). map(item => item.bandSpeed)
                packageSetUpCharge.value = JSON.parse(packageType.value). map(item => item.setUpCharge)

                packageNameValue.value = packageName.value[0]
                // packagePriceValue.value = packagePrice.value[0].toLocaleString("en-US")
                packagePriceValue.value = packagePrice.value[0]
                packageSpeedValue.value = packageSpeed.value[0]
                // packageSetUpChargeValue.value = packageSetUpCharge.value[0].toLocaleString("en-US")
                packageSetUpChargeValue.value = packageSetUpCharge.value[0]
                // console.log(packageSetUpChargeValue.value);

                return {plan}
            } catch (error) {
                console.log(error);
            }
           
        })

            // schedule installation method
            const schedule = () => {
                   //document upload reminder
                   if ((ResOrSme.value === 'RESIDENTIAL BROADBAND') || route.query.planName === 'residential') {
                        if ((orderDetails.value.passportPhotograph === null || orderDetails.value.governmentId === null || orderDetails.value.utilityBill === null) || 
                                (orderDetails.value.passportPhotograph === '' || orderDetails.value.governmentId === '' || orderDetails.value.utilityBill === '')
                                ) 
                            {
                                swal.fire({
                                title: 'Incomplete Documents!',
                                text: 'Click here to go to the next page.',
                                html: '<span>Kindly upload requested documents to proceed to scheduling an installation. Click</span><span style="cursor: pointer; color: blue; text-decoration: none;" id="alert-link"> here</span>',
                                showConfirmButton: false,
                                showCloseButton: false,
                            });

                            // Add an event listener to the custom link
                            swal.getHtmlContainer().querySelector('#alert-link').onclick = () => {
                                    const plan = 'residential'
                                    const type ='document'
                                    const residentialOrderId = orderId
                                    router.push({name: 'ResForm', query: {residentialOrderId, plan, type} })
                               
                                swal.close(); // Close the alert after redirect
                            };
                            }else{
                                router.push({name: 'ScheduleInstallation', query: {orderId}})
                            }
                   } else {
                        if ((orderDetails.value.passportPhotograph === null || orderDetails.value.letterOfIntroduction === null || orderDetails.value.governmentId === null ||
                                orderDetails.value.utilityBill === null || orderDetails.value.certificateOfIncorporation === null) || 
                                (orderDetails.value.passportPhotograph === '' || orderDetails.value.letterOfIntroduction === '' || orderDetails.value.governmentId === '' ||
                                orderDetails.value.utilityBill === '' || orderDetails.value.certificateOfIncorporation === '')
                                ) 
                            {
                                swal.fire({
                                title: 'Incomplete Documents!',
                                text: 'Click here to go to the next page.',
                                html: '<span>Kindly upload requested documents to proceed to scheduling an installation. Click</span><span style="cursor: pointer; color: blue; text-decoration: none;" id="alert-link"> here</span>',
                                showConfirmButton: false,
                                showCloseButton: false,
                            });

                            // Add an event listener to the custom link
                            swal.getHtmlContainer().querySelector('#alert-link').onclick = () => {
                                    const plan = 'sme'
                                    const type ='document'
                                    const smeOrderId = orderId
                                    router.push({name: 'SmeForm', query: {smeOrderId, plan, type} })
                                
                                swal.close(); // Close the alert after redirect
                            };
                            }else{
                                router.push({name: 'ScheduleInstallation', query: {orderId}})
                            }
                   }
                   
                //    if ((orderDetails.value.passportPhotograph === null || orderDetails.value.letterOfIntroduction === null || orderDetails.value.governmentId === null ||
                //             orderDetails.value.utilityBill === null || orderDetails.value.certificateOfIncorporation === null) || 
                //             (orderDetails.value.passportPhotograph === '' || orderDetails.value.letterOfIntroduction === '' || orderDetails.value.governmentId === '' ||
                //             orderDetails.value.utilityBill === '' || orderDetails.value.certificateOfIncorporation === '')
                //             ) 
                //         {
                //             // console.log('document not complete');
                //             swal.fire({
                //                 title: 'Incomplete Documents!',
                //                 text: 'Click here to go to the next page.',
                //                 html: '<span>Kindly upload requested documents to proceed to scheduling an installation. Click</span><span style="cursor: pointer; color: blue; text-decoration: none;" id="alert-link"> here</span>',
                //                 showConfirmButton: false,
                //                 showCloseButton: false,
                //             });

                //             // Add an event listener to the custom link
                //             swal.getHtmlContainer().querySelector('#alert-link').onclick = () => {
                //                 if ((ResOrSme.value === 'RESIDENTIAL BROADBAND') || route.query.planName === 'residential'){
                //                     const plan = 'residential'
                //                     const type ='document'
                //                     const residentialOrderId = orderId
                //                     router.push({name: 'ResForm', query: {residentialOrderId, plan, type} })
                //                 }else {
                //                     const plan = 'sme'
                //                     const type ='document'
                //                     const smeOrderId = orderId
                //                     router.push({name: 'SmeForm', query: {smeOrderId, plan, type} })
                //                 }
                //                 swal.close(); // Close the alert after redirect
                //             };
                     
                //         }
                //         else{
                //             router.push({name: 'ScheduleInstallation', query: {orderId}})
                //         }
               
            }

        
        const downloadReceipt = () => {
            const paymentDate = props.newPaymentData.date
            const paymentTime = props.newPaymentData.time 
            const paymentStatus = props.newPaymentData.status

            if (hasDiscount.value === true) {
                    const receiptTemplate = `<!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <!-- <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>Document</title> -->
                                            <style scoped>
                                                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

                                                .main-container {
                                                    /* background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03)); */
                                                    font-family: 'IBM Plex Sans', sans-serif;
                                                    padding-top: 20px;
                                                    padding-bottom: 30px;
                                                }
                                                .container {
                                                    /* margin: auto; */
                                                    /* text-align: center; */
                                                        text-align: justify;
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                }
                                                .logo {
                                                    text-align: right;
                                                    margin-bottom: 10px;
                                                }
                                                p.heading{
                                                    text-align: center;
                                                    font-size: 24px;
                                                    font-weight: 600;
                                                }
                                                div.row-detail:not(:last-child){
                                                    border-bottom: 1px solid #DA1919;
                                                }
                                                div.row-detail div{
                                                    margin: 30px auto;
                                                }
                                                div.row-detail div:nth-child(1), .date-time{
                                                    font-weight: 600;
                                                }
                                                div.row-detail div:nth-child(2){
                                                    text-align: right;
                                                }
                                                .receipt-details{
                                                    margin-top: 30px;
                                                }
                                                .date-time {
                                                    border-bottom: 3px solid #DA1919;
                                                    padding-bottom: 20px;
                                                }
                                                del {
                                                    text-decoration-style: double;
                                                }

                                                </style>
                                        </head>
                                        <body>
                                            <div class="main-container" id="receipt-content">
                                                <div class="container">
                                                    <div class="row main-row">
                                                            <div class="logo"><img src="ipNX_Logo.png" alt=""></div>
                                                            <!-- <div class="logo"><img src="ipNX_Logo.png" alt="" style=" width: 75px;"></div>-->
                                                        <!--<div class="logo"><img src="/src/assets/ipNX_Logo.png" alt=""></div>-->
                                                        <!--<div class="logo"><img src="https://devsalesportal.ipnxnigeria.net/src/assets/ipNX_Logo.png" alt="logo"></div>-->
                                                        <p class="heading">RECEIPT</p>
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 receipt-details">
                                                            <div class="row date-time">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">${paymentDate} ${paymentTime}</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${userEmail.value}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Status</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${paymentStatus}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Reference Number</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${refId}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Plan Type</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${packageNameValue.value}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Price</div>
                                                                <div  class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(planPrice * month)}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Modem & Installation</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packageSetUpChargeValue.value)}</div>
                                                            </div>
                                                             <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Discount (${discount} % Off)</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( (packageSetUpChargeValue.value * (discount / 100)) )}</div>
                                                            </div>
                                                        
                                                            <div class="row row-detail">
                                                                    <div class="col-lg-8 col-md-8 col-sm-8 col-8">Total</div>
                                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( total_amount )}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                        </body>
                                        </html>`

                html2pdf(receiptTemplate, {
                    
                    margin: 1,
                    filename: 'receipt.pdf'
                })
                
            }else{
               
                    const receiptTemplate = `<!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <!-- <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <title>Document</title> -->
                                            <style scoped>
                                                @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
    
                                                .main-container {
                                                    /* background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03)); */
                                                    font-family: 'IBM Plex Sans', sans-serif;
                                                    padding-top: 20px;
                                                    padding-bottom: 30px;
                                                }
                                                .container {
                                                    /* margin: auto; */
                                                    /* text-align: center; */
                                                        text-align: justify;
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                }
                                                .logo {
                                                    text-align: right;
                                                    margin-bottom: 10px;
                                                }
                                                p.heading{
                                                    text-align: center;
                                                    font-size: 24px;
                                                    font-weight: 600;
                                                }
                                                div.row-detail:not(:last-child){
                                                    border-bottom: 1px solid #DA1919;
                                                }
                                                div.row-detail div{
                                                    margin: 30px auto;
                                                }
                                                div.row-detail div:nth-child(1), .date-time{
                                                    font-weight: 600;
                                                }
                                                div.row-detail div:nth-child(2){
                                                    text-align: right;
                                                }
                                                .receipt-details{
                                                    margin-top: 30px;
                                                }
                                                .date-time {
                                                    border-bottom: 3px solid #DA1919;
                                                    padding-bottom: 20px;
                                                }
                                                del {
                                                    text-decoration-style: double;
                                                }
    
                                                </style>
                                        </head>
                                        <body>
                                            <div class="main-container" id="receipt-content">
                                                <div class="container">
                                                    <div class="row main-row">
                                                             <div class="logo"><img src="ipNX_Logo.png" alt=""></div>
                                                            <!-- <div class="logo"><img src="ipNX_Logo.png" alt="" style=" width: 75px;"></div>-->
                                                        <!--<div class="logo"><img src="/src/assets/ipNX_Logo.png" alt=""></div>-->
                                                        <!--<div class="logo"><img src="https://devsalesportal.ipnxnigeria.net/src/assets/ipNX_Logo.png" alt="logo"></div>-->
                                                        <p class="heading">RECEIPT</p>
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 receipt-details">
                                                            <div class="row date-time">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">${paymentDate} ${paymentTime}</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${userEmail.value}</div>
                                                            </div>
                                                              <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Status</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${paymentStatus}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Reference Number</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${refId}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Plan Type</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">${planName}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Price</div>
                                                                <div  class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(planPrice * month)}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Modem & Installation</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packageSetUpChargeValue.value)}</div>
                                                            </div>
                                                            <div class="row row-detail">
                                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">Total</div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                                                    <del>N</del>${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total_amount)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                        </body>
                                        </html>`
    
                html2pdf(receiptTemplate, {
                    
                    margin: 1,
                    filename: 'receipt.pdf'
                })
                
            }

    
        }

            return { schedule, packageNameValue, packagePriceValue, packageSpeedValue, packageSetUpChargeValue, packagePrice, numberOfMonth,
                downloadReceipt, hasDiscount, discount, total_amount, month, planPrice
             }
        }
    }
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

.main-container {
    background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
    overflow-x: hidden;
    overflow-y: hidden;
    font-family: 'IBM Plex Sans', sans-serif;
}

.main-row {
    padding: 80px 30px 40px 100px;
}
.main-heading {
    font-family: 'IBM Plex Sans';
    font-size: 30px;
    font-weight:700;
    color: #263238;
}
.sub-heading {
    color: #949DAB;
    font-size: 16px;
    font-weight: 500;
}
.price-details {
    margin: 30px auto;
}
.price-details-heading {
    font-weight: 700;
    font-size: 18px;
}
.details {
    margin-bottom: 20px;
}
.buttons {
    margin-top: 40px;
}
.download-btn, .schedule-btn {
    border: 1px solid #0000001F;
    width: 200px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
}
.download-btn {
    color: #000000;
    background: #ffffff;
    padding: 8px 31px;
    margin-right: 30px;
}
.schedule-btn {
    background: #DA1919;
    color: #ffffff;
    /* float: right; */
    padding: 8px 26px;
}
.download-btn:hover {
    background: #DA1919;
    color: #ffffff;
}
.download-btn:hover + .schedule-btn {
    background-color: #ffffff;
    color: #000000;
}
.column2 {
    margin: 40px auto;
}
.vector-image {
    width: 500px;
}

/* .vector-image-responsive {
    display: none;
} */

/* RECEIPT */
.modal-dialog {
    widows: 5000px;
}
.receipt-container {
    /* background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03)); */
    font-family: 'IBM Plex Sans', sans-serif;
    padding-top: 20px;
    padding-bottom: 30px;
}
.container {
    /* margin: auto; */
    /* text-align: center; */
        text-align: justify;
        display: flex;
        justify-content: center;
        align-items: center;
}
.logo {
    text-align: right;
    margin-bottom: 10px;
}
p.heading{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
}
div.row-detail:not(:last-child){
    border-bottom: 1px solid #DA1919;
}
div.row-detail div{
    margin: 30px auto;
}
div.row-detail div:nth-child(1), .date-time{
    font-weight: 500;
}
div.row-detail div:nth-child(2){
    text-align: right;
}
.receipt-details{
    margin-top: 30px;
}
.date-time {
    border-bottom: 3px solid #DA1919;
    padding-bottom: 20px;
}

@media (min-width: 768px) and (max-width: 992px) {
    .main-row {
        padding: 100px 30px;
    }
    .vector-image {
        width: 375px;
    }

}
@media (min-width: 481px) and (max-width: 767px) {
    .main-row {
        padding: 100px 30px 30px;
        text-align: center;
        margin: auto;
    }
    .vector-image {
        width: 450px;
        display: none;
    }
    /* .vector-image-responsive {
        display: block;
        width: 450px;
    } */
}

@media  (max-width: 480px) {
    .main-row {
        padding: 100px 30px 30px;
        text-align: center;
        margin: auto;
    }
    .vector-image {
        display: none;
    }
    .download-btn {
        margin-right: auto;
        margin-bottom: 20px;
    }
    /* .vector-image-responsive {
        display: block;
        width: 350px;
    } */
    
}
</style>