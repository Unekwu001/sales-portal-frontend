<template>

    <div class="container-fluid main-container">
        <MainNavbar/>
      
        <div class="form">
            <p class="heading">Company Details</p>
            <p class="greeting">Hello,</p>
            <p class="sub-heading">Please provide your company details, your information is safe with us!</p>

                <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" disabled></button>
                </div>
                <div class="modal-body">
                    <h5 class="modal-heading">TERMS AND CONDITIONS</h5>
                    <p class="modal-text">
                        Extra costs may apply based on the outcome of a site survey. Initial payments are to be made via this portal. 
                        FOS internet service is a monthly pre-paid service. Service will be delivered within 4 days from the payment date which is subject to the completion of all civil engineering work”.
                        <br><br>We guarantee that our FOS optical network terminal (ONT/Modem) which we will give to you will work to the relevant specification for the minimum warranty period of 180 days.
                    </p>
                </div>
                <div class="modal-btn">
                    <button type="submit" class="btn" data-bs-dismiss="modal" aria-label="Close" @click="generateToken">
                        Accept
                    </button>
                    
                </div>
                </div>
            </div>
            </div>

            <form class="row g-3" @submit.prevent="nextStep">
                <SuccessAlert v-if="state.visible"></SuccessAlert>
                <WarningAlert v-if="state.warning"></WarningAlert>

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

                <div class="col-md-12 col-sm-12">
                    <label for="streetAddress" class="form-label"> Street Address</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter Street Name" v-model="state.streetAddress">
                   <span class="error-msg" v-if="v$.streetAddress.$error"> {{ v$.streetAddress.$errors[0].$message }} </span>
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter City" v-model="state.city">
                   <span class="error-msg" v-if="v$.city.$error"> {{ v$.city.$errors[0].$message }} </span>
                </div>

                <div class="col-md-6 col-sm-12">
                    <label for="state" class="form-label">State</label><span id="asterisk">&#42;</span>
                    <input type="text" class="form-control" placeholder="Enter State" v-model="state.stateName">
                   <span class="error-msg" v-if="v$.stateName.$error"> {{ v$.stateName.$errors[0].$message }} </span>
                </div>
                
                <div class="col-md-6 col-sm-12">
                    <label for="type-of-building" class="form-label">Type of building:</label><span id="asterisk">&#42;</span>
                    
                </div>
                <div class="col-md-6 col-sm-12">
                    <!-- <div class="checkbox"> -->
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="single office" v-model="state.typeOfBuilding">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Single Office
                            </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" value="multiple offices" v-model="state.typeOfBuilding">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Multiple Offices
                            </label>
                        </div>
                    <!-- </div> -->
                    
                   <span class="error-msg" v-if="v$.typeOfBuilding.$error"> {{ v$.typeOfBuilding.$errors[0].$message }} </span>

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
                    <input class="form-check-input" type="checkbox" id="gridCheck" @change="hideContent" v-model="state.billingCheck">
                    <label class="form-check-label" for="gridCheck">
                        Billing address is same as the above
                    </label><span id="asterisk">&#42;</span>
                    </div>
                </div>

                <!-- billing information -->
                <div class="billing-information col-md-12 col-sm-12" v-if="!state.billingCheck">
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
                        
                        <div class="col-md-12 col-sm-12">
                            <label for="street-name" class="form-label">Street Name</label><span id="asterisk">&#42;</span>
                            <input type="text" class="form-control" placeholder="Enter Street Name" v-model="state.streetNameBilling">
                        <span class="error-msg" v-if="v$.streetNameBilling.$error"> {{ v$.streetNameBilling.$errors[0].$message }} </span>
                        </div>
                        
                        
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <label for="city" class="form-label">City/Town</label><span id="asterisk">&#42;</span>
                            <input type="text" class="form-control" placeholder="Enter City" v-model="state.cityBilling">
                        <span class="error-msg" v-if="v$.cityBilling.$error"> {{ v$.cityBilling.$errors[0].$message }} </span>
                        </div>
                        
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <label for="state" class="form-label">State</label><span id="asterisk">&#42;</span>
                            <input type="text" class="form-control" placeholder="Enter State" v-model="state.stateNameBilling">
                        <span class="error-msg" v-if="v$.stateNameBilling.$error"> {{ v$.stateNameBilling.$errors[0].$message }} </span>
                        </div>
                        
                    </div>
                </div>

                <div class="next-btn">
                    <!-- <a class="back-btn" @click="prevStep">Back</a> -->

                    <button type="submit" class="btn btn-link">
                        Next     
                    </button>
                    
                </div>
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
   import { reactive, computed } from 'vue'
   import { required, email, numeric, minLength, maxLength, helpers } from '@vuelidate/validators'
