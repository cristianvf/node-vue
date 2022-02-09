import { get } from 'lodash'
import axios from 'axios'
import router from '@/router'

export const connection = (options = {}) => {
    const instance = axios.create();

    instance.interceptors.request.use( req => {
        req.headers.Authorization = "Bearer"+ localStorage.getItem('token')
        return req;
    });

    instance.interceptors.response.use(function(response){
        const newtoken = get(response,'headers.authorization')
        if (newtoken) {
            localStorage.setItem('token',newtoken.replace('Bearer','').trim());
        }
        return response;
    },function(error){
        const newtoken = get(error.response.headers, 'headers.authorization');
        if (newtoken) {
            localStorage.setItem('token',newtoken.replace('Bearer','').trim()); 
        }

        switch(error.response.status){
            case 401:
                alert('Session expired');
                localStorage.clear();
                router.push({ path:'/login'})
                break;

            case 400:
                alert('Bad request');
                localStorage.clear();
                router.push({ path:'/login'});
                break;

            case 403:
                alert('Forbidden');
                router.push('/');
                break;
            
            default:
                
        }
        return Promise.reject(error);
    });
    return instance
}

export default connection();
