<template>
    <div class="main-container">
        <MainNavbar/>
        <div class="row main-row">
            <div class="col-lg-12 col-md-12 col-sm-12 column1">
               <p class="heading">Find Your Perfect Plan: <br>Choose Your Preference!</p>
               <!-- <p class="heading">Choose Your Preference!</p> -->

               <div class="buttons">
                    <div class="residential">
                        <button class="res-btn" @click="residentialButton">Residential Plans</button>
                    </div>
                    <div class="sme">
                        <button class="sme-btn" @click="smeButton" >SME Plans</button>
                    </div>
                </div>
            </div>
            <!-- <div class="col-lg-4 col-md-5 col-sm-12 column2">   
                <img src="../../assets/images/vector.png" alt="vector" class="vector-image">  
            </div> -->
        </div>

    </div>
    <MainFooter />
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue'
import MainFooter from '@/components/MainFooter.vue'
import { useRouter } from 'vue-router'

    export default {
        components: {
            MainNavbar,
            MainFooter
        },
        setup() {
            const router = useRouter()
            const residentialButton = () => {
                router.push({path: '/residential/signup'})
            }

            const smeButton = () => {
                router.push({path: '/sme/signup'})
            }

            return { residentialButton, smeButton}
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

.main-row {
    /* padding: 100px 30px 40px 190px; */
    padding: 100px auto;
    margin: 50px auto;
    text-align: center;
}
.heading {
    font-family: 'IBM Plex Sans';
    font-size: 30px;
    font-weight:700;
    color: #263238;
}
.buttons{
    margin: 0 auto 80px;
}
.buttons > div {
    margin-bottom: 20px;
    margin-right: 10px;
    display: inline-block;
}
.res-btn, .sme-btn {
    width: 250px;
    border-radius: 45px;
    cursor: pointer;
    padding: 15px 10px;
}
.res-btn{
    background-color: #FFFFFF;
    border: 2.5px solid #DA1919;
    color: #DA1919;
    /* margin-right: 10px;  */
}
.sme-btn{
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
.sme-btn:hover{
    border-radius: 45px;
    background-color: #FFFFFF;
    border: 2.5px solid #DA1919;

    color: #DA1919;
    margin-right: 5px; 
}
.column2 {
    margin: 40px auto;
}
.vector-image {
    width: 500px;
}

/* .vector-image-responsive {
    display: none;
} */

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
        padding: 100px 30px 30px;
        text-align: center;
        margin: auto;
    }
    .vector-image {
        width: 450px;
        display: none;
    }
    /* .vector-image-responsive {
        display: block;
        width: 450px;
    } */
}

@media  (max-width: 480px) {
    .main-row {
        padding: 100px 30px 30px;
        text-align: center;
        margin: auto;
    }
    .vector-image {
        display: none;
    }
    .res-btn, .sme-btn {
        max-width: 175px;
        padding: 10px 7px;
    }
    .heading{
        font-size: 22px;
    }
    /* .vector-image-responsive {
        display: block;
        width: 350px;
    } */
    
}
</style>