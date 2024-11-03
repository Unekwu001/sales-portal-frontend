<template>

  <!-- step 2  -->
  <!-- Modal -->
  <!-- <div class="modal" id="myModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
           
        <div class="modal-dialog modal-dialog-centered">

            <div class="modal-content" id="modalStep2"> -->

        <div class="modal-backdrop" v-show="isModal1Visible">
            
            <div class="custom-modal">

                <div class="modal-header">
                    <span><img src="../assets/icons/schedule-tick.png" alt=""></span>
                    <button type="button" class="btn-close" disabled></button>
                </div>
                <!-- loading spinner -->
            <Spinner :loading="isLoading" />

                <div class="modal-body">
                    <p class="modal-heading">Select a Time Slot for Installation</p>
                    <p style="color: #DA1919" v-if="errorMsg">You have to pick a time and date.</p>
                    <span class="modal-sub-heading3"> Please note: </span>
                    <p class="modal-text text2">
                    Dates within the next 48 hours are unavailable for selection as our team requires this time to verify your information.
                    Thank you for your understanding.
                    </p>

                    <div class="row controls-row">
                        <div class="col-lg-8 col-md-8 left-row">
                            <select class="form-select" v-model="selectedMonth">
                                <option value="">month</option>
                                <option v-for="month in months" :key="month">{{ month }}</option>
                            </select>

                            <select class="form-select" v-model="selectedYear">
                                <option value="">year</option>
                                <option
                                    v-for="(year, i) in getYears"
                                    :key="i"
                                    :value="year"
                                >
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                        <!-- controls -->
                        <div class="col-lg-3 col-md-3 right-row">
                            <button class="arrow-btn" @click="scrollBack"><img src="../assets/icons/left-arrow.png" alt=""></button>
                            <button class="arrow-btn" @click="scrollNext"><img src="../assets/icons/right-arrow.png" alt=""></button>
                        </div>
                        
                    </div>

                    <!-- days and dates -->

                    <div class="row date-row">
                        <!-- <div class="col-lg-3 col-md-6" v-for="(day, startIndex) in days.slice(0, daysToShow)" :key="day.date" style="display: flex;"> -->
                        <button class="col-lg-3 col-md-6 col-sm-12 date-box" :class="{ active: day === selectDate }"
                        v-for="(day, startIndex) in days.slice(startIndex, startIndex + daysToShow)" :key="day.date" @click="selectScheduledDate(day)">
                        <!-- <div v-if="day.day !== 'Sunday'">

                        </div> -->
                            <p class="day">{{ day.day }}</p>
                            <p class="date">{{ day.date }}</p>
                        </button>
                        <!-- <div class="col-lg-3 col-md-3 date-box" style="display: flex;">
                            <div class="day">Monday</div>
                            <div class="date">28</div>
                        </div> -->
                       
                    </div>

                    <!-- <button @click="scrollBack()">show previous reviews</button>
                    <button @click="scrollNext()">show more reviews</button> -->
                    <!-- <div v-if="daysToShow < this.days.length || this.days.length > daysToShow">
    </div> -->

                    <p class="time-zone">West Africa Time (WAT)</p>

                    <div class="row time-row">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-12 time-box" :class="{ activeTime: time === selectTime }" 
                        v-for="(time, index) in timeList" :key="index" @click="selectScheduledTime(time)">
                            <button class="time">{{ time }}</button>
                        </div>
                 
                    </div>

                </div>
                <div class="modal-btn" @click="continueSchedule">
                    <!-- <button type="button" class="btn" :disabled="disabled" data-bs-dismiss="modal"> -->
                    <button type="button" class="btn" :disabled="disabled">
                        Continue
                    </button>
                </div>

            </div>
        </div>

            <!-- </div>   
        </div>
       </div> -->

  <!-- step 3 -->
   <!-- Modal -->
   <div class="modal-backdrop" v-show="isModal2Visible">
    <div class="custom-modal">
        <div class="modal-header">
            <span><img src="../assets/icons/schedule-tick.png" alt=""></span>
            <button type="button" class="btn-close" disabled></button>
        </div>

        <!-- loading spinner -->
        <Spinner :loading="isLoading" />

        <div class="modal-body">
            <p class="modal-heading" v-if="isSchedule">{{ scheduleSuccessMessage }}</p>
            <span class="modal-sub-heading2"> Thank you for choosing ipNX </span>
            <p class="modal-text">{{ scheduleMessage }}</p>
        </div>
        <div class='buttons'>
            <button type="button" class="btn download-btn" @click="requestCall()">
                Request a call
            </button>
        
            <button type="submit" class="btn schedule-btn" @click="submit">
                Finish
            </button>
        </div>
    </div>
    </div>

    <FosSme />
    
  </template>
  
  <script>
    import MainNavbar from '@/components/MainNavbar.vue';
    import MainFooter from '@/components/MainFooter.vue';
    import { useRouter, useRoute } from 'vue-router';
    import FosSme from './Plans/FosSme.vue';
    import { ref, watch, computed, onMounted } from "vue";
    import moment from 'moment'
    import axios from 'axios'
    import Spinner from '@/components/Spinner.vue';
  
    const apiUrl = process.env.VUE_APP_API_URL

    export default {
        components: {
            MainNavbar,
            MainFooter,
            FosSme,
            Spinner
        },

        setup() {

            const route = useRoute()
            const router = useRouter()
            const isModal1Visible = ref(false)
            const isModal2Visible = ref(false)
            const isLoading = ref(false)
            const isSchedule = ref(false)
            const scheduleSuccessMessage = ref('')
            const scheduleMessage= ref('')
        const selectedYear = ref('')
        const selectedMonth = ref('')
        const days = ref([])
        const months = ref([])
        let daysToShow = ref(4)

        let daysLength = ref(days.length)

        let startIndex = ref(0)

        const timeList = ref([])

        // let activeClass = ref(false)
        let selectDate = ref(null)
        let selectTime = ref(null)

        let scheduleDate = ref(null)

        let disabled = ref(true)

        // let modal = ref(false)
        const errorMsg = ref(false)
        const orderId = route.query.orderId

        const getYears = computed(() => {
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let nextYear = currentYear + 1
            return [currentYear, nextYear]
        })

        const updateDays = () => {
            if (selectedYear.value && selectedMonth.value) {
                const month = months.value.indexOf(selectedMonth.value) + 1;
             
                const year = parseInt(selectedYear.value);

                let date = new Date(year, month - 1, 1);

                let newDays = [];
                const options = { weekday: 'long' };

                // get current time and add 48hours
                const currentTime = new Date()
                const futureTime = new Date(currentTime.getTime() + 48 * 60 * 60 * 1000)

                while (date.getMonth() === month - 1) {
                    // check if date is after 48hours from the current time and not a Sunday (0)
                    // to filter out saturday. saturday has day index 6 as sunday has day index 0
                    // if (date.getTime() > futureTime.getTime() && date.getDay() !== 6) {
                    if (date.getTime() > futureTime.getTime() && date.getDay() !== 0) {
                        // const dayIndex = newDays.length
                        newDays.push({
                            day: new Intl.DateTimeFormat('en-US', options).format(date),
                            date: date.getDate(),
                            // index: dayIndex
                        });
                    }
                    date.setDate(date.getDate() + 1);
                }
                days.value = newDays;
            }
        }


        const getMonthsInYear = () => {
          
            const year = 2022; // Example year
            const newMonths = Array.from({ length: 12 }, (_, i) => {
                const monthDate = new Date(year, i, 1);
                return monthDate.toLocaleString('default', { month: 'long' });
            });
            months.value = newMonths;

        }

        // controls button
        const scrollBack = () => {
            if (startIndex.value - 4 >= 0 ) {
                startIndex.value -= 4;
            }
        }

        const scrollNext = () => {
            if (startIndex.value + 4 < days.value.length) {
                startIndex.value += 4;
            }
        }

        //select date
        const selectScheduledDate = (day) => {
            // activeClass.value = true
            selectDate.value = day

            const datee = day.date //day.date is the day number
        
            const dayOfWeek = day.day

            const month = months.value.indexOf(selectedMonth.value) + 1
            // const year = fullDate.getFullYear()
            const year = selectedYear.value

            // scheduleDate = `${datee} ${dayOfWeek} ${year}`
            scheduleDate = `${year}-${month}-${datee}`
    
             // check schedule selection
             if (scheduleDate !== null && scheduleDate.value !== null && selectTime.value) {
                disabled.value = false
            }

            return scheduleDate
        }

        //select time
        const selectScheduledTime = (timeId) => {
            selectTime.value = timeId
            // console.log(timeId);

            // check schedule selection
            if (scheduleDate !== null && scheduleDate.value !== null && selectTime.value) {
                disabled.value = false
            }

            return selectTime
        }

        watch([
            selectedYear, 
            selectedMonth
        ], updateDays);

        onMounted(async() => {
            const token = sessionStorage.getItem('token')

            // confirm login token 
            if (!token) { 
                router.push({name: 'FormRes'})
            }
            isModal1Visible.value = true

            // const myModal = new bootstrap.Modal(document.getElementById('myModal2'), {});
            
            // myModal.show()

            getMonthsInYear()
            updateDays()

            // display time function
            const start = new Date();
            start.setHours(8, 0, 0); //8 AM
            const end = new Date();
            end.setHours(17, 0, 0); //5 PM

            while (start < end) {
                const startTime = new Date(start)
                const endTime = new Date(start)
                endTime.setHours(endTime.getHours() + 3)

                const timeRange = `${startTime.toLocaleString('en-US', { hour: 'numeric', hour12: true})} - 
                ${endTime.toLocaleString('en-US', { hour: 'numeric', hour12: true }) }`

                timeList.value.push(timeRange)

                start.setHours(start.getHours() + 3);

            }
        });

            // continue schedule installation method
            const continueSchedule = async() => {

                if (scheduleDate !== null && scheduleDate.value !== null && selectTime.value) {

                    // isModal2.value = false
                    // console.log('test:', isModal2.value);
                    // const myModal2 = new bootstrap.Modal(document.getElementById('myModal2'), {});
                    //     myModal2.hide()

                    disabled.value = false
                    
                    // save installation schedule in DB
            
                    const a = selectTime.value
                    // const dateTime = moment(`${scheduleDate} ${selectTime.value}`, 'YYYY-MM-DD HH:mm:ss').format();
                    // const dateTime = moment(`${scheduleDate} ${selectTime.value}`, 'YYYY-MM-DD hhA').format();
                    // const installationDate = moment(`${scheduleDate} ${a.split(' - ')[0]}`, 'YYYY-MM-DD hhA').format();
                    const installationDate = moment(`${scheduleDate} ${a.split(' - ')[0]}`, 'YYYY-MM-DD hhA').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
               
                    const scheduleData = {
                        'OrderId': orderId,
                        'installationDate': installationDate
                    }

                    try {
                        isLoading.value = true
                        isSchedule.value = true

                        const headers = { 
                            'Content-Type': 'application/json' ,
                            'Authorization': `${sessionStorage.getItem('token')}`,
                            'accept': '*/*'
                        }
                        // const response = await axios.post(`${apiUrl}/CustomerRequests/request-for-installation`, installationDate, { headers: headers } )
                        // const response = await axios.post(`${apiUrl}/CustomerRequests/request-for-installation`, { date: installationDate, headers:headers } )
                       
                        const response = await axios.post(`${apiUrl}/CustomerRequests/request-for-installation`, 
                        { headers:headers,  'installationDate': installationDate, 'orderId': orderId } )
                        // { headers:headers,  data: installationDate, 'orderId': orderId } )
                        
                        // console.log('date:', installationDate);
                        
                        // const response = await axios.post(`${apiUrl}/CustomerRequests/request-for-installation`, { headers:headers,  data: scheduleData } )
            

                        scheduleSuccessMessage.value = response.data.message
                    
                        scheduleMessage.value = 'Your installation has been successfully scheduled, bringing you one step closer to an enhanced experience. If you have any preferences or specific requirements, feel free to let us know.'
                        
                        // isModal1Visible.value = false

                    } catch (error) {
                        console.log(error);
                    }finally{
                        setTimeout(() => {
                            isLoading.value = false
                            isModal1Visible.value = false
                        isModal2Visible.value = true
                            // const myModal3 = new bootstrap.Modal(document.getElementById('myModal3'), {});
                            // myModal3.show()
                        }, 2000)
                    }
                // }

                }else {
                    errorMsg.value = true
                }
                
            }

            const submit = () => {
                router.push({path: '/'})
            }

            const requestCall = async() => {
                try {   
                    isLoading.value = true
                    isSchedule.value = false
                    const headers = { 
                                'Content-Type': 'application/json' ,
                                'Authorization': `${sessionStorage.getItem('token')}`,
                                'accept': '*/*'
                            }
    
                      const response = await axios.post(`${apiUrl}/CustomerRequests/request-a-call`, { headers: headers } )
                    //   requestCallSuccessMessage.value = response.data.message
                      scheduleMessage.value = response.data.message
            
                } catch (error) {
                        console.log(error);
                }finally{
                    setTimeout(() => {
                        isLoading.value = false
                    }, 2000)
                }
            }

            return { 
                 continueSchedule, getMonthsInYear, submit, scheduleSuccessMessage, scheduleMessage, isLoading, isSchedule, isModal1Visible, isModal2Visible,
                selectedYear, selectedMonth, days, months, getYears, updateDays, daysToShow, daysLength, startIndex, scrollNext, scrollBack,
                 selectScheduledDate, selectScheduledTime, selectDate, selectTime, timeList, errorMsg, disabled, requestCall}  
            },

        // mounted() {
        //     const myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
            
        //     myModal.show()
            
        // }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

  .custom-modal {
    background: #FFFFFF;
        /* box-shadow: 2px 2px 20px 1px; */
        /* overflow-x: auto; */
        display: flex;
        flex-direction: column;
        max-width: 500px;
        /* max-height: 450px; */
        /* padding: 20px 24px; */
        text-align: justify;
        font-family: 'IBM Sans Plex', sans-serif;
        border-radius: 28px;
        padding: 25px 30px;
  }
    .modal-btn {
        background-color: #DA1919;
        border-radius: 30px;
        padding: 5px 17px;
        text-align: center;
        cursor: pointer;
    }
    .modal-btn .btn:active, .btn:disabled {
        border: transparent;
    }
    .modal-btn button, .modal-btn button:active {
        color: #ffffff;
    }

    .modal-header {
        border-bottom: none !important;
        padding: 20px auto;
    }
    .modal-header, .modal-body {
        margin-top: 0;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .modal-body {
        padding: 20px auto;
    }
    /* .modal-content {
        padding: 20px 24px;
        text-align: justify;
        font-family: 'IBM Sans Plex', sans-serif;
        border-radius: 28px;
    } */
    .modal-heading {
        color: #000000;
        font-size: 20px;
        font-weight: 700;
        text-align: left;
        /* padding-bottom: 10px; */
    }
    .modal-sub-heading1, 
    .modal-sub-heading2 {
        font-weight: 600;
        display: block;
        font-size: 14px;
    }
    .modal-text {
        color: #616C82;
        font-size: 14px;
        font-weight: 400;
        margin-top: 10px;
    }
    .modal-text.text2{
        border-bottom: 1px solid #A9B7C0;
        padding-bottom: 10px;
    }
    .download-btn, .schedule-btn {
        border: 1px solid #0000001F;
        width: 200px;
        border-radius: 30px;
        font-size: 14px;
        font-weight: 500;
    }
    .download-btn {
        color: #000000;
        background: #ffffff;
        padding: 12px 31px;
    }
    .schedule-btn {
        background: #DA1919;
        color: #ffffff;
        float: right;
        padding: 12px 26px;
    }
    .download-btn:hover {
        background: #DA1919;
        color: #ffffff;
    }
    .download-btn:hover + .schedule-btn {
        background-color: #ffffff;
        color: #000000;
    }
    /* #myModal, #myModal2, #myModal3, #myModal4 {
        backdrop-filter: blur(2px);
    }  */
    /* background-color: rgba(255, 255, 255, 0) ; */

    /* .modal.show{
        display: block;
    } */

    .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
  }



    .time-zone {
        color: #667085;
        font-size: 14px;
        font-weight: 600;
    }
    .time {
        background: #F2F2F2;
        border-radius: 12px;
        padding: 10px 15px;
        font-size: 14px;
        border: 1px solid #EAEAEA;
        color: #35434B;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 18px;
        margin-top: 12px;
        font-family: 'IBM Sans Plex';
    }

    button.time:active, button.time:focus, .activeTime button {
        background: #F3E4E4;
        border: 1px solid #DA1919;
        color: #DA1919;
    }

    .form-select {
        width: 40%;
        display: inline-block;
        border-radius: 8px;
        border: 1px solid #D0D5DD;
        /* margin-right: 10px; */
    }
    .form-select:focus {
        box-shadow: none;
    }
    .left-row select:nth-child(1) {
        /* background: red; */
        margin-right: 15px;
    }
    .right-row {
        margin: auto;
        justify-content: flex-end;
    }
    .right-row .arrow-btn {
        background: transparent;
        width: 35px;
        height: 35px;
        border-radius: 8px;
        border: 1px solid #D8DAE5;
    }
    .right-row button:nth-child(1) {
        margin-right: 15px;
    }
    .date-row{
        margin: 20px 0;
        /* padding: auto 24px; */
    }
    .date-row, .time-row {
        font-family: 'IBM Sans Plex';
    }
    .date-box {
        padding: 10px;
        border-radius: 12px;
        border: 1px solid #344054;
        text-align: center;
        color: #35434B;
        margin: 5px;
        display: flex;
        flex-wrap: wrap;
        width: 22.5%;
    }
    /* .date-box:focus, .date-box:hover, .time-box .time:focus, .time-box .time:hover {
        background: #F3E4E4;
        color: #DA1919;
        border: 1px solid #DA1919;
    } */
    .date-box p.day, .date-box p.date {
        /* flex-direction: column; */
        display: block;
        width: 100%;
    }
    .date-box p.day {
        font-weight: 500;
        font-size: 16px;
        margin-top: 0;
        margin-bottom: 0;
    }
    .date-box p.date {
        font-weight: 600;
        font-size: 24px;
        color: #FF0000;
        margin-top: 0;
        margin-bottom: 0;
    }

    .active {
        background: #F3E4E4;
        color: #DA1919;
        border: 1px solid #DA1919;
    }

    @media (min-width: 481px) and (max-width: 767px){
        
        .time-row{
            margin: auto;
            text-align: center;
        }
    }
    
    @media (max-width: 480px) {
        .date-box {
            width: 45%;
        }
        .time-box .time:nth-child(1) {
            /* background-color: red; */
            margin-right: 5px;
        }
        .time-row{
            margin: auto;
            text-align: center;
        }
        /* .buttons .download-btn, .buttons .schedule-btn{
            display: block;
        } */
         .schedule-btn{
            float: none;
            margin-top: 10px;
         }
         .buttons{
            text-align: center;
            margin: auto;
         }
         .right-row {
            margin-top: 10px;
         }
    }
</style>