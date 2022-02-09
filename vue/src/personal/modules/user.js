/* eslint-disable */
import userAPI from '../apis/user'

export const user = {
    namespaced:true,
    state:{
        users:[],
        loadStatusLogin:0,

    },
    actions:{
        getAll( {commit}, params ){
            commit('setLoadStatusLogin',1);
            userAPI.getAll(params)
            .then(function( response ){
                console.log(response.data)
                commit('setUsers',response.data.users)
                commit('setLoadStatusLogin',2);
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
        setUsers( state, value ){
            state.users = value;
        },
        
    
    },
    getters:{
        getUsers( state ){
            return state.users;
        }
    }
}

