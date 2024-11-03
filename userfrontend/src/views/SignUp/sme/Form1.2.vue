<template>
    <div class="nav-container">
   
       <InitialNavbar/>

       <div class="pre-form">
           <p class="heading">Welcome</p>
           <p class="sub-heading">Please Enter Your Details</p>
           <form class="form-body">
            <SuccessAlert v-if="visible"></SuccessAlert>
            <WarningAlert v-if="warning"></WarningAlert>
            <div class="alert alert-danger" role="alert" v-if="apiWarning">
                    {{ errorMessage }}
                </div>
                <div v-if="regLoading" class="load-btn">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Email" v-model="state.contactPersonEmail">
                    <span class="error-msg" v-if="vv$.contactPersonEmail.$error"> Enter a correct email address </span>
                </div>
                <div class="next-btn" v-if="showBtn" @click="checkEmailExists">
                     <button type="button" class="btn-link">Continue</button> 
               </div>

               <div v-if="loading">
                <p style="color: red;">please wait...</p>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                        </div>
                    </div>
                </div>
                <div v-else>
               <div class="more-info" v-if="showMoreInputs">
                <div class="mb-3">
                   <input type="text" class="form-control" placeholder="Company Name" v-model="state.companyName" >
                   <span class="error-msg" v-if="v$.companyName.$error"> {{ v$.companyName.$errors[0].$message }} </span>
               </div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Contact Person First Name" v-model="state.contactPersonFirstName">
                    <span class="error-msg" v-if="v$.contactPersonFirstName.$error"> {{ v$.contactPersonFirstName.$errors[0].$message }} </span>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Contact Person Last Name" v-model="state.contactPersonLastName">
                    <span class="error-msg" v-if="v$.contactPersonLastName.$error"> {{ v$.contactPersonLastName.$errors[0].$message }} </span>
                </div>
                
                <div class="mb-3">
                     <input type="text" class="form-control" placeholder="Address" v-model="state.address">
                     <span class="error-msg" v-if="v$.address.$error"> {{ v$.address.$errors[0].$message }} </span>
                 </div>
 
                <!-- <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Password" v-model="state.password">
                    <span class="error-msg" v-if="v$.password.$error && !v$.password.helpers"> {{ v$.password.$errors[0].$message }} <br> Must contain at least a character, number, small and capital letter </span>
                </div> -->
 
                <!-- <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Confirm Password" v-model="state.confirmPassword">
                    <span class="error-msg" v-if="v$.confirmPassword.$error"> Password doesn't match </span>
                </div> -->
                <div class="next-btn" @click="submitForm">
                    <button type="button" class="btn-link">Continue</button> 
                </div>
               </div>
   
            </div>
           </form>
       </div>
       
   </div> 
   <!-- <InternalError505 v-if="error500" /> -->
   </template>
   
<script>
   import InitialNavbar from '@/components/InitialNavbar.vue';
   import SuccessAlert from '@/components/SuccessAlert.vue';
   import WarningAlert from '@/components/WarningAlert.vue';

   import useVuelidate from '@vuelidate/core'
   import useValidate from '@vuelidate/core'
   import { reactive, ref, computed } from 'vue'
   import { required, email, minLength, helpers } from '@vuelidate/validators'
   import { useRouter, useRoute } from 'vue-router'
   import axios from 'axios'
