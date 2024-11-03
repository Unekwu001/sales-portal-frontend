<template>
    <div class="main-container">
      <MainNavbar/>
      <div class="sme-header">
        <!-- <p class="sme-heading">FOS Xtreme Series</p>
        <p class="sme-heading-text">Select from a range of plans with <span>unlimited data usage</span>  and <span>free on-net calls</span> </p>
        <p class="sme-sub-heading">Increase Business Productivity</p> -->
        <FosXtremeHeader/>
        <div class="sme-header-button">
          <!-- <a href="/plan/fos-residential" class="sme-link">Residential Plan</a>
          <a href="/plan/fos-residential-xtreme" class="xtreme-link"><span class="xtreme-text">Xtreme &nbsp; -->
            <a @click="gotoRes" class="sme-link">Residential Plan</a>
            <a @click="gotoXtreme" class="xtreme-link"><span class="xtreme-text">Xtreme &nbsp;
            </span><span class="series-text"> Series </span></a>
        </div>
      </div>
  
        <FosXtremeBody/>
      
    </div>
    <MainFooter />
  </template>
  
  <script>
  import MainNavbar from '@/components/MainNavbar.vue';
  import MainFooter from '@/components/MainFooter.vue';
  import FosXtremeHeader from '@/components/FosXtremeHeader.vue';
  import FosXtremeBody from '@/components/FosXtremeBody.vue';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    components: {
      MainNavbar,
      MainFooter,
      FosXtremeHeader,
      FosXtremeBody
    },
    setup () {
  
      const route = useRoute()
      const router = useRouter()
  
      const plansMethod = () => {
  
        router.push({path: '../payment' } )
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
  
      return { plansMethod, router, gotoXtreme, gotoRes}
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
    color: #263238;
    font-size: 15px;
    font-weight: 500;
    margin-left: 5px;
    border: none;
    background-color: white;
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
    background-color: black;
    background-image: linear-gradient(98.24deg, #000000 0%, #230000 100%);
  }
  .xtreme-link .xtreme-text {
   background: -webkit-linear-gradient(98.01deg, #DEAA35 0.3%, #E9AA0A 113.85%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-style: italic;
  }
  .xtreme-link .series-text {
    color: #ffffff;
    font-weight: 500;
  }
  .sme-link, .xtreme-link {
    cursor: pointer;
  }
  
  /* responsiveness */
  
  @media (min-width: 481px) and (max-width: 767px) {
    .sme-header {
      margin: 20px 20px 30px;
    }
    .sme-header-button {
      width: 75vw;
      justify-content: center;
    }
     
  }
  
  @media (max-width: 480px) {
    .sme-header {
      margin: 20px 20px 30px;
    }
    
    .sme-header-button {
      width: 75vw;
      justify-content: center;
    }
  }
  </style>