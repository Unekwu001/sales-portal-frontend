<template>
    <div class="main-container">
        <!-- <MainNavbar/> -->
        <Spinner :loading="isLoading" />
        <div class="body-container">
            <p class="container-heading">Selected Plan Review</p>
    
                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
               
                <div class="modal-body">
                    <h5 class="modal-heading">TERMS AND CONDITIONS</h5>
                    <p class="modal-text">
                        Extra costs may apply based on the outcome of a site survey. Initial payments are to be made via this portal. 
                        FOS internet service is a monthly pre-paid service. Service will be delivered within 4 days from the payment date which is subject to the completion of all civil engineering work”.
                        <br><br>We guarantee that our FOS optical network terminal (ONT/Modem) which we will give to you will work to the relevant specification for the minimum warranty period of 180 days.
                    </p>
                </div>
                <div class="modal-btn">
                    <button type="submit" class="btn" data-bs-dismiss="modal" aria-label="Close">
                        Continue
                    </button>
                    
                </div>
                </div>
            </div>
            </div>

            <div class="row body-row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="column1">
                        <p class="greeting">Hello {{ user.firstName }},</p>
                        <p class="row-text">Kindly review your selected plans and proceed to secure payment.
                            We appreciate your choice in choosing ipNX for your services.
                        </p>
                        <div class="row box">
                            <div class="col-lg-4 col-md-4 col-sm-4 box-top">
                                <span class="top amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format(packagePriceValue) }}</span>
                                <span class="down">Monthly</span>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-4 box-top">
                                <!-- <span class="top">Silver</span> -->
                                <!-- <span class="top">{{ this.$route.query.title }}</span> -->
                                <span class="top">{{ packageNameValue }}</span>
                                <span class="down">{{ packageDataAllowanceValue }}</span>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-4 box-top">
                                <span class="top">{{ packageSpeedValue }}</span>
                                <span class="down">Speed</span>
                            </div>
    
                            <hr>
    
                            <div class="box-bottom">
                                <div class="calls">
                                    <span><img src="../assets/icons/call-icon.png" alt="" width="20%"></span>
                                    <span>FREE ON-NET CALLS</span>
                                </div>
                                <div class="calls">
                                    <span><img src="../assets/icons/call-icon.png" alt="" width="20%"></span>
                                    <span>FREE ON-NET CALLS</span>
                                </div>
                            </div>
    
                        </div>
                        <div class="link1"><a @click="reviewSubmission()" class="box-link">Review Submitted Information</a></div>
                        <div class="link2"><a @click="changePlan()" class="box-link link1">Change Plan</a></div>
                        <div class="link3"><a @click="requestWiFi()" class="box-link link2"> Want to add WiFi?</a></div>
                         
                        
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="column2">
                        <form action="" class="form">
                            <div class="col-lg-12">
                                <label for="plan" class="form-label">Plan Selected</label>
                                <input type="text" class="form-control" :value="packageNameValue" disabled>
                                <!-- <select class="form-select" @change="handlePlanSelect($event.target.value)"> -->
                                    <!-- <p>{{ this.$route.query.title }}</p> -->
                                <!-- <select class="form-select" disabled>
                                    <option 
                                        :label="(this.$route.query.title)"
                                        :value="(this.$route.query.title)"
                                    selected></option> -->
                                    <!-- <option 
                                    v-for="item in plan"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.id"
                                        :selected="item.selected"
                                    >{{item.planTypeName}}</option>
                                </select> -->
                            </div>
                            <div class="col-lg-12">
                                <label for="month" class="form-label">Number of months</label>
                                <select class="form-select" @change="handleMonthOptionSelect($event.target.value)">
                                    <!-- <option selected>Select number of months</option> -->
                                    <option 
                                    v-for="item in MonthOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></option>
                                </select>
                            </div>
                            <div class="col-lg-12" v-if="hasDiscount">
                                <label for="discount" class="form-label">Discount</label>
                                <!-- <input type="text" class="form-control" value="10% off" disabled> -->
                                <input type="text" class="form-control" v-model="discountString" disabled>
                            </div>
                            <div class="col-lg-12">
                                <label for="referral" class="form-label">Who referred you to ipNX?</label><span id="asterisk" style="color: red; margin-left: 5px;">&#42;</span>
                                
                                <select class="form-select region-select" @change="handleRegionOption($event.target.value)"> 
                                    <option selected disabled>Pick an option</option>

                                    <option 
                                    v-for="region in RegionOptions"
                                        :key="region.id"
                                        :label="region.value"
                                        :value="region.id"
                                        >{{region.value}}</option>
                                </select>
                                <p style="color: #DA1919" v-if="errorMsg">Required Field</p>

                                    <!-- :selected="selected" -->

                                    <!-- sales representatives -->
                                <label for="referral" class="form-label" v-if="selectedSalesRep">Select an agent</label>
                              
                                <select class="form-select" v-if="selectedSalesRep" @change="handleSalesAgent($event.target.value)">
                                    <option selected disabled>Select ---</option>
                                    <option 
                                    v-for="agent in agentsTypeSP"
                                        :key="agent.id"
                                        :label="agent.name"
                                        :value="agent.id"
                                        >{{agent.name}}</option>
                                </select>

                                <!-- existing customer -->
                                <label for="referral" class="form-label" v-if="selectedExistingCustomer">Enter Customer ID</label>
                                <input class="form-control" type="text" v-model="existingCustomerId" v-if="selectedExistingCustomer">

                                     <!-- community retail agents -->
                                <label for="referral" class="form-label" v-if="selectedCommunityRetail">Select an agent</label>
                              
                              <select class="form-select" v-if="selectedCommunityRetail" @change="handleRetailAgent($event.target.value)">
                                  <option selected disabled>Select ---</option>
                                   
                                  <option 
                                  v-for="agent in agentsTypeCR"
                                      :key="agent.id"
                                      :label="agent.name"
                                      :value="agent.id"
                                      >{{agent.name}}</option>
                              </select>

                            </div>
                        </form>
    
                        <div class="price-details">
                            <p class="price-details-heading">Price details</p>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row details">
                                        <span class="col-lg-8 label-details">Plan price</span>
                                        <span class="col-lg-4 details-label-amount" v-if="selectedNumberOfMonth"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packagePriceValue * selectedNumberOfMonth) }}</span>
                                        <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packagePriceValue) }}</span>
                                    </div>
                                    <div class="row details">
                                        <span class="col-lg-8 label-details">Modem & Installation</span>
                                        <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(packageSetUpChargeValue) }}</span>
                                    </div>
                                    <div class="row details" v-if="hasDiscount">
                                        <span class="col-lg-8 label-details">Discount</span>
                                        <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ discount / 100 }}</span> -->
                                        <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( (packageSetUpChargeValue) - (packageSetUpChargeValue * (discount / 100)) )}}</span> -->
                                        <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format((packageSetUpChargeValue * (discount / 100)).toFixed(2) )}}</span> -->
                                        <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((packageSetUpChargeValue * (discount / 100))) }}</span>
                                        
                                        <!-- <span class="col-lg-4 details-label-amount" v-if="selectedNumberOfMonth"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( (packageSetUpChargeValue * (discount / 100)) )}}</span>
                                        <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US').format( (packageSetUpChargeValue + packagePriceValue) * (discount / 100))}}</span> -->
                                    
                                    </div>
                                    <div class="row details" v-if="hasDiscount">
                                        <span class="col-lg-8 label-details">Total Amount</span>
                                        <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ ((packagePriceValue * 2) + packageSetUpChargeValue).toLocaleString("en-US") }}</span> -->
                                        <span class="col-lg-4 details-label-amount" v-if="selectedNumberOfMonth"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( ((packageSetUpChargeValue) - (packageSetUpChargeValue * (discount / 100)) + (packagePriceValue * selectedNumberOfMonth) ) )}}</span>
                                        <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( ( packagePriceValue + ((packageSetUpChargeValue) - (packageSetUpChargeValue * (discount / 100)) )) )}}</span>
                                    </div>
                                    <div class="row details" v-else>
                                        <span class="col-lg-8 label-details">Total Amount</span>
                                        <!-- <span class="col-lg-4 details-label-amount"><del style="text-decoration-style: double;">N</del>{{ ((packagePriceValue * 2) + packageSetUpChargeValue).toLocaleString("en-US") }}</span> -->
                                        <span class="col-lg-4 details-label-amount" v-if="selectedNumberOfMonth"><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( packageSetUpChargeValue + (packagePriceValue * selectedNumberOfMonth))}}</span>
                                        <span class="col-lg-4 details-label-amount" v-else><del style="text-decoration-style: double;">N</del>{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format( packageSetUpChargeValue + packagePriceValue)}}</span>
                                    </div>
                                </div>
                       
                                <!-- <div class="col-lg-12">
                                    <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck"
                                    v-model="state.termsCheck" @change="toggleTermsCheckbox"
                                     v-bind:class="{'text-danger': state.hasError}">
                                    <label>
                                       I agree to your <a @click="viewTerms()" style="color: #000000; text-decoration: underline; cursor: pointer;">Terms and Conditions*</a>
                                    </label>
                                    </div>
                                    <p style="color: #DA1919" v-if="state.errorMsg">You have to agree to the Terms and Condition.</p>

                                </div> -->
                                <div class="submit-btn" @click="payment">
                                    <button type="submit" class="btn"> Submit Order </button>      
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <MainFooter/> -->
</template>

