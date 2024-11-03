<template>
    <div class="main-container">
        <MainNavbar/>
        <div class="row main-row">
            <!-- loadinng spinner -->
            <Spinner :loading="isLoading" />

            <div class="col-lg-5 col-md-6 col-sm-12 column1">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="heading">Search for Availability of ipNX in Your Location.</p>

                <img src="../../../assets/images/vector.png" alt="vector" class="vector-image-responsive">  

                <p class="sub-heading">
                    <!-- Explore this network availability tool to determine if ipNX services are accessible in your location. -->
                    Discover if ipNX's high-speed internet and premium services are accessible at your location. Simply enter your address to find out.
                </p>
                <div class="input-group search-input">
                    <div class="arrow-icon-container">
                        <!-- <form @submit.prevent="searchLocation()"> -->
                        <form>
                            <!-- <input type="text" v-model="state.test"> -->
                        <div class="arrow-icon">
                            <!-- <a href="/location-found"> -->
                                <button type="button" @click="searchLocation()">
                                    <img src="../../../assets/icons/arrow.png" alt="">
                                </button>
                            <!-- </a> -->
                        </div>

                        <input type="text" class="form-control" style="padding-right: 50px;" placeholder="Search Street Name" v-model="state.Location" :disabled="isLoading">
                        <div class="dropdown">
                            
                                
                                <!-- <div class="dropdown-content" v-if="state.searchResponse"> -->
                                <div class="dropdown-content" v-if="!searchBtn">
                                <a v-for="item in state.searchResponse" :key="item.id" href="#" @click="selectSuggestion(item)">{{ item }}</a>
                                
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
<!-- <button @click="prevStep">back</button> -->
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12 column2">   
                <img src="../../../assets/images/vector.png" alt="vector" class="vector-image">  
            </div>
        </div>
<!-- 
        <v-overlay v-model="state.loading">
            <v-progress-circular
            indeterminate
            color="primary">
            </v-progress-circular> 
        </v-overlay> -->

    </div>
</template>

