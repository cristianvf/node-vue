import axios from '../../helpers/interceptors';

export default {
    getAll: function(params){
        return axios.get('/api/user/getAll',{})
    }
}