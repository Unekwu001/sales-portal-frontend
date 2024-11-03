<template>
     <div class="main-container">
       <InitialNavbar/>
       
       <div class="mini-container">
            <p class="heading">Welcome Back, {{ convertToTitleCase(userFirstName) }}</p>
            <p class="sub-heading" v-if="orderLength !== 0"> Select Your Residence</p>
            <p class="sub-heading" v-else> No Residence</p>
            
            <div class="residences" v-if="orderLength !== 0">
                <div class="container">
                    <div class="centered">
                        <div>
                            <span class="arrow-btn" @click="scrollBack"><img src="../assets/icons/left-arr.png" alt=""></span>
                        </div>
                        <div class="single-residence" v-for="(order, startIndex) in orders.slice(startIndex, startIndex + daysToShow)" :key="order.id">
                            <div class="card">{{ order.abbreviation }}</div>
                            <p class="address">{{ order.networkCoverageLocationName }}</p>
                            <p class="status" v-if="order.status === 'Completed' && order.hasScheduledInstallation === true && order.areDocumentsComplete === true">{{ order.status }}</p>
                            <p class="status" v-else-if="order.status === 'Completed' && order.hasScheduledInstallation === true && order.areDocumentsComplete === false">Pending Documents</p>
                            <p class="status" v-else-if="order.status === 'Completed' && order.areDocumentsComplete === false">Pending Documents</p>
                            <p class="status" v-else-if="order.status === 'Completed' && order.hasScheduledInstallation === false && order.areDocumentsComplete === true">Pending Installation</p>
                            <p class="status" v-else>{{ order.status }}</p>

                            <!-- <p v-if="order.orderType === 'residential'">res</p>
                            <p v-else>sme</p> -->
                            <button class="continueBtn" v-if="(order.status === 'Ongoing' && order.orderType === 'residential')" @click="continueResBtn(order)">Continue</button>
                            <button class="continueBtn" v-else-if="order.status === 'Ongoing' && order.orderType === 'sme'" @click="continueSmeBtn(order)">Continue</button>

                            
                            <button class="continueBtn" v-if="(order.status === 'Completed' && order.areDocumentsComplete === false && order.orderType === 'residential')" @click="continueResDocumentBtn(order)">Continue</button>
                            <button class="continueBtn" v-else-if="order.status === 'Completed' && order.areDocumentsComplete === false && order.orderType === 'sme'" @click="continueSmeDocumentBtn(order)">Continue</button>

                            <button class="continueBtn" v-if="order.status === 'Completed' && order.hasScheduledInstallation === false && order.areDocumentsComplete === true" @click="continueInstallation(order)">Continue</button>
                            
                            <!-- <button class="continueBtn" @click="continueResBtn(orderType)">Continue</button> -->
                            <!-- <button class="continueBtn" v-else>View</button> -->
                        </div>
                       <div>
                            <span class="arrow-btn" @click="scrollNext"><img src="../assets/icons/right-arr.png" alt=""></span>
                        </div>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-lg-2">
                        <span class="arrow-btn"><img src="../assets/icons/left-arr.png" alt=""></span>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div class="card">VP</div>
                        <p class="address">Victory Park Estate, Osapa London</p>
                        <p class="status">Ongoing</p>
                        <button>Continue</button>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div class="card">AO</div>
                        
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div class="card">SV</div>   
                    </div>
                    <div class="col-lg-2">
                        <span class="arrow-btn"><img src="../assets/icons/right-arr.png" alt=""></span>
                    </div>
                </div> -->
            </div>

            <div class="add-residence" @click="addResidence">
                <span class="add-icon"><img src="../assets/icons/add.png" alt=""></span>
                <span class="add-text">Add New Location</span>
            </div>
        </div>
   </div> 

   <MainFooter />
</template>

<script>
import InitialNavbar from '@/components/InitialNavbar.vue'
import MainFooter from '@/components/MainFooter.vue'
import { ref, onMounted, computed } from 'vue';
import { onBeforeRouteLeave, useRouter } from "vue-router";
import axios from 'axios';
import Verify from './Login/Verify.vue';

