/* eslint-disable */
import userAPI from '../apis/user'

export const user = {
    namespaced:true,
    state:{
        users:[],
        loadStatusLogin:0,
        loadStatusCreate:0,
        loadStatusInfo:0,
        loadStatusEdit:0,
        info:{},
        count:0,

    },
    actions:{
        getAll( {commit}, params ){
            commit('setLoadStatusLogin',1);
            userAPI.getAll(params)
            .then(function( response ){
                commit('setUsers',response.data.users)
                commit('setCount',response.data.count);
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
        },
        updateUser( {commit}, params ){
            commit('setLoadStatusEdit',1);
            userAPI.updateUser(params)
            .then(function( response ){
                commit('setLoadStatusEdit',2);
            })
            .catch(function(err){
                commit('setLoadStatusEdit',3);
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
        },
        setLoadStatusEdit( state, value ){
            state.loadStatusEdit = value;
        },
        setCount( state, value){
            state.count = value;
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
        },
        getLoadStatusEdit( state ){
            return state.loadStatusEdit;
        },
        getCount( state ){
            return state.count;
        }
    }
}

