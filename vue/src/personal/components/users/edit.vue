<template>
    <CModal :visible="show" @close="this.$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>Edit user</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <div v-if="loadStatusEdit === 1 || loadStatusInfo === 1">
            <div class="d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                </div>
            </div>
        </div>

        <div v-else>
            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Name</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="v$.userEdit.name.$model" v-bind:invalid="validateField('name')" v-bind:valid="!validateField('name')"/>
                    <CFormFeedback invalid>
                      The name is required
                    </CFormFeedback>
                </div>
            </CRow>

            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Last name</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="v$.userEdit.last_name.$model" v-bind:invalid="validateField('last_name')" v-bind:valid="!validateField('last_name')"/>
                    <CFormFeedback invalid>
                      The last name is required
                    </CFormFeedback>
                </div>
            </CRow>

            <CRow class="mb-3">
                <CFormLabel class="col-sm-2 col-form-label">Email</CFormLabel>
                <div class="col-sm-10">
                    <CFormInput  v-model="v$.userEdit.email.$model" v-bind:invalid="validateField('email')" v-bind:valid="!validateField('email')" />
                    <CFormFeedback invalid>
                      The email is required and must be an email.
                    </CFormFeedback>
                </div>
            </CRow>
        </div>


    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="this.$emit('closeModal')" :disabled="loadStatusEdit === 1 || loadStatusInfo === 1">
        Close
      </CButton>
      <CButton color="primary" @click="updateUser" :disabled="loadStatusEdit === 1 || loadStatusInfo === 1" >Save</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import { mapState } from 'vuex';
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'UserEdit',
  props:{
      show:{
          type:Boolean,
          default:false
      },
      id:{
          type:String
      }
  },
  setup(){
    return {
      v$: useVuelidate()
    }
  },
  data(){
    return { 
        userEdit:{
            id:'',
            name: '',
            last_name: '',
            email: ''
        }
    }
  },
  validations(){
      return { 
        userEdit:{
            name: { required },
            last_name: { required },
            email: { required, email }

        }
      }
  },
  methods:{
    getUser(){
        this.$store.dispatch('user/getUser',{'id':this.id});
    },
    validateField(field){
        return this.v$.userEdit[field].$invalid;
    },
    updateUser(){
        if(!this.v$.$invalid){
            var data = {'_id':this.userEdit._id,'name':this.userEdit.name, 'last_name':this.userEdit.last_name,'email':this.userEdit.email};
            this.$store.dispatch('user/updateUser', data);
        }
    }
    
  },
  computed:{
    ...mapState('user',{
        loadStatusEdit: state => state.loadStatusEdit,
        loadStatusInfo: state => state.loadStatusInfo,
        info: state => state.info
    })


  },
  watch:{
    show(val){
        if (val) {
            this.getUser();
        }
    },
    info(val){
        this.userEdit._id = val._id;
        this.userEdit.name = val.name;
        this.userEdit.last_name = val.last_name;
        this.userEdit.email = val.email;
    }
  }
}
</script>

