<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      v-model="email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="login" :disabled="loading"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>


     <!-- <CToaster placement="top-end" >
          <CToast 
            :visible="true"
            color="danger">
            <CToastBody>
              {{message}}
            </CToastBody>  
          </CToast>
        </CToaster>-->
    </CContainer>
    
  </div>
  
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Login',
  data(){
    return { 
      email:'',
      password:'',
      loading:false,

    }
  },
  mounted(){
    this.$store.commit('login/setStatusMessage',false);
    this.$store.commit('login/setMessage','');
  },
  methods:{
    login(){
      this.$store.dispatch('login/login',
      {
        email:this.email,
        password:this.password
      })
    }
  },
  computed:{
    ...mapState('login',{
      loadingStatus: state => state.loadStatusLogin,
      message: state => state.message,
      statusMessage: state => state.statusMessage,
      typeMessage: state => state.typeMessage
    })

  },
  watch:{
    loadingStatus(val){
      if(val == 1){
        this.$store.commit('login/setStatusMessage',false);
        this.loading = true
      }else if(val == 2){
        this.loading = false
        this.$router.push({ path:"/" });
      }else{
        this.loading = false;
      }
    }
  }
}
</script>
