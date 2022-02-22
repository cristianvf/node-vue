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
                          <CTableDataCell>
                            <CButton color="info" size="sm" class="me-2" @click="editUser(user._id)"><CIcon :icon="icon.cilPencil"/></CButton>
                            <CButton color="light" size="sm" @click="infoUser(user._id)"><CIcon :icon="icon.cilInfo"/></CButton>
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CCol>
                </CRow>
                <CRow v-if="count/limit > 1">
                  <CCol>
                    <CPagination aria-label="Page navigation example" align="center">
                      <CPaginationItem aria-label="Previous" @click="changePage(1)" :disabled="activePage == 1"><span aria-hidden="true">&laquo;</span></CPaginationItem>
                      <CPaginationItem v-for="i in Math.ceil(count/limit)" :key="i" :active="activePage == i" @click="changePage(i)" >{{i}}</CPaginationItem>
                      <CPaginationItem aria-label="Next" @click="changePage(Math.ceil(count/limit))" :disabled="activePage == Math.ceil(count/limit)" ><span aria-hidden="true" >&raquo;</span></CPaginationItem>
                    </CPagination>
                  </CCol>
                </CRow>
              </div>
            </CCardBody>  
          </CCard>

          <UsersCreate  v-bind:show="showCreate"  v-on:closeModal="closeModal" />
          <UserInfo v-bind:show="showInfo" v-on:closeModal="closeInfo" v-bind:id="id"  />
          <UserEdit v-bind:show="showEdit" v-on:closeModal="closeEdit" v-bind:id="id"  />

        </CCol>
      </CRow>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import UsersCreate from './create.vue';
import UserInfo from './info.vue';
import UserEdit from './edit.vue';
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';

export default {
  name: 'Users',
  setup(){
    return{
      icon
    }
  },
  data(){
    return { 
      showCreate:false,
      showInfo:false,
      showEdit:false,
      id: '',
      limit:5,
      start:0,
      activePage:1
    }
  },
  components:{
    UsersCreate,
    UserInfo,
    UserEdit,
    CIcon
  },
  mounted(){
    this.$store.dispatch('user/getAll',{ 'limit':this.limit, 'start': this.start });
  },
  methods:{
    createUser(){
      this.showCreate = true;
    },
    closeModal(){
      this.showCreate = false;
    },
    infoUser(id){
      this.id = id
      this.showInfo = true;
    },
    closeInfo(){
      this.showInfo = false;
    },
    editUser(id){
      this.id = id;
      this.showEdit = true;
    },
    closeEdit(){
      this.showEdit = false
    },
    changePage(i){
      this.activePage = i;
      console.log("start")
      this.start = this.limit * (this.activePage - 1)
      this.$store.dispatch('user/getAll',{ 'limit':this.limit, 'start': this.start });
    }
     
  },
  computed:{
    ...mapState('user',{
      loadStatusLogin: state => state.loadStatusLogin,
      users: state => state.users,
      loadStatusCreate: state => state.loadStatusCreate,
      loadStatusEdit: state => state.loadStatusEdit,
      count: state => state.count
    })


  },
  watch:{
    loadStatusCreate(val){
      if (val == 2 || val == 3) {
        this.$store.dispatch('user/getAll',{ 'limit':this.limit, 'start': this.start });
        this.showCreate = false;
      }
    },
    loadStatusEdit(val){
      if (val == 2 || val == 3) {
        this.$store.dispatch('user/getAll',{ 'limit':this.limit, 'start': this.start });
        this.showEdit = false;
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