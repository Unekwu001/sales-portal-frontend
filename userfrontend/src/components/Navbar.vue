<template>
    <nav class="navbar navbar-expand-lg">
        <img alt="ipNX logo" class="logo" src="../assets/images/ipNX_Logo.png" width="75px"/>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span>...</span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">Plans</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Help</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Company</a>
                </li>
            </ul>
        </div>
        <div class="justify-content-end nav-item nav-btn">
            <a class="nav-link" href="#"> My ipNX</a>
        </div>
    </nav>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    nav {
        padding: 39px 80px 39px 125px;
    }
    .nav-link {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0em;
    }
    .nav-btn {
        color: #ffffff;
        background-color: #DA1919;
        padding: 15px 45px;
        border-radius: 64px;
    }

    .navbar-toggler {
        border: none;
    }

    .navbar-toggler:focus, .navbar-toggler:active {
        box-shadow: none;
    }

    @media (min-width: 481px) and (max-width: 767px) {
        .logo {
            width: 50px;
        }
        nav {
            padding: 15px;
        }
    }
    
    @media  (max-width: 480px) {
        .logo {
            width: 50px;
        }
        nav {
            padding: 15px;
        }
      

    }
</style>