import axios from 'axios'
import router from '@/router';

const baseUrl = process.env.VUE_APP_API_URL

export const profileService = {
    editProfile( resource: {
        first_name: string | null, 
        last_name: string | null, 
        description: string | null,
        profile_image: string | null, 
        city: string | null, 
        state: string | null, 
    }, 
    successFunction: (response: object) => void,
    errorFunction: (err: object) => void) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(`${baseUrl}/edit-profile`, resource, config)
        .then((response) => {
            console.log(response)
            router.push('/account/profile/' + response.data.user_id)
            successFunction(response)
        }).catch(err =>  errorFunction(err));
    }
}