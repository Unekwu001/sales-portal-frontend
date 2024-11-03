<template>
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
                  <!-- <div v-for="feature in planItem.keyFeatures" :key=feature.description><img src="../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(feature.description) }}</span> 
                    <img src="../assets/icons/exclamation-circle.png" alt="">
                  </div> -->
                  <div v-if="planItem.keyFeature1"><img src="../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(planItem.keyFeature1) }}</span> 
                    <img src="../assets/icons/exclamation-circle.png" alt="">
                  </div>
                  <div v-if="planItem.keyFeature2"><img src="../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(planItem.keyFeature2) }}</span> 
                    <img src="../assets/icons/exclamation-circle.png" alt="">
                  </div>
                  <div v-if="planItem.keyFeature3"><img src="../assets/icons/check-circle.png" alt=""> 
                    <span class="mid-text">{{ convertToTitleCase(planItem.keyFeature3) }}</span> 
                    <img src="../assets/icons/exclamation-circle.png" alt="">
                  </div>
                
                </div>
        
                <div class="line2"></div>
                <!-- <p class="setup-charge" ref="packageSetUpCharge"><del style="text-decoration-style: double;">N</del> {{ planItem.setUpCharge.toLocaleString("en-US") }} </p> -->
                <p class="setup-charge" ref="packageSetUpCharge"><del style="text-decoration-style: double;">N</del> {{ genericSetUpCharge }} </p>
                <p class="setup-charge-label">Setup Charge</p>

          </div>

        <!-- <div class="col-lg-4 col-md-6 col-sm-12 box" @click="plansMethod('Signature', '105,800', '300 Mbps')">
          <p class="plan-title">Signature</p>
          <p class="plan-price"><del style="text-decoration-style: double;">N</del> 105,800 <span>/ month</span></p>
          <p class="plan-speed">Unlimited data @ <span>300 Mbps</span></p>
          <div class="line1"></div>
        
          <div class="mid">
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
          </div>

          <div class="line2"></div>
          <p class="setup-charge"><del style="text-decoration-style: double;">N</del> 68,625 </p>
          <p class="setup-charge-label">Setup Charge</p>

        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 box" @click="plansMethod('Executive', '170,500', '500 Mbps')">
          <p class="plan-title">Executive</p>
          <p class="plan-price"><del style="text-decoration-style: double;">N</del> 170,500 <span>/ month</span></p>
          <p class="plan-speed">Unlimited data @ <span>500 Mbps</span></p>
          <div class="line1"></div>
        
          <div class="mid">
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
          </div>

          <div class="line2"></div>
          <p class="setup-charge"><del style="text-decoration-style: double;">N</del> 68,625 </p>
          <p class="setup-charge-label">Setup Charge</p>
          
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 box" @click="plansMethod('Prestige', '287,600', '1000 Mbps')">
          <p class="plan-title">Prestige</p>
          <p class="plan-price"><del style="text-decoration-style: double;">N</del> 287,600 <span>/ month</span></p>
          <p class="plan-speed">Unlimited data @ <span>1000 Mbps</span></p>
          <div class="line1"></div>
        
          <div class="mid">
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../assets/icons/exclamation-circle.png" alt=""></div>
          </div>

          <div class="line2"></div>
          <p class="setup-charge"><del style="text-decoration-style: double;">N</del> 68,625 </p>
          <p class="setup-charge-label">Setup Charge</p>
          
        </div> -->
        
      </div>
    </div>

      <div class="undertext">
        <span style="font-weight: 700;"><del style="text-decoration-style: double;">N</del>{{ genericSetUpCharge }} </span> Modem & Installation Charge on all Plans*
        <!-- <span style="font-weight: 700;">{{ filteredPlan.setUpCharge.toLocaleString("en-US") }} </span> Modem & Installation Charge on all Plans* -->
        <br> Phone Line(s) : {{ filteredPlan.phoneLine }}
      </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const apiUrl = process.env.VUE_APP_API_URL

    export default {

      setup () {

        const router = useRouter()
        const route = useRoute()
        // const rId = ref(null) //res
        // const sId = ref(null) //sme
        const plans = ref([])
      const planId = ref(null)
      const filteredPlan = ref({})
      const filteredPlanType = ref([])
      const packageName = ref(null)
      const packagePrice = ref('')
      const packageSpeed = ref('')
      const packageSetUpCharge = ref('')
      const currentPath = ref('')
      const genericSetUpCharge = ref('')
      let loading = ref(false)

      const sortedData = ref([])
      
      const exceptions = ['of', 'the', 'and', 'to'];

      currentPath.value = route.path || router.currentRoute.value.fullPath

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
         
          // filter plans to get only for XTREME SERIES
            filteredPlan.value = plans.value.filter(plan => plan.planName === 'XTREME SERIES')[0]
            const filteredPlanString = JSON.stringify(plans.value.filter(plan => plan.planName === 'XTREME SERIES'), null, 2)
         
             planId.value = JSON.parse(filteredPlanString). map(plan => plan.id)

          const planTypeResponse = await axios.get(`${apiUrl}/Plans/view-active-plan-types/${planId.value}`, {headers: headers})
          filteredPlanType.value = planTypeResponse.data

          // genericSetUpCharge.value = planTypeResponse.data[0].setUpCharge
          genericSetUpCharge.value = filteredPlan.value.setUpCharge.toLocaleString("en-US")

          // console.log(JSON.stringify(filteredPlanType.value, null, 2));

          //sort data in ascending order based on plan price
          // sortedData.value = filteredPlanType.value.sort((a, b) => a.planTypeResponse - b.planTypeResponse)
          sortedData.value = filteredPlanType.value.sort((a, b) => a.price - b.price)

          // console.log('sorted', sortedData.value);

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

       // confirm login token 
        if (token) { 
       
          if (currentPath.value.includes('residential')) {
            const plan = 'residential'
            if (window.location.href.includes('roi')) {
              const residentialOrderId = route.query.roi
              router.push({name: 'ResForm', query: {selectedPlanId, selectedPlanTypeId, residentialOrderId, plan }} )
            } else {  
              router.push({name: 'ResForm', query: {selectedPlanId, selectedPlanTypeId, plan }} )
            }

          }else if(currentPath.value.includes('sme')){
            const plan = 'sme'
            if (window.location.href.includes('roi')) {
              const smeOrderId = route.query.roi
              router.push({name: 'SmeForm', query: {selectedPlanId, selectedPlanTypeId, smeOrderId, plan }} )
            } else {
              router.push({name: 'SmeForm', query: {selectedPlanId, selectedPlanTypeId, plan }} )
            }

          }

        }else {
          if (currentPath.value.includes('residential')) {
            router.push({name: 'FormRes'} )
          } else if (currentPath.value.includes('sme')) {
            router.push({name: 'FormSme'} )
          }
        }
      }

        return { router, plans, convertToTitleCase, loading, selectPlan, genericSetUpCharge,
          packageName, packagePrice, packageSpeed, packageSetUpCharge, filteredPlanType, planId, filteredPlan}
      }
    }
</script>

<style scoped>
.monthly-plan {
  margin: 10px auto 0;
}
.monthly-plan-heading {
  font-size: 16px;
  font-weight: 500;
  margin: 10px auto;
  text-align: center;
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
  /* border-width: 2px;
  border-style: solid; */
  background: linear-gradient(#18181B, #18181B) padding-box, 
              linear-gradient(98.24deg, #EBA41C 0%, #E4530E 87.91%, #DC0000 100%) border-box;

  /* border-image: linear-gradient(143.9deg, #1914F5 5.21%, #DA1919 65.35%) 1; */

  border-radius: 20px;
  border: 2px solid transparent;
  /* border-image: linear-gradient(143.9deg, #1914F5 5.21%, #DA1919 65.35%) 1; */
}
.monthly-plan-row .box .plan-title {
  text-align: left;
  /* font-size: 14px;
  font-weight: 400; */
  font-size: 22px;
  font-weight: 600;
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
  text-align: left;
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
    .monthly-plan-row .box {
      max-width: 75%;
    }
}

@media (max-width: 480px) {
  .monthly-plan-row .box {
    max-width: 100%;
  }

}
</style>