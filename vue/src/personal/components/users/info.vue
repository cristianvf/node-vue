<template>
    <CModal :visible="show" @close="this.$emit('closeModal')">
    <CModalHeader>
      <CModalTitle>Create user</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <div v-if="loadStatusInfo === 1">
            <div class="d-flex justify-content-center">
                <div class="spinner-grow" role="status">
                </div>
            </div>
        </div>

        <div v-else>
            <dl class="row">
                <dt class="col-sm-3">Name:</dt>
                <dd class="col-sm-9">{{info.name}}</dd>

               

                <dt class="col-sm-3">Last name:</dt>
                <dd class="col-sm-9">{{info.last_name}}</dd>

                <dt class="col-sm-3">Email:</dt>
                <dd class="col-sm-9">{{info.email}}</dd>
            </dl>
        </div>


    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="this.$emit('closeModal')" :disabled="loadStatusInfo === 1 ">
        Close
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'UserInfo',
  props:{
      show:{
          type:Boolean,
          default:false
      },
      id:{
          type:String
      }
  },
  data(){
    return { 
    }
  },
  methods:{
      getUser(){
          this.$store.dispatch('user/getUser',{'id':this.id});
      }
  },
  computed:{
    ...mapState('user',{
      loadStatusInfo: state => state.loadStatusInfo,
      info: state => state.info
    })


  },
  watch:{
      show(val){
          if (val) {
              this.getUser();
          }
      }
  }
}
</script>

