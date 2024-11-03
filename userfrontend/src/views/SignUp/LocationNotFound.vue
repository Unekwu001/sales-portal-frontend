<template>
    <div class="container-fluid main-container">
        <MainNavbar/>
        <div class="row main-row">
            <div class="col-lg-5 col-md-6 co-sm-12 column1">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar-next" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                    <p class="heading">{{ locationData.Location }}<br> Sorry, we're not in your area yet.</p>
                    <p class="sub-text">ipNX coverage is currently unavailable in the location you searched. However, we are constantly expanding our network! We’ll notify you when we’re available in your area.</p>

                    <div class="success-icon-container">
                        <img src="../../assets/icons/Close.png" alt="" class="success-icon">
                    </div>

                    <div class="progress-btns">
                        <!-- <a class="back-btn" @click="$router.go(-1)">Back</a> -->
                        <a class="back-btn" @click="prevStep">Back</a>
                    </div>
         
            </div>
            <div class="col-lg-4 col-md-3 co-sm-12 column2">
                <img src="../../assets/images/vector.png" alt="vector" class="vector-image">
            </div>
        </div>

    </div>
    <!-- <MainFooter/> -->
</template>

<script>
    import MainNavbar from '../../components/MainNavbar.vue';
    import { useRouter } from "vue-router";
    export default {
        components: {
            MainNavbar,
        },
        name: 'LocationNotFound',
        // props: ['currentStep'],
        props: ['currentStep', 'searchData'],

        setup(props, {emit}) {
            const router = useRouter()
            const newStep = props.currentStep;
            const locationData = props.searchData

            // const state = reactive({
            //     location: props.locationData.Llocation
            // })

            const nextStep = () => {
                emit('step3-complete', {
                    newStep: 4,
                    location: locationData.Location
                    // Llocation: state.location,
                })
               
            };

            // const prevStep = () => {

            //    router.back();
            // }

            let previousLocationData = {
                newStep: 2,
                location: locationData.Location
            }
            const prevStep = () => {
                emit('prev-step', {
                    locationData: previousLocationData
                    
                })
              
            }


            return { nextStep, prevStep, newStep, locationData }
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap');
  .main-container {
        background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
        /* overflow-x: hidden; */
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
        font-family: 'Zen Kaku Gothic Antique', sans-serif;
        margin-bottom: 30px;
    }
    .sub-text {
        color: #949DAB;
        font-weight: 500;
    }
    .success-icon-container {
        margin: 50px auto;
        text-align: center;
    }
    .success-icon {
        width: 400px;
    }
    .back-btn {
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
            /* width: 350px; */
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