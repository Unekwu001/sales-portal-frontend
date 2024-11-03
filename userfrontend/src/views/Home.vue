<template>
    <div class="main-container">
        <InitialNavbar/>

    <header>
        <div class="header-container">
            <!-- <div>
              <h1 class="head-text">Explore the future of <br>connectivity with <br>ipNX FOS <br></h1>
              <p class="body-text">Cutting-Edge Fiber Optic Solutions That Redefine <br>Speed And Reliability. Step Into A World Of Seamless,
                <br>High-Speed Internet And Limitless Possibilities</p>
               -->
            <div class="row">
                <div class="col-lg-7 col-md-6 col-sm-12 text-column">
                    <!-- <p class="header-heading">Explore the future of<br> connectivity with<br> ipNX FOS</p> -->
                    <p class="header-heading">Explore the future of connectivity with ipNX FOS</p>
                    <p class="header-body-text">Cutting-Edge Fiber Optic Solutions That Redefine Speed And Reliability. Step Into A World Of Seamless,
                        High-Speed Internet And Limitless Possibilities</p>
                    <p class="header-body-text">To <a href="/pick-a-plan">Get Started,</a> Choose Between Our Residential Plans Or SME Plans Based On Your Preference.</p>

                    <div class="buttons" v-if="isLogin">
                        <router-link to="/welcome">
                            <button class="res-btn">Access Account</button>
                        </router-link>
                        
                    </div>
                    <div class="buttons" v-else>
                        <router-link to="/residential/signup">
                            <button class="res-btn">{{ resBtn }}</button>
                        </router-link>
                        <router-link to="/sme/signup">
                            <button class="sme" >{{ smeBtn }}</button>
                        </router-link>
                    </div>
                    <div class="socials">
                        <span class="social-icon"><a href="https:/www.facebook.com/ipnxnigeria"><img src="../assets/icons/home-facebook.png" alt="" width="30px"></a></span>
                        <span class="social-icon"><a href="https://twitter.com/ipNXTweet?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><img src="../assets/icons/home-twitter.png" alt="" width="30px"></a></span>
                        <span class="social-icon"><a href="https://ng.linkedin.com/company/ipnx-nigeria-limited"><img src="../assets/icons/home-linkedin.png" alt="" width="30px"></a></span>
                        <span class="social-icon"><a href="https://www.instagram.com/ipnxnigeria/?hl=en"><img src="../assets/icons/home-instagram.png" alt="" width="30px"></a></span>
                    </div>
                    <div class="contact">
                        <div class="call-sect">
                            <span class="call-svg">     
                                <img  src="../assets/icons/call.svg" alt="call">
                            </span>
                            <span><a href="tel:+234 0201 633 0000">+234 0201 633 0000</a></span>
                        <!-- <p class="phone-no">+23402016330000</p> -->
                        </div>
                        <div class="mail-sect">
                                <span class="mail"> <img src="../assets/icons/sms.svg" alt="sms"></span>
                                <span><a href="mailto:telesales@ipnxnigeria.net">telesales@ipnxnigeria.net</a></span>
                                    <!-- <p >sales@ipnxnigeria.net</p> -->
                        </div>
                    </div>
                </div>
            <!-- <div> -->
              <!-- <img src="../assets/images/low-angle-guy-with-headphones-smiling 1.png" alt="picture" class="guy-image"> -->
                <div class="col-lg-5 col-md-6 col-sm-12 header-img">
                    <img src="../assets/images/Residential-homepage.png" alt="" width="100%">
                </div>
            </div>
            
        </div>
    </header>

    <!-- <main> -->
        <!-- <div class="container">
            <div class="row">
                <h1>Best Plans Just For You</h1>
                <p>Dive into our sales portal and discover personalized options designed to match your unique needs and preferences. 
                    Elevate your internet experience with <span style="color: red; font-weight: bold;">ipNX</span> today!</p>
            </div>
        </div> -->

        <div class="grid-container">
            <h1>Best Plans Just For You</h1>
            <p>Dive into our sales portal and discover personalized options designed to match your unique needs and preferences. Elevate your internet experience with <span style="color: red; font-weight: bold;">ipNX</span> today!</p>
        
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-12 card rounded-0" @click="residentialPlan">
                    <img src="../assets/images/grid1.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-heading heading1"> Residential </p>
                        <p class="card-text">Discover reliable connectivity and tailored options for every household need. Get started today!</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 card middle-card rounded-0" @click="smePlan">
                    <img src="../assets/images/grid2.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-heading heading2"> SME </p>
                        <p class="card-text">Enjoy streamlined connectivity and flexible options crafted for your success. Find the perfect solution for your growing venture! </p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 card rounded-0" @click="xtremePlan">
                    <img src="../assets/images/grid3.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <p class="card-heading heading3"> Xtreme </p>
                        <p class="card-text">Elevate your online experience to new heights with lightning-fast connectivity and premium features.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="testimonial">
            <p class="heading">Testimonial</p>
            <p class="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            </p>
            <div class="img">
                <img src="../assets/images/Ellipse.png" alt="">
                <p class="name">Nemo enim ipsam</p>
            </div>
        </div> -->

    <!-- </main> -->
    </div>
    <Footer/>
