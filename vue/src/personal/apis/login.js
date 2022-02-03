const axios = require('axios');

export default {
    login: function(params){
        return axios.post('/api/auth/login',params)
    }
}