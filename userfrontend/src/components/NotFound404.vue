<template>
    <div>
        <!-- <p class="heading">You do not have an account</p>
        <p class="sub-heading">Go back to the <a href="" style="color: #DA1919;">home</a> page to get started</p> -->

          <!-- Modal -->
          <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
            
                <div class="modal-body">
                    <h5 class="modal-heading">Account Not Found</h5>
                    <p class="modal-text">
                        <p class="heading">You do not have an account</p>
                        <p class="sub-heading">Go back to the <a href="/" style="color: #DA1919;">home</a> page to get started</p>
                    </p>
                </div>
                
                </div>
            </div>
            </div>

    </div>
</template>

<script>
import { onMounted } from 'vue';

    export default {
        setup(){
            onMounted(() => {
                const myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
                myModal.show()
            })
        }
    }
</script>

<style scoped>

    .modal-content {
        margin: auto;
        padding: 25px;
        text-align: center;
        font-family: 'IBM Sans Plex', sans-serif;
        /* border-radius: 28px; */
    }
    .modal-header button.btn-close {
        color: #000000 !important;
        --bs-btn-close-disabled-opacity: 1;
    }
    
    .modal-heading {
        color: #000000;
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 10px;
    }
    .modal-text {
        color: #616C82;
        font-size: 14px;
        font-weight: 400;

    }
    #myModal {
        backdrop-filter: blur(2px);
    }
</style>