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
    async deleteSong(
        userId: number,
        songId: number,
        successFunction: () => void,
        errorFunction: (err: object) => void
    ): Promise<void> {
        const token = localStorage.getItem('token');

        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        };
        await axios.delete(`${baseUrl}/delete-song/${userId}/${songId}`, config)
        .then(() => {
            successFunction()
        }).catch(err=>{
            errorFunction(err)
        })
    }
}