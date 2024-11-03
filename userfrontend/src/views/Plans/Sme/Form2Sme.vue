<template>

    <div class="container-fluid main-container">
        <MainNavbar/>

         <!-- loading spinner -->
         <Spinner :loading="isLoading" />
      
        <div class="form">
            <p class="heading">Company Details</p>
            <p class="greeting">Hello,</p>
            <p class="sub-heading">Please provide your company details, your information is safe with us!</p>

        <!-- Modal -->
        <div class="modal-backdrop" v-show="isModalVisible">
                    
            <div class="custom-modal">
                <!-- <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" disabled></button>
                </div> -->
                <div class="modal-body">
                    <h5 class="modal-heading">TERMS AND CONDITIONS</h5>
                    <p class="modal-text">
                        Extra costs may apply based on the outcome of a site survey. Initial payments are to be made via this portal. 
                        FOS internet service is a monthly pre-paid service. Service will be delivered within 4 days from the payment date which is subject to the completion of all civil engineering work”.
                        <br><br>We guarantee that our FOS optical network terminal (ONT/Modem) which we will give to you will work to the relevant specification for the minimum warranty period of 180 days.
                    </p>
                </div>
                <div class="modal-btn" @click="generateToken">
                    <button type="submit" class="btn" >
                        Accept
                    </button>
                    
                </div>
                
            </div>
            </div>

            <form class="row g-3" @submit.prevent="nextStep">
                <SuccessAlert v-if="state.visible"></SuccessAlert>
                <WarningAlert v-if="state.warning"></WarningAlert>

                <div class="alert alert-danger" role="alert" v-if="apiWarning">
                    {{ errorMessage }}
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                    <label for="companyName" class="form-label">Company Name</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" Placeholder="Full Company Name" v-model="state.companyName">
                   <span class="error-msg" v-if="v$.companyName.$error"> {{ v$.companyName.$errors[0].$message }} </span>
                </div>
                <div class="col-md-12 col-sm-12">
                    <label for="typeOfBusiness" class="form-label"> Type of Business</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Type of Business" v-model="state.typeOfBusiness">
                   <span class="error-msg" v-if="v$.typeOfBusiness.$error"> {{ v$.typeOfBusiness.$errors[0].$message }} </span>
                </div>
                
                <p class="billing-body-heading">Company Address:</p>

                
                <div class="col-md-6 col-sm-12">
                    <label for="type-of-building" class="form-label">Type of building:</label><span id="asterisk">&#42;</span>
                    
                </div>
                <div class="col-md-6 col-sm-12">
                    <!-- <div class="checkbox"> -->
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="SingleOffice" v-model="state.typeOfBuilding">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Single Office
                            </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" value="MultipleOffices" v-model="state.typeOfBuilding">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Multiple Offices
                            </label>
                        </div>
                    <!-- </div> -->
                    
                   <span class="error-msg" v-if="v$.typeOfBuilding.$error"> {{ v$.typeOfBuilding.$errors[0].$message }} </span>

                </div>

                <div class="col-md-6 col-sm-12">
                    <label for="state" class="form-label">State</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.stateName">
                        <option value="" disabled selected>Choose a state</option>
                        <option 
                        v-for="item in StateOptions"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.stateName.$error"> {{ v$.stateName.$errors[0].$message }} </span>
                </div>
                
                <div class="col-md-6 col-sm-12" v-if="state.stateName" @click="get_city">
                    <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.city">
                        <!-- <option value="" disabled selected>Choose a City/Town</option> -->
                        <option value="" v-if="!state.city" disabled selected>Choose a City/Town</option>
                        <option :value="state.city" v-else disabled selected>{{ state.city }}</option>
                        <option v-if="optionLoading">Loading ...</option>
                        <option v-else
                        v-for="item in CityOptions"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.city.$error"> {{ v$.city.$errors[0].$message }} </span>
                </div>



                <div class="col-md-12 col-sm-12" v-if="state.city" @click="get_street">
                    <!-- <div class="col-md-12 col-sm-12" v-if="state.city !== 'undefined'" @click="get_street"> -->
                    <label for="streetAddress" class="form-label"> Street Address</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.streetAddress">
                    <!-- <select class="form-select"> -->
                        <!-- <option value="" disabled selected>Choose a Street</option> -->
                        <option value="" v-if="!state.streetAddress" disabled selected>Choose a Street</option>
                        <option :value="state.streetAddress" v-else disabled selected>{{ state.streetAddress }}</option>
                        <option v-if="optionLoading">Loading ...</option>
                        <option v-else
                        v-for="item in StreetOptions"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.streetAddress.$error"> {{ v$.streetAddress.$errors[0].$message }} </span>
                </div>
                

                <p class="billing-body-heading">Contact Person Information:</p>

                <div class="col-lg-6 col-md-6 col-sm-12">
                    <label for="firstName" class="form-label">First Name</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" Placeholder="Enter First Name" v-model="state.firstName">
                   <span class="error-msg" v-if="v$.firstName.$error"> {{ v$.firstName.$errors[0].$message }} </span>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <label for="lastName" class="form-label">Last Name</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Last Name" v-model="state.lastName">
                   <span class="error-msg" v-if="v$.lastName.$error"> {{ v$.lastName.$errors[0].$message }} </span>
                </div>

                <div class="col-md-12 col-sm-12">
                    <label for="inputEmail4" class="form-label">E-mail</label><span id="asterisk">&#42;</span>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="Enter Email" v-model="state.email">
                   <span class="error-msg" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </span>
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="mobile" class="form-label">Mobile Number</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Mobile Number" v-model="state.mobileNumber" maxlength="11">
                   <!-- <span class="error-msg" v-if="v$.mobileNumber.$error"> {{ v$.mobileNumber.$errors[0].$message }} </span> -->
                   <span class="error-msg" v-if="v$.mobileNumber.$error && !v$.mobileNumber.helpers"> Invalid phone number format </span>
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="otherNumber" class="form-label">Other Number</label>
                    <input type="text" class="form-control" placeholder="Enter Other Number" v-model="state.otherNumber" maxlength="11">
                    <span class="error-msg" v-if="v$.otherNumber.$error && !v$.otherNumber.helpers"> Invalid phone number format </span>
                    <!-- <span class="error-msg" v-if="v$.otherNumber.$error"> {{ v$.otherNumber.$errors[0].$message }} </span> -->
                
                </div>            
                
                <div class="col-md-12 col-sm-12">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" @change="hideContent" v-model="state.isBillingAddressSameAsResidentialAddress">
                    <label class="form-check-label" for="gridCheck">
                        Check this box if the billing address is the same as above
                    </label><span id="asterisk">&#42;</span>
                    </div>
                </div>

                <!-- billing information -->
                <div class="billing-information col-md-12 col-sm-12" v-if="!state.isBillingAddressSameAsResidentialAddress">
                    <div class="row">

                        
                        <p class="billing-body-heading">Billing Information</p>

                        <p class="billing-body-sub-heading">Billing Contact Person:</p>

                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <label for="firstName" class="form-label">First Name</label><span id="asterisk">&#42;</span>
                            <input type="text" class="form-control" Placeholder="Enter First Name" v-model="state.firstNameBilling">
                        <span class="error-msg" v-if="v$.firstNameBilling.$error"> {{ v$.firstNameBilling.$errors[0].$message }} </span>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <label for="lastName" class="form-label">Last Name</label><span id="asterisk">&#42;</span>
                            <input type="text" class="form-control" placeholder="Enter Last Name" v-model="state.lastNameBilling">
                        <span class="error-msg" v-if="v$.lastNameBilling.$error"> {{ v$.lastNameBilling.$errors[0].$message }} </span>
                        </div>
                        
                        <div class="col-md-12 col-sm-12">
                            <label for="inputEmail4" class="form-label">E-mail</label><span id="asterisk">&#42;</span>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Enter Email" v-model="state.emailBilling">
                        <span class="error-msg" v-if="v$.emailBilling.$error"> {{ v$.emailBilling.$errors[0].$message }} </span>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <label for="phone" class="form-label">Phone</label><span id="asterisk">&#42;</span>
                            <input type="text" class="form-control" placeholder="Enter Phone Number" v-model="state.phoneNumberBilling" maxlength="11">
                        <!-- <span class="error-msg" v-if="v$.phoneNumberBilling.$error"> {{ v$.phoneNumberBilling.$errors[0].$message }} </span> -->
                        <span class="error-msg" v-if="v$.phoneNumberBilling.$error && !v$.phoneNumberBilling.helpers"> Invalid phone number format </span>
                        </div>


                        <p class="billing-body-sub-heading">Billing Address:</p>
                        
                        <div class="col-md-6 col-sm-12">
                            <label for="state" class="form-label">State</label><span id="asterisk">&#42;</span>
                            
                            <select class="form-select" v-model="state.stateNameBilling">
                                <option value="" disabled selected>Choose a state</option>
                                <option 
                                v-for="item in StateOptions"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                >{{ item }}</option>
                            </select>
                            <span class="error-msg" v-if="v$.stateNameBilling.$error"> {{ v$.stateNameBilling.$errors[0].$message }} </span>
                        </div>
                        
                        <div class="col-md-6 col-sm-12" v-if="state.stateNameBilling" @click="get_city_billing">
                            <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                            <select class="form-select" v-model="state.cityBilling">
                                <!-- <option value="" disabled selected>Choose a City/Town</option> -->
                                <option value="" v-if="!state.cityBilling" disabled selected>Choose a City/Town</option>
                                <option :value="state.cityBilling" v-else disabled selected>{{ state.cityBilling }}</option>
                                <option v-if="optionLoading">Loading ...</option>
                                <option v-else
                                v-for="item in CityOptionsBilling"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                >{{ item }}</option>
                            </select>
                        <span class="error-msg" v-if="v$.cityBilling.$error"> {{ v$.cityBilling.$errors[0].$message }} </span>
                        </div>
              
                        <div class="col-md-6 col-sm-12" v-if="state.cityBilling" @click="get_street_billing">
                            <label for="street-name" class="form-label">Street Name</label><span id="asterisk">&#42;</span>
                            <select class="form-select" v-model="state.streetNameBilling">
                                <!-- <option value="" disabled selected>Street</option> -->
                                <option value="" v-if="!state.streetNameBilling" disabled selected>Choose a Street</option>
                                <option :value="state.streetNameBilling" v-else disabled selected>{{ state.streetNameBilling }}</option>
                                <option v-if="optionLoading">Loading ...</option>
                                <option v-else
                                v-for="item in StreetOptionsBilling"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                >{{ item }}</option>
                            </select>
                        <span class="error-msg" v-if="v$.streetNameBilling.$error"> {{ v$.streetNameBilling.$errors[0].$message }} </span>
                        </div>
                                
                    </div>
                </div>

                <!-- <div class="next-btn"> -->
                    <button type="submit" class="btn btn-link">
                        Next     
                    </button>
                    
                <!-- </div> -->
            </form>
            
        </div>
    </div>

    <!-- <MainFooter/> -->
