<template>
    <div class="main-container">
        <nav>
            <img alt="ipNX logo" class="logo" src="../../assets/images/ipNX_Logo.png" width="75px" @click="clickLogo"/>
        </nav>

        
        <Spinner :loading="isLoading" />

        <div class="mini-container">
            <p class="heading">One Time Password Verification</p>
            <p class="sub-heading"> Please enter the one-time password (OTP) sent to your email to proceed with your activation</p>
            
            <div class="alert alert-success" role="alert" v-if="resendMessage">An OTP has been sent to your email.</div>
            <div class="alert alert-danger" role="alert" v-if="hasError">{{ errorMessage }}</div>
            
            <form class="row g-3" @submit.prevent="verify">
                <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                    <input type="text" class="form-control" maxlength="1" v-model="state.firstDigit" id="firstDigit">
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                    <input type="text" class="form-control" maxlength="1" v-model="state.secondDigit" id="secondDigit">
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                    <input type="text" class="form-control" maxlength="1" v-model="state.thirdDigit" id="thirdDigit">
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                    <input type="text" class="form-control" maxlength="1" v-model="state.fourthDigit" id="fourthDigit"
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                    <input type="text" class="form-control" maxlength="1" v-model="state.fifthDigit" id="fifthDigit"
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                    <input type="text" class="form-control" maxlength="1" v-model="state.sixthDigit" id="sixthDigit">
                </div>
                <!-- <div class="verify-btn">
                    <button type="submit" class="btn-link">Verify</button> 
                </div> -->
                <button type="submit" class="btn-link">Verify</button> 
            </form>

            <p class="resend-otp"><span class="otp-text">Did not receive OTP?</span> <span class="otp-btn" @click="resendOTP()">Resend OTP</span></p>
            <div class="line"></div>

            <div class="instructions">
                <p>Instructions:</p>
                <ul>
                    <li>Enter the OTP you received via email in the input field.</li>
                    <li>Click "Verify" to confirm your identity.</li>
                    <li>If you haven't received the OTP, click "Resend OTP" to request a new one.</li>
                </ul>
            </div>
        </div>

    </div>
    <MainFooter />
</template>

<script>
import MainFooter from '@/components/MainFooter.vue'
import { ref, reactive, computed, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from "vue-router";
import useVuelidate from '@vuelidate/core';
import { required, numeric, maxLength } from "@vuelidate/validators";
import axios from 'axios';
import Spinner from '@/components/Spinner.vue'

const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            MainFooter, 
            Spinner
        }, 
        setup(){
            const router = useRouter()
            const route = useRoute()
            const isLoading = ref(false)
            const userEmail = route.query.email
            const resendMessage = ref(false)
            const errorMessage = ref('')
            const hasError = ref(false)
            const token = ref(null)

            const state = reactive({
                firstDigit: '',
                secondDigit: '',
                thirdDigit: '',
                fourthDigit: '',
                fifthDigit: '',
                sixthDigit: '',
            })

            // validation
            const rules = computed(() => {
                return {
                    firstDigit: { required, numeric, maxLength: maxLength(1)},
                    secondDigit: { required, numeric, maxLength: maxLength(1)},
                    thirdDigit: { required, numeric, maxLength: maxLength(1)},
                    fourthDigit: { required, numeric, maxLength: maxLength(1)},
                    fifthDigit: { required, numeric, maxLength: maxLength(1)},
                    sixthDigit: { required, numeric, maxLength: maxLength(1)},
                }
            })

            const v$ = useVuelidate(rules, state)

            watchEffect(() => {
                if (state.firstDigit.length === 1) {
                    document.getElementById('secondDigit').focus()
                } 
                 if (state.secondDigit.length === 1) {
                    document.getElementById('thirdDigit').focus()
                
                } 
                  if (state.thirdDigit.length === 1) {
                    document.getElementById('fourthDigit').focus()
                } 
                 if (state.fourthDigit.length === 1) {
                    document.getElementById('fifthDigit').focus()
                
                } 
                 if (state.fifthDigit.length === 1) {
                    document.getElementById('sixthDigit').focus()
                } 
                
            })

            const clickLogo = () => {
                router.push({name: 'Home'})
            }

            const verify = async() => {
                v$.value.$validate() // checks all inputs
                if (!v$.value.$error) {
                    try {
                        isLoading.value = true
                        const allData = `${state.firstDigit}${state.secondDigit}${state.thirdDigit}${state.fourthDigit}${state.fifthDigit}${state.sixthDigit}`
                        // console.log(allData);

                        const headers = { 'Content-Type': 'application/json' }
                        const email = route.query.email
                        const response = await axios.post(`${apiUrl}/Auth/otp-login/${email}`, {Otp: allData, headers: headers})
                       
                        token.value = response.headers.authorization
                        // save to session storage
                        sessionStorage.setItem('token', token.value)
                        // tentative
                        // sessionStorage.setItem('email', email)

                        router.push({name: 'welcome'})
                       
                    } catch (error) {
                        console.log(error);
                        hasError.value = true
                        if (resendMessage.value = true) { 
                            resendMessage.value = false
                        }
                        if (error.response) {
                            errorMessage.value = error.response.data.message
                        }else{
                            errorMessage.value = error.message
                        }
                    }finally{
                        isLoading.value = false
                    }
                }
              
                
            }

            const resendOTP = async() => {
                const token = sessionStorage.getItem('token')
                // const enteredEmail = props.resData.enteredEmail
                // console.log(enteredEmail.value);
                if (!token) {
                    try{
                        
                        isLoading.value = true

                        const headers = { 'Content-Type': 'application/json' }
        
                        const response = await axios.post(`${apiUrl}/Auth/check-if-user-exists?userEmail=${userEmail}`, {data: userEmail, headers: headers})
                        if (response.data.message === 'user exists') {
                           
                            // window.location.reload()
                            router.push({name: 'Verify', query: {email: userEmail}})
                            state.firstDigit = ''
                            state.secondDigit = ''
                            state.thirdDigit = ''
                            state.fourthDigit = ''
                            state.fifthDigit = ''
                            state.sixthDigit = ''

                            if (hasError.value === true) {
                                hasError.value = false
                            }
                            resendMessage.value = true
                            
                        }
                        // else if (window.location.href.includes('residential')) {
                        //     router.push({name: 'FormRes'})
                            
                        // } else if(window.location.href.includes('sme')){
                        //     router.push({name: 'FormSme'})
                        // }
                    
                    } catch (error) {
                        // errorMessage.value = error.response.data.message
                        console.log(error);
                      
                        // if (errorMessage.value === 'An error occurred while checking the email.') {
                        //     apiWarning.value = true
                        
                        // }
                    }
                    finally{
                        setTimeout(() =>{
                            isLoading.value = false
                        }, 1000)
                        // setTimeout(() =>{
                        //     resendMessage.value = false
                        // }, 3000)
                    }
                }
            }

            onMounted(() => {
                const getToken = sessionStorage.getItem('token')
                if (getToken) {
                    router.push({name: 'Home'})
                }
            })

            return { state, v$, clickLogo, isLoading, resendOTP, verify, resendMessage, errorMessage, hasError }
             
                
        
        }
    }
