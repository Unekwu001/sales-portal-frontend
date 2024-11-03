<template>
    <div class="container-fluid main-container">
        <MainNavbar/>
        <div class="alert alert-danger" role="alert" v-if="apiWarning">
            {{ errorMessage }}
        </div>
        <div class="row main-row">
<!-- loading spinner -->
            <Spinner :loading="isLoading" />

            <div class="col-lg-5 col-md-6 co-sm-12 column1">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar-next" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                    <!-- <p class="heading">Southern View Estate, Lekki.<br> Available</p> -->
                    <div>
                        <p class="heading">Great News! <br>{{ locationData.Location }}</p>
                        <p class="sub-text">ipNX coverage is available in your area! You're just a few steps away from
                            experiencing reliable, high-speed internet.
                        </p>
                    </div>
                    
                    <!-- <p class="heading">Available</p> -->

                    <div class="success-icon-container">
                        <img src="../../../assets/icons/Ok.png" alt="" class="success-icon">
                    </div>

                    <div class="progress-btns">
                        <!-- <a class="back-btn" href="/location">Back</a> -->
                        <a class="back-btn" @click="prevStep">Back</a>
                        <!-- <a class="continue-btn" href="/form2">Continue</a> -->
                        <a class="continue-btn" @click="nextStep">Continue</a>
                    </div>
         
            </div>
            <div class="col-lg-4 col-md-3 co-sm-12 column2">
                <img src="../../../assets/images/vector.png" alt="vector" class="vector-image">
            </div>
        </div>

    </div>

    <!-- <NotFound404 v-if="error404"/> -->
    <!-- <MainFooter/> -->
</template>

<script>
import MainNavbar from '../../../components/MainNavbar.vue';
import { useRouter } from "vue-router";
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { email } from '@vuelidate/validators';
import Spinner from '@/components/Spinner.vue';
// import NotFound404 from '@/components/NotFound404.vue'

    const apiUrl = process.env.VUE_APP_API_URL
    export default {
        components: {
            MainNavbar, Spinner
        },

        name: 'LocationFound',
        // props: ['currentStep'],
        props: ['currentStep', 'searchData', 'smeData'],
        // props: ['currentStep', 'searchData', 'currentPath'],

        setup(props, {emit}) {
            let apiWarning = ref(false)
            let errorMessage = ref(null)
            // let error404 = ref(false)

            const isLoading = ref(false)

            const router = useRouter()
            const newStep = props.currentStep;
            const locationData = props.searchData
            const user = ref('')
            const userEmail = props.smeData.contactPersonEmail
            const enteredEmail = user.email

            onMounted(async() => {
                const token = sessionStorage.getItem('token')
            
                if (token) {
                    try {
                        const headers = { 
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                            'Access-Control-Allow-Origin': '*',
                        }
                        
                        const response = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})

                        user.value = response.data
                        enteredEmail.value = user.email 

                    } catch (error) {
                        console.log(error);
                     
                    }
                  
                }
            })


            // const state = reactive({
            //     location: props.locationData.Llocation
            // })

            const nextStep = async() => {
                const token = sessionStorage.getItem('token')
             
                if (!token) {
                    try{
                        isLoading.value = true

                        const headers = { 'Content-Type': 'application/json' }
        
                        const response = await axios.post(`${apiUrl}/Auth/check-if-user-exists?userEmail=${userEmail}`, {data: userEmail, headers: headers})
                        if (response.data.message === 'user exists') {
                        
                              const plan = 'sme'
                            router.push({name: 'VerifySignUp', query: {email: userEmail, plan}})
                            // router.push({path: '/'})
                        }else if (window.location.href.includes('residential')) {
                            router.push({name: 'FormRes'})
                            
                        } else if(window.location.href.includes('sme')){
                            router.push({name: 'FormSme'})
                        }
                    
                    } catch (error) {
                        // errorMessage.value = error.response.data.message
                        
                        if (errorMessage.value === 'An error occurred while checking the email.') {
                            apiWarning.value = true
                        
                        }
                    }
                } else {
                    if (window.location.href.includes('residential')) {
                        router.push({path: '/plan/fos-residential'})
                    } else if(window.location.href.includes('sme')){
                        router.push({path: '/plan/fos-sme'})
                    }
                    
                }
          
            };

            let previousLocationData = {
                newStep: 2,
                location: locationData.Location
            }
            const prevStep = () => {
                emit('prev-step', {
                    locationData: previousLocationData
                    
                })
                
            }


            return { nextStep, prevStep, newStep, locationData, apiWarning, errorMessage, isLoading }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap');
  .main-container {
        background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
        /* overflow-x: hidden; */
        font-family: 'IBM Plex Sans', sans-serif;
    }
   
    .main-row {
        padding: 100px 10px 40px 90px;
    }
   
    .progress {
        height: 6px;
        border-radius: 10px;
        margin-bottom: 30px;
    }
    .progress .progress-bar {
        border-radius: 10px;
        background-color: initial;
    } 
    .progress .progress-bar-next {
        background-color: #ff0000;
    }
    .heading {
        color: #000000;
        font-weight: 700;
        font-size: 30px;
        font-family: 'IBM Plex Sans';
        margin-bottom: 30px;
    }
    .sub-text {
        color: #949DAB;
        font-weight: 500;
    }
    div p.heading {
        display: block;
        width: 300px !important;
        
    }
    .success-icon-container {
        margin: 50px auto;
        text-align: center;
    }
    .success-icon {
        width: 400px;
    }
   
   .continue-btn {
        float: right;
    }
    .back-btn, .continue-btn {
        text-decoration: none;
        color: #263238;
        font-family: 'IBM Plex Sans', sans-serif;
        cursor: pointer;
   }

    .column2 {
        margin: 40px auto;
    }
    .vector-image {
        width: 500px;
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
            padding: 100px 25px;
        }
        .vector-image {
            width: 450px;
        }
        /* .success-icon {
            width: 400px;
        } */
    }

    @media  (max-width: 480px) {
        .main-row {
            padding: 100px 20px;
        }
        .column2 {
            margin: 10px auto;
        }
        .vector-image {
            display: none;
        }
        .success-icon-container {
            margin: 50px auto;
            text-align: center;
        }
        .success-icon {
            width: 75%;
        }
    }
    
</style>