const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            InitialNavbar,
            MainFooter
        },
        setup() {
            const user = ref('')
            const orders = ref([])
            const ordersType = ref('')
            const userFirstName = ref(null)
            const exceptions = ['of', 'the', 'and', 'to'];
            let startIndex = ref(0)
            let daysToShow = ref(3)
            const currentPath = ref('')
            const orderLength = ref('')

            const router = useRouter()
    
            onMounted(async() => {
                // const userEmail = sessionStorage.getItem('email')
                window.scrollTo(0, top);
                if (sessionStorage.getItem('token')) {
                    const headers = { 
                            'Content-Type': 'application/json',
                            'Authorization': `${sessionStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        }
                    // fetch user details from DB
                    try {

                     // get user plan orders by locations
                    const orderResponse = await axios.get(`${apiUrl}/Orders/view-my-orders`, {headers: headers})
    
                    orders.value = orderResponse.data

                    orderLength.value = orders.value.length

                    // const orderFiltered = JSON.stringify(orders.value.filter(item => item.status === 'Completed'), null, 2)
                    // const orderFilteredId = JSON.parse(orderFiltered).map(item => item.id)
                    // const response = await axios.get(`${apiUrl}/Orders/view-my-order/${orderFilteredId}`, {headers: headers})

                    // const userOrder = response.data
                    // console.log('userorder:',userOrder);
    
                        // check if user is a residential or sme user
                        // if (user.value.hasOwnProperty('companyName')) {
                        //     userFirstName.value = user.value.contactPersonFirstName
                           
                        // } else if(user.value.hasOwnProperty('firstName')){
                        //     userFirstName.value = user.value.firstName
                            
                        // }

                    } catch (error) {
                        console.log(error);
                    }

                    try {
                        // get user details 
                        const response = await axios.get(`${apiUrl}/User/get-user-details`, {headers: headers})
                        user.value = response.data
                        userFirstName.value = user.value.firstName
                    } catch (error) {
                        console.log(error);
                    }
                }else {
                    router.push({name: 'Home'})
                }
                  
            })

            //button controls
            const scrollBack = () => {
                if (startIndex.value - 3 >= 0 ) {
                    startIndex.value -= 3;
                }
            }

            const scrollNext = () => {
                if (startIndex.value + 3 < orders.value.length) {
                    startIndex.value += 3;
                }
            }
            
            const continueSmeBtn = (order) => {
                const smeOrderId = order.id
                  const plan = 'sme'
               
                router.push({name: 'SmeForm', query: {smeOrderId, plan} })
            }

            const continueSmeDocumentBtn = (order) => {
                const smeOrderId = order.id
                const plan = 'sme'
                const type ='document'
               
                router.push({name: 'SmeForm', query: {smeOrderId, plan, type} })
            }

            const continueResBtn = (order) => {
                const residentialOrderId = order.id
                  const plan = 'residential'
                router.push({name: 'ResForm', query: {residentialOrderId, plan} })
            }

            const continueResDocumentBtn = (order) => {
                const residentialOrderId = order.id
                  const plan = 'residential'
                  const type ='document'
                router.push({name: 'ResForm', query: {residentialOrderId, plan, type} })
            }

            const continueInstallation = (order) => {
                const orderId = order.id
                router.push({name: 'ScheduleInstallation', query: {orderId}})
            }
            // const viewBtn = () => {
            //     router.push({name: 'ResForm' })
            // }
        
            const addResidence = () => {
                router.push({name: 'choosePlan'})
            }

            // method to convert to title case
            const convertToTitleCase = (str) => {
                if (!str) {
                    return ""
                }

                return str.toLowerCase().split(' ').map((word, i) => {
                        return exceptions.includes(word) && i != 0 ? word : word.charAt(0).toUpperCase().concat(word.substr(1));
                    }).join(' ');
            } 
             
            return { addResidence, user, convertToTitleCase, userFirstName, orders, orderLength, continueResDocumentBtn, continueSmeDocumentBtn,
                scrollBack, scrollNext, daysToShow, startIndex, continueResBtn, continueSmeBtn, continueInstallation }
        }
    }
</script>

<style scoped>
     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
     @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@0,100..900;1,100..900&display=swap');
    .main-container {
        background-image: url('../assets/images/bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        /* overflow-x: hidden; */
        overflow-y: hidden;
        font-family: 'IBM Plex Sans', sans-serif;
    }

    .mini-container {
        margin: 30px auto 50px;
        text-align: center;
        background: #ffffff;
        width: 60%;
        border-radius: 20px;
        padding: 50px 3px 20px;
    }
    .heading {
        font-size: 22px;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        color: #212121;
    }
    .sub-heading {
        color: #353535;
        font-size: 16px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
    }
    .residences {
        margin: 50px auto;
    }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        /* margin: auto 50px; */
        /* height: 100vh; */
    }
    .centered {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .centered div {
        margin: 10px;
    }
    
    .residences .card {
        width: 100px;
        padding: 20px;
        text-align: center;
        margin: auto auto 20px auto;
        background: #CF7979;
        border-radius: 25px;
        border: 1px solid #FF0000;
        /* width: 75%; */
        /* height: 75px; */
        font-size: 34px;
        color: #ffffff;
        font-weight: 700;
        font-family: 'IBM Plex Sans', sans-serif;
        /* text-align: center;
        margin: auto;*/
        /* display: flex;
        justify-content: center;
        align-items: center; */
        /* height: 50%; */
    }
    .single-residence{
        /* background-color: aqua; */
        width: 50%;
        text-align: center;
        margin: auto;
        /* height: 250px; */
    }
    .single-residence:not(div.card){
        height: 300px;
        padding: 20px auto;
    }
    .centered .address, .centered .status{
        color: #000833;
        font-size: 16px;
    }
    .centered .address {
        font-weight: 500;
        margin: auto 15px 10px;
        height: 75px;
    }
    .centered .status {
        /* margin-top: 10px; */
        font-weight: 300;
    }
    .centered button {
        background: #DA1919;
        border-radius: 64px;
        border: transparent;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        /* padding: 5px 16px; */
        width: 140px;
        margin-top: 35px;
        /* position: static; */
    }
    .add-residence {
        margin-top: 30px;
        cursor: pointer;
    }
    .add-text {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #263238;
    }
    .add-icon {
        margin-right: 10px;
    }
    .add-icon img {
        width: 6%;
    }
    .arrow-btn{
        cursor: pointer;
    }

    @media (min-width: 768px) and (max-width: 992px) {
        .mini-container{
            width: 80%;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        .mini-container{
            width: 70%;
        }
        .centered button {
            font-size: 16px;
            max-width: 150px;
            margin-top: 0;
        }
        .centered {
            display: flex;
            flex-direction: column;
        }
    }
    @media  (max-width: 480px) {
        .mini-container{
            width: 70%;
        }
        .centered {
            display: flex;
            flex-direction: column;
        }
        .centered .address{
            height: 110px;
        }
        .single-residence:not(div.card){
            height: 350px;
        }
        .centered button {
            font-size: 16px;
            max-width: 120px;
            margin-top: 0;
        }
    }

</style>