</script>

<style scoped>
     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@0,100..900;1,100..900&display=swap');
    .main-container {
        background-image: url('../../assets/images/bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        /* overflow-x: hidden; */
        overflow-y: hidden;
        font-family: 'IBM Plex Sans', sans-serif;
    }

    .mini-container {
        margin: 70px auto 50px;
        text-align: center;
        background: #ffffff;
        width: 60%;
        border-radius: 20px;
        padding: 20px 150px;
    }
    nav {
        padding: 39px 125px;
    }
    .logo{
        cursor: pointer;
    }
    .heading {
        font-size: 22px;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        color: #212121;
    }
    .sub-heading {
        color: #949DAB;
        font-size: 16px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
    }
    /* .verify-btn {
        background-color: #DA1919;
        color: #ffffff;
        width: 250px;
        text-align: center;
        margin: 50px auto 20px;
        border-radius: 64px;
        padding: 8px 24px;
        cursor: pointer;
        
    } */
    button.btn-link {
        /* color: inherit; */
        text-decoration: none;
        background-color: transparent;
        border: transparent;
        font-size: 16px;
        font-weight: 500;
        font-family: 'IBM Plex Sans', sans-serif;

        background-color: #DA1919;
        color: #ffffff;
        width: 250px;
        text-align: center;
        margin: 50px auto 20px;
        border-radius: 64px;
        padding: 8px 24px;
        cursor: pointer;
    }
    .resend-otp {
     margin-bottom: 30px;
    }
    .otp-btn {
        color: #263238;
        font-weight: 400;
        border: 1px solid #263238;
        border-radius: 5px;
        font-size: 12px;
        padding: 5px;
        margin-left: 5px;
        cursor: pointer;
    }
    .otp-btn a{
        text-decoration: none;
        color: inherit;
    }
    .otp-text {
        font-size: 15px;
        font-weight: 500;
    }
    .line {
        height: 0.7px;
        width: 100%;
        background: #71717A;
    }
    .instructions {
        color: #4D4D4D;
        font-size: 14px;
        font-weight: 500;
        font-family: 'IBM Plex Sans', sans-serif;
        text-align: justify;
        margin-top: 20px;
    }
    .form-control:focus {
        border-color: #757575;
        box-shadow: none;
    }
    .form-control:focus, input[type=text] {
        text-align: center;
    }
    input[type=text] {
        background: #D9D9D9;
        border-radius: 10px;
    }
    div .form-control {
        height: 150%;
        width: 100%;
    }

    @media (min-width: 768px) and (max-width: 992px) {
        .logo {
            width: 70px;
        }
        nav {
            padding: 15px 45px !important;
        }
        .mini-container {
            width: 80%;
            padding: 20px 100px;
        }
        div .form-control {
            height: 150%;
            width: 100%;
        }
    }

    @media (min-width: 481px) and (max-width: 767px) {
        .logo {
            width: 70px;
        }
        nav {
            padding: 15px 45px !important;
        }
        .mini-container {
            width: 80%;
            padding: 20px 50px;
        }
        div .form-control {
            height: 150%;
            width: 100%;
        }
    }

    @media (max-width: 576px) {
        .col-4 {
            margin-top: 20px;
        }
    }
    
    @media  (max-width: 480px) {

        .logo {
            width: 70px;
        }
        nav {
            padding: 15px 45px !important;
        }
        .mini-container {
            width: 80%;
            padding: 20px 50px;
        }
        div .form-control {
            height: 130%;
            width: 100%;
        }
        .otp-btn, .otp-text {
            display: block;
        }
        .otp-btn{
            width: 50%;
            text-align: center;
            margin: auto;
        }

    }
</style>