import axios from '../../helpers/interceptors';

export default {
    getAll: function(params){
        return axios.get('/api/user/getAll',{params:params})
    },
    createUser: function (params){
        return axios.post('/api/user/create',params);
    },
    getUser: function (params){
        return axios.get('/api/user/get',{params : params } );
    },
    updateUser: function(params){
        return axios.post('/api/user/update',params);
    }
}