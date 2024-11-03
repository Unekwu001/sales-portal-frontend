<template>
    <div class="footer container-fluid">
        <div class="row footer-row">
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h6>Our Company</h6>
                <p>About Us</p>
                <p>Locate Us</p>
                <p>News & Events</p>
                <p>Careers</p>
                <p>Corporate Social Responsibility</p>
                <p>Quality Policy Statement</p>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h6>Residential & SME</h6>
                <p>Residential Broadband</p>
                <p>SME Broadband</p>
                <p>FoS Xtreme</p>
                <p>Find an iShop</p>
                <p>Self Service</p>
                <p>Help Center</p>
                <p>Community</p>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h6>Enterprise</h6>
                <p>Products & Services</p>
                <p>Network</p>
                <p>Support</p>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <h6>Sign Up for Our Newsletter</h6>
                <form action="" class="form">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Full Name">
                    </div>
                    <div class="mb-3">
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Email">
                    </div>

                    <div class="footer-btn">
                        Submit
                    </div>
                </form>
            </div>
        </div>

        <div class="row footer-address">
            <div class="col-lg-5 col-md-12 col-sm-12">
                <span><i class="bi bi-geo-alt-fill"></i></span>
                <span>4, Balarabe Musa Crescent, Victoria Island, Lagos, Nigeria</span>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-6">
                <span><i class="bi bi-telephone-fill"></i></span>
                <span>+234 1 633 0000</span>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <span><i class="bi bi-envelope-fill"></i></span>
                <span>sales@ipnxnigeria.net</span>
            </div>
            <div class="col-lg-2 col-md-12 col-sm-12">
                <span class="social-icon"><img src="../assets/icons/facebook.png" alt="" width="30px"></span>
                <span class="social-icon"><img src="../assets/icons/twitter.png" alt="" width="30px"></span>
                <span class="social-icon"><img src="../assets/icons/linkedin.png" alt="" width="30px"></span>
                <span class="social-icon"><img src="../assets/icons/instagram.png" alt="" width="30px"></span>
            </div>
        </div>

        <div class="footer-base">
            <span class="base-link"><a href="">Terms of Use</a> </span>
            <span class="base-link"><a href="">Privacy Policy</a></span>
            <span class="rights"><i class="bi bi-c-circle"></i>&nbsp; 2024 ipNX Nigeria Limited. All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap');

    .footer {
        font-family: 'IBM Plex Sans', sans-serif;
        background-color: #1a1a1a;
        color: #A39F9F;
    }
    .footer h6 {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
        padding-bottom: 20px;
    }
    .footer p {
        /* color: #A39F9F; */
        font-size: 16px;
    }
    .footer .footer-btn {
        background-color: #DA1919;
        color: #ffffff;
        text-align: center;
        margin: auto;
        border-radius: 30px;
        padding: 5px 17px;
    }
    .footer input {
        border-radius: 30px;
    }
    .footer .footer-row {
        padding: 100px 100px 50px 100px;
    }
    .footer .col-lg-3, .footer .col-md-6, .footer .col-sm-12 {
        padding-bottom: 20px;
    }
    .footer .footer-address {
        border: 1px solid rgba(163, 159, 159, 0.2);
    }
    .bi-geo-alt-fill, .bi-telephone-fill, .bi-envelope-fill{
        color: #DA1919;
        padding-right: 5px;
    }
    .social-icon {
        padding-right: 5px;
    }
    /* .bi-facebook, .bi-twitter, .bi-linkedin, .bi-instagram {
        color: #ffffff;
        background-color: #949DAB;
        padding: 10px;
    } */
    .footer .footer-address, .footer .footer-base {
        padding: 20px 100px;
    }
    .footer-base a{
        text-decoration: none;
        color: inherit;
    }
    .footer-base .base-link {
        text-decoration: underline;
        padding-right: 50px;
    }
    .footer .rights {
        float: right;
    }

    
    @media (max-width: 992px) {
        .footer .footer-row {
            padding: 70px;
        }
        .footer .footer-address, .footer .footer-base {
            padding: 20px 70px;
        }
    }

    @media (max-width: 767px) {
        .footer .footer-row {
            padding: 50px;
        }
        .footer .footer-address, .footer .footer-base {
            padding: 20px 50px;
        }
        .footer-base{
            padding: 20px auto;
        }
        .footer-base .base-link, .footer .rights {
            text-align: center;
            margin: auto;
        }
        .footer-base .base-link {
            /* display: block; */
        }
        .footer .rights {
            float: none;
            display: block;
            margin: 20px auto;
        }
    }
</style>