<script>
    import MainNavbar from '../../../components/MainNavbar.vue';

    import { ref, reactive, computed, watch, onMounted } from 'vue'
    import useVuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators'
    import axios from 'axios';
    import { useRouter } from "vue-router";
    import Spinner from '@/components/Spinner.vue';

    const apiUrl = process.env.VUE_APP_API_URL
    const router = useRouter()

    export default {
        components: {
            MainNavbar, Spinner
        },

        name: 'Location',
       
        props: ['searchData', 'resData'],

        setup(props, { emit }) {
            const isLoading = ref(false)
            const isSearch = ref(false)
            const searchBtn = ref(false)
            // const answer = ref('')
            const enteredAddress = props.resData.address
            const userEmail = props.resData.email

            onMounted(() => {
                state.Location = props.resData ? props.resData.address : props.searchData.Location
            })


            const state = reactive({
                Location: props.searchData ? props.searchData.Location : '',
                // userEmail: props.resData.contactPersonEmail,
                searchResponse: ref([]),
            })
            const rules = computed(() => {
                return {
                    Location: { required },
                }
            })

            const v$ = useVuelidate(rules, state)

            const searchLocation = async() =>{
                v$.value.$validate()
                if (!v$.value.$error) {
                    try {
                        // loading.value = true
                        isLoading.value = true
                        const response = await axios.get(`${apiUrl}/NetworkCoverage/check-network-coverage-availability?Location=${state.Location}`)
        
                        // if (response.data.message == 'your location seems to be outside ipNX Network Coverage Area. Type in a more descriptive address.') {
                        if (response.data.isWithinRange === false) {
                            emit('step2-incomplete', {
                                Location: state.Location
                            })
                        }else {

                            emit('step2-complete', {
                                Location: state.Location
                            })
                        }
                        // router.push({name: 'Location'})
                    } catch (error) {
                        console.log(error);
                        // isLoading.value = true
                        emit('step2-incomplete', {
                            Location: state.Location
                        })
                        // router.push({name: 'LocationNotFound'})
                    }finally{
                        setTimeout(() => {
                            isLoading.value = false
                        }, 2000)
                    }
                }
            }

        //    location suggestion
        // const watchStop =
        watch(() => state.Location, async(newValue) => {
        try {
          isSearch.value = true
          const headers = { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        }

            if (isSearch.value === true && searchBtn.value === false) {
                
                const searchResponse = await axios.get(`${apiUrl}/NetworkCoverage/get-location-suggestions?userInput=${newValue}`, {headers: headers})
                state.searchResponse = searchResponse.data
            }

        } catch (error) {
          console.log(error);

        }
      });
  
      const selectSuggestion = (item) => {
        state.Location = item;

        isSearch.value = false
        searchBtn.value = true
      };

            return { state, v$, searchLocation, isLoading, enteredAddress, selectSuggestion, searchBtn }
        }, 

    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@0,100..900;1,100..900&display=swap');
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
        background-color: #ff0000;
    } 
    .heading {
        color: #000000;
        font-weight: 700;
        font-size: 30px;
        font-family: 'Lato', sans-serif;
        margin-bottom: 30px;
    }
    .sub-heading {
        font-size: 16px;
        font-weight: 400;
        color: #A39F9F;
    }
    .search-input {
        width: 75%;
    }
    .search-input .form-control {
        background-color: #D9D9D9;
        /* color: #A39F9F; */
        padding: 15px;
        width: 300px;
        box-shadow: none;
    }
    input[type=text]::placeholder {
        color: #949DAB;
        font-weight: 300;
    }
    .search-input .form-control:focus {
        border-color: #DA1919;
        color: #000000;
        padding-right: 90px !important;
    }
    .arrow-icon-container {
        position: relative; 
        display: flex; 
        align-items: center; 
    }
    .arrow-icon {
        position: absolute; 
        top: 0; 
        right: 0; 
        background-color: #DA1919; 
        border-radius: 25px; 
        padding: 12px 20px; 
        width: 80px; 
        display: flex; 
        justify-content: center; 
        align-items: center;
    }
    .arrow-icon button {
        background: transparent;
        border: transparent;
    }
    
    div.input-group-text .btn {
        border: 50px;
        /* width: 15px; */
    }

    .form-control, div.input-group-text .btn {
        border-radius: 30px;
    }
    div.input-group-text {
        border-radius: 0 30px 30px 0px !important;
        /* border-radius: 30px !important; */
        /* position: absolute;
        right: 0; */
    }
    .column2 {
        margin: 40px auto;
    }
    .vector-image {
        width: 500px;
    }

    .vector-image-responsive {
        display: none;
    }

    /* suggestion */
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: block;
  /* position: absolute; */
  background-color: #f9f9f9;
  min-width: 120px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  
  /* min-width: 160px; */
  max-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  /* border: 1px solid #ccc; */
}
.dropdown:hover, .dropdown-content {
  display: block;
}
.dropdown-content a{
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover{
  background-color: #f1f1f1;
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
            padding: 100px 30px 30px;
        }
        .heading {
            font-size: 22px;
        }
        .sub-heading, .search-input {
            margin-top: 30px;
        }
        .search-input {
            margin-bottom: 0;
            width: 100%;
        }
        .search-input .form-control {
            width: 400px;
        }
        .vector-image {
            width: 450px;
            display: none;
        }
        .vector-image-responsive {
            display: block;
            width: 450px;
        }
    }

    @media  (max-width: 480px) {
        .main-row {
            padding: 100px 30px 30px;
        }
        .heading {
            font-size: 22px;
        }
        .sub-heading {
            text-align: justify;
        }
        .sub-heading, .search-input {
            margin-top: 30px;
        }
        .search-input {
            margin-bottom: 0;
            width: 100%;
        }
        .vector-image {
            display: none;
        }
        .vector-image-responsive {
            display: block;
            width: 350px;
        }
        .search-input .form-control {
            width: 315px;
    }

    }
    
</style>