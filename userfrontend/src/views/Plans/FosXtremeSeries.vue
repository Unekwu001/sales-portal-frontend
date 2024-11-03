<template>
  <div class="main-container">
    <MainNavbar/>
    <div class="sme-header">
      <p class="sme-heading">FOS Xtreme Series</p>
      <p class="sme-heading-text">Select from a range of plans with <span>unlimited data usage</span>  and <span>free on-net calls</span> </p>
      <p class="sme-sub-heading">Increase Business Productivity</p>
      <div class="sme-header-button">
        <a href="/plan/fos-sme" class="sme-link">SME Broadband</a>
        <a href="/plan/fos-xtreme" class="xtreme-link"><span class="xtreme-text">Xtreme &nbsp;
          </span><span class="series-text"> Series </span></a>
      </div>
    </div>

    <div class="monthly-plan">
      <p class="monthly-plan-heading">Monthly <span>Plan</span></p>

      <div class="row monthly-plan-row">
        <div class="col-lg-4 col-md-6 col-sm-12 box" @click="plansMethod">
          <p class="plan-title">Signature</p>
          <p class="plan-price"><del style="text-decoration-style: double;">N</del> 105,800 <span>/ month</span></p>
          <p class="plan-speed">Unlimited data @ <span>300 Mbps</span></p>
          <div class="line1"></div>
        
          <div class="mid">
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
          </div>

          <div class="line2"></div>
          <p class="setup-charge"><del style="text-decoration-style: double;">N</del> 68,625 </p>
          <p class="setup-charge-label">Setup Charge</p>

        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 box" @click="plansMethod">
          <p class="plan-title">Advantage Preferred</p>
          <p class="plan-price"><del style="text-decoration-style: double;">N</del> 170,500 <span>/ month</span></p>
          <p class="plan-speed">Unlimited data @ <span>500 Mbps</span></p>
          <div class="line1"></div>
        
          <div class="mid">
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
          </div>

          <div class="line2"></div>
          <p class="setup-charge"><del style="text-decoration-style: double;">N</del> 68,625 </p>
          <p class="setup-charge-label">Setup Charge</p>
          
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 box" @click="plansMethod">
          <p class="plan-title">Advantage Premium</p>
          <p class="plan-price"><del style="text-decoration-style: double;">N</del> 287,600 <span>/ month</span></p>
          <p class="plan-speed">Unlimited data @ <span>1000 Mbps</span></p>
          <div class="line1"></div>
        
          <div class="mid">
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
            <div><img src="../../assets/icons/check-circle.png" alt=""> <span class="mid-text">Full Access to Landingfolio</span> <img src="../../assets/icons/exclamation-circle.png" alt=""></div>
          </div>

          <div class="line2"></div>
          <p class="setup-charge"><del style="text-decoration-style: double;">N</del> 68,625 </p>
          <p class="setup-charge-label">Setup Charge</p>
          
        </div>
        
      </div>
    </div>

      <div class="undertext">
        <span style="font-weight: 700;"> ₦ 68,625 </span> Modem & Installation Charge on all Plans*
        <br> Phone Line(s) : 2
      </div>
      
    
  </div>
  <MainFooter />
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue';
import MainFooter from '@/components/MainFooter.vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  components: {
    MainNavbar,
    MainFooter,
  },
  setup () {

    const router = useRouter()

    const plansMethod = () => {

      router.push({path: '../payment' } )
    }

    return { plansMethod, router}
  }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

.main-container {
  background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03));
  overflow-x: hidden;
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
  font-size: 14px;
  font-weight: 400;
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
  .sme-header {
    margin: 20px 20px 30px;
  }
  .sme-header-button {
    width: 75vw;
    justify-content: center;
  }
    .monthly-plan-row .box {
      max-width: 75%;
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