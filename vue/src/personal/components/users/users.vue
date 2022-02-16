<template>
  <div align=''>

      <CRow class="">
        <CCol>
          <CCard class="position-relative">
            <CCardBody >

              <CCardTitle>Users</CCardTitle>
              <hr>
              <CRow>
                <CCol class=" d-flex flex-row-reverse">
                  <CButton color="primary" @click="createUser">Create user</CButton>
                </CCol>
              </CRow>

              <div class="opacity-25" v-if="loadStatusLogin === 1" >
                <div class="d-flex justify-content-center">
                  <div class="spinner-grow" role="status">
                  </div>
                </div>
              </div>

              <div v-else>
                <CRow>
                  <CCol>
                    <CTable hover>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow v-for="user in users" :key="user._id">
                          <CTableHeaderCell scope="row">{{user._id}}</CTableHeaderCell>
                          <CTableDataCell>{{user.name}} {{user.last_name}} </CTableDataCell>
                          <CTableDataCell>{{user.email}}</CTableDataCell>
                          <CTableDataCell>{{user._id}}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>  
          </CCard>

          <UsersCreate  v-bind:show="showCreate"  v-on:closeModal="closeModal" />

        </CCol>
      </CRow>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import UsersCreate from './create.vue';

export default {
  name: 'Users',
  data(){
    return { 
      showCreate:false
    }
  },
  components:{
    UsersCreate
  },
  mounted(){
    this.$store.dispatch('user/getAll');
  },
  methods:{
    createUser(){
      this.showCreate = true;
    },
    closeModal(){
      this.showCreate = false;
    }
     
  },
  computed:{
    ...mapState('user',{
      loadStatusLogin: state => state.loadStatusLogin,
      users: state => state.users,
      loadStatusCreate: state => state.loadStatusCreate
    })


  },
  watch:{
    loadStatusCreate(val){
      if (val == 2 || val == 3) {
        this.$store.dispatch('user/getAll');
        this.showCreate = false;
      }
    }
  }
}
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
    z-index:1;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    z-index: 1;
  }

  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(300px);
    opacity: 0;
    z-index: 1;
  }

  .page-item.active .page-link{
    z-index: 0;
  }

</style>