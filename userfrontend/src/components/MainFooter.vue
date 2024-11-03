<template>
    <div class="footer container-fluid">
        <div class="row footer-row">
            <div class="col-lg-4 col-md-4 col-sm-12">
                <h6>Our Company</h6>
                <p><a href="https://www.ipnxnigeria.net/our-company/">About Us</a> </p>
                <p><a href="https://goo.gl/maps/wUdq65668XugaexS6">Locate Us</a></p>
                <p><a href="https://www.ipnxnigeria.net/blog/">News & Events</a></p>
                <p><a href="http://careers.ipnxnigeria.net/">Careers</a></p>
                <p><a href="https://www.ipnxnigeria.net/csr/">Corporate Social Responsibility</a></p>
                <p><a href="https://www.ipnxnigeria.net/quality-policy/">Quality Policy Statement</a></p>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <h6>Residential & SME</h6>
                <p><a href="https://www.ipnxnigeria.net/home-broadband/">Residential Broadband</a></p>
                <p><a href="https://www.ipnxnigeria.net/home-broadband/">SME Broadband</a></p>
                <p><a href="https://www.ipnxnigeria.net/fos-xtreme/">FoS Xtreme</a></p>
                <p><a href="https://www.ipnxnigeria.net/ishops/">Find an iShop</a></p>
                <p><a href="https://self-service.ipnxnigeria.net/">Self Service</a></p>
                <p><a href="https://www.ipnxnigeria.net/help-centre/">Help Center</a></p>
                <p><a href="https://www.ipnxnigeria.net/ipnx/community">Community</a></p>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <h6>Enterprise</h6>
                <p><a href="https://www.ipnxnigeria.net/products-services/">Products & Services</a></p>
                <p><a href="https://www.ipnxnigeria.net/network/">Network</a></p>
                <p><a href="https://www.ipnxnigeria.net/support-enterprise/">Support</a></p>
            </div>
            <!-- <div class="col-lg-3 col-md-6 col-sm-12">
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
            </div> -->
        </div>

        <div class="row footer-address">
            <div class="col-lg-3 col-md-6 col-sm-12">
                <span><i class="bi bi-geo-alt-fill"></i></span>
                <span><a href="https://goo.gl/maps/wUdq65668XugaexS6">4, Balarabe Musa Crescent, Victoria Island, Lagos, Nigeria</a></span>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <span><i class="bi bi-telephone-fill"></i></span>
                <span><a href="tel:+234 0201 633 0000">+234 0201 633 0000</a></span>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6">
                <span><i class="bi bi-envelope-fill"></i></span>
                <span><a href="mailto:telesales@ipnxnigeria.net">telesales@ipnxnigeria.net</a></span>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
                <span class="social-icon"><a href="https:/www.facebook.com/ipnxnigeria"><img src="../assets/icons/facebook.png" alt="" width="30px"></a></span>
                <span class="social-icon"><a href="https://twitter.com/ipNXTweet?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><img src="../assets/icons/twitter.png" alt="" width="30px"></a></span>
                <span class="social-icon"><a href="https://ng.linkedin.com/company/ipnx-nigeria-limited"><img src="../assets/icons/linkedin.png" alt="" width="30px"></a></span>
                <span class="social-icon"><a href="https://www.instagram.com/ipnxnigeria/?hl=en"><img src="../assets/icons/instagram.png" alt="" width="30px"></a></span>
            </div>
        </div>

        <div class="footer-base">
            <span class="base-link"><a href="https://www.ipnxnigeria.net/ipnx/terms">Terms of Use</a> </span>
            <span class="base-link"><a href="https://www.ipnxnigeria.net/privacy/">Privacy Policy</a></span>
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
        /* text-align: left; */
    }
    
    .footer p:hover {
        color: #DA1919;
    }
    /* .footer .footer-btn {
        background-color: #DA1919;
        color: #ffffff;
        text-align: center;
        margin: auto;
        border-radius: 30px;
        padding: 5px 17px;
    }
    .footer input {
        border-radius: 30px;
    } */
    .footer .footer-row {
        /* padding: 100px 100px 50px 100px; */
        padding: 100px 100px 50px;
        /* display: flex;
        justify-content: center;
        margin: auto;
        text-align: center; */
    }
    
    .footer .col-lg-3, .footer .col-md-6, .footer .col-sm-12 {
        padding-bottom: 20px;
    }
    .footer .footer-address {
        border: 1px solid rgba(163, 159, 159, 0.2);
    }
    .footer p a, .footer .footer-address div span:nth-child(2) a{
        color: inherit;
        text-decoration: none;
        font-size: inherit;
    }
    .bi-geo-alt-fill, .bi-telephone-fill, .bi-envelope-fill{
        color: #DA1919;
        padding-right: 1px;
    }
    .social-icon {
        padding-right: 3px;
    }
    
    .footer .footer-address, .footer .footer-base {
        /* padding: 20px 50px; */
        padding: 20px;
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

    
    @media (min-width: 1024px) {
        /* .footer .footer-address div:nth-child(4){
            width: 17%;
        } */
    }
        
    @media (min-width: 768px) and (max-width: 992px) {
        .footer .footer-row {
            padding: 70px;
        }
        .footer .footer-address, .footer .footer-base {
            padding: 20px 70px;
        }
    }

    @media (min-width: 481px) and (max-width: 767px) {
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
    @media (max-width: 480px) {
        .footer .footer-row {
            padding: 50px 25px;
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
        .footer .rights {
            float: none;
            display: block;
            margin: 20px auto;
        }
    }
</style>