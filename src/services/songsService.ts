import axios from 'axios'
import router from '@/router'

const baseUrl = process.env.VUE_APP_API_URL

export const songsService = {
    addSongs( resource: {
        title: string | null, 
        song: string | null, 
    }) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(`${baseUrl}/add-song`, resource, config)
        .then((res) => {
            router.push('/account/profile')
            console.log('songUploaded', res);
        }).catch(err => console.log('errUpdate', err));
    }}