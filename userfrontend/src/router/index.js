import { createRouter, createWebHistory } from 'vue-router'

// import Location from '@/views/SignUp/Location.vue'
import LocationNotFound from '@/views/SignUp/LocationNotFound.vue'
import Home from '@/views/Home.vue'
import SuccessfulPayment from '@/views/SuccessfulPayment.vue'
import FormRes from '@/views/SignUp/residential/FormRes.vue'
import FormSme from '@/views/SignUp/sme/FormSme.vue'
import FosSmeXtreme from '@/views/Plans/FosSmeXtreme.vue'
import FosResXtreme from '@/views/Plans/FosResXtreme.vue'
import FosSme from '@/views/Plans/FosSme.vue'
import FosRes from '@/views/Plans/FosRes.vue'
import ScheduleInstallation from '@/views/ScheduleInstallation.vue'
import Verify from '@/views/Login/Verify.vue'
import choosePlan from '@/views/SignUp/choosePlan.vue'
import Welcome from '@/views/Welcome.vue'
import ResForm from '@/views/Plans/Residential/ResForm.vue'
import SmeForm from '@/views/Plans/Sme/SmeForm.vue'
// import Receipt from '@/views/Receipt.vue'
// import Form12 from '@/views/SignUp/sme/Form1.2.vue'
import VerifySignUp from '@/views/SignUp/Verify.vue'
import PaymentProcess from '@/views/PaymentProcess.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/residential/signup',
    name: 'FormRes',
    component: FormRes
  },
  {
    path: '/sme/signup',
    name: 'FormSme',
    component: FormSme
  },
  // {
  //   path: '/location',
  //   name: 'location',
  //   component: Location
  // },
  
  {
    path: '/location-not-found',
    name: 'LocationNotFound',
    component: LocationNotFound
  },
 
  {
    path: '/successful-payment',
    name: 'SuccessfulPayment',
    component: SuccessfulPayment
  },

  {
    path: '/plan/fos-sme-xtreme',
    name: 'FosSmeXtreme',
    component: FosSmeXtreme
  },
  {
    path: '/plan/fos-residential-xtreme',
    name: 'FosResXtreme',
    component: FosResXtreme
  },

  {
    path: '/plan/fos-sme',
    name: 'FosSme',
    component: FosSme
  }, 
  {
    path: '/plan/fos-residential',
    name: 'FosRes',
    component: FosRes
  },

  {
    path: '/schedule-installation',
    name: 'ScheduleInstallation',
    component: ScheduleInstallation
  },
  // verify for login
  {
    path: '/verify',
    name: 'Verify',
    component: Verify
  },
  {
    path: '/pick-a-plan',
    name: 'choosePlan',
    component: choosePlan
  }, 
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
  },
  {
    path:'/residential/pre-information',
    name:'ResForm',
    component: ResForm
  },
  {
    path:'/sme/pre-information',
    name:'SmeForm',
    component: SmeForm
  },
  // {
  //   path:'/form12',
  //   name:'Form12',
  //   component: Form12
  // },
  {
    path:'/verify-email',
    name:'VerifySignUp',
    component: VerifySignUp
  },
  {
    path: '/payment',
    name: 'PaymentProcess',
    component: PaymentProcess
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})



export default router
