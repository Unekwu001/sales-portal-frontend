<template>
  <div class="container">
    <h1>Best Plans Just For You</h1>
    <p>Dive into our sales portal and discover personalized options designed to match your unique needs and preferences. Elevate your internet experience with <span style="color: red; font-weight: bold;">ipNX</span> today!</p>
  </div>

  <div class="row">
    <div class="column">
      <img src="https://img.freepik.com/free-photo/young-african-male-talking-phone-while-using-another-one-room_181624-31576.jpg" style="width: 100%;">
      <h2>
        Residential 
      </h2>
      <p1>Discover reliable connectivity and tailored options for every household need. Get started today!</p1>
    </div>

  </div>

  <div class="row">
    <div class="column">
      <img src="https://img.freepik.com/free-photo/black-students-posing-with-gadgets_23-2147664364.jpg?w=740&t=st=1707296167~exp=1707296767~hmac=e1e542e7f655d54021d695fdad1cf62d7108135b8607ab9c1dab19c2930b5f2c" style="width: 100%;">
      <h3>
        SME 
      </h3>
      <p2>
        Enjoy streamlined connectivity and flexible options crafted for your success. Find the perfect solution for your growing venture!      </p2>
    </div>

  </div>

  <div class="row">
    <div class="column">
      <img src="https://img.freepik.com/free-photo/face-handsome-african-american-business-woman-holding-tablet-background-business-peoples-multiracial-team-meeting-sitting-office-table_627829-13639.jpg?size=626&ext=jpg&uid=R21869319&ga=GA1.1.1259943134.1700433669&semt=ais" alt="Xtreme" style="width: 100%;">
      <h4>
        Xtreme 
      </h4>
      <p3>
        Elevate your online experience to new heights with lightning-fast connectivity and premium features.      </p3>
    </div>
  </div>

  <div class="container">
<h5>Testimonial</h5>
<p4>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
</p4>
<div class="circle">
  <span class="dot"></span>
</div>
<p4>Nemo enim ipsam</p4>

</div>
  
</template>

<script>
export default {
  name: 'HelloWorld'

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  text-align: justify;
  font-weight: 600;
  font-size: 30px;
  font-family: poppins;
  color: black;
  margin-top: 30px;
}
p{
  text-align: justify;
  font-family: poppins;
  font-weight: light;
  margin-top: 20px;
  margin-right: 17px;
}

.dot {
height: 130px;
width: 130px;
background-color: #bbb;
border-radius: 50%;
display: inline-block;
margin-top: 20px
}


.column{
  float: inline-start;
  width: 100%;
  padding: 0px;
  margin-left: 0%;
}

.row{
  float: inline-start;
  border: 1px solid grey;
  width: 27%;
  height: 400px;
  background-color: transparent;
  margin-left: 5%;
  margin-bottom: 40px;
}

h2{
  color: red;
  text-align: justify;
  font-size: 24px;
  font-weight: 700;
  font-family: Montserrat;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 20px ;
}

h3{
  color: black;
  text-align: justify;
  font-size: 24px;
  font-weight: 700;
  font-family: Montserrat;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 20px ;
}

h4{
  color: #FFA100;
  text-align: justify;
  font-size: 24px;
  font-weight: 700;
  font-family: Montserrat;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 20px ;
}

h5{
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: black;
  font-family: poppins;
}

p1{
  color: black;
text-align: justify;
font-size: 12px;
  font-weight: 700px;
  font-family: poppins;
  margin-left: 30px;
  margin-top: 10px;
  display: block;
  margin-right: 30px;
}

p3{
  color: black;
text-align: justify;
  font-size: 12px;
  font-weight: 700px;
  font-family: Montserrat;
  margin-left: 30px;
  margin-top: 10px;
  display: block;
  margin-right: 30px;
}

p2{
  color: black;
text-align: justify;
font-size: 12px;
  font-weight: 700px;
  font-family: Montserrat;
  margin-left: 30px;
  margin-top: 10px;
  display: block;
  margin-right: 30px;
}

p4{
  text-align: center;
  margin-bottom: 100px;
}


@media (max-width: 1231px){
  h2{
    font-size: 15px;
    text-align: justify;
    margin-left: 20px;
  }
  h3{
    font-size: 15px;
    text-align: justify;
  }
  h4{
    font-size: 15px;
    text-align: justify;
  }
p3{
  font-size: 12px;
}

p1{
  font-size: 12px;
  margin-left: 20px;
}

p2{
  font-size: 11px;
}

h5{
  font-size: 20px;
}

h1{
  font-size: 20px;
  margin-top: 90px;

}
p{
  font-size: 13px;
  margin-top: -2px
}
}
</style>
