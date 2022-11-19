import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL

export const songsService = {
    addSongs( 
    resource: {
        title: string | null, 
        song: string | null, 
    }, 
    successFunction: () => void,
    errorFunction: (err: object) => void
    ) {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        axios.post(`${baseUrl}/add-song`, resource, config)
        .then((res) => {
            successFunction()
            console.log('songUploaded', res);
        }).catch(err => {
            errorFunction(err)
        });
    },
    async SongsByUserId(
        userId: number, 
        successFunction: (res: object) => void, 
        // errorFunction: () => void
    ): Promise<void> {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        await axios.get(`${baseUrl}/get-songs/${userId}`, config)
        .then((res) => {
            successFunction(res)
        }).catch(err=>console.log('err', err))
    }
}