<script>
// import MainNavbar from '@/components/MainNavbar.vue';
// import MainFooter from '@/components/MainFooter.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, reactive, onMounted, watch, inject } from "vue";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios';
import Spinner from '@/components/Spinner.vue'
import monthsData from '@/assets/json/months.json';
import regionsData from '@/assets/json/regions.json';

const apiUrl = process.env.VUE_APP_API_URL

  export default {
      components:{
        //   MainNavbar,
        //   MainFooter,
          Spinner
      },
        name: 'Payment',
        props: ['paymentData'],

    setup(props, {emit}) {
        const swal = inject('$swal')

        const isLoading = ref(false)
        const router = useRouter()
        const route = useRoute()
        const agents = ref(null)
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
        const selectedNumberOfMonth = ref(null)

        const amountValue=ref('')
        const user = ref(false)
        const userOrder = ref('')
        const refId = ref('')

        const discount = ref('')  //single discount
        const discountString = ref('')  //single discount
        const discounts = ref('')  //all discount
        const hasDiscount = ref(false)

        const selectedSalesRep = ref(false)
        const selectedExistingCustomer = ref(false)
        const selectedCommunityRetail = ref(false)
        const existingCustomerId = ref('')
        const agentsTypeSP = ref([])
        const agentsTypeCR = ref([])
        const agentuuid = ref('')
        const errorMsg = ref(false)
        const packageDataAllowanceValue = ref('')
        const formatter = ref('')

        const planId = route.query.planId
        const planTypeId = route.query.planTypeId
        const roi = route.query.ROI
        
        // const handlePlanSelect = (selectedValue) => {
        //     const existingQuery = { ...route.query }

        //     existingQuery.planTypeId = selectedValue

        //     console.log(plan.value);
        //     console.log(selectedValue);
        //     // existingQuery.planTypeId = parseInt(selectedValue * amt)
        //     router.push({
        //         query: existingQuery
        //     })
        // }

         
            // select options
            const MonthOptions = ref(monthsData)

            // select options
            const RegionOptions = ref(regionsData)

            const handleRegionOption = (selectedRegion) => {
                if(selectedRegion === 'ipNX Sales Representative'){
                    selectedSalesRep.value = true
                    selectedExistingCustomer.value = false
                    selectedCommunityRetail.value = false
                }else if(selectedRegion === 'Existing Customers'){
                    selectedSalesRep.value = false
                    selectedExistingCustomer.value = true
                    selectedCommunityRetail.value = false
                }else if(selectedRegion === 'Community Retail Agents'){
                    selectedSalesRep.value = false
                    selectedExistingCustomer.value = false
                    selectedCommunityRetail.value = true
                }else{
                    selectedSalesRep.value = false
                    selectedExistingCustomer.value = false
                    selectedCommunityRetail.value = false
                    agentuuid.value = 'None'
                }
                
            }

            const handleSalesAgent = (salesAgent) => {
                if (selectedSalesRep.value === true) {
                    agentuuid.value = salesAgent
                }
            }

            const handleRetailAgent = (salesAgent) => {
                if (selectedCommunityRetail.value === true) {
                    agentuuid.value = salesAgent
                }
            }

        const handleMonthOptionSelect = (selectedValue) => {
            // selectedNumberOfMonth.value = parseInt(selectedValue)
            selectedNumberOfMonth.value = selectedValue
            // console.log(typeof(selectedNumberOfMonth));
            return selectedNumberOfMonth
      
        }


        const state = reactive ({
            hasError: false,
            // termsCheck: false,
            errorMsg: false
        })
            // const rules = computed(() => {
            //     return {
            //         termsCheck: { required }
            //     }
            // })

            // const v$ = useVuelidate(rules, state)
            // const toggleTermsCheckbox = () => {
            //     if (state.termsCheck) {
            //         state.termsCheck = true
            //     }else{
            //         state.termsCheck = false
            //     }
            // }

        const saveOrder = async() => {
            if (!swal) {
                console.error('SweetAlert2 is not injected');
                return;
            }
            try {
            //    const result = swal.fire({
            //         title: 'Order Saved!',
            //         text: 'Do you want to proceed to payment?',
            //         icon: 'success',
            //         showCancelButton: true,
            //         cancelButtonText: 'Cancel',
            //         confirmButtonText: 'Proceed',
            //         confirmButtonColor: '#DA1919',
            //         customClass: {
            //         confirmButton: 'btn-confirm',
            //         cancelButton: 'btn-cancel'
            //         }
            //     });
            const result = await swal.fire({
                title: 'Order Saved!',
                text: 'Do you want to proceed to payment',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#DA1919',
                cancelButtonText: 'No',
                customClass: {
                confirmButton: 'btn-confirm',
                cancelButton: 'btn-cancel'
                }
            });

                if (result.isConfirmed) {
                    if (!selectedNumberOfMonth.value) {
                        selectedNumberOfMonth.value = 1;
                    }
                    // if (selectedNumberOfMonth) {
                    //     const month = selectedNumberOfMonth.value
                        
                        setTimeout( () => emit('step1-complete', {
                            roi: roi,
                            planId: planId,
                            planTypeId: planTypeId,
                            month: selectedNumberOfMonth.value,
                            discount: discount.value,
                            amountValue: amountValue.value, 
                            planName: packageNameValue.value,
                            planPrice: packagePriceValue.value

                        }), 500);

                        // router.push({name: 'PaymentPlatform', query: {roi, planId, planTypeId, month} } )     
                    // }
                    // else{
                    //     setTimeout( () => emit('step1-complete', {
                    //         roi: roi,
                    //         planId: planId,
                    //         planTypeId: planTypeId,
                    //         discount: discount.value,
                    //         amountValue: amountValue.value

                    //     }), 500);

                    //     // router.push({name: 'PaymentPlatform', query: {roi, planId, planTypeId} } )
                    // }


                } else if (result.dismiss === swal.DismissReason.cancel) {
                    router.push({ name: 'welcome' }); 
                }
            } catch (error) {
                console.error('Error displaying alert:', error);
            }
        }

        //   payment method
        const payment = async() => {
                // v$.value.$validate() //validate inputs
                const roi = route.query.ROI //OrderID

                // check if agentuuid is properly assigned
                if (selectedExistingCustomer.value === true && selectedCommunityRetail.value === false && selectedSalesRep.value === false) {
                    agentuuid.value = existingCustomerId.value
                }else if(selectedExistingCustomer.value === false && selectedCommunityRetail.value === true && selectedSalesRep.value === false){
                    // console.log('cid', existingCustomerId.value);
                    if (agentuuid.value === existingCustomerId.value) {
                       agentuuid.value = '' 
                    }
                }else if(selectedExistingCustomer.value === false && selectedCommunityRetail.value === false && selectedSalesRep.value === true){
                    if (agentuuid.value === existingCustomerId.value) {
                       agentuuid.value = '' 
                    }
                }

                if (agentuuid.value === '') {
                    errorMsg.value = true
                    
                } else {
                    errorMsg.value = false
                    // if (state.termsCheck === true) {
                        const planId = route.query.planId
                        const planTypeId = route.query.planTypeId

                        
    
                        //payment integration with paystack

                        // check if there is a discount
                        if (hasDiscount.value === true) {
                            if(selectedNumberOfMonth.value){
                              amountValue.value = ((packagePriceValue.value * selectedNumberOfMonth.value) + (packageSetUpChargeValue.value - (packageSetUpChargeValue.value * (discount.value / 100)) )) *100
                            //   console.log('first', amountValue.value);
                          }
                          else{
                              amountValue.value = (packagePriceValue.value + (packageSetUpChargeValue.value - (packageSetUpChargeValue.value * (discount.value / 100)))) *100
                            //   console.log('second', amountValue.value);
                          }
                        }else{
                          if(selectedNumberOfMonth.value){
                              amountValue.value= ((packageSetUpChargeValue.value) + (packagePriceValue.value * selectedNumberOfMonth.value))*100
                              // console.log('first', amountValue.value);
                          }
                          else{
                              amountValue.value=(packageSetUpChargeValue.value + packagePriceValue.value )*100
                              // console.log('second', amountValue.value);
                          }
                        }

                        try {
                            isLoading.value = true
                            // if (selectedExistingCustomer.value === true) {
                            //         agentuuid.value = existingCustomerId.value
                            //     }

                            const agentId = agentuuid.value

                            const headers = { 
                                'Content-Type': 'application/json',
                                'Authorization': `${sessionStorage.getItem('token')}`,
                                // 'Access-Control-Allow-Origin': '*',
                                'accept': '*/*'
                            }
                      
                            if (!selectedNumberOfMonth.value) {
                                selectedNumberOfMonth.value = 1;
                            }
                            const orderData = {
                                'orderId': roi,
                                'agentId': agentId,
                                'numberOfMonthsPaidFor': selectedNumberOfMonth.value
                            }
                           
                            
                            const response = await axios.post(`${apiUrl}/Orders/save-order-for-payment`, {
                                headers: headers,
                                'orderId': roi,
                                'agentId': agentId,
                                // data: {
                                'numberOfMonthsPaidFor': selectedNumberOfMonth.value,
                                // }
                                // 'numberOfMonthsPaidFor': selectedNumberOfMonth.value,
                                // data: orderData,
                                // 'agentId': agentId,
                            })
                            
                            saveOrder();
                        } catch (error) {
                            console.log(error);
                        }finally{
                            setTimeout(() => {
                                isLoading.value = false
                            }, 1000);
                        }
    
                        //     var handler = PaystackPop.setup({
                        //         key: 'pk_test_af0a474902311c5ddb610085a79b2fcdcf14e037', // Replace with your public key
                        //         // key: 'pk_live_3802edf04f5de28993b4c617725555d50fa993a8', // Replace with your public key
                        //         email:user.value.email,
                        //         amount: amountValue.value,//(packageSetUpChargeValue.value + packagePriceValue.value )*100,
                        //         ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generat
                        //         onClose: function(){
                                
                        //         },
                        //         callback: function(response){
                        //         let message = 'Payment complete! Reference: ' + response.reference;
                        //         refId.value = response.reference
    
                        //         if (selectedExistingCustomer.value === true) {
                        //             agentuuid.value = existingCustomerId.value
                        //         }
                        //         const agentId = agentuuid.value
                           
                        //         isLoading.value = true
                        //         // fetch(`/payment-verification/ipNX540819/T839256270554416`, {
                        //         fetch(`${apiUrl}/Orders/payment-verification/${roi}/${refId.value}/${agentId}`, {
                                    
                        //             method: 'GET',
                        //             headers: {
                        //                 'Authorization': `${sessionStorage.getItem('token')}`,
                        //                 'Content-Type': 'application/json'
                        //             }
                        //         })
                        //         .then(response => response.json())
                        //         .then(data => {
                        //             // console.log('Success:', data);
                                    
                        //             const date = data.date
                        //             const time = data.time
                        //             const status = data.status
    
                        //                 if (selectedNumberOfMonth) {
                        //                     const month = selectedNumberOfMonth.value
                        //                     const reference = refId.value
                                            
                        //                     setTimeout( () => emit('step1-complete', {
                        //                         roi: roi,
                        //                         planId: planId,
                        //                         planTypeId: planTypeId,
                        //                         reference: reference,
                        //                         date: date,
                        //                         time: time,
                        //                         status: status, 
                        //                         month: month,
                        //                         discount: discount.value
    
                        //                     }), 500);
    
                        //                     // router.push({name: 'SuccessfulPayment', query: {roi, planId, planTypeId, reference, month, date, time, status} } )     
                        //                 }else{
                        //                     setTimeout( () => emit('step1-complete', {
                        //                         roi: roi,
                        //                         planId: planId,
                        //                         planTypeId: planTypeId,
                        //                         reference: reference,
                        //                         date: date,
                        //                         time: time,
                        //                         status: status,
                        //                         discount: discount.value
    
                        //                     }), 500);
    
                        //                     // router.push({name: 'SuccessfulPayment', query: {roi, planId, planTypeId, reference, date, time, status} } )
                        //                 }
                        //             // alert(data.message);
                        //         })
                        //         .catch((error) => {
                        //             console.error('Error:', error);
                        //             alert('An error occurred while verifying and confirming payment');
                        //         })
    
                        //         // alert(message);
                                
                        //         }
                        //     });
    
                        //     handler.openIframe();
    
                        // state.hasError = false;

                    // }else{
                    //     console.log('error');
                    //     state.hasError = true;
                    //     state.errorMsg = true
                    // }
                }

           
        }

        const formattedNum = (numberVal) => {
            return setTimeout(numberVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 1000)
        }
      
        const orderId = route.query.ROI
        onMounted(async() => {
            const planId = route.query.planId
            const planTypeId = route.query.planTypeId
           
            const headers = { 
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                    }

            try {
                isLoading.value = true

                        
                const userResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                user.value = userResponse.data

                const response = await axios.get(`${apiUrl}/Plans/view-active-plan-types/${planId}`, {headers: headers})
                plan.value = response.data

                packageType.value = JSON.stringify(plan.value.filter(item => item.id === planTypeId), null, 2)
       
                packageName.value = JSON.parse(packageType.value). map(item => item.planTypeName)
                // console.log(packageName.value[0]);
                packagePrice.value = JSON.parse(packageType.value). map(item => item.price)
                // console.log(typeof(parseInt(packagePrice.value)));
                packageSpeed.value = JSON.parse(packageType.value). map(item => item.bandSpeed)
                packageSetUpCharge.value = JSON.parse(packageType.value). map(item => item.setUpCharge)
                const packageDataAllowance = JSON.parse(packageType.value). map(item => item.dataAllowance)

                packageNameValue.value = packageName.value[0]
                // packagePriceValue.value = packagePrice.value[0].toLocaleString("en-US")
                packagePriceValue.value = packagePrice.value[0]
                packageSpeedValue.value = packageSpeed.value[0]
                // packageSetUpChargeValue.value = packageSetUpCharge.value[0].toLocaleString("en-US")
                packageSetUpChargeValue.value = packageSetUpCharge.value[0]
                packageDataAllowanceValue.value = packageDataAllowance[0]
                // console.log(packagePriceValue.value.toLocaleString(undefined, {
                //             minimumFractionDigits: 2,
                //             maximumFractionDigits: 2
                //             })); 

                 formatter.value = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
                // console.log(packageSetUpChargeValue.value);

                // return {plan, packageNameValue, packagePriceValue, packageSpeedValue, packageSetUpChargeValue, packagePrice}
            } catch (error) {
                console.log(error);
            }finally {
                setTimeout(() => {
                    isLoading.value = false
                }, 1000);
            }

            // get agents
            try {
                 const getAgentResponse = await axios.get(`${apiUrl}/Agents/view-all-active-agents`, {headers: headers})
                agents.value = getAgentResponse.data

                // agentsTypeSP.value = JSON.stringify(agents.value.filter(item => item.type === 'ipNX Sales Representative'), null, 2)
                agentsTypeSP.value = agents.value.filter(item => item.type === 'ipNX Sales Representative') //typeof object
                agentsTypeCR.value = agents.value.filter(item => item.type === 'Community Retail Agents') //typeof object
      
            } catch (error) {
                console.log(error);
            }

            // get user order details
            try {
                const response = await axios.get(`${apiUrl}/Orders/view-my-order/${orderId}`, {headers: headers})
                userOrder.value = response.data

                discount.value = userOrder.value.discount
                  discountString.value = discount.value + '% Off'
                if (discount.value === null || discount.value === 'null' || discount.value === 0) {
                    hasDiscount.value = false
                }else{
                    hasDiscount.value = true
                }
                
                // if(userOrder.value.agentName !== null){
                //     console.log('yes from agent');
                    
                //     agentuuid.value = userOrder.value.agentName
                // }

                // check if payment for order is successful when page is routed
                if (userOrder.value.paymentStatus === 'Successful') {
                    router.push({name: 'welcome'})
                }
            } catch (error) {
                console.log(error);
            }
             
        })

        const reviewSubmission = async() => {
            const headers = { 
                            'Content-Type': 'application/json',
                            'Authorization': `${sessionStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        }

            const response = await axios.get(`${apiUrl}/Plans/view-all-plans`, {headers: headers})
            const plans = response.data
            
             // filter plans to get only for SME BROADBAND
             const filteredResidentialPlan = JSON.stringify(plans.filter(plan => plan.planName === 'RESIDENTIAL BROADBAND'), null, 2)
            const resPlanId = JSON.parse(filteredResidentialPlan).map(plan => plan.id)
            const filteredSmePlan = JSON.stringify(plans.filter(plan => plan.planName === 'SME BROADBAND'), null, 2)
            const smePlanId = JSON.parse(filteredSmePlan).map(plan => plan.id)

            // xtreme series
            const filteredXtremePlan = JSON.stringify(plans.filter(plan => plan.planName === 'XTREME SERIES'), null, 2)
            const xtremePlanId = JSON.parse(filteredXtremePlan).map(plan => plan.id)
        

            if (route.query.planId === smePlanId[0] ) {
                const smeOrderId = route.query.ROI
               
                router.push({name: 'SmeForm', query: {smeOrderId} })
        
            } else if(route.query.planId === resPlanId[0] ) {
                const residentialOrderId = route.query.ROI
 
                router.push({name: 'ResForm', query: {residentialOrderId} })
             
            }else if(route.query.planId === xtremePlanId[0] ) {
                const plan = route.query.planName
       
                if (route.query.planName && route.query.planName === 'sme') {
                    const smeOrderId = route.query.ROI
               
                    router.push({name: 'SmeForm', query: {smeOrderId, plan} })
                } else if(route.query.planName && route.query.planName === 'residential') {
                    const residentialOrderId = route.query.ROI
                    router.push({name: 'ResForm', query: {residentialOrderId, plan} })
                }
            }
        }

        // const viewTerms = () =>{
        //     const myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
        //     myModal.show();
        // }
        
        const requestWiFi = async() =>{
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': '*',
            }

            try {
                const data ={
                    'orderId' : orderId,
                    'activate' : true
                }
               const response = await axios.post(`${apiUrl}/CustomerRequests/request-wifi-for-order?orderId=${orderId}&activate=true`, 
                        { headers:headers,  'activate': true, 'orderId': orderId } )
                swal({
                    // title: 'Hello Vue Alert!',
                    text: "You'll be contacted by our team. You can proceed to make payment.",
                    icon: 'success',
                    confirmButtonColor: '#DA1919',
                })
            } catch (error) {
                console.log(error);
                swal({
                    text: "An error occured",
                    icon: 'error',
                    confirmButtonColor: '#DA1919',
                })
            }
        }

        const changePlan = async() =>{
            const headers = { 
                            'Content-Type': 'application/json',
                            'Authorization': `${sessionStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        }

            const response = await axios.get(`${apiUrl}/Plans/view-all-plans`, {headers: headers})
            const plans = response.data
            const roi = route.query.ROI
            
             // filter plans to get only for SME BROADBAND
             const filteredResidentialPlan = JSON.stringify(plans.filter(plan => plan.planName === 'RESIDENTIAL BROADBAND'), null, 2)
            const resPlanId = JSON.parse(filteredResidentialPlan).map(plan => plan.id)
            const filteredSmePlan = JSON.stringify(plans.filter(plan => plan.planName === 'SME BROADBAND'), null, 2)
            const smePlanId = JSON.parse(filteredSmePlan).map(plan => plan.id)

              // xtreme series
              const filteredXtremePlan = JSON.stringify(plans.filter(plan => plan.planName === 'XTREME SERIES'), null, 2)
            const xtremePlanId = JSON.parse(filteredXtremePlan).map(plan => plan.id)
        

            if (route.query.planId === smePlanId[0] ) {
                router.push({name: 'FosSme', query: {roi} })
            } else if(route.query.planId === resPlanId[0] ) {
                router.push({name: 'FosRes', query: {roi} })
            }else if(route.query.planId === xtremePlanId[0] ) {
                const plan = route.query.planName
             
                if (route.query.planName && route.query.planName === 'sme') {
              
                    router.push({name: 'FosSme', query: {roi, plan} })
                } else if(route.query.planName && route.query.planName === 'residential') {
            
                    router.push({name: 'FosRes', query: {roi, plan} })
                }
            }
            
            
        }

        return { 
            state, formattedNum, isLoading,MonthOptions, payment, router, user, agents, RegionOptions, selectedExistingCustomer,requestWiFi, changePlan, reviewSubmission, handleMonthOptionSelect, handleRegionOption, selectedNumberOfMonth, selectedSalesRep,
            plan, packageNameValue, packagePriceValue, packageSpeedValue, packageSetUpChargeValue, hasDiscount, discount, discountString, existingCustomerId,
            agentsTypeSP, agentsTypeCR, selectedCommunityRetail, handleSalesAgent, handleRetailAgent, errorMsg, userOrder, packageDataAllowanceValue, formatter
        }
    
      }
  }


</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
    .main-container {
        background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
    }
    .body-container {
        margin: 50px 70px 100px;
        font-family: 'IBM Plex Sans';
    }
    .container-heading {
        text-align: center;
        font-size: 22px;
        font-weight: 600;
    }
    .greeting {
        font-size: 30px;
        font-weight: 700;
    }
    .body-row{
        margin: 70px auto 50px;
    }
    .column1, .column2{
        margin: auto 50px;
    }
    .row-text {
        color: #949DAB;
        font-weight: 500;
        font-size: 16px;
    }
    .box {
        padding: 30px 20px;
        background: #FBF9F9;
        border: 1px solid #FF000014;
        border-radius: 12px;
        margin: 20px auto 30px;
    }
    .box-top span {
        display: block;
    }
    .box-top {
        padding-bottom: 20px;
    }
    .box .box-top .down {
        color: #8691A8;
        font-weight: 400;
        font-size: 14px;
    }
    .box .box-top .amount {
        color: #272727;
        font-weight: 700;
    }

    .box .box-top .top:not(.top.amount) {
        color: #35434B;
        font-weight: 400;
    }
    .box-bottom {
        display: flex;
    }
    .calls span:nth-child(2) {
        padding-left: 10px;
        color: #656565;
        font-weight: 500;
        font-size: 14px;
    }
    .box-bottom div:nth-child(1) {
        padding-right: 20px;
    }
    /* .box .box-top:nth-child(2) {
        padding-right: 20px;
    } */
    
    .box-link{
        background: -webkit-linear-gradient(98.24deg, #A91818 0%, #DC0000 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        font-size: 16px;
        border-bottom: 2px solid #DC0000;
    }
    .link1, .link2, .link3 {
        margin-bottom: 15px;
        cursor: pointer;
    }
    .link1 a, .link2 a, .link3 a{
        text-decoration: none;
    }
    /* .link2 {
        float: right;
    } */

    .form {
        color: #344054;
    }
    .form .form-label {
        font-size: 14px;
    }
    .form-select:focus, .form-check-input:focus, .form-control:focus {
        box-shadow: none;
    }
    .region-select{
        margin-bottom: 20px;
    }
    .form div, .details {
        margin-bottom: 20px;
    }

    .price-details {
        margin: 20px auto;
    }
    .price-details-heading {
        font-weight: 700;
        font-size: 18px;
    }
    .details-label-amount {
        text-align: right;
    }
    .price-details .row {
        font-weight: 500;
        color: #000000;
    }
    .price-details .row:not(.row label a) {
        font-size: 16px;
    }
    .price-details .row label a {
        font-size: 14px;
    }
    .submit-btn {
        background-color: #DA1919;
        text-align: center;
        margin-top: 20px;
        border-radius: 30px;
        padding: 5px 17px;
        cursor: pointer;
    }
    .submit-btn .btn {
        color: #ffffff;
    }
    .submit-btn .btn:active {
        border: transparent;
    }

    input[type=checkbox]{
        border-color: #000000;
    }

    input[type=checkbox]:checked{
        background-color:#DA1919;
    }
    input[type=checkbox].text-danger{
        border-color: #DA1919;
    }
    /* .form-check-input:checked {
        background: #DA1919;
        z-index: -1;
    } */

    .modal-btn {
        background-color: #DA1919;
        /* width: 150px; */
        text-align: center;
        /* float: right; */
        /* margin-left: auto; */
        border-radius: 30px;
        padding: 5px 17px;
    }
    .modal-btn button{
        color: #ffffff;
    }
    .modal-btn .btn:active {
        border: transparent;
    }
    .modal-header {
        border-bottom: none !important;
    }
    .modal-content {
        padding: 25px;
        text-align: justify;
        font-family: 'IBM Sans Plex', sans-serif;
        border-radius: 28px;
    }
    .modal-header button.btn-close {
        color: #000000 !important;
        --bs-btn-close-disabled-opacity: 1;
    }
    
    .modal-heading {
        color: #000000;
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 10px;
    }
    .modal-text {
        color: #616C82;
        font-size: 14px;
        font-weight: 400;

    }

    @media (min-width: 767px) and (max-width:992px) {
        .body-container {
            margin: 50px 0 70px;
        }
        .box {
            padding: 15px 10px;
        }
    }

    @media (max-width:768px) {
        .body-container {
            margin: 50px 10px 100px;
        }
        .body-row {
            margin-top: 20px;
        }
        .greeting {
            font-size: 24px;
        }
        .column1 {
            margin-bottom: 50px;
        }
    }

    @media (max-width: 480px) {
        .box-bottom {
            display: block;
        }
        .calls {
            margin-top: 10px;
        }
        .body-container {
            margin: 50px -25px 100px;
        }
        .body-row{
            margin: 30px 0 50px;
        }
       
    }
</style>