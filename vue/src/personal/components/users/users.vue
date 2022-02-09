<template>
  <div class="bg-light min-vh-100 d-flex flex-row">
    <CContainer>
      <CRow class="">
        <CCol>
          <CCard class="position-relative">
            <CCardBody >

              <CCardTitle>Users</CCardTitle>
              <hr>
              <CRow>
                <CCol class=" d-flex flex-row-reverse">
                  <CButton color="primary">Create user</CButton>
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
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Users',
  data(){
    return { 

    }
  },
  mounted(){
    this.$store.dispatch('user/getAll');
  },
  methods:{
  },
  computed:{
    ...mapState('user',{
      loadStatusLogin: state => state.loadStatusLogin,
      users: state => state.users
    })


  },
  watch:{

  }
}
</script>
