<template>
    <div class="main-container">
        <MainNavbar/>

        <!-- loading spinner -->
        <Spinner :loading="isLoading" />

        <div class="form-container">
            <p class="heading">Upload KYC</p>
            <p class="greeting">Hello {{ user }},</p>
            <p class="sub-heading">Please provide your supporting documents, your information is safe with us!</p>
            <p class="body-heading">Personal Data Processing Consent,</p>
            <p class="body">ipNX will collect and process your personal data to provide the services you subscribed to. 
                This may involve the transfer of your personal data to our subcontractors and other third parties where necessary.
                For further information on how we may use your personal data please refer to our Data Privacy Policy. <br><br>
                I have read and understood the information here and in the  <a href="https://www.ipnxnigeria.net/privacy/" target="_blank"class="policy-link">Privacy Policy</a>.
                <input class="form-check-input" type="checkbox" value="policy" v-model="state.policy" v-bind:class="{'text-danger': state.hasError}">
                <p class="error-msg" v-if="v$.policy.$error && !state.policy"> Confirm you have read the privacy policy </p>
                <br><br>

                I hereby consent to the use of my Personal data by ipNX for the purposes outlined above.
                <input class="form-check-input" type="checkbox" value="consent" v-model="state.localConsent" 
                @change="toggleConsentCheckbox" v-bind:class="{'text-danger': state.hasError}">

                <!-- <p style="color: #DA1919" v-if="state.errorMsg">You have to check to give consent.</p> -->
                <p class="error-msg" v-if="v$.localConsent.$error && !state.localConsent"> You have to check to give consent </p>
                        
            </p>

            <p class="form-heading">Upload Your Documents</p>

            <form class="row g-3 form" enctype="multipart/form-data">
                <div class="col-lg-6 col-md-6 col-sm-12 form-input">
                    <label for="" class="form-label">Passport Photograph</label>
                    <!-- <input type="file" class="form-control" @change="handlePassport($event)"> -->
                    <input type="file" class="form-control hidden-input"
                    ref="passportInput"
                    @change="handlePassport($event)"
                    accept=".pdf, .png, .jpg, .jpeg"
                    >
                    <div class="file-container">
                        <span class="file-button" @click="choosePassport()" :disabled="isSubmitting">
                            Browse ...
                        </span>
                        <span class="file-name">{{ state.passportName }}</span>
                        </div>
                    <div class="file-warning" v-if="state.fileSizeExceeded">
                        <span class="error-text">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div>
                    <div class="file-warning" v-if="state.fileTypeError">
                        <span class="error-text">Please upload a JPEG, PNG or PDF document </span>
                    </div>

                </div>
                
                <div class="col-lg-6 col-md-6 col-sm-12 comment">
                    Upload Passport Photograph of Account Owner(JPEG,PNG,PDF)
                </div>
                <!-- <p class="error-msg" v-if="v$.passportFile.$error">File is required</p> -->

                <div class="col-lg-6 col-md-6 col-sm-12 form-input">
                    <label for="" class="form-label">Government Recognized ID</label>
                    <!-- <input type="file" class="form-control" @change="handleGovtID($event)"> -->
                    <input type="file" class="form-control hidden-input"
                    ref="govtIdInput"
                    @change="handleGovtId($event)"
                    accept=".pdf, .png, .jpg, .jpeg"
                    >
                    <div class="file-container">
                        <span class="file-button" @click="chooseGovtId()" :disabled="isSubmitting">
                            Browse ...
                        </span>
                        <span class="file-name">{{ state.govtIdName }}</span>
                        </div>
                    <div class="file-warning" v-if="state.govtIdFileSizeExceeded">
                        <span class="error-text">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div>
                    <div class="file-warning" v-if="state.govtIdFileTypeError">
                        <span class="error-text">Please upload a JPEG, PNG or PDF document </span>
                    </div>
                </div>
                
                <div class="col-lg-6 col-md-6 col-sm-12 comment">
                    Upload Driver's License, International Passport,<br> National ID Card or Voter's Card(JPEG,PNG,PDF)
                </div>
                <!-- <p class="error-msg" v-if="v$.govtIdFile.$error">File is required</p> -->

                <div class="col-lg-6 col-md-6 col-sm-12 form-input">
                    <label for="" class="form-label">Utility Bill</label>
                    <!-- <input type="file" class="form-control" @change="handleUtilityBill($event)"> -->
                    <input type="file" class="form-control hidden-input"
                    ref="utilityInput"
                    @change="handleUtilityBill($event)"
                    accept=".pdf, .png, .jpg, .jpeg"
                    >
                    <div class="file-container">
                        <span class="file-button" @click="chooseUtilityBill()" :disabled="isSubmitting">
                            Browse ...
                        </span>
                        <span class="file-name">{{ state.utilityBillName }}</span>
                        </div>
                    <div class="file-warning" v-if="state.utilityFileSizeExceeded">
                        <span class="error-text">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div>
                    <div class="file-warning" v-if="state.utilityFileTypeError">
                        <span class="error-text">Please upload a JPEG, PNG or PDF document </span>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 comment">
                    Upload Electricity, Water, Waste <br> Land Use Charge or Tenancy Agreement(JPEG,PNG,PDF)
                </div>
                <!-- <p class="error-msg" v-if="v$.utilityFile.$error">File is required</p> -->
               
            </form>

            <div>
                <p class="declaration-heading">DECLARATION</p>
                <p class="declaration-body">
                    I/We hereby apply for the FOS Internet service as per details furnished above and agree to take the service, if offered,
                    on the terms and conditions agreed at <a href="https://www.ipnxnigeria.net/terms" target="_blank">www.ipnxnigeria.net</a>, which I/we have read and understood.
                    I/We confirm that the information furnished above is correct. In the event that the information is found to be incorrect,
                    ipNX Nigeria Limited shall have right to terminate the service, and I/We shall have no claims whatsoever against ipNX Nigeria Limited.
                    I/We also agree to provide trusted person or party to supervise any technical work at the location specified above 
                    and acknowledge that ipNX will not be responsible for any security incidents before or after such work is carried out.<br>
                    I Agree <input class="form-check-input" type="checkbox" value="declaration" v-model="state.localDeclaration" 
                    @change="toggleDeclarationCheckbox" v-bind:class="{'text-danger': state.hasError}">

                    <!-- <p style="color: #DA1919" v-if="state.errorMsg">You have to agree before you continue.</p> -->
                    <p class="error-msg" v-if="v$.localDeclaration.$error && !state.localDeclaration"> You have to agree before you continue </p>
                </p>
            </div>

            <div class="buttons">
                <div class="prev-btn" @click="prevStep">
                    <button type="button" class="btn">Back</button>
                </div>
            
                <div class="submit-btn" v-if="payment === false" @click="submitForm">
                    <button type="submit" class="btn">Save & Proceed</button>
                </div>
                <div class="submit-btn save-order" @click="saveOrder">
                    <button type="submit" class="btn" >Save Order</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import MainNavbar from '@/components/MainNavbar.vue';
    import { ref, reactive, computed, onMounted, inject } from 'vue';
   import { useRouter, useRoute } from 'vue-router';

    import useVuelidate from '@vuelidate/core'
   import { required } from '@vuelidate/validators'
   import axios from 'axios';
   import Spinner from '@/components/Spinner.vue';

   const apiUrl = process.env.VUE_APP_API_URL
   
    export default {
        components: {
            MainNavbar,
            Spinner
        },

        name: 'FormStep3',
       props: [
        'filesData', 'personalData'
       ],
    
    // composition API
    setup (props, {emit}) {
        const swal = inject('$swal')

        const router = useRouter()
            const route = useRoute()
        const passportInput = ref('');
        const govtIdInput = ref('');
        const utilityInput = ref('');
        const isLoading = ref(false);
        const userOrder = ref('')
        const residentialOrderId = route.query.residentialOrderId

        const initialOrderId = props.personalData.orderId

        const user = props.personalData.firstName

        const payment = ref(false)

            const state = reactive({
                localConsent: props.filesData.consent,
                policy: props.filesData.policy,
                localDeclaration: props.filesData.declaration,
                errorMsg: false,
                fileTypeError: false,
                govtIdFileTypeError: false,
                utilityFileTypeError: false,
                fileSizeExceeded: false,
                utilityFileSizeExceeded: false,
                govtIdFileSizeExceeded: false,
                passportFile: props.filesData.passportFile,
                passportName: props.filesData.passportFile ? props.filesData.passportFile.name : 'No file selected',
                govtIdFile: props.filesData.govtIdFile,
                govtIdName: props.filesData.govtIdFile ? props.filesData.govtIdFile.name : 'No file selected',
                utilityFile: props.filesData.utilityFile,
                utilityBillName: props.filesData.utilityFile ? props.filesData.utilityFile.name : 'No file selected',
            })

            const rules = computed(() => {
                return {
                    localConsent: { required },
                    policy: { required },
                    localDeclaration: { required },
                    // passportFile: { required },
                    // govtIdFile: { required },
                    // utilityFile: { required },
                }
            })

            const v$ = useVuelidate(rules, state)

            const choosePassport = () => {
                event.preventDefault();
                passportInput.value.click();
            }
            const handlePassport = (event) => {
                const selectedPassport = event.target.files[0];
                if (selectedPassport) {
                    if (selectedPassport.size > 2 * 1024 * 1024) {
                        state.fileSizeExceeded = true;
                        state.passportFile = null;
                        state.passportName = null;
                    } 
                    else if (!['application/pdf', 'image/png', 'image/jpeg'].includes(selectedPassport.type)) {
                        state.fileSizeExceeded = false;
                        state.fileTypeError = true;
                        state.passportFile = null;
                        state.passportName = null;
                    }else {
                        state.fileSizeExceeded = false;
                        state.fileTypeError = false;
                        state.passportFile = selectedPassport;
                        state.passportName = selectedPassport.name;
                    }
                } else {
                    state.passportFile = null;
                    state.passportName = 'No file selected';
                }
            }

            const chooseGovtId = () => {
                event.preventDefault();
                govtIdInput.value.click();
            }
            const handleGovtId= (event) => {
                const selectedGovt = event.target.files[0];
                if (selectedGovt) {
                    if (selectedGovt.size > 2 * 1024 * 1024) {
                        state.govtIdFileSizeExceeded = true;
                        state.govtIdFile = null;
                        state.govtIdName = null;
                    } else if (!['application/pdf', 'image/png', 'image/jpeg'].includes(selectedGovt.type)) {
                        state.govtIdFileSizeExceeded = false;
                        state.govtIdFileTypeError = true;
                        state.govtIdFile = null;
                        state.govtIdName = null;
                    } else {
                        state.govtIdFileSizeExceeded = false;
                        state.govtIdFileTypeError = false;
                        state.govtIdFile = selectedGovt;
                        state.govtIdName = selectedGovt.name;
                    }
                } else {
                    state.govtIdFile = null;
                    state.govtIdName = 'No file selected';
                }
            }

            const chooseUtilityBill = () => {
                event.preventDefault();
                utilityInput.value.click();
            }
            const handleUtilityBill= (event) => {
                const selectedUtility = event.target.files[0];
                if (selectedUtility) {
                    if (selectedUtility.size > 2 * 1024 * 1024) {
                        state.utilityFileSizeExceeded = true;
                        state.utilityFile = null;
                        state.utilityBillName = null;
                    } else if (!['application/pdf', 'image/png', 'image/jpeg'].includes(selectedUtility.type)) {
                        state.utilityFileSizeExceeded = false;
                        state.utilityFileTypeError = true;
                        state.utilityFile = null;
                        state.utilityBillName = null;
                    } else {
                        state.utilityFileSizeExceeded = false;
                        state.utilityFileTypeError = false;
                        state.utilityFile = selectedUtility;
                        state.utilityBillName = selectedUtility.name;
                    }
                } else {
                    state.utilityFile = null;
                    state.utilityBillName = 'No file selected';
                }
            }

            const prevStep = () => {
                const totalData = {
                    // job: state.localJob, role: state.localRole,
                     consent: state.localConsent, declaration: state.localDeclaration, policy: state.policy,
                     passportFile: state.passportFile,
                     govtIdFile: state.govtIdFile,
                     utilityFile: state.utilityFile,
                     initialOrderId: initialOrderId
                    }

                emit('prev-step', { filesData: totalData})

            }

             // get existing user details
             onMounted(async() => {
                const token = sessionStorage.getItem('token')
                const headers = { 
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                    'Access-Control-Allow-Origin': '*',
                }
                if (token) {
                      // check if registration started before
                    if (window.location.href.includes('residentialOrderId')) {
                        try {
                            const response = await axios.get(`${apiUrl}/Orders/view-my-order/${residentialOrderId}`, {headers: headers})

                            userOrder.value = response.data

                                    // fetch userOrder data
                                if (userOrder.value.passportPhotograph !== null) { 
                                    state.passportFile = userOrder.value.passportPhotograph

                                    const filePathPassport = userOrder.value.passportPhotograph
                                    const fileNamePassport = filePathPassport.substring(filePathPassport.lastIndexOf('/') + 1)
                                
                                    state.passportName = fileNamePassport
                                }

                                if (userOrder.value.governmentId !== null) {   
                                    state.govtIdFile = userOrder.value.governmentId

                                    const filePathGovtId = userOrder.value.governmentId
                                    const fileNameGovtId = filePathGovtId.substring(filePathGovtId.lastIndexOf('/') + 1)
                                
                                    state.govtIdName = fileNameGovtId
                                }

                                if (userOrder.value.utilityBill !== null) { 
                                    state.utilityFile = userOrder.value.utilityBill

                                    const filePathUtility = userOrder.value.utilityBill
                                    const fileNameUtility = filePathUtility.substring(filePathUtility.lastIndexOf('/') + 1)
                                
                                    state.utilityBillName = fileNameUtility
                                }
                             
                        } catch (error) {
                            console.log(error);
                        
                        }

                        // check if payment has been made
                        try {
                            const response = await axios.get(`${apiUrl}/Orders/view-my-orders`, {headers: headers})
                            const orders = response.data
                         
                            // const filteredOrder = orders.filter(orders => orders.id === residentialOrderId)[0]
                            
                            const filteredOrder = JSON.stringify(orders.filter(orders => orders.id === residentialOrderId), null, 2)
                            
                            const orderPaymentStatus = JSON.parse(filteredOrder). map(orders => orders.status)
                            if (orderPaymentStatus[0] === 'Completed') {
                                payment.value = true 
                            }else{
                                payment.value = false 
                            }
                            
                        } catch (error) {
                            console.log(error);
                            
                        }
                    }
                }
            })

            const showAlert = async(welcome) => {
                if (!swal) {
                    console.error('SweetAlert2 is not injected');
                    return;
                }
                try {
                    // Show another alert that times out after a few seconds
                    swal.fire({
                        title: 'Processing...',
                        text: 'Your save action is being processed.',
                        icon: 'info',
                        timer: 3000, // 5000 ms = 5 seconds
                        timerProgressBar: true,
                        showConfirmButton: false,
                        willClose: () => {
                            router.push({ name: "welcome" });
                        }
                    });
                } catch (error) {
                    console.error('Error displaying alert:', error);
                }
                
            }

            const saveOrder = async() => {
                v$.value.$validate() //validate inputs
               
                if (!v$.value.$error && state.localConsent && state.localDeclaration && state.policy) {
                    if (state.hasError = true) {
                        state.hasError = false;
                    }

                    const planId = route.query.selectedPlanId
                    const planTypeId = route.query.selectedPlanTypeId
                    const planName = route.query.plan
                    const orderId = props.personalData.orderId

                    const headers = {
                        'Content-Type': 'multipart/form-data',
                        // 'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem('token')}`,
                        'accept': '*/*',
                        'Access-Control-Allow-Origin': '*'
                    }
                    
                    // if (state.passportFile === undefined) {
                    //     state.passportFile = ''
                    // }
                    // if (state.govtIdFile === undefined) {
                    //     state.govtIdFile = ''
                    // }
                    // if (state.utilityFile === undefined) {
                    //     state.utilityFile = ''
                    // }

                    try {
                            isLoading.value = true

                            const formData = {
                                    'passportPhotograph': state.passportFile,
                                    'governmentId': state.govtIdFile,
                                    'utilityBill': state.utilityFile,
                                }

                            // check if registration started before
                            if (window.location.href.includes('residentialOrderId')) {
                                const getOrderResponse = await axios.get(`${apiUrl}/Orders/view-my-order/${residentialOrderId}`, {headers: headers})
                                userOrder.value = getOrderResponse.data

                                const planId = userOrder.value.planId
                                // const planTypeId = '9c163469-ab5f-4f80-b931-71420c518902'
                                const planTypeId = userOrder.value.planTypeId
                                const ROI = residentialOrderId

                                if (state.passportFile === userOrder.value.passportPhotograph && state.govtIdFile === userOrder.value.governmentId &&
                                state.utilityFile === userOrder.value.utilityBill) {
                                // router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                                showAlert();
                                
                                } else {
                                    
                                    // state.passportFile.name is the object attribute of state.passportfile
                                const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/upload-documents?orderId=${residentialOrderId}`,formData, {
                                    headers: headers, data: formData,
                                
                                    'orderId': userOrder.value.id
                                })
                                showAlert();
                                // router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                        
                                }


                            } else {
                                const ROI = orderId

                                // state.passportFile.name is the object attribute of state.passportfile
                                const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/upload-documents?orderId=${orderId}`,formData, {
                                    headers: headers, 
                                    data: formData,
                                    'orderId': orderId
                                })
                                showAlert();
                                // router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                            
                            }

                             

                        } catch (error) {
                            console.log(error);
                        }finally {
                            setTimeout(() => {
                                isLoading.value = false
                            }, 1000);
                            window.scrollTo(0, top);
                        }

                }
            }

            const submitForm = async () => {

                v$.value.$validate() //validate inputs
               
                if (!v$.value.$error && state.localConsent && state.localDeclaration && state.policy) {
                    if (state.hasError = true) {
                        state.hasError = false;
                    }
                   
                    // const result = await swal.fire({
                    //     title: 'Save Changes?',
                    //     text: 'Do you want to save your changes before proceeding?',
                    //     icon: 'warning',
                    //     showCancelButton: true,
                    //     confirmButtonText: 'Save and Proceed',
                    //     confirmButtonColor: '#DA1919',
                    //     cancelButtonText: 'Save Order',
                    //     customClass: {
                    //     confirmButton: 'btn-confirm',
                    //     cancelButton: 'btn-cancel'
                    //     }
                    // });

                        const planId = route.query.selectedPlanId
                        const planTypeId = route.query.selectedPlanTypeId
                        const planName = route.query.plan
                        const orderId = props.personalData.orderId

                        const headers = {
                            'Content-Type': 'multipart/form-data',
                            // 'Content-Type': 'application/json',
                            'Authorization': `${sessionStorage.getItem('token')}`,
                            'accept': '*/*',
                            'Access-Control-Allow-Origin': '*'
                        }
                   
                      
                        try {
                            isLoading.value = true

                            const formData = {
                                    'passportPhotograph': state.passportFile,
                                    'governmentId': state.govtIdFile,
                                    'utilityBill': state.utilityFile,
                                }

                            // check if registration started before
                            if (window.location.href.includes('residentialOrderId')) {
                                const getOrderResponse = await axios.get(`${apiUrl}/Orders/view-my-order/${residentialOrderId}`, {headers: headers})
                                userOrder.value = getOrderResponse.data

                                const planId = userOrder.value.planId
                                // const planTypeId = '9c163469-ab5f-4f80-b931-71420c518902'
                                const planTypeId = userOrder.value.planTypeId
                                const ROI = residentialOrderId

                                if (state.passportFile === userOrder.value.passportPhotograph && state.govtIdFile === userOrder.value.governmentId &&
                                state.utilityFile === userOrder.value.utilityBill) {
                                router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                                
                                } else {
                                    
                                    // state.passportFile.name is the object attribute of state.passportfile
                                const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/upload-documents?orderId=${residentialOrderId}`,formData, {
                                    headers: headers, data: formData,
                                
                                    'orderId': userOrder.value.id
                                })

                                // if (payment.value === true) {
                                //     router.push({name: 'welcome'})
                                // } else {
                                    router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                                // }
                        
                                }


                            } else {
                                const ROI = orderId

                                // state.passportFile.name is the object attribute of state.passportfile
                                const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/upload-documents?orderId=${orderId}`,formData, {
                                    headers: headers, 
                                    data: formData,
                                    'orderId': orderId
                                })
                                // router.push({name: 'Payment', query: {planId, planTypeId, ROI } } )
                                // if (payment.value === true) {
                                //     router.push({name: 'welcome'})
                                // } else {
                                    router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                                // }
                            
                            }

                        } catch (error) {
                            console.log(error);
                        }finally {
                            setTimeout(() => {
                                isLoading.value = false
                            }, 1000);
                        }
                    

                }else{
                    state.hasError = true
                    window.scrollTo(0, top);
                    state.errorMsg = true
                }
            };

            // const submitForm = async() => {
            //     v$.value.$validate() //validate inputs

            //     if (!v$.value.$error && state.localConsent && state.localDeclaration) {
            //         if (state.hasError = true) {
            //             state.hasError = false;
            //         }
                   

            //         const planId = route.query.selectedPlanId
            //         const planTypeId = route.query.selectedPlanTypeId
            //         const planName = route.query.plan
            //         const orderId = props.personalData.orderId

            //         const headers = {
            //             'Content-Type': 'multipart/form-data',
            //             // 'Content-Type': 'application/json',
            //             'Authorization': `${sessionStorage.getItem('token')}`,
            //             'accept': '*/*',
            //             'Access-Control-Allow-Origin': '*'
            //         }

            //         try {
            //             isLoading.value = true

            //             const formData = {
            //                     'passportPhotograph': state.passportFile,
            //                     'governmentId': state.govtIdFile,
            //                     'utilityBill': state.utilityFile,
            //                 }

            //             // check if registration started before
            //             if (window.location.href.includes('residentialOrderId')) {
            //                 const getOrderResponse = await axios.get(`${apiUrl}/Orders/view-my-order/${residentialOrderId}`, {headers: headers})
            //                 userOrder.value = getOrderResponse.data

            //                 const planId = userOrder.value.planId
            //                 // const planTypeId = '9c163469-ab5f-4f80-b931-71420c518902'
            //                 const planTypeId = userOrder.value.planTypeId
            //                 const ROI = residentialOrderId

            //                 if (state.passportFile === userOrder.value.passportPhotograph && state.govtIdFile === userOrder.value.governmentId &&
            //                 state.utilityFile === userOrder.value.utilityBill) {
            //                   router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                               
            //                 } else {
                                
            //                     // state.passportFile.name is the object attribute of state.passportfile
            //                   const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/upload-documents?orderId=${residentialOrderId}`,formData, {
            //                       headers: headers, data: formData,
                              
            //                       'orderId': userOrder.value.id
            //                   })
            //                   router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                       
            //                 }


            //             } else {
            //                 const ROI = orderId

            //                 // state.passportFile.name is the object attribute of state.passportfile
            //                 const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/upload-documents?orderId=${orderId}`,formData, {
            //                     headers: headers, 
            //                     data: formData,
            //                     'orderId': orderId
            //                 })
            //                 // router.push({name: 'Payment', query: {planId, planTypeId, ROI } } )
            //                 router.push({name: 'PaymentProcess', query: {planId, planTypeId, ROI, planName } } )
                           
            //             }

            //         } catch (error) {
            //             console.log(error);
            //         }finally {
            //             setTimeout(() => {
            //                 isLoading.value = false
            //             }, 1000);
            //         }
            //         // emit('submit-application', { filesData: totalData})
            //     }else{
            //         state.hasError = true
            //         window.scrollTo(0, top);
            //         state.errorMsg = true
            //     }
            // }

            return {state, v$, choosePassport, handlePassport, passportInput, prevStep, submitForm, isLoading, user, payment,
                govtIdInput, chooseGovtId, handleGovtId, utilityInput, chooseUtilityBill, handleUtilityBill, saveOrder}
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
    .main-container {
        background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03)); 
        text-align: justify;
        /* overflow-x: hidden; */
    }
    .error-msg, .policy-link{
        color: #DA1919;
    }
    .policy-link {
        text-decoration: none;
    }
    p.body-heading, p.declaration-heading {
        font-size: 16px;
    }
    p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
        color: #949DAB;
        font-family: 'IBM Pex Sans', sans-serif;
        font-weight: 600;
        font-size: 15px;
    }
    .form-container {
        margin: 20px 150px 150px;
        /* width: 75vw; */
        font-family: 'IBM Plex Sans', sans-serif;
    }
    .hidden-input {
        display: none;
    }
    p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
       margin-left: 30px;
    }
    .form-heading, form.form {
        margin-left: 70px;
    }
    .heading {
        font-size: 30px;
        font-weight: 500;
        text-align: center;
    }
    .greeting {
        font-family: 'Poppins', sans-serif;
        font-size: 26px;
        font-weight: 700;
    }
    .greeting, .sub-heading {
        text-align: left;
    }
    .form-heading {
        font-weight: 500;
        font-size: 25px;
    }
    .form {
        margin: 20px auto 50px;
    }
    .form-input {
        width: 45%;
        margin-right: 25px;
    }
    .comment {
        font-size: 16px;
        font-weight: 500;
        color: #263238;
        margin-top: 50px;
    }
    .prev-btn, .submit-btn { 
        background-color: #DA1919;
        border-radius: 30px;
        text-align: center;
        width: 150px;
        margin: 20px auto 0;
        cursor: pointer;
    }
    .prev-btn {
        float: left;
    }
    .submit-btn .btn, .prev-btn .btn{
        color: #ffffff;
    }
    .submit-btn {
        float: right;
    }

    .submit-btn .btn:active, .prev-btn .btn:active {
        border: transparent;
    }
    .save-order {
        margin-right: 20px;
    }
    /* input[type=file]::-webkit-file-upload-button {
        display: none;
    }
    input[type=file]::file-selector-button {
        display: none;
    }
    input[type=file]::before {
        content: "Browse....";
        display: inline-block;
        color: #000000;
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        background-color: #fff;
        margin-right: 10px;
    }

    .form .form-control, input[type=file]::before {
        border: 1px solid #000000;
    } */

    .file-container {
        border: 1px solid #000000;
        border-radius: 15px;
        padding:  12px 10px 12px 0;
        max-width: 100%;
        overflow:hidden; 
        white-space:nowrap; 
        text-overflow:ellipsis;    
    
        font-weight: 500;
        font-size: 16px;
    }
  .file-button {
    border: 1px solid black;
    padding: 5px 40px 5px 10px;
    margin: 2px 3px 2px 10px;
    cursor: pointer;
  }
  .file-name {
    /* overflow: hidden; */
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis; 
    width:200px;
  /* display: inline; */
  }
    .form-control:focus, .form-check-input:focus {
        box-shadow: none;
    }
    .form-label {
        font-family: 'IBM Sans Plex', sans-serif;
        font-size: 16px;
        font-weight: 500;
    }
    input[type=checkbox]{
        border-color: #757575;
        cursor: pointer;
    }

    input[type=checkbox]:checked{
        background-color:#DA1919;
    }
    input[type=checkbox].text-danger{
        border-color: #DA1919;
    }
    .error-text{
        color: #DA1919;
    }
  
    @media (min-width: 768px) and (max-width: 992px) {
        .form-container {
            margin: 20px 75px 100px;
        }
        .form-heading, form.form {
            margin-left: 30px;
        }
        .heading, .greeting {
            font-size: 20px;
        }
    }
    @media (min-width: 481px) and (max-width: 767px) {
        .form-container {
            margin: 20px 75px 100px;
        }
        .comment {
            margin-top: 15px;
        }
        .form-heading, form.form, p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
            margin-left: 0;
        }
        .form-heading {
            font-size: 20px;
        }
        .heading {
            font-weight: 600;
        }
        .heading, .greeting {
            font-size: 18px;
        }
        .form-input {
            width: 100%;
        }
        .prev-btn, .submit-btn { 
          float: none;
          margin: 20px auto 0;
          text-align: center;
        }
    }

    @media (max-width: 480px) {
        .form-container {
            margin: 20px 40px 150px;
            /* width: 75vw; */
        }
        .form-heading, form.form, p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
            margin-left: 0;
        }
        .form-heading {
            font-size: 20px;
        }
        .comment {
            margin-top: 15px;
        }
        .heading {
            font-weight: 600;
        }
        .heading, .greeting {
            font-size: 18px;
        }
        .form-input {
            width: 100%;
        }
        .prev-btn, .submit-btn { 
          float: none;
          margin: 20px auto 0;
          text-align: center;
        }
        
    }
</style>