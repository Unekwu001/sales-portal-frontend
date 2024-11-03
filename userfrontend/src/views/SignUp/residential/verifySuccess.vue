<template>
      <!-- Modal -->
      <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close modal-close-btn" data-bs-dismiss="modal" disabled></button>
                </div>
                <div class="modal-body">
                  <h5 class="modal-heading">Account Verify Successfully!</h5>
                  <p class="modal-text">
                    Your account has been successfully verified and we are thrilled to confirm that ipNX is in your area.
                    Simply click on login using your email the next time you visit our portal. Click 'Continue' to continue your activation.
                    Get ready to experience seamless connectivity with ipNX. Welcome aboard!
                 </p>
              </div>
              <div class="modal-btn">
                  <button type="submit" class="btn" data-bs-dismiss="modal" aria-label="Close">
                      CONTINUE
                  </button>
                  
              </div>
                </div>
            </div>
            </div>

            <Form11/>
</template>

<script>
    import Form11 from 'Form1.1.vue'
    export default {
        components: {
            Form11
        }
    }
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@0,100..900;1,100..900&display=swap');

.modal {
  font-family: 'IBM Sans Plex';
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
  }
  .modal-header, .modal-body {
      margin-top: 0;
      margin-bottom: 0;
      /* padding-top: 0; */
      padding-bottom: 0;
  }
  .modal-content {
      padding: 20px 24px;
      text-align: justify;
      font-family: 'IBM Sans Plex', sans-serif;
      border-radius: 28px;
  }
  .modal-heading {
      color: #000000;
      font-size: 20px;
      font-weight: 700;
      /* padding-bottom: 10px; */
  }
  #myModal{
        backdrop-filter: blur(2px);
    }
</style>