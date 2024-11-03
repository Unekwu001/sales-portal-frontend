<template>
    <div class="container-fluid nav-container">
       <InitialNavbar/>
   
       <div class="pre-form">
           <p class="heading">Welcome</p>
           <p class="sub-heading">Please Enter Your Email To Continue</p>
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
                   <!-- <input type="email" class="form-control" placeholder="Email" v-model="state.email" @input="debouncedCheckEmailExists"> -->
                   <input type="email" class="form-control" placeholder="Email" v-model="state.email">
                   <span class="error-msg" v-if="vv$.email.$error"> Enter a correct email address </span>
               </div>
               
               <div class="next-btn" v-if="showBtn" @click.prevent="checkEmailExists">
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
                            <input type="text" class="form-control" placeholder="First Name" v-model="state.firstName">
                            <span class="error-msg" v-if="v$.firstName.$error"> {{ v$.firstName.$errors[0].$message }} </span>
                        </div>
        
                        <div class="mb-3">
                            <input type="text" class="form-control" placeholder="Last Name" v-model="state.lastName">
                            <span class="error-msg" v-if="v$.lastName.$error"> {{ v$.lastName.$errors[0].$message }} </span>
                        </div>
        
                        <div class="mb-3">
                            <input type="text" class="form-control" placeholder="Mobile Number" v-model="state.mobileNumber" maxlength="11">
                            <span class="error-msg" v-if="v$.mobileNumber.$error && !v$.mobileNumber.helpers"> Invalid phone number format </span>
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
   
</template>
   
<script>
   import InitialNavbar from '@/components/InitialNavbar.vue';
   import SuccessAlert from '@/components/SuccessAlert.vue';
   import WarningAlert from '@/components/WarningAlert.vue';

   import useVuelidate from '@vuelidate/core'
   import { ref, reactive, computed, onMounted } from 'vue'
   import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
   import { useRouter } from 'vue-router';
    import axios from 'axios'

    const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            InitialNavbar,
            SuccessAlert,
            WarningAlert
        },

        name: 'Form11',
        props: ['resData'],

        setup(props, {emit}) {
            let regLoading = ref(false)
            let loading = ref(false)
            let visible = ref(false)
            let warning = ref(false)
            let apiWarning = ref(false)
            let showMoreInputs = ref(false)
            let showBtn = ref(true)
            let errorMessage = ref(null)

            const router = useRouter()

            const state = reactive({
                firstName: props.resData.firstName,
                lastName: props.resData.lastName,
                mobileNumber: props.resData.mobileNumber,
                email: props.resData.email,
                address: props.resData.address,
                // password: props.resData.password,
                // confirmPassword: props.resData.confirmPassword,
            })

            const rules = computed(() => {
                return {
                    firstName: { required, minLength: minLength(3) },
                    lastName: { required, minLength: minLength(3) },
                    mobileNumber: { required, regex: helpers.regex(/^(\+?234|0)[789][01]\d{8}$/) },
                    // email: { required, email },
                    address: { required },
                    // password: { required, minLength: minLength(8), regex: helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/) },
                    // confirmPassword: { required, sameAsPassword: sameAs(state.password) },
                    // confirmPassword: { required, sameAs(computed(()=> state.password)) }
                }
            })

            const validateEmail = computed(() => {
                return {
                    email: { required, email },
                }
                // state.showError = v$.email.$error
            })

            const vv$ = useVuelidate(validateEmail, state)

            const v$ = useVuelidate(rules, state)

            // API call to check if email exists
            const checkEmailExists = async() => {
                vv$.value.$validate() // checks all inputs
                if (!vv$.value.$error) {

                    try {    
                        const enteredEmail = state.email
                        loading.value = true
                        const headers = { 'Content-Type': 'application/json' }
    
                        const response = await axios.post(`${apiUrl}/Auth/check-if-user-exists?userEmail=${enteredEmail}`, {data: enteredEmail, headers: headers})
                     
                        const messageResponse = response.data.message
                        if (response.data.message === 'user exists') {
                            showMoreInputs.value = false
                            if (warning.value = true) {
                                warning.value = false;
                            }
                            router.push({name: 'Verify', query: {email: enteredEmail}})
                            // router.push({path: '/'})
                        }
                  
                        return {messageResponse}
                    } catch (error) {
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

                    
                    }finally{
                        loading.value = false
                    }

                }else {
                    warning.value = true
                }
            
                
            }

            // const debouncedCheckEmailExists = () => {
            //     debounce(checkEmailExists, 1500)
            // }

            // register if email does not exist in DB
            const submitForm = async() =>{
                v$.value.$validate() // checks all inputs
                if (!v$.value.$error) {
    
                    try {
                        regLoading.value = true

                        const headers = { 'Content-Type': 'application/json' }
                        
                        // const response = await axios.post(`${apiUrl}/Onboarding/residential/sign-up`, {data: allData, headers: headers})
                        // const response = await axios.post(`${apiUrl}/Onboarding/residential/sign-up`, {
                        const response = await axios.post(`${apiUrl}/User/sign-up`, {
                            // data: {
                            firstName: state.firstName,
                            lastName: state.lastName,
                            phoneNumber: state.mobileNumber,
                            email: state.email,
                            address: state.address,
                            // password: state.password,
                        // }, 
                            headers: headers
                        })
            
                        if (warning.value = true) {
                            warning.value = false;
                            visible.value = true;
                        }

                        setTimeout( () => emit('step1-complete', {
                            firstName: state.firstName,
                            lastName: state.lastName,
                            mobileNumber: state.mobileNumber,
                            email: state.email,
                            address: state.address
                            // password: state.password

                        }), 1500);

                    } catch (error) {
                        console.log(error);
                        if (warning.value === true) {
                            warning.value = false
                        }
                        apiWarning.value = true
                        // errorMessage.value = error.response.data.message
                        errorMessage.value = error.response.data.message
                    }finally{
                        regLoading.value = false
                    }
                }else {
                    warning.value = true
                }
            }

            onMounted(() => {
                // location.reload();
            })

            return { 
                state, v$,vv$, checkEmailExists, submitForm, validateEmail,
                loading, regLoading, visible, warning, apiWarning, showMoreInputs,showBtn, errorMessage
            }
            
        },
        
    }
</script>
   
   <style scoped>
     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@0,100..900;1,100..900&display=swap');
       .nav-container {
           background-image: url('../../../assets/images/background2.png');
           background-size: cover;
           background-repeat: no-repeat;
           overflow-x: hidden;
           overflow-y: hidden;
           font-family: 'IBM Plex Sans', sans-serif;
           z-index: 1;
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
           max-width: 100%;
           margin: auto;
           padding-bottom: 150px;
       } 

    }
    
      
   </style>