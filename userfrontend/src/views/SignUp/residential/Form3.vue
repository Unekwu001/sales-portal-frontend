<template>
    <div class="main-container">
        <MainNavbar/>

        <div class="form-container">
            <p class="heading">Upload KYC</p>
            <p class="greeting">Hello Anthonia,</p>
            <p class="sub-heading">Please provide your supporting documents, your information is safe with us!</p>
            <p class="body-heading">Personal Data Processing Consent,</p>
            <p class="body">ipNX will collect and process your personal data to provide the services you subscribed to. 
                This may involve the transfer of your personal data to our subcontractors and other third parties where necessary.
                For further information on how we may use your personal data please refer to our Data Privacy Policy.<br><br>
                I have read and understood the information here and in the  <a href="" class="policy-link">Privacy Policy</a>.<br><br>
                I hereby consent to the use of my Personal data by ipNX for the purposes outlined above.
                <input class="form-check-input" type="checkbox" value="consent" v-model="state.localConsent" 
                @change="toggleConsentCheckbox" v-bind:class="{'text-danger': state.hasError}">

                <p style="color: #DA1919" v-if="state.errorMsg">You have to check to give consent.</p>

            </p>

            <p class="form-heading">Upload Your Documents</p>

            <form class="row g-3 form" enctype="multipart/form-data">
                <div class="col-lg-6 col-md-6 col-sm-12 form-input">
                    <label for="" class="form-label">Passport Photograph</label>
                    <!-- <input type="file" class="form-control" @change="handlePassport($event)"> -->
                    <input type="file" class="form-control hidden-input"
                    ref="passportInput"
                    @change="handlePassport($event)"
                    accept=".pdf, .doc, .docx, .jpg, .jpeg"
                    >
                    <div class="file-container">
                        <span class="file-button" @click="choosePassport()" :disabled="isSubmitting">
                            Browse ...
                        </span>
                        <span class="file-name">{{ state.passportName }}</span>
                        </div>
                    <div class="file-warning" v-if="state.fileSizeExceeded">
                        <span class="text-pigmentred">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div>

                    <!-- <div class="file-warning" v-if="state.fileSizeExceeded">
                        <span class="text-pigmentred">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div> -->
                    <!-- <label id="fileLabel">file</label> -->
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 comment">
                    Upload Passport Photograph of Account Owner(JPEG,PNG)
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 form-input">
                    <label for="" class="form-label">Government Recognized ID</label>
                    <!-- <input type="file" class="form-control" @change="handleGovtID($event)"> -->
                    <input type="file" class="form-control hidden-input"
                    ref="govtIdInput"
                    @change="handleGovtId($event)"
                    accept=".pdf, .doc, .docx, .jpg, .jpeg"
                    >
                    <div class="file-container">
                        <span class="file-button" @click="chooseGovtId()" :disabled="isSubmitting">
                            Browse ...
                        </span>
                        <span class="file-name">{{ state.govtIdName }}</span>
                        </div>
                    <div class="file-warning" v-if="state.govtIdFileSizeExceeded">
                        <span class="text-pigmentred">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 comment">
                    Upload Driver's License, International Passport,<br> National ID Card or Voter's Card(JPEG,PNG)
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 form-input">
                    <label for="" class="form-label">Utility Bill</label>
                    <!-- <input type="file" class="form-control" @change="handleUtilityBill($event)"> -->
                    <input type="file" class="form-control hidden-input"
                    ref="utilityInput"
                    @change="handleUtilityBill($event)"
                    accept=".pdf, .doc, .docx, .jpg, .jpeg"
                    >
                    <div class="file-container">
                        <span class="file-button" @click="chooseUtilityBill()" :disabled="isSubmitting">
                            Browse ...
                        </span>
                        <span class="file-name">{{ state.utilityBillName }}</span>
                        </div>
                    <div class="file-warning" v-if="state.utilityFileSizeExceeded">
                        <span class="text-pigmentred">Maximum file size of 2MB exceeded. Please choose a smaller file (max: 2MB).</span>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 comment">
                    Upload Electricity, Water, Waste <br> Land Use Charge or Tenancy Agreement(JPEG,PNG)
                </div>

                <!-- <input type="text" placeholder="job" v-model="state.localJob"><br><br>
                <input type="text" placeholder="role" v-model="state.localRole"><br><br>
                <input type="file" name="file" > -->
    
              <!-- <button @click="prevStep">Previous</button>
                <button type="submit">next</button> -->
               
            </form>

            <div>
                <p class="declaration-heading">DECLARATION</p>
                <p class="declaration-body">
                    I/We hereby apply for the FOS Internet service as per details furnished above and agree to take the service, if offered,
                    on the terms and conditions agreed at www.ipnxnigeria.net, which I/we have read and uncerstood.
                    I/We confirm that the information furnished above is correct. In the event that the information is found to be incorrect,
                    ipNX Nigeria Limited shall have right ti terminate the service, and I/We shall have no claims whatsoever gainst ipNX Nigeria Limited.
                    I/We also agree to provide trusted person or party to supervise any technical work at the location specified above 
                    and acknowledge that ipNX will not be responsible for any security incidents before or after such work is carried out.<br>
                    I Agree <input class="form-check-input" type="checkbox" value="declaration" v-model="state.localDeclaration" 
                    @change="toggleDeclarationCheckbox" v-bind:class="{'text-danger': state.hasError}">

                    <p style="color: #DA1919" v-if="state.errorMsg">You have to agree before you continue.</p>

                </p>
            </div>

            <div class="buttons">
                <div class="prev-btn">
                    <button type="button" class="btn" @click="prevStep">Back</button>
                </div>
                <div class="submit-btn">
                    <button type="submit" class="btn" @click="submitForm">Submit</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import MainNavbar from '@/components/MainNavbar.vue';
    import { ref, reactive, computed } from 'vue';
   import { useRouter } from 'vue-router';

    import useVuelidate from '@vuelidate/core'
   import { required } from '@vuelidate/validators'
   
    export default {
        components: {
            MainNavbar,
            // MainFooter
        },

        name: 'FormStep3',
       props: [
        'filesData'
       ],
    
    // composition API
    setup (props, {emit}) {
        const passportInput = ref('');
        const govtIdInput = ref('');
        const utilityInput = ref('');

            const state = reactive({
                //  localJob: props.filesData.job,
                //     localRole: props.filesData.role,
                    localConsent: props.filesData.consent,
                    localDeclaration: props.filesData.declaration,
                    errorMsg: false,
                    fileSizeExceeded: false,
                    utilityFileSizeExceeded: false,
                    govtIdFileSizeExceeded: false,
                    passportFile: props.filesData.passportFile,
                    passportName: props.filesData.passportFile ? props.filesData.passportFile.name : 'No file selected',
                    govtIdFile: props.filesData.govtIdFile,
                    govtIdName: props.filesData.govtIdFile ? props.filesData.govtIdFile.name : 'No file selected',
                    utilityFile: props.filesData.utilityFile,
                    utilityBillName: props.filesData.utilityFile ? props.filesData.utilityFile.name : 'No file selected',
            })

            const rules = computed(() => {
                return {
                    // localJob: { required },
                    // localRole: { required },
                    localConsent: { required },
                    localDeclaration: { required },
                    passportFile: { required },
                    govtIdFile: { required },
                    utilityFile: { required },
                }
            })

            const v$ = useVuelidate(rules, state)

            const choosePassport = () => {
                event.preventDefault();
                passportInput.value.click();
            }
            const handlePassport = (event) => {
                const selectedPassport = event.target.files[0];
                if (selectedPassport) {
                    if (selectedPassport.size > 2 * 1024 * 1024) {
                        state.fileSizeExceeded = true;
                        state.passportFile = null;
                        state.passportName = null;
                    } 
                    // else if (sel){

                    // }
                    else {
                        state.fileSizeExceeded = false;
                        state.passportFile = selectedPassport;
                        state.passportName = selectedPassport.name;
                    }
                } else {
                    state.passportFile = null;
                    state.passportName = 'No file selected';
                }
            }

            const chooseGovtId = () => {
                event.preventDefault();
                govtIdInput.value.click();
            }
            const handleGovtId= (event) => {
                const selectedGovt = event.target.files[0];
                if (selectedGovt) {
                    if (selectedGovt.size > 2 * 1024 * 1024) {
                        state.govtIdFileSizeExceeded = true;
                        state.govtIdFile = null;
                        state.govtIdName = null;
                    } else {
                        state.govtIdFileSizeExceeded = false;
                        state.govtIdFile = selectedGovt;
                        state.govtIdName = selectedGovt.name;
                    }
                } else {
                    state.govtIdFile = null;
                    state.govtIdName = 'No file selected';
                }
            }

            const chooseUtilityBill = () => {
                event.preventDefault();
                utilityInput.value.click();
            }
            const handleUtilityBill= (event) => {
                const selectedUtility = event.target.files[0];
                if (selectedUtility) {
                    if (selectedUtility.size > 2 * 1024 * 1024) {
                        state.utilityFileSizeExceeded = true;
                        state.utilityFile = null;
                        state.utilityBillName = null;
                    } else {
                        state.utilityFileSizeExceeded = false;
                        state.utilityFile = selectedUtility;
                        state.utilityBillName = selectedUtility.name;
                    }
                } else {
                    state.utilityFile = null;
                    state.utilityBillName = 'No file selected';
                }
            }

            const prevStep = () => {
                const totalData = {
                    // job: state.localJob, role: state.localRole,
                     consent: state.localConsent, declaration: state.localDeclaration, 
                     passportFile: state.passportFile,
                     govtIdFile: state.govtIdFile,
                     utilityFile: state.utilityFile
                    }

                emit('prev-step', { filesData: totalData})

                console.log(state.passportFile);
            }
            const router = useRouter()

            const submitForm = () => {
                v$.value.$validate() //validate inputs

                if (!v$.value.$error) {
                    if (state.hasError = true) {
                        state.hasError = false;
                    }

                    router.push({path: '/plan/fos-residential' } )
                }else{
                    state.hasError = true
                    window.scrollTo(0, top);
                    state.errorMsg = true
                }
            }

            return {state, choosePassport, handlePassport, passportInput, prevStep, submitForm, 
                govtIdInput, chooseGovtId, handleGovtId, utilityInput, chooseUtilityBill, handleUtilityBill}
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@0,100..900;1,100..900&display=swap');
    .main-container {
        background-image: linear-gradient(to right, rgba(240, 12, 12, 0.03),#ffffff,rgba(240, 12, 12, 0.03)); 
        text-align: justify;
        /* overflow-x: hidden; */
    }
    .policy-link {
        color: #DA1919;
        text-decoration: none;
    }
    p.body-heading, p.declaration-heading {
        font-size: 16px;
    }
    p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
        color: #949DAB;
        font-family: 'IBM Pex Sans', sans-serif;
        font-weight: 600;
        font-size: 15px;
    }
    .form-container {
        margin: 20px 150px 150px;
        /* width: 75vw; */
        font-family: 'IBM Plex Sans', sans-serif;
    }
    .hidden-input {
        display: none;
    }
    p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
       margin-left: 30px;
    }
    .form-heading, form.form {
        margin-left: 70px;
    }
    .heading {
        font-size: 30px;
        font-weight: 500;
        text-align: center;
    }
    .greeting {
        font-family: 'Poppins', sans-serif;
        font-size: 26px;
        font-weight: 700;
    }
    .greeting, .sub-heading {
        text-align: left;
    }
    .form-heading {
        font-weight: 500;
        font-size: 25px;
    }
    .form {
        margin: 20px auto 50px;
    }
    .form-input {
        width: 45%;
        margin-right: 25px;
    }
    .comment {
        font-size: 16px;
        font-weight: 500;
        color: #263238;
        margin-top: 50px;
    }
    .prev-btn, .submit-btn { 
        background-color: #DA1919;
        border-radius: 30px;
        text-align: center;
        width: 150px;
        margin: 20px auto 0;
    }
    .prev-btn {
        float: left;
    }
    .submit-btn .btn, .prev-btn .btn{
        color: #ffffff;
    }
    .submit-btn {
        float: right;
    }

    .submit-btn .btn:active, .prev-btn .btn:active {
        border: transparent;
    }

    /* input[type=file]::-webkit-file-upload-button {
        display: none;
    }
    input[type=file]::file-selector-button {
        display: none;
    }
    input[type=file]::before {
        content: "Browse....";
        display: inline-block;
        color: #000000;
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        background-color: #fff;
        margin-right: 10px;
    }

    .form .form-control, input[type=file]::before {
        border: 1px solid #000000;
    } */

    .file-container {
        border: 1px solid #000000;
        border-radius: 15px;
        padding:  12px 10px 12px 0;
        max-width: 100%;
        overflow:hidden; 
        white-space:nowrap; 
        text-overflow:ellipsis;    
    
        font-weight: 500;
        font-size: 16px;
    }
  .file-button {
    border: 1px solid black;
    padding: 5px 40px 5px 10px;
    margin: 2px 3px 2px 10px;
 
  }
  .file-name {
    /* overflow: hidden; */
    overflow:hidden; 
    white-space:nowrap; 
    text-overflow:ellipsis; 
    width:200px;
  /* display: inline; */
  }
    .form-control:focus, .form-check-input:focus {
        box-shadow: none;
    }
    .form-label {
        font-family: 'IBM Sans Plex', sans-serif;
        font-size: 16px;
        font-weight: 500;
    }
    input[type=checkbox]{
        border-color: #757575;
    }

    input[type=checkbox]:checked{
        background-color:#DA1919;
    }
    input[type=checkbox].text-danger{
        border-color: #DA1919;
    }
    @media (min-width: 768px) and (max-width: 992px) {
        .form-container {
            margin: 20px 75px 100px;
        }
        .form-heading, form.form {
            margin-left: 30px;
        }
        .heading, .greeting {
            font-size: 20px;
        }
    }
    @media (min-width: 481px) and (max-width: 767px) {
        .form-container {
            margin: 20px 75px 100px;
        }
        .comment {
            margin-top: 15px;
        }
        .form-heading, form.form, p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
            margin-left: 0;
        }
        .form-heading {
            font-size: 20px;
        }
        .heading {
            font-weight: 600;
        }
        .heading, .greeting {
            font-size: 18px;
        }
        .form-input {
            width: 100%;
        }
        .prev-btn, .submit-btn { 
          float: none;
          margin: 20px auto 0;
          text-align: center;
        }
    }

    @media (max-width: 480px) {
        .form-container {
            margin: 20px 40px 150px;
            /* width: 75vw; */
        }
        .form-heading, form.form, p.body-heading, p.body, .sub-heading, p.declaration-heading, p.declaration-body {
            margin-left: 0;
        }
        .form-heading {
            font-size: 20px;
        }
        .comment {
            margin-top: 15px;
        }
        .heading {
            font-weight: 600;
        }
        .heading, .greeting {
            font-size: 18px;
        }
        .form-input {
            width: 100%;
        }
        .prev-btn, .submit-btn { 
          float: none;
          margin: 20px auto 0;
          text-align: center;
        }
    }
</style>