</template>

<script>
import InitialNavbar from '@/components/InitialNavbar.vue';
import Footer from '@/components/MainFooter.vue';
import axios from 'axios';
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const apiUrl = process.env.VUE_APP_API_URL

export default {
    components: {
        InitialNavbar,
        Footer
    },  
    setup() {
        const route = useRoute()
        const router = useRouter()
        const butt = ref('My ipNX')
        const resBtn = ref('Residential plans')
        const smeBtn = ref('SME plans')
        const isLogin = ref(false)

        // plans methods
        const residentialPlan = () => {
            router.push({path: '/plan/fos-residential'})
        }
        const smePlan = () => {
            router.push({path: '/plan/fos-sme'})
        }
        const xtremePlan = () => {
            router.push({path: '/plan/fos-sme-xtreme'})
        }

        const token = sessionStorage.getItem('token')
        if (token) {
            isLogin.value = true
        }else{
            isLogin.value = false
        }

     
        // check number of website visits
        onMounted(async() => {
            // console.log(route.name);
            try {
                const headers = { 'Content-Type': 'application/json' }
                const response = await axios.post(`${apiUrl}/AdminDashBoardStats/website-visit`, {headers: headers})
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        })

        return { butt, resBtn, smeBtn, residentialPlan, smePlan, xtremePlan, isLogin }
    }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap'); */
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
    .main-container {
        /* overflow-x: hidden; */
        margin-bottom: 20px;
        /* font-family: 'IBM Plex Sans', sans-serif; */
    }

    /* .header-body{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 10px 130px 10px;
        padding: 60px;
        height: 500px;
    } */
    .header-container {
        margin: 50px 80px 120px;
    }
    div.text-column {
        margin-top: 10px;
    }
    .header-heading, .header-body-text {
        margin: auto 30px;
    }
    .header-heading {
        /* background-image: linear-gradient(261.15deg, #C10202 33.82%, #A31616 57.13%, #9B0505 81.9%); */
        background: -webkit-linear-gradient(261.15deg, #C10202 33.82%, #A31616 57.13%, #9B0505 81.9%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: 'Poppins', sans-serif;
        /* font-size: 56px; */
        font-size: 50px;
        font-weight: 700;
        text-align: left;
    }
    .header-body-text {
        color: #263238;
        font-family: 'Montserrat', sans-serif;
        font-size: 20px;
        font-weight: 400;
    }
    .header-body-text a {
        color: #DA1919;
    }
    .text-column p:nth-child(2) {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* .guy-image{
    width: 350px;
    position: relative;
    }
    .head-text{
    margin-bottom: 25px;
    padding: 20px;
    font-size: 50px;
    margin-left: 8px;
    text-align: left;
    background: linear-gradient(to right, #C10202,#A31616,#9B0505);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        /* line-height: 50px; */
        /* font-weight: bolder;
    
    } */
    /* .body-text{
    text-align: left;
    padding-left: 28px;
    }  */
    .buttons{
    padding-left: 28px;
    margin-top: 40px;
    /* margin-right: 209px; */
    
    }
    .res-btn, button.sme {
        width: 200px;
        /* height: 45px; */
        border-radius: 45px;
        cursor: pointer;
        padding: 15px 10px;
    }
    .res-btn{
        background-color: #FFFFFF;
        border: 2.5px solid #DA1919;
        color: #DA1919;
        margin-right: 10px; 
    }
    .sme{
        background-color: #DA1919;
        color: #FFFFFF;
        border-color: #DA1919;
        border-width: 1px;
    }
    .res-btn:hover{
    background-color: #DA1919;
    color: #FFFFFF;
    transition: background 0.5 ease;
    }
    .sme:hover{
    border-radius: 45px;
    background-color: #FFFFFF;
    border: 2.5px solid #DA1919;

    color: #DA1919;
    margin-right: 5px; 
    }
    .socials{
        margin: 15px 0px 10px 35px;
    }
   
    .contact{
        display: flex;
        /* margin-left: 25px; */
        margin: 15px 0px 10px 35px;
    
    }

    .call-sect, .mail-sect{
        margin-right: 5px;
        cursor: pointer;
    }
    .call-sect span a, .mail-sect span a{
        text-decoration: none;
        color: inherit;
    }
    .call-svg, .mail{
        margin-right: 5px;
    }

    .social-icon {
        padding-right: 10px;
    }

    /* lower body */
    h1{
    text-align: justify;
    font-weight: 600;
    font-size: 30px;
    font-family: poppins;
    color: black;
    /* margin-top: 30px; */
    }
    p{
    text-align: justify;
    font-family: poppins;
    font-weight: light;
    /* margin-top: 20px; */
    margin-right: 17px;
    }

    /* .dot {
    height: 130px;
    width: 130px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-top: 20px
    } */


    /* .column{
    float: inline-start;
    width: 100%;
    padding: 0px;
    margin-left: 0%;
    } */

    /* .row{
    float: inline-start;
    border: 1px solid grey;
    width: 27%;
    height: 400px;
    background-color: transparent;
    margin-left: 5%;
    margin-bottom: 40px;
    } */

    h2{
    color: red;
    text-align: justify;
    font-size: 24px;
    font-weight: 700;
    font-family: Montserrat;
    margin-left: 30px;
    margin-top: 30px;
    margin-bottom: 20px ;
    }

    h3{
    color: black;
    text-align: justify;
    font-size: 24px;
    font-weight: 700;
    font-family: Montserrat;
    margin-left: 30px;
    margin-top: 30px;
    margin-bottom: 20px ;
    }

    h4{
    color: #FFA100;
    text-align: justify;
    font-size: 24px;
    font-weight: 700;
    font-family: Montserrat;
    margin-left: 30px;
    margin-top: 30px;
    margin-bottom: 20px ;
    }

    h5{
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: black;
    font-family: poppins;
    }

    p1{
    color: black;
    text-align: justify;
    font-size: 12px;
    font-weight: 700px;
    font-family: poppins;
    margin-left: 30px;
    margin-top: 10px;
    display: block;
    margin-right: 30px;
    }

    p3{
    color: black;
    text-align: justify;
    font-size: 12px;
    font-weight: 700px;
    font-family: Montserrat;
    margin-left: 30px;
    margin-top: 10px;
    display: block;
    margin-right: 30px;
    }

    p2{
    color: black;
    text-align: justify;
    font-size: 12px;
    font-weight: 700px;
    font-family: Montserrat;
    margin-left: 30px;
    margin-top: 10px;
    display: block;
    margin-right: 30px;
    }

    p4{
    text-align: center;
    margin-bottom: 100px;
    }

    .card {
        padding: 0;
        border-radius: none;
        margin-right: 5px;
        margin-left: 10px;
        cursor: pointer;
    }
    /* .middle-card {
        margin-left: 5px;
        margin-right: 5px;
    } */
    .card-body {
        padding: 25px 45px;
    }
    .card-body .card-heading {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 20px;
    }
    .card-body .heading1 {
        color: #DA1919;
    }
    .card-body .heading2 {
        color: #000000;
    }
    .card-body .heading3 {
        color: #FFA100;
    }
    .card .card-text {
        text-align: left;
        font-size: 15px;
    }
    .card img {
        width: 100%;
    }
    div.testimonial {
        margin-top: 50px;
    }
    .testimonial p, .testimonial {
        text-align: center;
        margin: auto;
    }
    .testimonial .heading {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 26px;
        color-scheme: #000000;
    }
    .testimonial .text, .name {
        font-family: 'Montserrat',sans-serif;
        font-weight: 400;
    }
    .testimonial .text {
        font-size: 16px;
    }
    .name {
        font-size: 14px;
        margin-top: 10px;
    }
    .img img{
        margin: 20px auto;
    }
    .grid-container {
        margin: auto 80px;
        text-align: center;
    }

    @media  (min-width: 1024px) {
        .card {
            width: 31.33%;
        }
        
    }
    @media  (min-width: 992px) and (max-width: 1024px) {
        .card {
            width: 31%;
        }
        
    }
    @media (min-width: 768px) and (max-width: 991px) {
        /* .header-body {
            margin-top: 120px;
        } */
        /* .guy-image {
            margin: 0;
        } */
        .header-container {
            margin: 50px;
        }
        .header-heading {
            font-size: 44px;
            text-align: left;
        }
        div.text-column {
            margin-top: 0;
        }
        .header-body-text {
            font-size: 16px;
            text-align: left;
        }
    
        .res-btn {
            margin: 10px auto;
        }
        .call-sect, .mail-sect{
            display: flex;
        }
        .call-svg, .mail{
            display: flex;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            margin: auto 0;
        }
        .contact{
            display: block;
        
        }
        .card {
            width: 31.33%;
            margin: 5px 4px;
        }
        .grid-container {
            /* margin: auto 80px;  */
            margin: auto 80px;
            text-align: center;
        }
        .card-body {
            padding: 25px;
        }
       
    }

    @media (min-width: 481px) and (max-width: 767px) {
        .main-container {
            margin: auto 10px;
        }
        .header-container {
            margin: 30px 50px;
        }
        .grid-container {
            margin: auto 80px;
            text-align: center;
        }
        .card {
            /* margin: 5px 10px 10px; */
            margin-left: 0;
            margin-bottom: 10px;
        }
        /* .guy-image {
            width: 300px; 
            margin-top: 20px;
        } */

        div.buttons {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
        }
        .res-btn {
            margin-bottom: 10px;
        }
        .buttons, .socials, .contact .call-sect, .contact .mail-sect {
            text-align: center;
            margin: auto;
        }
        .buttons, .socials, .contact {
            margin: 10px auto;
        }
        /* .header-container {
            margin: 50px 15px;
        } */
        .header-heading {
            font-size: 44px;
            text-align: left;
        }
        .header-body-text {
            font-size: 16px;
            text-align: left;
        }
    
        div.testimonial {
            margin-bottom: 10px;
        }
    }

    @media (max-width: 480px){
        .header-container {
            margin: 50px 20px;
        }
        .header-heading, .header-body-text {
            margin: auto 0;
        }
        .header-heading {
            font-size: 38px;
        }
        .header-img {
            display: none;
        }
        .buttons {
            display: flex;
            flex-direction: column;
           text-align: center;
           margin: 20px auto;
           padding-left: 0;
        }
        .res-btn {
            margin-bottom: 10px;
        }
        .contact {
            display: block;
        }
        .contact .call-sect, .mail-sect{
            margin: 20px auto;
        }
        .buttons, .socials, .contact {
            text-align: center;
            margin: auto;
            margin: 10px auto;
        }
        .grid-container {
            margin: auto 20px;
        }
        .card{
            width: 95%;
            margin: 5px 4px;
        }
        .middle-card{
            margin: 20px auto;
        } .card-body {
            padding: 15px;
        }
        .grid-container h1{
            text-align: left;
            font-size: 24px;
        }
    }
</style>