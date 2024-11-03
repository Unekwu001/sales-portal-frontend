<template>
  <div class="main-container">
    <MainNavbar/>
    <div class="sme-header">
      <!-- <p class="sme-heading">FOS Xtreme Series</p>
      <p class="sme-heading-text">Select from a range of plans with <span>unlimited data usage</span>  and <span>free on-net calls</span> </p>
      <p class="sme-sub-heading">Increase Business Productivity</p> -->
      <FosXtremeHeader/>
      <div class="sme-header-button">
        <a @click="gotoSme" class="sme-link">SME Broadband</a>
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

    const gotoXtreme = () =>{
        if (window.location.href.includes('roi')) {
          const roi = route.query.roi
            const plan = 'sme'
          router.push({name: 'FosSmeXtreme', query:{roi, plan}})
        } else {
          router.push({name: 'FosSmeXtreme'})
        }
      }

      const gotoSme = () =>{
        if (window.location.href.includes('roi')) {
          const roi = route.query.roi
          router.push({name: 'FosSme', query:{roi}})
        } else {
          router.push({name: 'FosSme'})
        }
      }

    return { router, gotoXtreme, gotoSme}
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
/* .sme-heading {
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
} */
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
/* .hint1 {
  color: red;
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
  border: none;
  background-color: white;
  text-align: center;
  border-radius: 60px;
  height: 60px;
  width: 300px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  display: flex;
} */
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

/* .hint {
  background-color: #ffffff;
  text-align: center;
  padding: 0px 0px 0px 0px;
  border-radius: 60px;
  height: 60px;
  width: 300px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 0px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  border: 0px solid white;
  text-decoration: none;
  margin-right: 7px;
  background-color: black;

} */

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

/* .xtreme-link:focus,
.xtreme-link:active {
  background-color: black;
  transform: translateX(2px);
}

.sme-link:hover {
  transform: translateX(1px);
  background-color: black;
  color: white;

} */



/* responsiveness */

/* @media (min-width: 768px) and (max-width: 992px) {
  .monthly-plan-row .box {
      max-width: 45%;
    }
} */
@media (min-width: 481px) and (max-width: 767px) {
  .sme-header {
    margin: 20px 20px 30px;
  }
  .sme-header-button {
    width: 75vw;
    justify-content: center;
  }
    /* .monthly-plan-row .box {
      max-width: 75%;
    } */
}

@media (max-width: 480px) {
  .sme-header {
    margin: 20px 20px 30px;
  }
  /* .monthly-plan-row .box {
    max-width: 100%;
  } */
  .sme-header-button {
    width: 75vw;
    justify-content: center;
  }
}
</style>