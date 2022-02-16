<template>
    <CModal :visible="show" @close="this.$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>Create user</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <div v-if="loadStatusCreate === 1">
            <div class="d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                </div>
            </div>
        </div>

        <div v-else>
            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Name</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="user.name" :value.sync="user.name" />
                </div>
            </CRow>

            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Last name</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="user.last_name" :value.sync="user.last_name" />
                </div>
            </CRow>

            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Email</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="user.email" :value.sync="user.email" />
                </div>
            </CRow>
        </div>


    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="this.$emit('closeModal')" :disabled="loadStatusCreate === 1 ">
        Close
      </CButton>
      <CButton color="primary" @click="saveUser" :disabled="loadStatusCreate === 1 " >Save</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'UsersCreate',
  props:{
      show:{
          type:Boolean,
          default:false
      }
  },
  data(){
    return { 
        user:{
            name:'',
            last_name:'',
            email:''
        }
    }
  },
  mounted(){
  },
  methods:{
      closemodal(){
          console.log("entro");

          this.$emit('close');
      },
      saveUser(){
        var data = {'name':this.user.name, 'last_name':this.user.last_name,'email':this.user.email};
        this.$store.dispatch('user/createUser', data);

      }
  },
  computed:{
    ...mapState('user',{
      loadStatusCreate: state => state.loadStatusCreate
    })


  },
  watch:{

  }
}
</script>

