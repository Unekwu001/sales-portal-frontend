<template>
  <div>
    <header>
        <nav>
            <a href="https://www.ipnxnigeria.net/"><img src="../assets/ipNX_Logo 2.svg" alt="logo" class="logo" ></a>
            <button class="myipnx-btn"><a href="https://self-service.ipnxnigeria.net/"  style="color: white; text-decoration: none;"> {{ butt }} </a></button>
        </nav>
        <div class="header-body">
            <div>
              <h1 class="head-text">Explore the future of <br>connectivity with <br>ipNX FOS <br></h1>
              <p class="body-text">Cutting-Edge Fiber Optic Solutions That Redefine <br>Speed And Reliability. Step Into A World Of Seamless,
                <br>High-Speed Internet And Limitless Possibilities</p>
                <div class="buttons">
                    <button class="res-btn">{{ resBtn }}</button>
                    <button class="sme" >{{ smeBtn }}</button>
                </div>
                <div class="socials">
                  <a href="https:/www.facebook.com/ipnxnigeria"><img src="../assets/icon1.svg" alt="facebook icon" class="fb"></a>
                  <a href="https://twitter.com/ipNXTweet?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><img src="../assets/icon3.svg" alt="  twitter-icon" class="twitter"></a>
                  <a href="https://ng.linkedin.com/company/ipnx-nigeria-limited"><img src="../assets/linkedin.svg" alt="whatsicon" class="linkedin"></a>
                  <a href="https://www.instagram.com/ipnxnigeria/?hl=en"><img src="../assets/icon4.svg" alt="insta-icon" class="insta"></a>
          
                </div>
                <div class="contact">
                 <div class="call-sect">
                  <img  src="../assets/call.svg" alt="call" class="call-svg">
                  <p class="phone-no">+23402016330000</p>
               </div>
               <div class="mail-sect">
                <img src="../assets/sms.svg" alt="sms">
                <p class="mail">sales@ipnxnigeria.net</p>
               </div>
                </div>
            </div>
            <div>
              <img src="../assets/low-angle-guy-with-headphones-smiling 1.png" alt="picture" class="guy-image">
            </div>
            
        </div>
    </header>
  </div>
</template>
<script >
export default{
    data(){
        return{
           butt: 'My ipNX',
           resBtn:'Residential plans',
           smeBtn:'SME Plans'
        
           
        }
    }
};
</script>


<style>
.logo{
  width: 80px;
  margin-left: 85px;
}
nav{
  display: flex;
  justify-content: space-between;
  margin: 20px;
  margin-right: 50px;
  padding-left: 25px;
  padding-right: 25px;
  
}
.myipnx-btn{
  width: 150px;
  height: 45px;
  border-radius: 45px;
  background-color:#DA1919;
  color:#FFFFFF ;
  border: none;
}
.header-body{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px ;
  padding: 60px;
  
  height: 500px;
}
.guy-image{
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
    line-height: 50px;
    font-weight: bolder;
 
}
.body-text{
 text-align: left;
  padding-left: 28px;
}
.buttons{
  padding-left: 28px;
  margin-top: 40px;
  margin-right: 209px;
 
}
.res-btn{
  width: 150px;
  height: 45px;
  border-radius: 45px;
  background-color: #FFFFFF;
  border-color: #DA1919;
  color: #DA1919;
  margin-right: 5px;  
  border-width: 1px;
  cursor: pointer;
}
.sme{
  width: 150px;
  height: 45px;
  border-radius: 45px;
  background-color: #DA1919;
  color: #FFFFFF;
  border-color: #DA1919;
  border-width: 1px;
  cursor: pointer;
}
.res-btn:hover{
  background-color: #DA1919;
  color: #FFFFFF;
  transition: background 0.5 ease;
}
.sme:hover{
  width: 150px;
  height: 45px;
  border-radius: 45px;
  background-color: #FFFFFF;
  border-color: #DA1919;
  color: #DA1919;
  margin-right: 5px; 
}
.socials{
 margin-top: 10px;
 margin-right: 350px;

}
.fb{
  width: 30px;
  padding-right: 10px;
}
.twitter{
  width: 30px;
  padding-right: 10px;
}
.linkedin{
  width: 30px;
  padding-right: 10px;
}
.insta{
  width: 30px;
  padding-right: 10px;
}
.contact{
  display: flex;
  margin-left: 25px;
  
}
.call-sect{
  display: flex;
  align-items: center;
  cursor: context-menu;
  
  
}
.call-svg{
  margin-top: 3px;
 
  margin: 10px;
}
.phone-no{
  margin-bottom: 5px;
  
}
.mail-sect{
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: context-menu;
}
.mail{
margin-bottom: 5px;

}
@media screen and (max-width: 768px) {
  .logo {
    width: 60px; 
    margin-left: 10px; 
  }
  
  .myipnx-btn {
    width: 120px; /* Adjust button size */
    font-size: 12px; /* Adjust button font size */
  }
  
  .header-body {
    flex-direction: column-reverse; /* Stack elements vertically */
    padding: 20px; /* Adjust padding */
    height: auto; /* Adjust height */
  }
  
  .guy-image {
    width: 300px; 
    margin-top: 20px;
  }
  
  .head-text {
    font-size: 30px; /* Adjust font size */
    margin-left: 0; /* Remove left margin */
    text-align: center; /* Center text */
  }
  
  .body-text {
    padding-left: 0; /* Remove left padding */
    text-align: center; /* Center text */
  }
  
  .buttons {
    padding-left: 0; /* Remove left padding */
    margin-top: 20px; /* Adjust margin */
    display: inline;
    text-align: center; /* Center buttons */
    
  }
  .buttons .sme{
    width: 150px;
    height: 45px;
    margin-top: 15px;
    margin-left: 200px;
  }
  
  .buttons .res-btn {
    width: 150px;
    height: 45px; /* Adjust button width */
  }
  
  .socials {
    margin: 10px auto; /* Center social icons */
    text-align: center; /* Center icons */
  }
  
  .socials a {
    margin: 0 5px; /* Adjust spacing between icons */
  }
  
  .contact {
    flex-direction: column; /* Stack contact sections vertically */
    margin-left: 0; /* Remove left margin */
    text-align: center; /* Center contact info */
  }
  
  .call-sect, .mail-sect {
    margin: 10px  auto; /* Center contact sections */
    align-items: center; /* Center items horizontally */
  }
  
  
}


</style>