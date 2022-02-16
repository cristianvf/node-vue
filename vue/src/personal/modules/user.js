/* eslint-disable */
import userAPI from '../apis/user'

export const user = {
    namespaced:true,
    state:{
        users:[],
        loadStatusLogin:0,
        loadStatusCreate:0,

    },
    actions:{
        getAll( {commit}, params ){
            commit('setLoadStatusLogin',1);
            userAPI.getAll(params)
            .then(function( response ){
                commit('setUsers',response.data.users)
                commit('setLoadStatusLogin',2);
            })
            .catch(function(err){
                commit('setLoadStatusLogin',3);
            })
        },
        createUser( {commit}, params ){
            commit('setLoadStatusCreate',1);
            userAPI.createUser(params)
            .then(function( response ){
                commit('setLoadStatusCreate',2);
            })
            .catch(function(err){
                commit('setLoadStatusCreate',3);
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
        setLoadStatusCreate( state, value ){
            state.loadStatusCreate = value;
        }
        
    
    },
    getters:{
        getUsers( state ){
            return state.users;
        },
        getLoadStatusCreate( state ){
            return state.loadStatusCreate;
        }
    }
}

