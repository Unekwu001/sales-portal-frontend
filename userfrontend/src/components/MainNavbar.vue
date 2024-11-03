<template>
    <nav class="navbar navbar-expand-lg">
        <img alt="ipNX logo" class="logo" src="../assets/images/ipNX_Logo.png" width="75px" @click="clickLogo"/>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span>...</span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Plans
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="/plan/fos-residential">FOS Residential</a></li>
                        <li><a class="dropdown-item" href="/plan/fos-sme">FOS SME</a></li>
                        <li><a class="dropdown-item" href="/plan/fos-sme-xtreme">FOS Xtreme</a></li>
                        <!-- <li><a class="dropdown-item" href="/plan/fos-res-xtreme">FOS Xtreme</a></li> -->
                    </ul>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" href="#">Plans</a>
                </li> -->
                <li class="nav-item">
                    <a class="nav-link" href="https://www.ipnxnigeria.net/help-centre/">Help</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://www.ipnxnigeria.net/our-company/">Company</a>
                </li>
            </ul>
        </div>
        <!-- <div class="justify-content-end nav-item nav-btn" @click="clickBtn"> -->
            <div class="justify-content-end nav-item">
            <!-- <a class="nav-link" href="https://self-service.ipnxnigeria.net/"> My ipNX</a> -->
            <a class="nav-btn" @click="clickBtn">{{ navLink }}</a>
            <!-- <a class="logout" @click="logOut" :class="{'active': isLogout}">Logout</a> -->
        </div>
    </nav>
</template>

<script>
    import { useRouter, useRoute } from "vue-router";
    import { ref, onMounted } from "vue";
    import axios from "axios";
    const apiUrl = process.env.VUE_APP_API_URL
    export default {
        setup() {
            const route = useRoute()
            const router = useRouter()
            let navLink = ref(null)
            // const isLogout = ref(false)

            const clickLogo = () => {
                router.push({name: 'Home'})
            }

            const clickBtn = async() => {
                // if (navLink.value === 'My ipNX') {
                if (navLink.value === 'Logout') {
                    const headers = {
                    'Content-Type': 'application/json' ,
                    'Authorization': `${sessionStorage.getItem('token')}`,
                    'accept': '*/*'
                }
                try {
                    const response = await axios.post(`${apiUrl}/Auth/logout`, {headers: headers})
                    sessionStorage.clear()
                        
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
                // window.location.href="https://self-service.ipnxnigeria.net/"
            }
         

            onMounted(() => {
                const token = sessionStorage.getItem('token')
              
                if (token) {
                    // navLink.value = 'My ipNX'
                    navLink.value = 'Logout'
                    // isLogout.value = true
                }else{
                    navLink.value = 'Login'
                    // isLogout.value = false
                }
            })

            return { clickLogo, clickBtn, navLink }
        }
    }
</script>

<style scoped>
    nav {
        padding: 39px 80px 39px 125px;
    }
    .logo, .nav-btn {
        cursor: pointer;
    }
    .navbar-nav .nav-item:nth-child(1), .navbar-nav .nav-item:nth-child(2) {
        /* margin-left: 50px; */
        margin-right: 50px;
    }
    .nav-link {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        color: #000000;
    }
    a.nav-btn {
        color: #ffffff;
    }
    .nav-btn {
        background-color: #DA1919;
        padding: 15px 45px;
        border-radius: 64px;
        cursor: pointer;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
        text-decoration: none;
    }
    .logout.active{
        display: inline-block;
    }
    .logout{
        cursor: pointer; 
        text-decoration: underline; 
        color: #DA1919;
    }
    .navbar-toggler {
        border: none;
    }

    .navbar-toggler:focus, .navbar-toggler:active {
        box-shadow: none;
    }

    @media (min-width: 768px) and (max-width: 992px) {
        .navbar-nav .nav-item:nth-child(1), 
        .navbar-nav .nav-item:nth-child(2), 
        .navbar-nav .nav-item:nth-child(3) {
            margin-top: 15px;
            margin-bottom: 10px;
        }
        .nav-btn {
            margin-top: 10px;
        }
    }

    @media (min-width: 481px) and (max-width: 767px) {
        .logo {
            width: 75px;
        }
        nav {
            padding: 15px 55px;
        }
        .navbar-nav .nav-item:nth-child(1), 
        .navbar-nav .nav-item:nth-child(2), 
        .navbar-nav .nav-item:nth-child(3) {
            margin-top: 15px;
            margin-bottom: 10px;
        }
        .nav-btn {
            padding: 10px 25px;
        }
        
    }
    
    @media  (max-width: 480px) {
        .logo {
            width: 55px;
        }
        nav {
            padding: 15px 20px;
        }
        .navbar-nav .nav-item:nth-child(1), 
        .navbar-nav .nav-item:nth-child(2), 
        .navbar-nav .nav-item:nth-child(3){
            margin-top: 15px;
            margin-bottom: 10px;
        }
        .nav-btn {
            padding: 10px 25px;
        }
      
    }
</style>