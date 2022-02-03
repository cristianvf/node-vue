/* eslint-disable */
import loginAPI from '../apis/login'

export const login = {
    namespaced:true,
    state:{
        loadStatusLogin:0,
        message:'',
        statusMessage:false,
        typeMessage:'danger'

    },
    actions:{
        login( {commit}, params ){
            commit('setLoadStatusLogin',1);
            loginAPI.login(params)
            .then(function( response ){
                if (response.data.status) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("last_name", response.data.last_name);
                    localStorage.setItem("email", response.data.email);
                    commit('setLoadStatusLogin',2);

                }else{
                    commit('setMessage',response.data.msg);
                    commit('setStatusMessage',true);
                    commit('setLoadStatusLogin',3);
                }
            })
            .catch(function(err){
                commit('setLoadStatusLogin',3);
            })
        }
    },
    mutations:{
        setLoadStatusLogin( state, value ){
            state.loadStatusLogin = value;
        },
        setMessage( state, value ){
            state.message = value;
        },
        setStatusMessage( state, value ){
            state.statusMessage = value;
        },
        setTypeMessage( state, value ){ 
            state.typeMessage = value;
        }
    
    },
    getters:{
        getLoadStatusLogin( state ){
            return state.loadStatusLogin;
        }
    }
}

