<template>
    <nav>
        <img alt="ipNX logo" class="logo" src="../assets/images/ipNX_Logo.png" width="75px" @click="clickLogo"/>

        <div class="float-end">
            <a class="nav-btn" @click="clickBtn"  :class="{'active': notActive}">{{ navLink }}</a>
            <!-- <a class="logout" @click="logOut()" :class="{'active': hideLogout}">Logout</a> -->
            <!-- <div class="nav-btn" @click="clickBtn"  :class="{'active': notActive}"> -->
                <!-- <a class="nav-link" href="https://self-service.ipnxnigeria.net/"> My ipNX</a> -->
                <!-- <a class="nav-link"> {{ navLink }}</a> -->
                <!-- <a class="nav-link"> Login </a> -->
                
            <!-- </div> -->
            <!-- <div @click="logOut()" style="cursor: pointer; text-decoration: underline; color: #DA1919;">Logout</div> -->
        </div>
    </nav>
        
</template>

<script>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL
    export default {
        setup() {
            const route = useRoute()
            const router = useRouter()
            let navLink = ref(null)
            const notActive = ref(false)
            // const hideLogout = ref(false)

            const clickLogo = () => {
                router.push({name: 'Home'})
            }

            const clickBtn = async() => {
                // if (navLink.value === 'My ipNX') {
                if (navLink.value === 'Logout') {
                    // window.location.href="https://self-service.ipnxnigeria.net/"
                    const headers = {
                        'Content-Type': 'application/json' ,
                        'Authorization': `${sessionStorage.getItem('token')}`,
                        'accept': '*/*'
                    }
                    try {
                        const response = await axios.post(`${apiUrl}/Auth/logout`, {headers: headers})
                        sessionStorage.clear()
                        // window.location.reload()
                        if (route.name === 'Home') {
                            window.location.reload()
                        }else{
                            router.push({name: 'Home'})
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }else if (navLink.value === 'Login') {
                    router.push({name: 'FormRes'})
                }
            }
            // const logOut = () => {
            //     sessionStorage.clear()
            //     window.location.reload()
            // }

            onMounted(() => {
                const token = sessionStorage.getItem('token')
                
                if (token) {
                    navLink.value = 'Logout'
                    // hideLogout.value = false
                }else{
                    if (window.location.href.includes('signup')) {
                        notActive.value = true   
                        // hideLogout.value = true
                    }else {
                        // hideLogout.value = true
                        navLink.value = 'Login'
                        notActive.value = false   
                    }
                }
            })

            // sessionStorage.setItem('token', token.value)
            return { clickLogo, clickBtn, navLink, notActive }
        }
    }
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
    nav {
        padding: 39px 125px;
        /* padding: 39px 25px; */
        /* background-color: #F00C0C33; */
    }
    .logo, .nav-btn {
        cursor: pointer;
    }
    /* .nav-btn {
        background-color: #DA1919;
        padding: 10px 45px;
        border-radius: 64px;
    }
    .nav-link {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        color: #ffffff;
    } */
     .nav-btn{
        background-color: #DA1919;
        padding: 10px 45px;
        border-radius: 64px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        color: #ffffff;
        text-decoration: none;
        margin-right: 10px;
     }
    .nav-btn.active {
        display: none;
    }
    .logout.active{
        display: none;
    }
    .logout{
        cursor: pointer; 
        text-decoration: underline; 
        color: #DA1919;
    }

    @media (min-width: 768px) and (max-width: 992px) {
        nav {
            padding: 15px 75px !important;
        }
    }

    @media (min-width: 481px) and (max-width: 767px) {
        .logo {
            width: 70px;
        }
        nav {
            padding: 15px 45px !important;
        }
        .nav-btn {
            padding: 10px 25px;
        }
    }
    
    @media  (max-width: 480px) {
   
        .logo {
            width: 70px;
        }
        nav {
            padding: 15px !important;
        }
        .nav-btn {
            padding: 10px 25px;
        }

    }
</style>