</template>

<script>
    import MainNavbar from '@/components/MainNavbar.vue';
    // import MainFooter from '../../components/MainFooter.vue';
    import SuccessAlert from '@/components/SuccessAlert.vue';
    import WarningAlert from '@/components/WarningAlert.vue';

    import useVuelidate from '@vuelidate/core'
   import { ref, reactive, computed, onMounted, watch } from 'vue'
   import { required, email, numeric, minLength, maxLength, helpers } from '@vuelidate/validators'
   import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';
    import Spinner from '@/components/Spinner.vue';

const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            MainNavbar,
            SuccessAlert,
            WarningAlert, 
            Spinner
        },

        name: 'Form2',
        props: ['personalData', 'filesData'],

        setup(props, {emit}) {
            const isLoading = ref(false)
            let apiWarning = ref(false)
            let errorMessage = ref(null)
            const user = ref('')
            const userOrder = ref('')
            // const coverageLocation = ref(null)
            const currentPath = ref('')
            const planTypeId = ref('')

            const route = useRoute()
            const router = useRouter()
            const smeOrderId = route.query.smeOrderId
            const isModalVisible = ref(false)
            const initialOrderId = ref('')

            const StateOptions = ref([])
            const CityOptions = ref([])
            const StreetOptions = ref([])
            const StreetOptionsBilling = ref([])
            const CityOptionsBilling = ref([])
            const optionLoading = ref(false)

            currentPath.value = route.path || router.currentRoute.value.fullPath

             // validation
             const state = reactive({
                visible: false,
                warning: false,
                isBillingAddressSameAsResidentialAddress: props.personalData.isBillingAddressSameAsResidentialAddress,
                // orderId: '',

                companyName: props.personalData.companyName,
                typeOfBusiness: props.personalData.typeOfBusiness, 
                // streetAddress: props.personalData.streetAddress,
                // city: props.personalData.city,
                // stateName: props.personalData.stateName,
                stateName: '',
                city: '',
                streetAddress: '',
                typeOfBuilding: props.personalData.typeOfBuilding,

                firstName: props.personalData.firstName,
                lastName: props.personalData.lastName,
                email: props.personalData.email,
                mobileNumber: props.personalData.mobileNumber,
                otherNumber: props.personalData.otherNumber,

                // billingAddress: props.personalData.billingAddress,
                firstNameBilling: props.personalData.firstNameBilling,
                lastNameBilling: props.personalData.lastNameBilling,
                emailBilling: props.personalData.emailBilling,
                phoneNumberBilling: props.personalData.phoneNumberBilling,
                // streetNameBilling: props.personalData.streetNameBilling,
                // cityBilling: props.personalData.cityBilling,
                // stateNameBilling: props.personalData.stateNameBilling,
                streetNameBilling: '',
                cityBilling: '',
                stateNameBilling: '',
            })

            const rules = computed(() => {

                let dynamicRules = {
                   companyName: { required, minLength: minLength(2) },
                    typeOfBusiness: { required, minLength: minLength(2) },
                    streetAddress: { required },
                    city: { required },
                    stateName: { required },
                    typeOfBuilding: { required },
                    firstName: { required, minLength: minLength(2) },
                    lastName: { required, minLength: minLength(2) },
                    email: { required, email },
                    mobileNumber: { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/)  },
                    otherNumber: { regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/)  },
                };

                if (!state.isBillingAddressSameAsResidentialAddress) {
                    dynamicRules.firstNameBilling = { required, minLength: minLength(2) };
                    dynamicRules.lastNameBilling = { required, minLength: minLength(2) };
                    dynamicRules.phoneNumberBilling = { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/)  },
                    dynamicRules.emailBilling = { required, email },
                    dynamicRules.streetNameBilling = {required},
                    dynamicRules.cityBilling = {required},
                    dynamicRules.stateNameBilling = {required}
                }

                return dynamicRules;

              
            })


            const v$ = useVuelidate(rules, state)


            // get existing user details
            onMounted(async() => {
                const token = sessionStorage.getItem('token')

                const tokenObject = localStorage.getItem('tokenObject');
               
                if (tokenObject === null) { 
                    isModalVisible.value = true
                }
                if (props.filesData.initialOrderId) {
                    initialOrderId.value = props.filesData.initialOrderId
                }
           
                const headers = { 
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                            'Access-Control-Allow-Origin': '*',
                        }

                if (token) {

                    // check if registration started before
                    if ((window.location.href.includes('smeOrderId'))) {
                        const smeOrderId = route.query.smeOrderId
                        try {    
                        
                            const response = await axios.get(`${apiUrl}/Orders/view-my-order/${smeOrderId}`, {headers: headers})

                            userOrder.value = response.data

                            const getUserResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})
    
                            user.value = getUserResponse.data
                                
                                // fetch userOrder data
                                state.companyName = userOrder.value.companyName,
                                state.gender = userOrder.value.gender
                                state.dateOfBirth = userOrder.value.dateOfBirth
                                state.occupation = userOrder.value.occupation
                                // state.mobileNumber = userOrder.value.contactPersonPhoneNumber
                                state.otherNumber = userOrder.value.contactPersonAlternativePhoneNumber
                                state.typeOfBuilding = userOrder.value.typeOfBuilding
                                state.typeOfBusiness = userOrder.value.typeOfBusiness
                                state.flatNumber = userOrder.value.flatNumber
                                state.houseNumber = userOrder.value.houseNumber
                                // state.estateName = userOrder.value.estateName
                                state.streetAddress = userOrder.value.companyStreetName
                                state.city = userOrder.value.city
                                state.stateName = userOrder.value.state
                                state.isBillingAddressSameAsResidentialAddress =userOrder.value.isBillingAddressSameAsResidentialAddress

                                state.firstNameBilling = userOrder.value.smeBillingDetails.contactPersonFirstName
                                state.lastNameBilling = userOrder.value.smeBillingDetails.contactPersonLastName
                                state.emailBilling = userOrder.value.smeBillingDetails.contactPersonEmail
                                state.phoneNumberBilling = userOrder.value.smeBillingDetails.contactPersonPhoneNumber
                                state.streetNameBilling = userOrder.value.smeBillingDetails.companyStreetName
                                state.cityBilling = userOrder.value.smeBillingDetails.city
                                state.stateNameBilling = userOrder.value.smeBillingDetails.state


                                if (user.value.phoneNumber !== null) {
                                    state.mobileNumber = user.value.phoneNumber
                                }else if(userOrder.value.contactPersonPhoneNumber !== null) {
                                    state.mobileNumber = userOrder.value.contactPersonPhoneNumber
                                }

                                if (userOrder.value.companyName !== null) {
                                    state.companyName = userOrder.value.companyName
                                }else if (user.value.companyName !== null) {
                                    state.companyName = user.value.companyName
                                }
                                // fetch user data
                                state.firstName = userOrder.value.contactPersonFirstName
                                state.lastName = userOrder.value.contactPersonLastName
                                state.email = userOrder.value.contactPersonEmail


                        } catch (error) {
                            console.log(error);
                            
                        }
                    }else if(initialOrderId.value){
                        try {    
                        
                        const response = await axios.get(`${apiUrl}/Orders/view-my-order/${initialOrderId.value}`, {headers: headers})

                        userOrder.value = response.data

                        const getUserResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                        user.value = getUserResponse.data
                            
                            // fetch userOrder data
                            state.companyName = userOrder.value.companyName,
                            state.gender = userOrder.value.gender
                            state.dateOfBirth = userOrder.value.dateOfBirth
                            state.occupation = userOrder.value.occupation
                            // state.mobileNumber = userOrder.value.contactPersonPhoneNumber
                            state.otherNumber = userOrder.value.contactPersonAlternativePhoneNumber
                            state.typeOfBuilding = userOrder.value.typeOfBuilding
                            state.typeOfBusiness = userOrder.value.typeOfBusiness
                            state.flatNumber = userOrder.value.flatNumber
                            state.houseNumber = userOrder.value.houseNumber
                            // state.estateName = userOrder.value.estateName
                            state.streetAddress = userOrder.value.companyStreetName
                            state.city = userOrder.value.city
                            state.stateName = userOrder.value.state
                            state.isBillingAddressSameAsResidentialAddress =userOrder.value.isBillingAddressSameAsResidentialAddress

                            state.firstNameBilling = userOrder.value.smeBillingDetails.contactPersonFirstName
                            state.lastNameBilling = userOrder.value.smeBillingDetails.contactPersonLastName
                            state.emailBilling = userOrder.value.smeBillingDetails.contactPersonEmail
                            state.phoneNumberBilling = userOrder.value.smeBillingDetails.contactPersonPhoneNumber
                            state.streetNameBilling = userOrder.value.smeBillingDetails.companyStreetName
                            state.cityBilling = userOrder.value.smeBillingDetails.city
                            state.stateNameBilling = userOrder.value.smeBillingDetails.state


                            if (user.value.phoneNumber !== null) {
                                state.mobileNumber = user.value.phoneNumber
                            }else if(userOrder.value.contactPersonPhoneNumber !== null) {
                                state.mobileNumber = userOrder.value.contactPersonPhoneNumber
                            }

                            if (userOrder.value.companyName !== null) {
                                state.companyName = userOrder.value.companyName
                            }else if (user.value.companyName !== null) {
                                state.companyName = user.value.companyName
                            }
                            // fetch user data
                            state.firstName = userOrder.value.contactPersonFirstName
                            state.lastName = userOrder.value.contactPersonLastName
                            state.email = userOrder.value.contactPersonEmail


                        } catch (error) {
                            console.log(error);
                            
                        }
                    }
                    else {
                        
                        try {    
                            
                            const getUserResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})
    
                            user.value = getUserResponse.data
                     
                            // fetch user data
                            // state.companyName = user.value.companyName
                            state.firstName = user.value.firstName
                            state.lastName = user.value.lastName
                            state.email = user.value.email

                            if (user.value.phoneNumber !== null) {
                                    state.mobileNumber = user.value.phoneNumber
                            }

                            if (user.value.companyName !== null) {
                                state.companyName = user.value.companyName
                            }
                            // state.mobileNumber = user.value.phoneNumber
    
                            // return user.value
                        } catch (error) {
                            console.log(error);
                            
                        }
                    }

                  
                }

                // get the states from DB
                try {
                    const response = await axios.get(`${apiUrl}/NetworkCoverage/all-coverage-states`)
                    StateOptions.value = response.data
                    
                } catch (error) {
                    console.log(error);
                }

            })

            const get_city = async(selectedState) => {
                selectedState.value = state.stateName
                try {
                    optionLoading.value = true
                    const response = await axios.get(`${apiUrl}/NetworkCoverage/all-coverage-cities?states=${selectedState.value}`)
                    CityOptions.value = response.data
                } catch (error) {
                    console.log(error);
                }finally {
                    setTimeout(() => {
                        optionLoading.value = false
                    }, 1000);
                }
            }

            const get_city_billing = async(selectedState) => {
                selectedState.value = state.stateNameBilling
                try {
                    optionLoading.value = true
                    const response = await axios.get(`${apiUrl}/NetworkCoverage/all-coverage-cities?states=${selectedState.value}`)
                    CityOptionsBilling.value = response.data
                } catch (error) {
                    console.log(error);
                }finally {
                    setTimeout(() => {
                        optionLoading.value = false
                    }, 1000);
                }
            }

            const get_street = async(selectedCity) => {
                selectedCity.value = state.city
                try {
                    optionLoading.value = true
                    const response = await axios.get(`${apiUrl}/NetworkCoverage/all-coverage-streets?lgas=${selectedCity.value}`)
                    StreetOptions.value = response.data
                } catch (error) {
                    console.log(error);
                }finally {
                    setTimeout(() => {
                        optionLoading.value = false
                    }, 1000);
                }
            }

            const get_street_billing = async(selectedCity) => {
                selectedCity.value = state.cityBilling
                try {
                    optionLoading.value = true
                    const response = await axios.get(`${apiUrl}/NetworkCoverage/all-coverage-streets?lgas=${selectedCity.value}`)
                    StreetOptionsBilling.value = response.data
                } catch (error) {
                    console.log(error);
                }finally {
                    setTimeout(() => {
                        optionLoading.value = false
                    }, 1000);
                }
            }

            const nextStep = async() => {
                v$.value.$validate() //validate inputs

                if (!v$.value.$error) {
                    
                    if (state.warning = true) {
                        state.warning = false;
                        
                    }
                    const headers = { 
                        'Content-Type': 'application/json',
                        'Authorization': `${sessionStorage.getItem('token')}`,
                        // 'Access-Control-Allow-Origin': '*',
                        'accept': '*/*'
                    }

                    // confirm provided location is within network coverage location
                    const locationData = `${state.streetAddress} ${state.city}, ${state.stateName}`    
                 
                    try {
                        isLoading.value = true
                        const checkLocationResponse = await axios.get(`${apiUrl}/NetworkCoverage/check-network-coverage-availability?Location=${locationData}`)
                           
                            // if (checkLocationResponse.data.message == 'your location seems to be outside ipNX Network Coverage Area. Type in a more descriptive address.') {
                            if (checkLocationResponse.data.isWithinRange === false) {
                                apiWarning.value = true
                                errorMessage.value = checkLocationResponse.data.message
                            } else {
                                
                                try {
                                    isLoading.value = true

                                    //update
                                    if (window.location.href.includes('smeOrderId')) {
                                        // check if plantypeId matches
                                        if (route.query.selectedPlanTypeId) {
                                            planTypeId.value = route.query.selectedPlanTypeId
                                        }else{
                                            planTypeId.value = userOrder.value.planTypeId
                                        }
                                        if (state.isBillingAddressSameAsResidentialAddress) {
                                        // const response = await axios.put(`${apiUrl}/Onboarding/sme/continue-sign-up`, 
                                    // const response = await axios.post(`${apiUrl}/Orders/sme/place-an-order/fill-order-form`,
                                    const response = await axios.put(`${apiUrl}/Orders/sme/place-an-order/fill-order-form/${smeOrderId}`, 
                                    
                                    {
                                        headers: headers,
                                        // filter out empty entries before sending the put request
                                        ...Object.fromEntries(
                                        Object.entries({

                                            'companyName': state.companyName,
                                            'contactPersonFirstName': state.firstName,
                                            'contactPersonLastName': state.lastName,
                                            'contactPersonPhoneNumber': state.mobileNumber,
                                            'contactPersonAlternativePhoneNumber': state.otherNumber,
                                            'contactPersonEmail': state.email,
                                            'typeOfBusiness': state.typeOfBusiness,
                                            'companyStreetName': state.streetAddress,
                                            'city': state.city,
                                            'state': state.stateName,
                                            'typeOfBuilding': state.typeOfBuilding,
                                            // "planTypeId": route.query.selectedPlanTypeId,
                                            // "planTypeId": userOrder.value.planTypeId,
                                            "planTypeId": planTypeId.value,
                                            "networkCoverageAddress": locationData,
                                            'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                        
                                            }).filter(([key, value]) => value !== '')
                                        )
                                    
                                    })
                                                                        
                                        setTimeout( () => emit('step4-complete', {
                                            'orderId': userOrder.value.id,
                                            companyName: state.companyName,
                                            typeOfBusiness: state.typeOfBusiness,
                                            streetAddress: state.streetAddress,
                                            city: state.city,
                                            stateName: state.stateName,
                                            typeOfBuilding: state.typeOfBuilding,

                                            firstName: state.firstName,
                                            lastName: state.lastName,
                                            email: state.email,
                                            mobileNumber: state.mobileNumber,
                                            otherNumber: state.otherNumber,
                                            //  billingAddress: state.billingAddress,
                                            firstNameBilling: state.firstNameBilling,
                                            lastNameBilling: state.lastNameBilling,
                                            emailBilling: state.emailBilling,
                                            phoneNumberBilling: state.phoneNumberBilling,
                                            streetNameBilling: state.streetNameBilling,
                                            cityBilling: state.cityBilling,
                                            stateNameBilling: state.stateNameBilling,
                                            isBillingAddressSameAsResidentialAddress: state.isBillingAddressSameAsResidentialAddress,

                                        }), 1000);

                                        window.scrollTo(0, top);
                                        if(apiWarning.value = true){
                                            apiWarning.value = false
                                        }
                                        state.visible = true;
                                    }else{
                                        
                                        // const response = await axios.put(`${apiUrl}/Onboarding/sme/continue-sign-up`, 
                                        const response = await axios.put(`${apiUrl}/Orders/sme/place-an-order/fill-order-form/${smeOrderId}`, 
                                        
                                            {
                                                headers: headers,
                                                // filter out empty entries before sending the put request
                                                ...Object.fromEntries(
                                                Object.entries({
                
                                                    'companyName': state.companyName,
                                                    'contactPersonFirstName': state.firstName,
                                                    'contactPersonLastName': state.lastName,
                                                    'contactPersonPhoneNumber': state.mobileNumber,
                                                    'contactPersonAlternativePhoneNumber': state.otherNumber,
                                                    'contactPersonEmail': state.email,
                                                    'typeOfBusiness': state.typeOfBusiness,
                                                    'companyStreetName': state.streetAddress,
                                                    'city': state.city,
                                                    'state': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    "planTypeId": planTypeId.value,
                                                    "networkCoverageAddress": locationData,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                    'smeBillingDetails': {
                                                        'contactPersonFirstName': state.firstNameBilling,
                                                        'contactPersonLastName': state.lastNameBilling,
                                                        'contactPersonEmail': state.emailBilling,
                                                        'contactPersonPhoneNumber': state.phoneNumberBilling,
                                                        'companyStreetName': state.streetNameBilling,
                                                        'city': state.cityBilling,
                                                        'state': state.stateNameBilling,
                                                    }
                                                    }).filter(([key, value]) => value !== '')
                                                )
                                            
                                            })

                                            setTimeout( () => emit('step4-complete', {
                                                'orderId': userOrder.value.id,
                                                companyName: state.companyName,
                                                typeOfBusiness: state.typeOfBusiness,
                                                streetAddress: state.streetAddress,
                                                city: state.city,
                                                stateName: state.stateName,
                                                typeOfBuilding: state.typeOfBuilding,
                
                                                firstName: state.firstName,
                                                lastName: state.lastName,
                                                email: state.email,
                                                mobileNumber: state.mobileNumber,
                                                otherNumber: state.otherNumber,
                                                //  billingAddress: state.billingAddress,
                                                firstNameBilling: state.firstNameBilling,
                                                lastNameBilling: state.lastNameBilling,
                                                emailBilling: state.emailBilling,
                                                phoneNumberBilling: state.phoneNumberBilling,
                                                streetNameBilling: state.streetNameBilling,
                                                cityBilling: state.cityBilling,
                                                stateNameBilling: state.stateNameBilling,
                                                isBillingAddressSameAsResidentialAddress: state.isBillingAddressSameAsResidentialAddress,
                
                
                                            }), 1000);
                
                                            window.scrollTo(0, top);
                                            if(apiWarning.value = true){
                                                apiWarning.value = false
                                            }
                                            state.visible = true;
                                    }

                                    } else if (props.filesData.initialOrderId) {
                                        if (state.isBillingAddressSameAsResidentialAddress) {
                                            const response = await axios.put(`${apiUrl}/Orders/sme/place-an-order/fill-order-form/${initialOrderId.value}`, 
                                    
                                    {
                                        headers: headers,
                                        // filter out empty entries before sending the put request
                                        ...Object.fromEntries(
                                        Object.entries({

                                            'companyName': state.companyName,
                                            'contactPersonFirstName': state.firstName,
                                            'contactPersonLastName': state.lastName,
                                            'contactPersonPhoneNumber': state.mobileNumber,
                                            'contactPersonAlternativePhoneNumber': state.otherNumber,
                                            'contactPersonEmail': state.email,
                                            'typeOfBusiness': state.typeOfBusiness,
                                            'companyStreetName': state.streetAddress,
                                            'city': state.city,
                                            'state': state.stateName,
                                            'typeOfBuilding': state.typeOfBuilding,
                                            "planTypeId": route.query.selectedPlanTypeId,
                                            "networkCoverageAddress": locationData,
                                            'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                        
                                            }).filter(([key, value]) => value !== '')
                                        )
                                    
                                    })
                                                                     
                                        setTimeout( () => emit('step4-complete', {
                                            'orderId': props.filesData.initialOrderId,
                                            companyName: state.companyName,
                                            typeOfBusiness: state.typeOfBusiness,
                                            streetAddress: state.streetAddress,
                                            city: state.city,
                                            stateName: state.stateName,
                                            typeOfBuilding: state.typeOfBuilding,

                                            firstName: state.firstName,
                                            lastName: state.lastName,
                                            email: state.email,
                                            mobileNumber: state.mobileNumber,
                                            otherNumber: state.otherNumber,
                                            //  billingAddress: state.billingAddress,
                                            firstNameBilling: state.firstNameBilling,
                                            lastNameBilling: state.lastNameBilling,
                                            emailBilling: state.emailBilling,
                                            phoneNumberBilling: state.phoneNumberBilling,
                                            streetNameBilling: state.streetNameBilling,
                                            cityBilling: state.cityBilling,
                                            stateNameBilling: state.stateNameBilling,
                                            isBillingAddressSameAsResidentialAddress: state.isBillingAddressSameAsResidentialAddress,


                                        }), 1000);

                                        window.scrollTo(0, top);
                                        if(apiWarning.value = true){
                                            apiWarning.value = false
                                        }
                                        state.visible = true;
                                    }else{
                                        
                                        // const response = await axios.put(`${apiUrl}/Onboarding/sme/continue-sign-up`, 
                                        const response = await axios.put(`${apiUrl}/Orders/sme/place-an-order/fill-order-form/${initialOrderId.value}`, 
                                        
                                            {
                                                headers: headers,
                                                // filter out empty entries before sending the put request
                                                ...Object.fromEntries(
                                                Object.entries({
                
                                                    'companyName': state.companyName,
                                                    'contactPersonFirstName': state.firstName,
                                                    'contactPersonLastName': state.lastName,
                                                    'contactPersonPhoneNumber': state.mobileNumber,
                                                    'contactPersonAlternativePhoneNumber': state.otherNumber,
                                                    'contactPersonEmail': state.email,
                                                    'typeOfBusiness': state.typeOfBusiness,
                                                    'companyStreetName': state.streetAddress,
                                                    'city': state.city,
                                                    'state': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    "planTypeId": route.query.selectedPlanTypeId,
                                                    "networkCoverageAddress": locationData,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                    'smeBillingDetails': {
                                                        'contactPersonFirstName': state.firstNameBilling,
                                                        'contactPersonLastName': state.lastNameBilling,
                                                        'contactPersonEmail': state.emailBilling,
                                                        'contactPersonPhoneNumber': state.phoneNumberBilling,
                                                        'companyStreetName': state.streetNameBilling,
                                                        'city': state.cityBilling,
                                                        'state': state.stateNameBilling,
                                                    }
                                                    }).filter(([key, value]) => value !== '')
                                                )
                                            
                                            })
                                           
                                                
                                            setTimeout( () => emit('step4-complete', {
                                                'orderId': props.filesData.initialOrderId,
                                                companyName: state.companyName,
                                                typeOfBusiness: state.typeOfBusiness,
                                                streetAddress: state.streetAddress,
                                                city: state.city,
                                                stateName: state.stateName,
                                                typeOfBuilding: state.typeOfBuilding,
                
                                                firstName: state.firstName,
                                                lastName: state.lastName,
                                                email: state.email,
                                                mobileNumber: state.mobileNumber,
                                                otherNumber: state.otherNumber,
                                                //  billingAddress: state.billingAddress,
                                                firstNameBilling: state.firstNameBilling,
                                                lastNameBilling: state.lastNameBilling,
                                                emailBilling: state.emailBilling,
                                                phoneNumberBilling: state.phoneNumberBilling,
                                                streetNameBilling: state.streetNameBilling,
                                                cityBilling: state.cityBilling,
                                                stateNameBilling: state.stateNameBilling,
                                                isBillingAddressSameAsResidentialAddress: state.isBillingAddressSameAsResidentialAddress,
                
                
                                            }), 1000);
                
                                            window.scrollTo(0, top);
                                            if(apiWarning.value = true){
                                                apiWarning.value = false
                                            }
                                            state.visible = true;
                                    }

                                    }

                                    else {
                                        // new registration
                                        if (state.isBillingAddressSameAsResidentialAddress) {
                                            // const response = await axios.put(`${apiUrl}/Onboarding/sme/continue-sign-up`, 
                                        const response = await axios.post(`${apiUrl}/Orders/sme/place-an-order/fill-order-form`, 
                                        
                                        {
                                            headers: headers,
                                            // filter out empty entries before sending the put request
                                            ...Object.fromEntries(
                                            Object.entries({
                
                                                'companyName': state.companyName,
                                                'contactPersonFirstName': state.firstName,
                                                'contactPersonLastName': state.lastName,
                                                'contactPersonPhoneNumber': state.mobileNumber,
                                                'contactPersonAlternativePhoneNumber': state.otherNumber,
                                                'contactPersonEmail': state.email,
                                                'typeOfBusiness': state.typeOfBusiness,
                                                'companyStreetName': state.streetAddress,
                                                'city': state.city,
                                                'state': state.stateName,
                                                'typeOfBuilding': state.typeOfBuilding,
                                                "planTypeId": route.query.selectedPlanTypeId,
                                                "networkCoverageAddress": locationData,
                                                'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                            
                                                }).filter(([key, value]) => value !== '')
                                            )
                                        
                                        })                          
                                            setTimeout( () => emit('step4-complete', {
                                                'orderId': response.data.message,
                                                companyName: state.companyName,
                                                typeOfBusiness: state.typeOfBusiness,
                                                streetAddress: state.streetAddress,
                                                city: state.city,
                                                stateName: state.stateName,
                                                typeOfBuilding: state.typeOfBuilding,
                
                                                firstName: state.firstName,
                                                lastName: state.lastName,
                                                email: state.email,
                                                mobileNumber: state.mobileNumber,
                                                otherNumber: state.otherNumber,
                                                //  billingAddress: state.billingAddress,
                                                firstNameBilling: state.firstNameBilling,
                                                lastNameBilling: state.lastNameBilling,
                                                emailBilling: state.emailBilling,
                                                phoneNumberBilling: state.phoneNumberBilling,
                                                streetNameBilling: state.streetNameBilling,
                                                cityBilling: state.cityBilling,
                                                stateNameBilling: state.stateNameBilling,
                                                isBillingAddressSameAsResidentialAddress: state.isBillingAddressSameAsResidentialAddress,
                
                
                                            }), 1000);
                
                                            window.scrollTo(0, top);
                                            if(apiWarning.value = true){
                                                apiWarning.value = false
                                            }
                                            state.visible = true;
                                        }else{
                                            
                                            // const response = await axios.put(`${apiUrl}/Onboarding/sme/continue-sign-up`, 
                                            const response = await axios.post(`${apiUrl}/Orders/sme/place-an-order/fill-order-form`, 
                                            
                                                {
                                                    headers: headers,
                                                    // filter out empty entries before sending the put request
                                                    ...Object.fromEntries(
                                                    Object.entries({
                    
                                                        'companyName': state.companyName,
                                                        'contactPersonFirstName': state.firstName,
                                                        'contactPersonLastName': state.lastName,
                                                        'contactPersonPhoneNumber': state.mobileNumber,
                                                        'contactPersonAlternativePhoneNumber': state.otherNumber,
                                                        'contactPersonEmail': state.email,
                                                        'typeOfBusiness': state.typeOfBusiness,
                                                        'companyStreetName': state.streetAddress,
                                                        'city': state.city,
                                                        'state': state.stateName,
                                                        'typeOfBuilding': state.typeOfBuilding,
                                                        "planTypeId": route.query.selectedPlanTypeId,
                                                        "networkCoverageAddress": locationData,
                                                        'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                        'smeBillingDetails': {
                                                            'contactPersonFirstName': state.firstNameBilling,
                                                            'contactPersonLastName': state.lastNameBilling,
                                                            'contactPersonEmail': state.emailBilling,
                                                            'contactPersonPhoneNumber': state.phoneNumberBilling,
                                                            'companyStreetName': state.streetNameBilling,
                                                            'city': state.cityBilling,
                                                            'state': state.stateNameBilling,
                                                        }
                                                        }).filter(([key, value]) => value !== '')
                                                    )
                                                
                                                })
                                                    
                                                setTimeout( () => emit('step4-complete', {
                                                    'orderId': response.data.message,
                                                    companyName: state.companyName,
                                                    typeOfBusiness: state.typeOfBusiness,
                                                    streetAddress: state.streetAddress,
                                                    city: state.city,
                                                    stateName: state.stateName,
                                                    typeOfBuilding: state.typeOfBuilding,
                    
                                                    firstName: state.firstName,
                                                    lastName: state.lastName,
                                                    email: state.email,
                                                    mobileNumber: state.mobileNumber,
                                                    otherNumber: state.otherNumber,
                                                    //  billingAddress: state.billingAddress,
                                                    firstNameBilling: state.firstNameBilling,
                                                    lastNameBilling: state.lastNameBilling,
                                                    emailBilling: state.emailBilling,
                                                    phoneNumberBilling: state.phoneNumberBilling,
                                                    streetNameBilling: state.streetNameBilling,
                                                    cityBilling: state.cityBilling,
                                                    stateNameBilling: state.stateNameBilling,
                                                    isBillingAddressSameAsResidentialAddress: state.isBillingAddressSameAsResidentialAddress,
                    
                    
                                                }), 1000);
                    
                                                window.scrollTo(0, top);
                                                if(apiWarning.value = true){
                                                    apiWarning.value = false
                                                }
                                                state.visible = true;
                                        }
                                    }

                                } catch (error) {
                                    console.log(error);
                                    if (state.warning === true) {
                                        state.warning = false
                                    }
                                    apiWarning.value = true
                                    errorMessage.value = error.response.data.message
                                    
                                }finally {
                                    setTimeout(() => {
                                        isLoading.value = false
                                    }, 1000);
                                }

                            }

                    }catch(error){ //check location error
                        console.log(error)
                    }finally {
                        setTimeout(() => {
                            isLoading.value = false
                        }, 1000);
                    }


                }else {
                    state.warning = true;
                    
                    window.scrollTo(0, top);
                        
                    
                }
            }


            //hide and show biling information
            const hideContent = () => {
                // state.isBillingAddressSameAsResidentialAddress = !state.isBillingAddressSameAsResidentialAddress;
                
                if (state.isBillingAddressSameAsResidentialAddress) {
                    state.isBillingAddressSameAsResidentialAddress = true
                }else{
                    state.isBillingAddressSameAsResidentialAddress = false
                }
            }

            // generate random token
            const generateRandomToken = () => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let token = '';
                for (let i = 0; i < 10; i++) {
                    token += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                return token;
            };

            const generateToken = () => {
                const randomToken = generateRandomToken(10);
                const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
                // state.token = randomToken;
                const tokenObject = {
                    token: randomToken,
                    expiresAt: expirationTime
                };

                localStorage.setItem("tokenObject", JSON.stringify(tokenObject));
                isModalVisible.value = false

            };

            const getToken = () => {
            // This allows you to know if the token is expired or available
                const tokenObjectString = localStorage.getItem("tokenObject");
                if (!tokenObjectString) {
                    return null;
                }

                // This helps you remove the token if expired
                const tokenObject = JSON.parse(tokenObjectString);
                if (new Date().getTime() > tokenObject.expiresAt) {
                    localStorage.removeItem("tokenObject");
                    return null;
                }
                return tokenObject.token;
            };

            return { state, v$, nextStep, hideContent, generateToken, getToken, isLoading, StateOptions, apiWarning, errorMessage, isModalVisible,
                get_city, CityOptions, StreetOptions, get_city_billing, get_street, get_street_billing, StreetOptionsBilling, CityOptionsBilling,
                optionLoading
             }

        }
        
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

  .main-container {
        background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
        /* overflow-x: hidden; */
        font-family: 'IBM Plex Sans', sans-serif;
    }
    .form {
      /* margin: auto 200px; */
      /* text-align: center; */
        margin: 20px auto 50px;
        width: 50vw;
    }
    /* .form:not(.form-label) {
        text-align: center;
        margin: auto;
    } */

    /* .greeting, .sub-heading {
        font-family: 'IBM Plex Sans', sans-serif;
    } */
    .heading {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
    }
    .greeting {
        font-size: 30px;
        font-weight: 700;
    }
    .sub-heading {
        font-size: 16px;
        font-weight: 500;
        color: #949DAB;
    }
    .greeting, .sub-heading {
        text-align: left;
    }
    .checkbox {
        margin: auto 120px;
        display: inline;
    }
    .form-check-inline {
        margin-right: 30px;
    }
    .form-label, .form-check-label {
        font-size: 14px;
        font-weight: 500;
    }
    .next-btn .btn, .modal-btn .btn, .btn-link, .btn-link:focus {
        color: #ffffff;
    }
    .btn-link {
        text-decoration: none;

        /* background-color: #DA1919; */
        width: 150px;
        text-align: center;
        float: right;
        margin-left: auto;
        border-radius: 30px;
        padding: 5px 17px;
    }
    .btn-link, .btn-link:focus{
        background-color: #DA1919;
    }
    /* .next-btn {
        background-color: #DA1919;
        width: 150px;
        text-align: center;
        float: right;
        margin-left: auto;
        border-radius: 30px;
        padding: 5px 17px;
    } */
        /* modal style */
    .custom-modal {
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        max-width: 500px;
        text-align: justify;
        font-family: 'IBM Sans Plex', sans-serif;
        border-radius: 28px;
        padding: 50px 30px 25px;
    }
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(2px);
    }
    .modal-btn {
        background-color: #DA1919;
        /* width: 150px; */
        text-align: center;
        /* float: right; */
        /* margin-left: auto; */
        border-radius: 30px;
        padding: 5px 17px;
        cursor: pointer;
    }
    .modal-btn .btn:active, .next-btn .btn:active {
        border: transparent;
    }
    .modal-header {
        border-bottom: none !important;
    }
    .modal-content {
        padding: 32px;
        text-align: justify;
        font-family: 'IBM Sans Plex', sans-serif;
        border-radius: 28px;
    }
    .modal-header button.btn-close {
        color: #000000 !important;
        --bs-btn-close-disabled-opacity: 1;
    }
    .modal-body {
        padding: 20px auto;
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
  
    .form-control:focus, .form-check-input:focus, .form-select:focus {
        box-shadow: none;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:focus{
        transition: background-color 0s 600000s, color 0s 600000s !important;
    }
    .form-control {
        font-size: 14px;
        font-weight: 400;
        color: #424242;
    }
    input[type=text]::placeholder {
        color: #949DAB;
        font-weight: 300;
    }
    .error-msg {
        color: #ff0000;
    }
    .billing-information {
        margin-top: 30px
    }
    .billing-information .row div{
        margin-bottom: 10px;
    }
    .billing-body-heading {
        margin-top: 30px;
        font-size: 16px;
    }
    .billing-body-heading, .billing-body-sub-heading {
        font-weight: 500;
    }
    .billing-body-sub-heading {
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    input[type=checkbox], input[type=radio]{
        border-color: #757575;
    }

    input[type=checkbox]:checked, input[type=radio]:checked{
        background-color:#DA1919;
    }
    #asterisk {
        color: #DA1919;
        margin-left: 8px;
    }

    @media (min-width: 768px) and (max-width: 992px) {
        .form {
            width: 75vw;
        }
        .heading, .greeting {
            font-size: 20px;
        }
    }
    @media (min-width: 481px) and (max-width: 767px) {
        .checkbox {
            margin: auto 20px;
            display: inline;
        }
        .form {
            width: 75vw;
        }
        .heading, .greeting {
            font-size: 18px;
        }
        .sub-heading {
            font-size: 12px;
        }
        
    }

    @media (max-width: 480px) {
        .form {
            width: 75vw;
        }
        .checkbox {
            margin: auto 20px;
            display: inline;
        }
        .heading, .greeting {
            font-size: 18px;
        }
        .sub-heading {
            font-size: 12px;
        }
      
    }

</style>