import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL


export const profileService = {
    editProfile( resource: {
        first_name: string | null, 
        last_name: string | null, 
        description: string | null, 
        city: string | null, 
        state: string | null, 
    }) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(`${baseUrl}/edit-profile`, resource, config)
        .then((res) => {
            console.log('resUpdate', res);
        }).catch(err => console.log('errUpdate', err));
    }
}