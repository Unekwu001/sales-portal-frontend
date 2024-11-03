<template>
    <div class="main-container">
      <MainNavbar/>
      <div class="sme-header">
        <p class="sme-heading">FOS Residential Plans</p>
        <p class="sme-heading-text">Select from a range of plans with <span>unlimited data usage</span>  and <span>free on-net calls</span> </p>
        <p class="sme-sub-heading">Immerse Yourself in Unmatched Broadband Excellence</p>
        <div class="sme-header-button">
          <a @click="gotoRes" class="sme-link">Residential Plan</a>
          <!-- <a href="/plan/fos-residential-xtreme" class="xtreme-link"><span class="xtreme-text">Xtreme &nbsp; -->
            <a @click="gotoXtreme" class="xtreme-link"><span class="xtreme-text">Xtreme &nbsp;
            </span><span class="series-text"> Series </span></a>
        </div>
      </div>
  
      <div class="monthly-plan">
        <p class="monthly-plan-heading">Monthly <span>Plan</span></p>
  
        <div class="row monthly-plan-row">
        <div v-if="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        </div>
        <!-- <div v-else> -->
          <div v-else class="col-lg-4 col-md-6 col-sm-12 box" @click="selectPlan(planItem)" v-for="planItem in filteredPlanType" :key="planItem.id">

                <p class="plan-title" ref="packageName">{{ convertToTitleCase(planItem.planTypeName) }}</p>
  
                <p class="plan-price" ref="packagePrice"><del style="text-decoration-style: double;">N</del>{{ planItem.price.toLocaleString("en-US") }} <span>/ {{ planItem.paymentCycle.toLowerCase() }}</span></p>
                <p class="plan-speed">{{ planItem.dataAllowance }} data @ <span ref="packageSpeed">{{ planItem.bandSpeedValue }} {{ planItem.bandSpeedUnit }}</span></p>
                <div class="line1"></div>
              
                <div class="mid">
                  <!-- <div v-for="feature in planItem.keyFeatures" :key=feature.description><img src="../../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(feature.description) }}</span> 
                    <img src="../../assets/icons/exclamation-circle.png" alt="">
                  </div> -->
                  <div v-if="planItem.keyFeature1"><img src="../../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(planItem.keyFeature1) }}</span> 
                    <img src="../../assets/icons/exclamation-circle.png" alt="">
                  </div>
                  <div v-if="planItem.keyFeature2"><img src="../../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(planItem.keyFeature2) }}</span> 
                    <img src="../../assets/icons/exclamation-circle.png" alt="">
                  </div>
                  <div v-if="planItem.keyFeature3"><img src="../../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(planItem.keyFeature3) }}</span> 
                    <img src="../../assets/icons/exclamation-circle.png" alt="">
                  </div>
                </div>
        
                <div class="line2"></div>
                <!-- <p class="setup-charge" ref="packageSetUpCharge"><del style="text-decoration-style: double;">N</del> {{ planItem.setUpCharge.toLocaleString("en-US") }} </p> -->
                <p class="setup-charge" ref="packageSetUpCharge"><del style="text-decoration-style: double;">N</del> {{ genericSetUpCharge }} </p>
                <p class="setup-charge-label">Setup Charge</p>

          </div>
        <!-- </div> -->
   
      </div>
 
      </div>
  
      <div class="undertext">
        <span style="font-weight: 700;"><del style="text-decoration-style: double;">N</del>{{ genericSetUpCharge }} </span> Modem & Installation Charge on all Plans*
        <br> Phone Line(s) : {{ filteredPlan.phoneLine }}
      </div>
  
    </div>
  <MainFooter/>
  </template>
  
  <script>
  import MainNavbar from '@/components/MainNavbar.vue';
  import MainFooter from '@/components/MainFooter.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted } from "vue";
  import axios from 'axios';

  const apiUrl = process.env.VUE_APP_API_URL
  
    export default {
      components: {
        MainNavbar,
        MainFooter
      },
      name: 'FosRes',
      props: ['resData'],
      setup (props, {emit}) {
        const plans = ref([])
      const planId = ref(null)
      const xid = ref(null)
      const filteredPlan = ref([])
      const filteredPlanType = ref([])
      const packageName = ref(null)
      const packagePrice = ref('')
      const packageSpeed = ref('')
      const packageSetUpCharge = ref('')
      const genericSetUpCharge = ref('')

      const sortedData = ref([])

      let loading = ref(false)

      const route = useRoute()
      const router = useRouter()

      const exceptions = ['of', 'the', 'and', 'to'];

      // method to convert to title case
      const convertToTitleCase = (str) => {
        if (!str) {
            return ""
        }

        return str.toLowerCase().split(' ').map((word, i) => {
                  return exceptions.includes(word) && i != 0 ? word : word.charAt(0).toUpperCase().concat(word.substr(1));
              }).join(' ');
      } 
      
      onMounted(async()=>{
        try{
          loading.value = true
          const headers = { 'Content-Type': 'application/json' }

          // fetch all plans
            const response = await axios.get(`${apiUrl}/Plans/view-all-plans`, {headers: headers})
            plans.value = response.data
       
          // filter plans to get only for SME BROADBAND
            filteredPlan.value = plans.value.filter(plan => plan.planName === 'RESIDENTIAL BROADBAND')[0]
            const filteredPlanString = JSON.stringify(plans.value.filter(plan => plan.planName === 'RESIDENTIAL BROADBAND'), null, 2)
      
             planId.value = JSON.parse(filteredPlanString). map(plan => plan.id)

            //  const filteredPlanId = JSON.stringify(plans.value.filter(plan => plan.id === '3fa85f64-5717-4562-b3fc-2c963f66afa6'), null, 2)

            // //  const ResOrSme = JSON.parse(filteredPlanId). map(plan => plan.planName)
            //     const ResOrSme = JSON.parse(filteredPlanId).map(plan => plan.planName)[0]

            //     console.log('rrrrr', ResOrSme);
                

          const planTypeResponse = await axios.get(`${apiUrl}/Plans/view-active-plan-types/${planId.value}`, {headers: headers})
          filteredPlanType.value = planTypeResponse.data

          // genericSetUpCharge.value = planTypeResponse.data[0].setUpCharge

          genericSetUpCharge.value = filteredPlan.value.setUpCharge.toLocaleString("en-US")
           //sort data in ascending order based on plan price
          // sortedData.value = filteredPlanType.value.sort((a, b) => a.planTypeResponse - b.planTypeResponse)
          sortedData.value = filteredPlanType.value.sort((a, b) => a.price - b.price)

            return {filteredPlanType, planId}
          
        }catch (error) {
            console.log(error);
        }finally{
          loading.value = false
        }
        
    })

      const selectPlan = (planItem) => {
        const selectedPlanId = planId.value[0] //selected plan id
        const selectedPlanTypeId = planItem.id //selected plan type id

        const token = sessionStorage.getItem('token')
        // const coverageLocation = sessionStorage.getItem('coverageLocation')

       // confirm login token 
        if (token) { 
          if (window.location.href.includes('roi')) {
              const residentialOrderId = route.query.roi
              router.push({name: 'ResForm', query: {selectedPlanId, selectedPlanTypeId, residentialOrderId }} )
              
            }else{

              router.push({name: 'ResForm', query: {selectedPlanId, selectedPlanTypeId }} )
            }
        }
        // else if(token && !coverageLocation){
        //   router.push({name: 'FormRes', query: {selectedPlanId, selectedPlanTypeId }} )
        // }
        else {
          
          router.push({name: 'FormRes'} )
        }
          // router.push({path: '../purchase-plan'} )
      }
      const gotoXtreme = () =>{
        if (window.location.href.includes('roi')) {
          const roi = route.query.roi
            const plan = 'residential'
          router.push({name: 'FosResXtreme', query:{roi, plan}})
        } else {
          router.push({name: 'FosResXtreme'})
        }
      }

      const gotoRes = () =>{
        if (window.location.href.includes('roi')) {
          const roi = route.query.roi
          router.push({name: 'FosRes', query:{roi}})
        } else {
          router.push({name: 'FosRes'})
        }
      }

      return { router, plans, genericSetUpCharge, gotoXtreme,convertToTitleCase, loading, selectPlan, gotoRes,
        packageName, packagePrice, packageSpeed, packageSetUpCharge, filteredPlanType, planId, filteredPlan}
    }

      }
    
  </script>
  
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
  
    .main-container {
      background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
      /* overflow-x: hidden; */
    }
    .sme-header {
      margin: 20px auto 30px;
      /* text-align: center; */
    }
    .sme-header, .monthly-plan {
      text-align: center;
    }
    .sme-heading {
      font-size: 30px;
      font-weight: 700;
    }
    .sme-heading-text {
      color: #949DAB;
      font-weight: 400;
      font-size: 14px;
    }
    .sme-heading-text span {
      font-weight: 600;
    }
    .sme-sub-heading {
      font-weight: 500;
      color: #DA1919;
      font-size: 30px;
    }
    .sme-header-button {
      border: 1px solid grey;
      border-radius: 40px;
      width: 600px;
      /* Set the width of the container */
      height: 60px;
      /* Set the height of the container */
      display: inline-flex;
      justify-content: center;
      /* Center content horizontally */
      align-items: center;
      /* Center content vertically */
      text-align: center;
      cursor: pointer;
    }
    .sme-link {
      color: #ffffff;
      font-size: 15px;
      font-weight: 500;
      margin-left: 5px;
      border: none;
      background-image: linear-gradient(98.24deg, #000000 0%, #230000 100%);
      text-align: center;
      border-radius: 40px;
      height: 50px;
      width: 300px;
      text-decoration: none;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    .xtreme-link {
      /* background-color: #ffffff; */
      text-align: center;
      padding: 0px 0px 0px 0px;
      border-radius: 40px;
      height: 50px;
      width: 300px;
      justify-content: center;
      align-items: center;
      display: flex;
      margin-left: 0px;
      font-size: 15px;
      text-align: center;
      border: 0px solid white;
      text-decoration: none;
      margin-right: 7px;
      background: transparent;
    }
    .xtreme-link .xtreme-text {
    background: -webkit-linear-gradient(98.01deg, #DEAA35 0.3%, #E9AA0A 113.85%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
      font-weight: 700;
      font-style: italic;
    }
    .xtreme-link .series-text {
      color: #000000;
      font-weight: 500;
    }
    .monthly-plan {
      margin: 10px auto 0;
    }
    .monthly-plan-heading {
      font-size: 16px;
      font-weight: 500;
      /* margin: 10px auto; */
      /* text-align: center; */
      color: #000000;
    }
    .monthly-plan-heading span{
      color: #DA1919;
    }
    .monthly-plan-row {
      background: #000000;
      padding: 20px 50px;
    }
    /* .monthly-plan-row .box:not(.line1) { 
    } */
    .monthly-plan-row .box {
      border: 2px solid #FFFFFF33;
      border-radius: 24px;
      max-width: 30%;
      margin: 20px auto;
      padding: 34px 44px;
      text-align: center;
      background: #18181B;
      /* margin-left: 10px;
      margin-right: 10px; */
    }
    .monthly-plan-row .box:hover {
      border: 2px solid #DA1919;
      cursor: pointer;
      /* background: linear-gradient(#18181B, #18181B) padding-box,
                  linear-gradient(143.9deg, #1914F5 5.21%, #DA1919 65.35%) border-box; */
      /* border-image: linear-gradient(143.9deg, #1914F5 5.21%, #DA1919 65.35%) 1; */
    
      border-radius: 20px;
      /* border: 2px solid transparent; */
      /* border-image: linear-gradient(143.9deg, #1914F5 5.21%, #DA1919 65.35%) 1; */
    }
    .monthly-plan-row .box .plan-title {
      text-align: left;
      /* font-size: 14px; */
      font-size: 22px;
      font-weight: 600;
      /* font-weight: 400; */
      color: #ffffff;
    }
    .monthly-plan-row .box .plan-price {
      color: #ffffff;
      font-size: 30px;
      font-weight: 500;
      text-align: left;
    }
    .monthly-plan-row .box .plan-price span {
      color: #71717A;
      font-weight: 400;
      font-size: 14px;
    }
    .monthly-plan-row .box .plan-speed {
      color: #A1A1AA;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
    }
    .monthly-plan-row .box .plan-speed span {
      font-size: 20px;
      font-weight: 700;
      color: #FF0000;
    }
    
    .mid div{
      text-align: left;
      color: #ffffff;
      margin: 15px auto;
    }
    .mid div .mid-text {
      margin-left: 10px;
      margin-right: 30px;
    }
    .line1 {
      background: #A1A1AA;
      height: 1px;
      width: 100%;
      margin: auto 0;
      padding: 0;
    }
    .line2 {
      background: #ffffff;
      height: 1px;
      width: 100%;
    }
    .monthly-plan-row .box .setup-charge {
      color: #ffffff;
      font-size: 30px;
      font-weight: 500;
      text-align: left;
      margin-bottom: 0;
      margin-top: 15px;
    }
    .monthly-plan-row .box .setup-charge-label {
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      text-align: left;
      margin-top: 0;
    }
    .undertext {
      color: #000000;
      margin: 10px auto;
      padding: 34px 54px;
      font-weight: 400;
      font-size: 14px;
    }
    
    /* responsiveness */
    
    @media (min-width: 768px) and (max-width: 992px) {
      .monthly-plan-row .box {
          max-width: 45%;
        }
    }
    @media (min-width: 481px) and (max-width: 767px) {
      .sme-header {
        margin: 20px 20px 30px;
      }
      .sme-header-button {
        width: 75vw;
        justify-content: center;
      }
        .monthly-plan-row .box {
          max-width: 45%;
        }
    }
    
    @media (max-width: 480px) {
      .sme-header {
        margin: 20px 20px 30px;
      }
      .monthly-plan-row .box {
        max-width: 100%;
      }
      .sme-header-button {
        width: 75vw;
        justify-content: center;
      }
    }
</style>