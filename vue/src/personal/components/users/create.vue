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
                    <CFormInput  v-model="v$.user.name.$model" v-bind:invalid="validateField('name')" v-bind:valid="!validateField('name')"/>
                    <CFormFeedback invalid>
                      The name is required
                    </CFormFeedback>
                </div>
            </CRow>

            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Last name</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="v$.user.last_name.$model" v-bind:invalid="validateField('last_name')" v-bind:valid="!validateField('last_name')"/>
                    <CFormFeedback invalid>
                      The last name is required
                    </CFormFeedback>
                </div>
            </CRow>

            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Email</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="v$.user.email.$model" v-bind:invalid="validateField('email')" v-bind:valid="!validateField('email')" />
                    <CFormFeedback invalid>
                      The email is required and must be an email.
                    </CFormFeedback>
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
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'UsersCreate',
  props:{
      show:{
          type:Boolean,
          default:false
      }
  },
  setup(){
    return {
      v$: useVuelidate()
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
  validations(){
    return {
      user: {
        name:{ required },
        last_name:{ required },
        email: { required, email }
      }
    }
  },
  mounted(){
  },
  methods:{
      closemodal(){
          this.$emit('close');
      },
      saveUser(){

        if(!this.v$.$invalid){
          var data = {'name':this.user.name, 'last_name':this.user.last_name,'email':this.user.email};
          this.$store.dispatch('user/createUser', data);
        }

        

      },
      validateField(field){
        return this.v$.user[field].$invalid;
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

