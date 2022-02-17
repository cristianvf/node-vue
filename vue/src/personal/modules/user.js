/* eslint-disable */
import userAPI from '../apis/user'

export const user = {
    namespaced:true,
    state:{
        users:[],
        loadStatusLogin:0,
        loadStatusCreate:0,
        loadStatusInfo:0,
        info:{}

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
        },
        getUser( {commit}, params ){
            commit('setLoadStatusInfo',1);
            userAPI.getUser(params)
            .then(function( response ){
                commit('setInfo',response.data.user);
                commit('setLoadStatusInfo',2);
            })
            .catch(function(err){
                commit('setLoadStatusInfo',3);
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
        },
        setLoadStatusInfo( state, value ){
            state.loadStatusInfo = value;
        },
        setInfo( state, value ){
            state.info = value;
        }
        
    
    },
    getters:{
        getUsers( state ){
            return state.users;
        },
        getLoadStatusCreate( state ){
            return state.loadStatusCreate;
        },
        getLoadStatusInfo( state ){
            return state.loadStatusInfo;
        },
        getInfo( state ){
            return state.info;
        }
    }
}