//    import InternalError505 from '@/components/InternalError505.vue'

   const apiUrl = process.env.VUE_APP_API_URL

       export default {
           components: {
                InitialNavbar,
                SuccessAlert,
                WarningAlert,
                // InternalError505
           },
            name: 'Form12',
            props: ['smeData'],

           setup(props, {emit}) {
            let regLoading = ref(false)
            let loading = ref(false)
            let visible = ref(false)
            let warning = ref(false)
            let apiWarning = ref(false)
            let showMoreInputs = ref(false)
            let showBtn = ref(true)
            let errorMessage = ref('')
            // let error500 = ref(false)

            const router = useRouter()

                const state = reactive({
                    // visible: false,
                    // warning: false,
                    // showMoreInputs: false,
                    companyName: props.smeData ? props.smeData.companyName : '',
                    contactPersonFirstName: props.smeData ? props.smeData.contactPersonFirstName : '',
                    contactPersonLastName: props.smeData ? props.smeData.contactPersonLastName : '',
                    contactPersonEmail: props.smeData ? props.smeData.contactPersonEmail : '',
                    address: props.smeData ? props.smeData.address : ''
                    // password: props.smeData ? props.smeData.password : '',
                    // confirmPassword: props.smeData.LconfirmPassword,
                })

                const rules = computed(() => {
                    return {
                        companyName: { required, minLength: minLength(3) }, 
                        contactPersonFirstName: { required, minLength: minLength(3) },
                        contactPersonLastName: { required, minLength: minLength(3) },
                        // contactPersonEmail: { required, email },
                        address: { required }
                        // password: { required, minLength: minLength(8), regex: helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/) },
                        // confirmPassword: { required, sameAsPassword: sameAs(state.password) },
                    }
                })

                const validateEmail = computed(() => {
                    return {
                        contactPersonEmail: { required, email },
                    }
                    // state.showError = v$.email.$error
                })

                const vv$ = useVuelidate(validateEmail, state)

                const v$ = useValidate(rules, state)

                const submitForm = async() =>{
                    v$.value.$validate() // checks all inputs
                    if (!v$.value.$error) {
    
                        try {
                            regLoading.value = true

                            const headers = { 'Content-Type': 'application/json' }

                            // const response = await axios.post(`${apiUrl}/Onboarding/sme/sign-up`, {
                            const response = await axios.post(`${apiUrl}/User/sign-up`, {
                                // data: {
                                    companyName: state.companyName,
                                    firstName: state.contactPersonFirstName,
                                    lastName: state.contactPersonLastName,
                                    email: state.contactPersonEmail,
                                    address: state.address, 
                                    // password: state.password ,
                                    
                            // }, 
                                headers: headers
                            })
                
                            if (warning.value = true) {
                                warning.value = false;
                                visible.value = true;
                            }

                            setTimeout( () => emit('step1-complete', {
                                companyName: state.companyName,
                                contactPersonFirstName: state.contactPersonFirstName,
                                contactPersonLastName: state.contactPersonLastName,
                                contactPersonEmail: state.contactPersonEmail,
                                address: state.address
                                // password: state.password

                            }), 1500);


                        } catch (error) {
                            console.log(error);
                           
                            if (warning.value === true) {
                                warning.value = false
                            }
                            apiWarning.value = true
                            errorMessage.value = error.response.data.message
                            
                        }finally{
                            regLoading.value = false
                        }
                    }else {
                        warning.value = true
                    }
                }

              // API call to check if email exists
              const checkEmailExists = async() => {
                vv$.value.$validate() // checks all inputs
                if (!vv$.value.$error) {

                    try {    
                        const enteredEmail = state.contactPersonEmail
                        // console.log(enteredEmail);
                        loading.value = true
                        const headers = { 'Content-Type': 'application/json' }
    
                        const response = await axios.post(`${apiUrl}/Auth/check-if-user-exists?userEmail=${enteredEmail}`, {data: enteredEmail, headers: headers})
                     
                        if (response.data.message === 'user exists') {
                            showMoreInputs.value = false
                            if (warning.value = true) {
                                warning.value = false;
                            }
                            router.push({name: 'Verify', query: {email: enteredEmail}})
                            // router.push({path: '/'})
                        }
                  
                    } catch (error) {
                        // errorMessage.value = error.response.data.message
                        errorMessage.value = error.messageResponse
                        
                        if (errorMessage.value === 'An error occurred while checking the email.') {
                            apiWarning.value = true
                            showMoreInputs.value = false   
                            showBtn.value = true

                        }else if (error.message.status === 409) {
                            errorMessage.value = 'This email is already in use.'
                        } else {
                            showMoreInputs.value = true
                            showBtn.value = false
                        }

                        // console.log(errorMessage);
                    }finally{
                        loading.value = false
                    }

                }else {
                    warning.value = true
                }
                
            }

              

                return { state, v$, vv$, checkEmailExists, submitForm, validateEmail,
                loading, regLoading, visible, warning, apiWarning, showMoreInputs,showBtn, errorMessage }

            },
            
       }
</script>
   
   <style scoped>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
       .nav-container {
           background-image: url('../../../assets/images/background2.png');
           background-size: cover;
           background-repeat: no-repeat;
           /* overflow-x: hidden; */
           overflow-y: hidden;
           font-family: 'IBM Plex Sans', sans-serif;
       }

       .pre-form {
           margin: 100px auto 0;
           text-align: center;
       }
       .heading {
           color: #212121;
           font-weight: 600;
           font-size: 22px;
           font-family: 'Poppins', sans-serif;
       }
       .sub-heading {
           font-size: 16px;
           font-weight: 500;
           color: #263238;
           /* color: #949DAB; */
       }
       .pre-form .form-body {
           width: 400px;
           margin: auto;
           padding-bottom: 150px;
       }
       .next-btn {
           background-color: #ff0000;
           color: #ffffff;
           width: 200px;
           text-align: center;
           margin: auto;
           border-radius: 30px;
           padding: 5px 17px;
           cursor: pointer;
       }
       button.btn-link {
        color: inherit;
        text-decoration: none;
        background-color: transparent;
        border: transparent;
       }
       .form-control:focus {
        border-color: #757575;
        box-shadow: none;
       }
       .form-control {
        color: #424242;
        font-weight: 400;
        font-size: 14px;
        font-family: 'Montserrat', sans-serif;
        border-color: #757575;
       }
       .error-msg {
        color: #ff0000;
       }
       .load-btn{
        margin-bottom: 10px;
       }
/* 
       @media (min-width: 768px) and (max-width: 992px) {
      
    
       } */
       @media (min-width: 481px) and (max-width: 767px) {
        .logo {
            width: 50px;
        }
        nav {
            padding: 15px;
        }
        .pre-form .form-body {
            max-width: 300px;
        }

    }
    @media  (max-width: 480px) {
     
        .logo {
            width: 50px;
        }
        nav {
            padding: 15px;
        }
        .pre-form .form-body {
           max-width: 85%;
           margin: auto;
           padding-bottom: 150px;
       } 

    }
   </style>