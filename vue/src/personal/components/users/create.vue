<template>
    <CModal :visible="show" @close="this.$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>Create user</CModalTitle>
    </CModalHeader>
    <CModalBody>
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


    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="this.$emit('closeModal')">
        Close
      </CButton>
      <CButton color="primary" @click="saveUser">Save</CButton>
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
          this.$emit('close');
      },
      saveUser(){
          console.log("---");
          console.log(this.user.name);
      }
  },
  computed:{


  },
  watch:{

  }
}
</script>