//    import { useRouter, useRoute } from 'vue-router';

    export default {
        components: {
            MainNavbar,
            SuccessAlert,
            WarningAlert
        },

        name: 'Form2',
        props: ['personalData'],

        setup(props, {emit}) {

            // validation
            const state = reactive({
                visible: false,
                warning: false,
                billingCheck: props.personalData.billingCheck,
                // token: '',

                companyName: props.personalData.LcompanyName,
                typeOfBusiness: props.personalData.LtypeOfBusiness, 
                streetAddress: props.personalData.LstreetAddress,
                city: props.personalData.Lcity,
                stateName: props.personalData.LstateName,
                typeOfBuilding: props.personalData.LtypeOfBuilding,

                firstName: props.personalData.LfirstName,
                lastName: props.personalData.LlastName,
                email: props.personalData.Lemail,
                mobileNumber: props.personalData.LmobileNumber,
                otherNumber: props.personalData.LotherNumber,

                // billingAddress: props.personalData.LbillingAddress,
                firstNameBilling: props.personalData.LfirstNameBilling,
                lastNameBilling: props.personalData.LlastNameBilling,
                emailBilling: props.personalData.LemailBilling,
                phoneNumberBilling: props.personalData.LphoneNumberBilling,
                streetNameBilling: props.personalData.LstreetNameBilling,
                cityBilling: props.personalData.LcityBilling,
                stateNameBilling: props.personalData.LstateNameBilling,
            })

            const rules = computed(() => {

                let dynamicRules = {
                   companyName: { required, minLength: minLength(3) },
                    typeOfBusiness: { required, minLength: minLength(3) },
                    streetAddress: { required },
                    city: { required },
                    stateName: { required },
                    typeOfBuilding: { required },
                    firstName: { required, minLength: minLength(3) },
                    lastName: { required, minLength: minLength(3) },
                    email: { required, email },
                    mobileNumber: { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/)  },
                    otherNumber: { regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/)  },
                };

                if (!state.billingCheck) {
                    dynamicRules.firstNameBilling = { required, minLength: minLength(3) };
                    dynamicRules.lastNameBilling = { required, minLength: minLength(3) };
                    dynamicRules.phoneNumberBilling = { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/)  },
                    dynamicRules.emailBilling = { required, email },
                    dynamicRules.streetNameBilling = {required},
                    dynamicRules.cityBilling = {required},
                    dynamicRules.stateNameBilling = {required}
                }

                return dynamicRules;

              
            })


            const v$ = useVuelidate(rules, state)


            const nextStep = () => {
                v$.value.$validate() //validate inputs

                if (!v$.value.$error) {
                    
                    if (state.warning = true) {
                        state.warning = false;
                        state.visible = true;
                    }

                    setTimeout( () => emit('step4-complete', {
                        LcompanyName: state.companyName,
                        LtypeOfBusiness: state.typeOfBusiness,
                        LstreetAddress: state.streetAddress,
                        Lcity: state.city,
                        LstateName: state.stateName,
                        LtypeOfBuilding: state.typeOfBuilding,

                        LfirstName: state.firstName,
                        LlastName: state.lastName,
                        Lemail: state.email,
                        LmobileNumber: state.mobileNumber,
                        LotherNumber: state.otherNumber,
                        // LbillingAddress: state.billingAddress,
                        LfirstNameBilling: state.firstNameBilling,
                        LlastNameBilling: state.lastNameBilling,
                        LemailBilling: state.emailBilling,
                        LphoneNumberBilling: state.phoneNumberBilling,
                        LstreetNameBilling: state.streetNameBilling,
                        LcityBilling: state.cityBilling,
                        LstateNameBilling: state.stateNameBilling,
                        billingCheck: state.billingCheck,


                    }), 1000);

                    console.log(state.firstName);
                    window.scrollTo(0, top);

                }else {
                    state.warning = true;
                    
                    window.scrollTo(0, top);
                        
                    
                }
            }


            //hide and show biling information
            const hideContent = () => {
                // state.billingCheck = !state.billingCheck;
                
                if (state.billingCheck) {
                    state.billingCheck = true
                }else{
                    state.billingCheck = false
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
                //localStorage.setItem("state.token", state.token);
                //   sessionStorage.setItem("state.token", state.token);
                console.log(tokenObject.token);

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

            return { state, v$, nextStep, hideContent, generateToken, getToken }

        },

        mounted() {
            const myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
            
            this.getToken();

            const token = localStorage.getItem('tokenObject');

            if (token === null) {    
                myModal.show();
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
    .next-btn .btn, .modal-btn .btn, .btn-link {
        color: #ffffff;
    }
    .btn-link {
        text-decoration: none;
    }
    .next-btn {
        background-color: #DA1919;
        width: 150px;
        text-align: center;
        float: right;
        margin-left: auto;
        border-radius: 30px;
        padding: 5px 17px;
    }
    .modal-btn {
        background-color: #DA1919;
        /* width: 150px; */
        text-align: center;
        /* float: right; */
        /* margin-left: auto; */
        border-radius: 30px;
        padding: 5px 17px;
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
    #myModal{
        backdrop-filter: blur(2px);
    }
    .form-control:focus, .form-check-input:focus {
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