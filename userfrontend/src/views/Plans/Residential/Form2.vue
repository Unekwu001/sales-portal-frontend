<template>

    <div class="container-fluid main-container">
        <MainNavbar/>

        <!-- loading spinner -->
        <Spinner :loading="isLoading" />

        <div class="form">
            <p class="heading">Personal Information</p>
            <p class="greeting">Hello,</p>
            <p class="sub-heading">Please provide your personal details, your information is safe with us!</p>

            <!-- Modal -->
            <div class="modal-backdrop" v-show="isModalVisible">
            
            <div class="custom-modal">
                <!-- <div class="modal-header" style="float: right">
                    <button type="button" class="btn-close modal-close-btn" disabled></button>
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
                    <button type="submit" class="btn" aria-label="Close">
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

                <div class="col-lg-12">
                    <label for="firstName" class="form-label">First Name</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" Placeholder="Enter First Name" v-model="state.firstName">
                   <span class="error-msg" v-if="v$.firstName.$error"> {{ v$.firstName.$errors[0].$message }} </span>
                </div>
                <div class="col-md-12 col-sm-12">
                    <label for="lastName" class="form-label">Last Name</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Last Name" v-model="state.lastName">
                   <span class="error-msg" v-if="v$.lastName.$error"> {{ v$.lastName.$errors[0].$message }} </span>
                </div>
                
                <div class="col-md-6 col-sm-12">
                    <label for="phone" class="form-label">Phone No.</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter phone number" v-model="state.phoneNumber" maxlength="11">
                   <!-- <span class="error-msg" v-if="v$.phoneNumber.$error"> {{ v$.phoneNumber.$errors[0].$message }} </span> -->
                   <span class="error-msg" v-if="v$.phoneNumber.$error && !v$.phoneNumber.helpers"> Invalid phone number format </span>
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="alternatePhone" class="form-label">Alternate phone No.</label>
                    <input type="text" class="form-control" placeholder="Enter alternate phone number" v-model="state.altPhoneNumber" maxlength="11">
                   <span class="error-msg" v-if="v$.altPhoneNumber.$error && !v$.altPhoneNumber.helpers"> Invalid phone number format </span>
                </div>

                <div class="col-md-12 col-sm-12">
                    <label for="inputEmail4" class="form-label">E-mail</label><span id="asterisk">&#42;</span>
                    <input type="email" class="form-control" id="inputEmail4" placeholder="Enter Email" v-model="state.email">
                   <span class="error-msg" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </span>
                </div>

                <div class="col-md-12 col-sm-12">
                    <label for="occupation" class="form-label">Ocupation</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Occupation" v-model="state.occupation">
                    <span class="error-msg" v-if="v$.occupation.$error"> {{ v$.occupation.$errors[0].$message }} </span>
                </div>

                <div class="col-md-12 col-sm-12">
                    <label class="form-label" for="gender">Gender</label><span id="asterisk">&#42;</span>
                    <div class="checkbox">
                       
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="Male" v-model="state.gender">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Male
                            </label>
                        </div>
                        <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" value="Female" v-model="state.gender">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Female
                            </label>
                        </div>
                    </div><br>

                    <span class="error-msg" v-if="v$.gender.$error"> {{ v$.gender.$errors[0].$message }} </span>

                    <!-- <div class="checkbox">
                        <div class="form-check form-check-inline">
                            <label class="form-check-label" for="inlineCheckbox1">Male</label>
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                        </div>
                        <div class="form-check form-check-inline">
                            <label class="form-check-label" for="inlineCheckbox2">Female</label>
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                        </div>
                    </div> -->
                </div>

                <div class="col-md-6 col-sm-12">
                    <label for="nationality" class="form-label">Nationality</label><span id="asterisk">&#42;</span>
                    <!-- <input type="text" class="form-control" placeholder="Enter Nationality" v-model="state.nationality"> -->
                    
                    <select id="country" class="form-select" v-model="state.nationality">
                        <option value="" v-if="!state.nationality" disabled selected>Choose your nationality</option>
                        <option :value="state.nationality" v-else disabled selected>{{ state.nationality }}</option>
                        <option v-for="country in countries" :key="country.code" :value="country.name">
                            {{ country.name }}
                        </option>
                    </select>
                    <span class="error-msg" v-if="v$.nationality.$error"> {{ v$.nationality.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12">
                    <!-- <input type="date" id="datemin" name="datemin" min="2000-01-02"> -->
                    <label for="date-of-birth" class="form-label">Date of birth</label><span id="asterisk">&#42;</span>
                    <input type="date" class="form-control" :min="minDate" :max="maxDate" id="datemin" min="2000-01-02" placeholder="15/10/1998" v-model="state.dateOfBirth">
                    <span class="error-msg" v-if="v$.dateOfBirth.$error"> {{ v$.dateOfBirth.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12">
                    <label for="type-of-building" class="form-label">Type of building:</label><span id="asterisk">&#42;</span>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="Bungalow" v-model="state.typeOfBuilding">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Bungalow
                        </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" value="Duplex" v-model="state.typeOfBuilding">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Duplex
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="Terrace" v-model="state.typeOfBuilding">
                        <label class="form-check-label" for="flexRadioDefault3">
                            Terrace
                        </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" value="MultiTenantUnit5AndBelow" v-model="state.typeOfBuilding">
                        <label class="form-check-label" for="flexRadioDefault4">
                            Multi Tenant Unit (5 Flats and Below)
                        </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" value="MultiTenantUnit6AndAbove" v-model="state.typeOfBuilding">
                        <label class="form-check-label" for="flexRadioDefault5">
                            Multi Tenant Unit (6 Flats and Above)
                        </label>
                    </div>
                    <span class="error-msg" v-if="v$.typeOfBuilding.$error"> {{ v$.typeOfBuilding.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12">
                    <label for="state" class="form-label">State</label><span id="asterisk">&#42;</span>
                    <!-- <input type="text" class="form-control" placeholder="TPDC" v-model="state.stateName"> -->
                    
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
                    <!-- <input type="text" class="form-control" placeholder="Enter City" v-model="state.city"> -->
                    <select class="form-select" v-model="state.city">
                        <option value="" v-if="!state.city" disabled selected>Choose a City/Town</option>
                        <option :value="state.city" v-else disabled selected>{{ state.city }}</option>
                        <option v-if="optionLoading">Loading ...</option>
                        <option v-else
                        v-for="city in CityOptions"
                            :key="city.id"
                            :label="city"
                            :value="city"
                        >{{ city }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.city.$error"> {{ v$.city.$errors[0].$message }} </span>
                </div>

                <!-- <div class="col-md-6 col-sm-12" v-if="state.stateName === 'Abuja'" @click="isUnique_abuja">
                    <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.city">
                        <option value="" disabled selected>Choose a City/Town</option>
                        <option 
                        v-for="item in uniqueLGAs"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.city.$error"> {{ v$.city.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12" v-if="state.stateName === 'Rivers'" @click="isUnique_rivers">
                    <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.city">
                        <option value="" disabled selected>Choose a City/Town</option>
                        <option 
                        v-for="item in uniqueLGAs"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.city.$error"> {{ v$.city.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12" v-if="state.stateName === 'Oyo'" @click="isUnique_oyo">
                    <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.city">
                        <option value="" disabled selected>Choose a City/Town</option>
                        <option 
                        v-for="item in uniqueLGAs"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.city.$error"> {{ v$.city.$errors[0].$message }} </span>
                </div> -->

                <div class="col-md-6 col-sm-12" v-if="state.city">
                    <label for="flat-number" class="form-label">Flat Number</label>
                    <input type="text" class="form-control" placeholder="Enter Flat Number" v-model="state.flatNumber">
                   <!-- <span class="error-msg" v-if="v$.flatNumber.$error"> {{ v$.flatNumber.$errors[0].$message }} </span> -->
                </div>

                <div class="col-md-6 col-sm-12" v-if="state.city">
                    <label for="house-number" class="form-label">House Number</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter House Number" v-model="state.houseNumber">
                    <span class="error-msg" v-if="v$.houseNumber.$error"> {{ v$.houseNumber.$errors[0].$message }} </span>
                </div>
               
                <!-- <div class="col-md-6 col-sm-12" v-if="state.city !== undefined">
                    <label for="street-name" class="form-label">Street Name</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Street Name" v-model="state.streetName">
                    <span class="error-msg" v-if="v$.streetName.$error"> {{ v$.streetName.$errors[0].$message }} </span>
                </div> -->

                <div class="col-md-6 col-sm-12" v-if="state.city" @click="get_street">
                    <label for="street-name" class="form-label">Street Name</label><span id="asterisk">&#42;</span>
                    <select class="form-select" v-model="state.streetName">
                        <option value="" v-if="!state.streetName" disabled selected>Choose a Street</option>
                        <option :value="state.streetName" v-else disabled selected>{{ state.streetName }}</option>
                        <option v-if="optionLoading">Loading ...</option>
                        <option v-else 
                        v-for="item in StreetOptions"
                            :key="item.id"
                            :label="item"
                            :value="item"
                        >{{ item }}</option>
                    </select>
                   <span class="error-msg" v-if="v$.streetName.$error"> {{ v$.streetName.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12" v-if="state.city">
                    <label for="estate-name" class="form-label">Estate Name</label>
                    <input type="text" class="form-control" placeholder="Enter Estate Name" v-model="state.estateName">
                   <!-- <span class="error-msg" v-if="v$.estateName.$error"> {{ v$.estateName.$errors[0].$message }} </span> -->
                </div>
              
                
                <div class="col-md-12 col-sm-12">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="state.isBillingAddressSameAsResidentialAddress" @change="hideContent">
                    <label class="form-check-label" for="gridCheck">
                        Check this box if the billing address is the same as above
                    </label><span id="asterisk">&#42;</span>
                    </div>
                </div>

                <!-- billing information -->
                <div class="billing-information col-md-12" v-if="!state.isBillingAddressSameAsResidentialAddress">
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
<!-- 
                        <div class="col-md-6 col-sm-12" v-if="state.stateNameBilling === 'Abuja'" @click="isUnique_abuja">
                            <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                            <select class="form-select" v-model="state.cityBilling">
                                <option value="" disabled selected>Choose a City/Town</option>
                                <option 
                                v-for="item in uniqueLGAs"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                >{{ item }}</option>
                            </select>
                        <span class="error-msg" v-if="v$.cityBilling.$error"> {{ v$.cityBilling.$errors[0].$message }} </span>
                        </div>

                        <div class="col-md-6 col-sm-12" v-if="state.stateNameBilling === 'Rivers'" @click="isUnique_rivers">
                            <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                            <select class="form-select" v-model="state.cityBilling">
                                <option value="" disabled selected>Choose a City/Town</option>
                                <option 
                                v-for="item in uniqueLGAs"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                >{{ item }}</option>
                            </select>
                        <span class="error-msg" v-if="v$.cityBilling.$error"> {{ v$.cityBilling.$errors[0].$message }} </span>
                        </div>

                        <div class="col-md-6 col-sm-12" v-if="state.stateNameBilling === 'Oyo'" @click="isUnique_oyo">
                            <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                            <select class="form-select" v-model="state.cityBilling">
                                <option value="" disabled selected>Choose a City/Town</option>
                                <option 
                                v-for="item in uniqueLGAs"
                                    :key="item.id"
                                    :label="item"
                                    :value="item"
                                >{{ item }}</option>
                            </select>
                        <span class="error-msg" v-if="v$.cityBilling.$error"> {{ v$.cityBilling.$errors[0].$message }} </span>
                        </div> -->

                        <div class="col-md-6 col-sm-12" v-if="state.cityBilling" @click="get_street_billing">
                            <label for="street-name" class="form-label">Street Name</label><span id="asterisk">&#42;</span>
                            <select class="form-select" v-model="state.streetNameBilling">
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
   import { ref, reactive, computed, onMounted, watchEffect } from 'vue'
   import { required, email, numeric, minLength, maxLength, helpers } from '@vuelidate/validators'
   import { useRouter, useRoute } from 'vue-router';
   import axios from 'axios';
   import Spinner from '@/components/Spinner.vue';
   import countriesData from '@/assets/json/countries.json';

   const apiUrl = process.env.VUE_APP_API_URL

   axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token'); 
        if (token) {
        config.headers['Authorization'] = `${token}`; 
        }
        // console.log(config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
    );

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
            const user = ref('')
            const userOrder = ref('')
            const planTypeId = ref('')
            const plans = ref(null)
            const filteredPlan = ref(null)
            // const coverageLocation = ref(null)
            let apiWarning = ref(false)
            let errorMessage = ref(null)
            const route = useRoute()
            const isModalVisible = ref(false)

            const responseMessage = ref('')

            const residentialOrderId = route.query.residentialOrderId

            const initialOrderId = ref('')

            const StateOptions = ref([])
            const CityOptions = ref([])
            const StreetOptions = ref([])
            const StreetOptionsBilling = ref([])
            const CityOptionsBilling = ref([])
            const optionLoading = ref(false)

            
            // Define reactive variables
            // const countries = ref([]);
            const countries = ref(countriesData);
            // validation
            const state = reactive({
                visible: false,
                warning: false,
                // user: {},
                isBillingAddressSameAsResidentialAddress: props.personalData.isBillingAddressSameAsResidentialAddress,

                // firstName: props.personalData ? props.personalData.firstName : user.value.firstName,
                firstName: props.personalData.firstName,
                lastName: props.personalData.lastName,
                phoneNumber: props.personalData.phoneNumber,
                altPhoneNumber: props.personalData.altPhoneNumber,
                email: props.personalData.email,
               
                occupation: props.personalData.occupation,
                gender: props.personalData.gender,
                nationality: '',
                dateOfBirth: props.personalData.dateOfBirth, 
                flatNumber: props.personalData.flatNumber,
                houseNumber: props.personalData.houseNumber,
                streetName: '',
                estateName: props.personalData.estateName,
                city: '',
                stateName: '',
                typeOfBuilding: props.personalData.typeOfBuilding, 
                // billingAddress: props.personalData.billingAddress,
                firstNameBilling: props.personalData.firstNameBilling,
                lastNameBilling: props.personalData.lastNameBilling,
                emailBilling: props.personalData.emailBilling,
                phoneNumberBilling: props.personalData.phoneNumberBilling,
                streetNameBilling: '',
                cityBilling: '',
                stateNameBilling: '',
            })

            const rules = computed(() => {

                let dynamicRules = {
                    firstName: { required, minLength: minLength(2) },
                    lastName: { required, minLength: minLength(2) },
                    phoneNumber: { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/) },
                    altPhoneNumber: { regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/) },
                    email: { required, email },
                    occupation: { required },
                    gender: { required },
                    nationality: { required },
                    dateOfBirth: { required },
                    // flatNumber: { required },
                    houseNumber: { required },
                    streetName: { required },
                    // estateName: { required },
                    city: { required },
                    stateName: { required },
                    typeOfBuilding: { required },
                };

                if (!state.isBillingAddressSameAsResidentialAddress) {
                    dynamicRules.firstNameBilling = { required, minLength: minLength(2) };
                    dynamicRules.lastNameBilling = { required, minLength: minLength(2) };
                    dynamicRules.phoneNumberBilling = { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/) },
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
                    if (window.location.href.includes('residentialOrderId')) {
                        try {
                            const response = await axios.get(`${apiUrl}/Orders/view-my-order/${residentialOrderId}`, {headers: headers})

                            userOrder.value = response.data

                            const getUserResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                            user.value = getUserResponse.data

                                state.gender = userOrder.value.gender
                                state.dateOfBirth = userOrder.value.dateOfBirth
                                state.occupation = userOrder.value.occupation
                                state.altPhoneNumber = userOrder.value.alternativePhoneNumber
                                state.typeOfBuilding = userOrder.value.typeOfBuilding
                                state.flatNumber = userOrder.value.flatNumber
                                state.nationality = userOrder.value.nationality
                                state.houseNumber = userOrder.value.houseNumber
                                state.estateName = userOrder.value.estateName
                                state.streetName = userOrder.value.streetName
                                state.city = userOrder.value.city
                                state.stateName = userOrder.value.state
                                state.isBillingAddressSameAsResidentialAddress =userOrder.value.isBillingAddressSameAsResidentialAddress
                                
                                state.firstNameBilling = userOrder.value.residentialBillingDetails.firstName
                                state.lastNameBilling = userOrder.value.residentialBillingDetails.lastName
                                state.emailBilling = userOrder.value.residentialBillingDetails.email
                                state.phoneNumberBilling = userOrder.value.residentialBillingDetails.phoneNumber
                                state.streetNameBilling = userOrder.value.residentialBillingDetails.streetName
                                state.cityBilling = userOrder.value.residentialBillingDetails.city
                                state.stateNameBilling = userOrder.value.residentialBillingDetails.state
                                
                                // }
                                
                            if (userOrder.value.phoneNumber !== null) {
                                state.phoneNumber = userOrder.value.phoneNumber  
                            }else if(user.value.phoneNumber !== null){
                                state.phoneNumber = user.value.phoneNumber
                            }

                            // fetch user data
                            state.firstName = userOrder.value.firstName
                            state.lastName = userOrder.value.lastName
                            state.email = userOrder.value.email

                            // return user.value
                        } catch (error) {
                            console.log(error);
                        
                        }
                    }else if(initialOrderId.value){
                        
                        try {
                            const response = await axios.get(`${apiUrl}/Orders/view-my-order/${initialOrderId.value}`, {headers: headers})

                            userOrder.value = response.data

                            const getUserResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                            user.value = getUserResponse.data

                                state.gender = userOrder.value.gender
                                state.dateOfBirth = userOrder.value.dateOfBirth
                                state.occupation = userOrder.value.occupation
                                state.altPhoneNumber = userOrder.value.alternativePhoneNumber
                                state.typeOfBuilding = userOrder.value.typeOfBuilding
                                state.flatNumber = userOrder.value.flatNumber
                                state.nationality = userOrder.value.nationality
                                state.houseNumber = userOrder.value.houseNumber
                                state.estateName = userOrder.value.estateName
                                state.streetName = userOrder.value.streetName
                                state.city = userOrder.value.city
                                state.stateName = userOrder.value.state
                                state.isBillingAddressSameAsResidentialAddress =userOrder.value.isBillingAddressSameAsResidentialAddress
                                
                                state.firstNameBilling = userOrder.value.residentialBillingDetails.firstName
                                state.lastNameBilling = userOrder.value.residentialBillingDetails.lastName
                                state.emailBilling = userOrder.value.residentialBillingDetails.email
                                state.phoneNumberBilling = userOrder.value.residentialBillingDetails.phoneNumber
                                state.streetNameBilling = userOrder.value.residentialBillingDetails.streetName
                                state.cityBilling = userOrder.value.residentialBillingDetails.city
                                state.stateNameBilling = userOrder.value.residentialBillingDetails.state
                                
                                // }
                                
                            if (userOrder.value.phoneNumber !== null) {
                                state.phoneNumber = userOrder.value.phoneNumber  
                            }else if(user.value.phoneNumber !== null){
                                state.phoneNumber = user.value.phoneNumber
                            }

                            // fetch user data
                            state.firstName = userOrder.value.firstName
                            state.lastName = userOrder.value.lastName
                            state.email = userOrder.value.email

                            // return user.value
                        } catch (error) {
                            console.log(error);
                        
                        }

                    }
                    else{
                        try {
                            const getUserResponse = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                            user.value = getUserResponse.data
                              // fetch user data
                            state.firstName = user.value.firstName
                            state.lastName = user.value.lastName
                            state.email = user.value.email
                            if (user.value.phoneNumber !== null) {
                                state.phoneNumber = user.value.phoneNumber
                            }

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }


                // get the states from DB
                try {
                    // optionLoading.value = true
                    const response = await axios.get(`${apiUrl}/NetworkCoverage/all-coverage-states`)
                    StateOptions.value = response.data
                    
                } catch (error) {
                    console.log(error);
                }
             
                // // Fetch country data from JSON file on component mount

                // try {
                //     const response = await fetch('/json/countries.json');
                //     const data = await response.json();
                //     countries.value = data;
                //     console.log(countries.value);
                    
                // } catch (error) {
                //     console.error('Failed to load country data:', error);
                // }


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
                    // const locationData = `${state.houseNumber} ${state.streetName} ${state.city}, ${state.stateName}`    
                    const locationData = `${state.streetName} ${state.city}, ${state.stateName}`    
                    // console.log(locationData);
                    try {
                        isLoading.value = true
                        const checkLocationResponse = await axios.get(`${apiUrl}/NetworkCoverage/check-network-coverage-availability?Location=${locationData}`)
                            // console.log(checkLocationResponse.data);

                            // if (checkLocationResponse.data.message == 'your location seems to be outside ipNX Network Coverage Area. Type in a more descriptive address.') {
                            if (checkLocationResponse.data.isWithinRange === false) {
                                apiWarning.value = true
                                errorMessage.value = checkLocationResponse.data.message
                            } else {
                                
                                try {
                                    isLoading.value = true
                                
                                    // const dateOfBirth = new Date(state.dateOfBirth).toISOString();

                                    if (window.location.href.includes('residentialOrderId')) {
                                          // check if plantypeId matches
                                          if (route.query.selectedPlanTypeId) {
                                                planTypeId.value = route.query.selectedPlanTypeId
                                            }else{
                                                planTypeId.value = userOrder.value.planTypeId
                                            }
                                            
                                        // update
                                        if (state.isBillingAddressSameAsResidentialAddress) {
                                            const response = await axios.put(`${apiUrl}/Orders/residential/place-an-order/fill-order-form/${residentialOrderId}`, 
                                        
                                            {
                                                headers: headers,
                                                // filter out empty entries before sending the put request
                                                ...Object.fromEntries(
                                                Object.entries({
                                                    'firstName': state.firstName,
                                                    'lastName': state.lastName,
                                                    'phoneNumber': state.phoneNumber,
                                                    'alternativePhoneNumber': state.altPhoneNumber,
                                                    'email': state.email,
                                                    'occupation': state.occupation,
                                                    'gender': state.gender,
                                                    'nationality': state.nationality,
                                                    'dateOfBirth': state.dateOfBirth,
                                                    // 'dateOfBirth': dateOfBirth,
                                                    'flatNumber': state.flatNumber,
                                                    'houseNumber': state.houseNumber,
                                                    'streetName': state.streetName,
                                                    'estateName': state.estateName,
                                                    'city': state.city,
                                                    'state': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    // "planTypeId": userOrder.value.planTypeId,
                                                    "planTypeId": planTypeId.value,
                                                    // "planTypeId": 'b6a7f7cd-a96d-440a-aba0-392223c1a22d',
                                                    // "networkCoverageAddress": coverageLocation.value,
                                                    "networkCoverageAddress": locationData,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress
                                                    
                                                    }).filter(([key, value]) => value !== '')
                                                )
                                                
                                            
                                            })
                
                                                setTimeout( () => emit('step4-complete', {
                                                    'orderId': userOrder.value.id,
                                                    'firstName': state.firstName,
                                                    'lastName': state.lastName,
                                                    'phoneNumber': state.phoneNumber,
                                                    'altPhoneNumber': state.altPhoneNumber,
                                                    'email': state.email,
                                                    'occupation': state.occupation,
                                                    'gender': state.gender,
                                                    'nationality': state.nationality,
                                                    'dateOfBirth': state.dateOfBirth,
                                                    'flatNumber': state.flatNumber,
                                                    'houseNumber': state.houseNumber,
                                                    'streetName': state.streetName,
                                                    'estateName': state.estateName,
                                                    'city': state.city,
                                                    'stateName': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                        //billingAddress: state.billingAddress,
                                                    'firstNameBilling': state.firstNameBilling,
                                                    'lastNameBilling': state.lastNameBilling,
                                                    'emailBilling': state.emailBilling,
                                                    'phoneNumberBilling': state.phoneNumberBilling,
                                                    'streetNameBilling': state.streetNameBilling,
                                                    'cityBilling': state.cityBilling,
                                                    'stateNameBilling': state.stateNameBilling,
                                                }), 1000);
                
                                                window.scrollTo(0, top);
                                                if(apiWarning.value = true){
                                                    apiWarning.value = false
                                                }
                                                state.visible = true;
                                        }else{
                                            const response = await axios.put(`${apiUrl}/Orders/residential/place-an-order/fill-order-form/${residentialOrderId}`, 
                                            
                                                {
                                                    headers: headers,
                                                    // filter out empty entries before sending the put request
                                                    ...Object.fromEntries(
                                                    Object.entries({
                                                        'firstName': state.firstName,
                                                        'lastName': state.lastName,
                                                        'phoneNumber': state.phoneNumber,
                                                        'alternativePhoneNumber': state.altPhoneNumber,
                                                        'email': state.email,
                                                        'occupation': state.occupation,
                                                        'gender': state.gender,
                                                        'nationality': state.nationality,
                                                        'dateOfBirth': state.dateOfBirth,
                                                        'flatNumber': state.flatNumber,
                                                        'houseNumber': state.houseNumber,
                                                        'streetName': state.streetName,
                                                        'estateName': state.estateName,
                                                        'city': state.city,
                                                        'state': state.stateName,
                                                        'typeOfBuilding': state.typeOfBuilding,
                                                        "planTypeId": planTypeId.value,
                                                        "networkCoverageAddress": locationData,
                                                        'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                        "residentialBillingDetails": {
                                                            "firstName":  state.firstNameBilling,
                                                            "lastName": state.lastNameBilling,
                                                            "email": state.emailBilling,
                                                            "phoneNumber": state.phoneNumberBilling,
                                                            "streetName": state.cityBilling,
                                                            "city": state.cityBilling,
                                                            "state": state.stateNameBilling
                                                        }
                                                        
                                                        }).filter(([key, value]) => value !== '')
                                                    )
                                                    
                                                
                                                })
                    
                                                    setTimeout( () => emit('step4-complete', {
                                                        'orderId': userOrder.value.id,
                                                        'firstName': state.firstName,
                                                        'lastName': state.lastName,
                                                        'phoneNumber': state.phoneNumber,
                                                        'altPhoneNumber': state.altPhoneNumber,
                                                        'email': state.email,
                                                        'occupation': state.occupation,
                                                        'gender': state.gender,
                                                        'nationality': state.nationality,
                                                        'dateOfBirth': state.dateOfBirth,
                                                        'flatNumber': state.flatNumber,
                                                        'houseNumber': state.houseNumber,
                                                        'streetName': state.streetName,
                                                        'estateName': state.estateName,
                                                        'city': state.city,
                                                        'stateName': state.stateName,
                                                        'typeOfBuilding': state.typeOfBuilding,
                                                        'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                            //billingAddress: state.billingAddress,
                                                        'firstNameBilling': state.firstNameBilling,
                                                        'lastNameBilling': state.lastNameBilling,
                                                        'emailBilling': state.emailBilling,
                                                        'phoneNumberBilling': state.phoneNumberBilling,
                                                        'streetNameBilling': state.streetNameBilling,
                                                        'cityBilling': state.cityBilling,
                                                        'stateNameBilling': state.stateNameBilling,
                                                    }), 1000);
                    
                                                    window.scrollTo(0, top);
                                                    if(apiWarning.value = true){
                                                        apiWarning.value = false
                                                    }
                                                    state.visible = true;
                                        }

                                    }else if (props.filesData.initialOrderId) {

                                        if (state.isBillingAddressSameAsResidentialAddress) {
                                            const response = await axios.put(`${apiUrl}/Orders/residential/place-an-order/fill-order-form/${initialOrderId.value}`, 
                                        
                                            {
                                                headers: headers,
                                                // filter out empty entries before sending the put request
                                                ...Object.fromEntries(
                                                Object.entries({
                                                    'firstName': state.firstName,
                                                    'lastName': state.lastName,
                                                    'phoneNumber': state.phoneNumber,
                                                    'alternativePhoneNumber': state.altPhoneNumber,
                                                    'email': state.email,
                                                    'occupation': state.occupation,
                                                    'gender': state.gender,
                                                    'nationality': state.nationality,
                                                    'dateOfBirth': state.dateOfBirth,
                                                    // 'dateOfBirth': dateOfBirth,
                                                    'flatNumber': state.flatNumber,
                                                    'houseNumber': state.houseNumber,
                                                    'streetName': state.streetName,
                                                    'estateName': state.estateName,
                                                    'city': state.city,
                                                    'state': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    // "planTypeId": userOrder.value.planTypeId,
                                                    "planTypeId": route.query.selectedPlanTypeId,
                                                    // "planTypeId": 'b6a7f7cd-a96d-440a-aba0-392223c1a22d',
                                                    // "networkCoverageAddress": coverageLocation.value,
                                                    "networkCoverageAddress": locationData,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress
                                                    
                                                    }).filter(([key, value]) => value !== '')
                                                )
                                                
                                            
                                            })
                                           
                                                setTimeout( () => emit('step4-complete', {
                                                    'orderId': props.filesData.initialOrderId,
                                                    'firstName': state.firstName,
                                                    'lastName': state.lastName,
                                                    'phoneNumber': state.phoneNumber,
                                                    'altPhoneNumber': state.altPhoneNumber,
                                                    'email': state.email,
                                                    'occupation': state.occupation,
                                                    'gender': state.gender,
                                                    'nationality': state.nationality,
                                                    'dateOfBirth': state.dateOfBirth,
                                                    'flatNumber': state.flatNumber,
                                                    'houseNumber': state.houseNumber,
                                                    'streetName': state.streetName,
                                                    'estateName': state.estateName,
                                                    'city': state.city,
                                                    'stateName': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                        //billingAddress: state.billingAddress,
                                                    'firstNameBilling': state.firstNameBilling,
                                                    'lastNameBilling': state.lastNameBilling,
                                                    'emailBilling': state.emailBilling,
                                                    'phoneNumberBilling': state.phoneNumberBilling,
                                                    'streetNameBilling': state.streetNameBilling,
                                                    'cityBilling': state.cityBilling,
                                                    'stateNameBilling': state.stateNameBilling,
                                                }), 1000);
                
                                                window.scrollTo(0, top);
                                                if(apiWarning.value = true){
                                                    apiWarning.value = false
                                                }
                                                state.visible = true;
                                        }else{
                                            
                                            const response = await axios.put(`${apiUrl}/Orders/residential/place-an-order/fill-order-form/${initialOrderId.value}`, 
                                            
                                                {
                                                    headers: headers,
                                                    // filter out empty entries before sending the put request
                                                    ...Object.fromEntries(
                                                    Object.entries({
                                                        'firstName': state.firstName,
                                                        'lastName': state.lastName,
                                                        'phoneNumber': state.phoneNumber,
                                                        'alternativePhoneNumber': state.altPhoneNumber,
                                                        'email': state.email,
                                                        'occupation': state.occupation,
                                                        'gender': state.gender,
                                                        'nationality': state.nationality,
                                                        'dateOfBirth': state.dateOfBirth,
                                                        'flatNumber': state.flatNumber,
                                                        'houseNumber': state.houseNumber,
                                                        'streetName': state.streetName,
                                                        'estateName': state.estateName,
                                                        'city': state.city,
                                                        'state': state.stateName,
                                                        'typeOfBuilding': state.typeOfBuilding,
                                                        "planTypeId": route.query.selectedPlanTypeId,
                                                        "networkCoverageAddress": locationData,
                                                        'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                        "residentialBillingDetails": {
                                                            "firstName":  state.firstNameBilling,
                                                            "lastName": state.lastNameBilling,
                                                            "email": state.emailBilling,
                                                            "phoneNumber": state.phoneNumberBilling,
                                                            "streetName": state.cityBilling,
                                                            "city": state.cityBilling,
                                                            "state": state.stateNameBilling
                                                        }
                                                        
                                                        }).filter(([key, value]) => value !== '')
                                                    )
                                                    
                                                
                                                })
                                                   
                                                    setTimeout( () => emit('step4-complete', {
                                                        'orderId': props.filesData.initialOrderId,
                                                        'firstName': state.firstName,
                                                        'lastName': state.lastName,
                                                        'phoneNumber': state.phoneNumber,
                                                        'altPhoneNumber': state.altPhoneNumber,
                                                        'email': state.email,
                                                        'occupation': state.occupation,
                                                        'gender': state.gender,
                                                        'nationality': state.nationality,
                                                        'dateOfBirth': state.dateOfBirth,
                                                        'flatNumber': state.flatNumber,
                                                        'houseNumber': state.houseNumber,
                                                        'streetName': state.streetName,
                                                        'estateName': state.estateName,
                                                        'city': state.city,
                                                        'stateName': state.stateName,
                                                        'typeOfBuilding': state.typeOfBuilding,
                                                        'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                            //billingAddress: state.billingAddress,
                                                        'firstNameBilling': state.firstNameBilling,
                                                        'lastNameBilling': state.lastNameBilling,
                                                        'emailBilling': state.emailBilling,
                                                        'phoneNumberBilling': state.phoneNumberBilling,
                                                        'streetNameBilling': state.streetNameBilling,
                                                        'cityBilling': state.cityBilling,
                                                        'stateNameBilling': state.stateNameBilling,
                                                    }), 1000);
                    
                                                    window.scrollTo(0, top);
                                                    if(apiWarning.value = true){
                                                        apiWarning.value = false
                                                    }
                                                    state.visible = true;
                                        }
                                    }

                                    else{
                                        // new registration
                                        if (state.isBillingAddressSameAsResidentialAddress) {
                                        const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/fill-order-form`, 
                                    
                                        {
                                            headers: headers,
                                            // filter out empty entries before sending the put request
                                            ...Object.fromEntries(
                                            Object.entries({
                                                'firstName': state.firstName,
                                                'lastName': state.lastName,
                                                'phoneNumber': state.phoneNumber,
                                                'alternativePhoneNumber': state.altPhoneNumber,
                                                'email': state.email,
                                                'occupation': state.occupation,
                                                'gender': state.gender,
                                                'nationality': state.nationality,
                                                'dateOfBirth': state.dateOfBirth,
                                                'flatNumber': state.flatNumber,
                                                'houseNumber': state.houseNumber,
                                                'streetName': state.streetName,
                                                'estateName': state.estateName,
                                                'city': state.city,
                                                'state': state.stateName,
                                                'typeOfBuilding': state.typeOfBuilding,
                                                "planTypeId": route.query.selectedPlanTypeId,
                                                "networkCoverageAddress": locationData,
                                                'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress
                                                
                                                }).filter(([key, value]) => value !== '')
                                            )
                                            
                                        
                                        })

                                            setTimeout( () => emit('step4-complete', {
                                                'orderId': response.data.message,
                                                'firstName': state.firstName,
                                                'lastName': state.lastName,
                                                'phoneNumber': state.phoneNumber,
                                                'altPhoneNumber': state.altPhoneNumber,
                                                'email': state.email,
                                                'occupation': state.occupation,
                                                'gender': state.gender,
                                                'nationality': state.nationality,
                                                'dateOfBirth': state.dateOfBirth,
                                                'flatNumber': state.flatNumber,
                                                'houseNumber': state.houseNumber,
                                                'streetName': state.streetName,
                                                'estateName': state.estateName,
                                                'city': state.city,
                                                'stateName': state.stateName,
                                                'typeOfBuilding': state.typeOfBuilding,
                                                'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                    //billingAddress: state.billingAddress,
                                                'firstNameBilling': state.firstNameBilling,
                                                'lastNameBilling': state.lastNameBilling,
                                                'emailBilling': state.emailBilling,
                                                'phoneNumberBilling': state.phoneNumberBilling,
                                                'streetNameBilling': state.streetNameBilling,
                                                'cityBilling': state.cityBilling,
                                                'stateNameBilling': state.stateNameBilling,
                                            }), 1000);

                                            window.scrollTo(0, top);
                                            if(apiWarning.value = true){
                                                apiWarning.value = false
                                            }
                                            state.visible = true;
                                    }else{
                                        
                                        const response = await axios.post(`${apiUrl}/Orders/residential/place-an-order/fill-order-form`, 
                                        
                                            {
                                                headers: headers,
                                                // filter out empty entries before sending the put request
                                                ...Object.fromEntries(
                                                Object.entries({
                                                    'firstName': state.firstName,
                                                    'lastName': state.lastName,
                                                    'phoneNumber': state.phoneNumber,
                                                    'alternativePhoneNumber': state.altPhoneNumber,
                                                    'email': state.email,
                                                    'occupation': state.occupation,
                                                    'gender': state.gender,
                                                    'nationality': state.nationality,
                                                    'dateOfBirth': state.dateOfBirth,
                                                    'flatNumber': state.flatNumber,
                                                    'houseNumber': state.houseNumber,
                                                    'streetName': state.streetName,
                                                    'estateName': state.estateName,
                                                    'city': state.city,
                                                    'state': state.stateName,
                                                    'typeOfBuilding': state.typeOfBuilding,
                                                    "planTypeId": route.query.selectedPlanTypeId,
                                                    "networkCoverageAddress": locationData,
                                                    'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                    "residentialBillingDetails": {
                                                        "firstName":  state.firstNameBilling,
                                                        "lastName": state.lastNameBilling,
                                                        "email": state.emailBilling,
                                                        "phoneNumber": state.phoneNumberBilling,
                                                        "streetName": state.cityBilling,
                                                        "city": state.cityBilling,
                                                        "state": state.stateNameBilling
                                                    }
                                                    }).filter(([key, value]) => value !== '')
                                                )
                                            
                                            })
                                                responseMessage.value = response.data.message
                
                                            // emit to next page
                                            
                                            setTimeout( () => emit('step4-complete', {
                                                            'orderId': response.data.message,
                                                            'firstName': state.firstName,
                                                            'lastName': state.lastName,
                                                            'phoneNumber': state.phoneNumber,
                                                            'altPhoneNumber': state.altPhoneNumber,
                                                            'email': state.email,
                                                            'occupation': state.occupation,
                                                            'gender': state.gender,
                                                            'nationality': state.nationality,
                                                            'dateOfBirth': state.dateOfBirth,
                                                            'flatNumber': state.flatNumber,
                                                            'houseNumber': state.houseNumber,
                                                            'streetName': state.streetName,
                                                            'estateName': state.estateName,
                                                            'city': state.city,
                                                            'stateName': state.stateName,
                                                            'typeOfBuilding': state.typeOfBuilding,
                                                            'isBillingAddressSameAsResidentialAddress': state.isBillingAddressSameAsResidentialAddress,
                                                                //billingAddress: state.billingAddress,
                                                            'firstNameBilling': state.firstNameBilling,
                                                            'lastNameBilling': state.lastNameBilling,
                                                            'emailBilling': state.emailBilling,
                                                            'phoneNumberBilling': state.phoneNumberBilling,
                                                            'streetNameBilling': state.streetNameBilling,
                                                            'cityBilling': state.cityBilling,
                                                            'stateNameBilling': state.stateNameBilling,
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
                                    // console.log(error.responseMessage);
                                    if (error.response) {
                                        
                                        errorMessage.value = error.response.data.message
                                    }
                                    // errorMessage.value = error.responseMessage
                                    
                                }finally {
                                    setTimeout(() => {
                                        isLoading.value = false
                                    }, 1000);
                                }

                            }
                    } catch (error) { //error log for location check
                        console.log(error);
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

            // calender
            const currentDate = new Date()
            
            const currentYear = currentDate.getFullYear()
            const minYear = currentYear - 100
            const maxYear = currentYear - 18
            const minDate = ref(`${minYear}-01-01`)
            const maxDate = ref(`${maxYear}-12-31`)

            return { state, v$, nextStep, hideContent, generateToken, getToken, StateOptions, isLoading, user, errorMessage, apiWarning, 
                isModalVisible, minDate, maxDate, get_city, CityOptions, StreetOptions, get_city_billing, get_street, get_street_billing,
                StreetOptionsBilling, CityOptionsBilling, optionLoading, countries
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
    .next-btn .btn, .modal-btn .btn, .btn-link, .btn-link:focus{
        color: #ffffff;
    }
    .btn-link {
        text-decoration: none;

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
        padding: 25px;
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
    /* #myModal {
        backdrop-filter: blur(2px);
    } */
    .form-control:focus, .form-check-input:focus, .form-select:focus {
        box-shadow: none;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:focus{
        /* background-color: none !important; */
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